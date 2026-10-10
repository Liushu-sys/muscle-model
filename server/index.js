// ai-relay — BodyCare 模型转发服务（零外部依赖，Node >=18）
// 端点契约见 API_CONTRACT.md；MOCK 模式：AI_MOCK=1 时返回 mocks/ 样例，不调上游。
import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chatJSON, vlLocateJSON, editImage } from './lib/dashscope.js';
import {
  validateLocate, validateRecommend, validateImageReq,
  validateScienceWest, validateScienceTcm, sanitizePoints, ApiError,
} from './lib/validators.js';
import { getOrGenerateImage, publicUrl } from './lib/image.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8790);
const MOCK = process.env.AI_MOCK === '1';
const PROMPT_DIR = path.join(__dirname, 'prompts');
const MOCK_DIR = path.join(__dirname, 'mocks');
const prompts = Object.fromEntries(
  ['recommend', 'locate', 'science_west', 'science_tcm', 'image_spec']
    .map((n) => [n, fs.readFileSync(path.join(PROMPT_DIR, `${n}.md`), 'utf8')]),
);
const mockJson = (n) => JSON.parse(fs.readFileSync(path.join(MOCK_DIR, `${n}.json`), 'utf8'));

// ---- http helpers ----
function send(res, status, obj, headers = {}) {
  const body = typeof obj === 'string' || Buffer.isBuffer(obj) ? obj : JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...headers });
  res.end(body);
}
const readBody = (req, limit = 12 * 1024 * 1024) => new Promise((resolve, reject) => {
  let size = 0; const chunks = [];
  req.on('data', (c) => { size += c.length; if (size > limit) reject(new ApiError(413, 'BAD_REQUEST', 'body too large')); else chunks.push(c); });
  req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch { reject(new ApiError(400, 'BAD_JSON', 'invalid JSON body')); } });
  req.on('error', reject);
});
const withTimeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new ApiError(504, 'UPSTREAM_TIMEOUT', 'upstream timeout')), ms));

// ---- route handlers ----
async function handleLocate(input) {
  validateLocate(input);
  if (MOCK) return mockJson('locate');
  const data = await Promise.race([
    vlLocateJSON(prompts.locate, { side: input.side, image: input.image, points: input.points }),
    withTimeout(30000),
  ]);
  validateLocate(input, data); // 复用校验：index 对齐 + region 合法
  return data;
}

async function handleRecommend(input) {
  if (!input || !Array.isArray(input.points)) throw new ApiError(400, 'BAD_REQUEST', 'points[] required');
  const points = sanitizePoints(input.points);
  if (MOCK) return mockJson('recommend');
  const sys = prompts.recommend.replace('{{IMAGE_SPEC}}', prompts.image_spec);
  const data = await Promise.race([
    chatJSON(sys, JSON.stringify({ points })),
    withTimeout(60000),
  ]);
  validateRecommend(data);
  // 内容稳定短哈希：同内容复用生图缓存，不同内容天然去重
  for (const group of ['sit', 'stand']) {
    for (const a of data[group]) {
      const h = crypto.createHash('sha1').update(JSON.stringify({ n: a.name, h: a.howto, d: a.dose })).digest('hex').slice(0, 4);
      a.slug = `${a.slug}-${h}`;
    }
  }
  return data;
}

async function handleActionImage(input) {
  validateImageReq(input);
  if (MOCK) return mockJson('action-image');
  const file = await Promise.race([
    getOrGenerateImage(input, (prompt, refPath, fidelity, prevStage) =>
      editImage({ prompt, refPath, fidelity, prevStage })),
    withTimeout(290000), // Wan2.5-I2I 实测 170s（短指令）~230s+（完整九段式长指令）
  ]);
  return { url: publicUrl(file) };
}

async function handleScience(input, kind) {
  if (!input || !Array.isArray(input.points)) throw new ApiError(400, 'BAD_REQUEST', 'points[] required');
  const points = sanitizePoints(input.points);
  if (MOCK) return mockJson(kind === 'west' ? 'science_west' : 'science_tcm');
  const data = await Promise.race([
    chatJSON(prompts[kind === 'west' ? 'science_west' : 'science_tcm'], JSON.stringify({ points })),
    withTimeout(45000),
  ]);
  if (kind === 'west') validateScienceWest(data); else validateScienceTcm(data);
  return data;
}

// ---- static for generated images ----
function serveGenerated(res, urlPath) {
  const name = path.basename(urlPath); // 防路径穿越
  const file = path.join(__dirname, 'cache', 'actions', name);
  if (!file.startsWith(path.join(__dirname, 'cache', 'actions')) || !fs.existsSync(file)) { send(res, 404, { error: { code: 'BAD_REQUEST', message: 'not found' } }); return; }
  res.writeHead(200, { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=31536000, immutable' });
  fs.createReadStream(file).pipe(res);
}

const ROUTES = {
  '/api/ai/locate': handleLocate,
  '/api/ai/recommend': handleRecommend,
  '/api/ai/action-image': handleActionImage,
  '/api/ai/science/west': (i) => handleScience(i, 'west'),
  '/api/ai/science/tcm': (i) => handleScience(i, 'tcm'),
};

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST' && !req.url.startsWith('/api/img/')) {
    send(res, 405, { error: { code: 'BAD_REQUEST', message: 'POST only' } }); return;
  }
  if (req.url.startsWith('/api/img/')) { serveGenerated(res, req.url); return; }
  const handler = ROUTES[req.url];
  if (!handler) { send(res, 404, { error: { code: 'BAD_REQUEST', message: 'unknown route' } }); return; }
  try {
    const input = await readBody(req);
    const out = await handler(input);
    send(res, 200, out);
  } catch (e) {
    if (e instanceof ApiError) send(res, e.status, { error: { code: e.code, message: e.message } });
    else { console.error('[relay]', e); send(res, 502, { error: { code: 'UPSTREAM_TIMEOUT', message: 'upstream failure' } }); }
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`ai-relay listening on 127.0.0.1:${PORT}  MOCK=${MOCK}`);
});
