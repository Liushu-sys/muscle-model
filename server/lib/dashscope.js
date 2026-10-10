// provider.js — 模型调用封装，支持 AI Ping（主）与 DashScope（备）。
// AI Ping: OpenAI 兼容协议，base_url=https://aiping.cn/api/v1，一个 key 调 600+ 模型。
// DashScope: 阿里云百炼，仅作 fallback（环境变量 PROVIDER=dashscope 切换）。
// 图像编辑：AI Ping 走 OpenAI /v1/images/edits 兼容端点（待 M4 确认 Wan/即梦确切参数）。
import fs from 'node:fs';

const PROVIDER = process.env.AI_PROVIDER || 'aiping'; // aiping | dashscope
const KEY = process.env.DASHSCOPE_API_KEY || process.env.AI_PING_API_KEY || '';

// AI Ping 配置
const AIPING_BASE = process.env.AIPING_BASE || 'https://aiping.cn/api/v1';
const AIPING_CHAT = process.env.CHAT_MODEL || 'qwen-plus';
const AIPING_VL = process.env.VL_MODEL || 'qwen-vl-max';
const AIPING_IMG = process.env.IMG_MODEL || 'wanx2.1-imageedit'; // TODO(M4): 核对 AI Ping 中 Wan 图像编辑模型确切 id

// DashScope 配置（fallback）
const DS_BASE = process.env.DASHSCOPE_BASE || 'https://dashscope.aliyuncs.com';
const DS_CHAT = 'qwen-plus';
const DS_VL = 'qwen-vl-max';
const DS_IMG = 'wanx2.1-imageedit';

const MAX_RETRY = 2;

const cfg = PROVIDER === 'dashscope'
  ? { base: DS_BASE, chat: DS_CHAT, vl: DS_VL, img: DS_IMG, isDashscope: true }
  : { base: AIPING_BASE, chat: AIPING_CHAT, vl: AIPING_VL, img: AIPING_IMG, isDashscope: false };

function requireKey() {
  if (!KEY) { const e = new Error('API KEY missing (set DASHSCOPE_API_KEY or AI_PING_API_KEY)'); e.code = 'NO_KEY'; throw e; }
}
async function postJson(url, body, headers = {}) {
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`upstream ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return r.json();
}
async function withRetry(fn) {
  let last;
  for (let i = 0; i <= MAX_RETRY; i++) {
    try { return await fn(); } catch (e) { last = e; }
  }
  throw last;
}
function extractJSON(text) {
  if (!text) throw new Error('empty model content');
  const fenced = text.match(/```json\s*([\s\S]*?)```/) || text.match(/```\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  return JSON.parse(raw.trim());
}

// ---- 文本：强制 JSON ----
export async function chatJSON(systemPrompt, userText) {
  requireKey();
  return withRetry(async () => {
    const url = cfg.isDashscope
      ? `${DS_BASE}/compatible-mode/v1/chat/completions`
      : `${AIPING_BASE}/chat/completions`;
    const j = await postJson(url, {
      model: cfg.chat,
      response_format: { type: 'json_object' },
      temperature: 0.4,
      enable_thinking: false, // AI Ping: GLM-5.2 混合思考模型必须显式关闭，否则大 JSON 生成超时
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userText },
      ],
    });
    return extractJSON(j.choices?.[0]?.message?.content);
  });
}

// ---- 视觉：图片(dataURL)+红点坐标 -> 定位 JSON ----
export async function vlLocateJSON(systemPrompt, { side, image, points }) {
  requireKey();
  return withRetry(async () => {
    const userText = `人体当前为${side === 'front' ? '正面' : '背面'}。红点已直接画在图上。点的元数据：${JSON.stringify(points)}。按契约只输出 JSON。`;
    const url = cfg.isDashscope
      ? `${DS_BASE}/compatible-mode/v1/chat/completions`
      : `${AIPING_BASE}/chat/completions`;
    const j = await postJson(url, {
      model: cfg.vl,
      response_format: { type: 'json_object' },
      enable_thinking: false, // 对支持关闭思考的模型生效；GLM-5.3-Flash 会忽略（思考焊死）
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: image } },
          { type: 'text', text: `${systemPrompt}\n\n${userText}` },
        ],
      }],
    });
    return extractJSON(j.choices?.[0]?.message?.content);
  });
}

// ---- 图像编辑：参考主体生图 ----
// AI Ping: OpenAI 兼容 /v1/images/edits（同步返回 URL）
// DashScope: 异步任务端点（提交 → 轮询）
// prevStage 存在时为 T3 第二阶段：以阶段一产物为参考，high 还原身份。
export async function editImage({ prompt, refPath, fidelity, prevStage }) {
  requireKey();
  const targetPath = prevStage || refPath;
  const refB64 = fs.readFileSync(targetPath).toString('base64');
  const dataURL = `data:image/png;base64,${refB64}`;

  if (cfg.isDashscope) {
    return editImageDashscope({ prompt, dataURL, fidelity, prevStage });
  }
  return editImageAiping({ prompt, dataURL, fidelity, prevStage });
}

// AI Ping: OpenAI 兼容 images/edits（2026-10-10 实测通：Wan2.5-I2I-Preview，
// 载荷 {model, prompt, image:dataURL, n:1}，同步返回 data[0].url，耗时约 170s）
async function editImageAiping({ prompt, dataURL, fidelity: _fidelity, prevStage }) {
  const body = { model: cfg.img, prompt, image: dataURL, n: 1 };
  // input_fidelity 待后台验证通过后再启用（T3 两阶段修脸依赖它）
  if (prevStage) body.input_fidelity = 'high';
  return withRetry(async () => {
    const j = await postJson(`${AIPING_BASE}/images/edits`, body);
    const d = j.data?.[0];
    if (d?.b64_json) return Buffer.from(d.b64_json, 'base64');
    if (d?.url) {
      const r = await fetch(d.url);
      if (!r.ok) throw new Error('image download failed');
      return Buffer.from(await r.arrayBuffer());
    }
    throw new Error('aiping: no image in response');
  });
}

// DashScope fallback: 异步任务
async function editImageDashscope({ prompt, dataURL, fidelity, prevStage }) {
  const submit = await postJson(
    `${DS_BASE}/api/v1/services/aigc/image2image/image-synthesis`,
    {
      model: DS_IMG,
      input: { prompt, image: dataURL },
      parameters: { input_fidelity: prevStage ? 'high' : fidelity, n: 1 },
    },
    { 'X-DashScope-Async': 'enable' },
  );
  const taskId = submit.output?.task_id;
  if (!taskId) throw new Error('wanx: no task_id');

  const deadline = Date.now() + 65000;
  let result;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 2000));
    const t = await fetch(`${DS_BASE}/api/v1/tasks/${taskId}`, { headers: { Authorization: `Bearer ${KEY}` } }).then((r) => r.json());
    const status = t.output?.task_status;
    if (status === 'SUCCEEDED') { result = t.output; break; }
    if (status === 'FAILED' || status === 'UNKNOWN') throw new Error(`wanx task ${status}: ${t.output?.message || ''}`);
  }
  if (!result) throw new Error('wanx task timeout');

  const imgUrl = result.results?.[0]?.url || result.url;
  if (!imgUrl) throw new Error('wanx: no result url');
  const r = await fetch(imgUrl);
  if (!r.ok) throw new Error('wanx image download failed');
  return Buffer.from(await r.arrayBuffer());
}
