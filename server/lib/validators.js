// 服务端白名单校验 —— 模型越界输出在这里被拦住（拦不住就重试/502 降级）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WL = JSON.parse(fs.readFileSync(path.join(__dirname, 'whitelist.json'), 'utf8'));

export class ApiError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
const bad = (m) => { throw new ApiError(422, 'BAD_JSON', m); };

const isStr = (v) => typeof v === 'string' && v.trim().length > 0;
const inEnum = (v, arr) => arr.includes(v);
const MAX_POINTS = 6;
const MAX_TEXT = 500;

export function sanitizePoints(points) {
  if (!Array.isArray(points) || points.length === 0) bad('points empty');
  if (points.length > MAX_POINTS) points = points.slice(0, MAX_POINTS);
  return points.map((p) => ({
    description: isStr(p.description) ? String(p.description).slice(0, 60) : '',
    muscleId: WL.muscles.includes(p.muscleId) ? p.muscleId : undefined,
    region: WL.regions.includes(p.region) ? p.region : undefined,
    feel: isStr(p.feel) ? String(p.feel).slice(0, 10) : undefined,
    freeText: isStr(p.freeText) ? String(p.freeText).slice(0, MAX_TEXT) : undefined,
  }));
}

// ---- /locate ----
export function validateLocate(input, output) {
  if (!output) {
    if (!inEnum(input.side, ['front', 'back'])) bad('side must be front|back');
    if (!isStr(input.image) || !input.image.startsWith('data:image/')) bad('image dataURL required');
    if (!Array.isArray(input.points) || input.points.length === 0) bad('points required');
    for (const p of input.points) {
      if (typeof p.index !== 'number' || typeof p.x !== 'number' || typeof p.y !== 'number') bad('point index/x/y required');
      if (p.muscleId && !WL.muscles.includes(p.muscleId)) bad(`unknown muscleId ${p.muscleId}`);
      if (p.region && !WL.regions.includes(p.region)) bad(`unknown region ${p.region}`);
    }
    return;
  }
  if (!output || !Array.isArray(output.results)) bad('locate: results[] required');
  if (output.results.length !== input.points.length) bad('locate: result count mismatch');
  for (const r of output.results) {
    if (!isStr(r.description) || r.description.length > 40) bad('locate: bad description');
    if (!['左', '右', '中'].includes(r.sideLabel)) bad('locate: bad sideLabel');
    if (r.region && !WL.regions.includes(r.region)) bad(`locate: unknown region ${r.region}`);
    if (/诊断|确诊|炎症|骨折|神经损伤|治愈/.test(r.description)) bad('locate: diagnostic word leaked');
  }
}

// ---- /recommend ----
const KINDS = ['stretch', 'activate', 'mobilize', 'release'];
const PROPS = ['chair', 'table', 'towel'];
const FORBIDDEN_HINT = /(跪|躺|卧|趴|跳|跃|倒立|弹震|环绕脖子|颈部绕环|他人协助|负重|哑铃|弹力带)/;

function validateRhythm(r) {
  if (!r || typeof r !== 'object') bad('action.rhythm required');
  if (r.mode === 'reps') {
    if (!Number.isInteger(r.count) || r.count < 1 || r.count > 30) bad('rhythm.count out of range');
  } else if (r.mode === 'hold') {
    if (!Number.isInteger(r.holdSec) || r.holdSec < 3 || r.holdSec > 120) bad('rhythm.holdSec out of range');
  } else bad('rhythm.mode must be reps|hold');
}
function validateImageSpec(s) {
  if (!s || typeof s !== 'object') bad('imageSpec required');
  if (!inEnum(s.view, ['front', 'side', 'back'])) bad('imageSpec.view');
  if (!inEnum(s.basePosture, ['sit', 'stand'])) bad('imageSpec.basePosture');
  if (!inEnum(s.tier, ['T1', 'T2', 'T3'])) bad('imageSpec.tier');
  if (!inEnum(s.fidelity, ['medium', 'low', 'high'])) bad('imageSpec.fidelity');
  if (typeof s.twoStage !== 'boolean') bad('imageSpec.twoStage');
  if (!inEnum(s.cropRef, ['full', 'upper_body'])) bad('imageSpec.cropRef');
  if (!Array.isArray(s.props) || s.props.some((p) => !PROPS.includes(p))) bad('imageSpec.props');
  if (typeof s.bareFoot !== 'boolean') bad('imageSpec.bareFoot');
  // 档位一致性硬校验（实测结论：T1 不允许 high；T3 必须 low+twoStage）
  if (s.tier === 'T1' && s.fidelity !== 'medium') bad('T1 must use medium fidelity');
  if (s.tier === 'T3' && !(s.fidelity === 'low' && s.twoStage)) bad('T3 must use low + twoStage');
}
function validateAction(a) {
  if (!a || typeof a !== 'object') bad('action required');
  if (!isStr(a.slug) || !/^[a-z0-9][a-z0-9-]{2,60}$/.test(a.slug)) bad('bad slug');
  for (const k of ['name', 'targetMuscle', 'dose', 'why', 'caution', 'imagePrompt']) {
    if (!isStr(a[k])) bad(`action.${k} required`);
  }
  if (!inEnum(a.kind, KINDS)) bad('action.kind');
  if (!Array.isArray(a.howto) || a.howto.length < 1 || a.howto.length > 8 || a.howto.some((s) => !isStr(s))) bad('action.howto must be string[]');
  validateRhythm(a.rhythm);
  validateImageSpec(a.imageSpec);
  if (a.imagePrompt.length < 200 || !/^GOAL:/.test(a.imagePrompt)) bad('imagePrompt must be full 9-section english prompt');
  const blob = `${a.name}${a.howto.join('')}${a.dose}`;
  if (FORBIDDEN_HINT.test(blob)) bad('forbidden action content (posture/equipment)');
}
export function validateRecommend(out) {
  if (!out || !Array.isArray(out.sit) || !Array.isArray(out.stand)) bad('{sit:[],stand:[]} required');
  if (out.sit.length > 3 || out.stand.length > 3) bad('max 3 actions per group');
  const seen = new Set();
  for (const group of ['sit', 'stand']) {
    for (const a of out[group]) {
      validateAction(a);
      if (seen.has(a.slug)) bad(`duplicate slug ${a.slug}`);
      seen.add(a.slug);
      if (a.imageSpec.basePosture !== (group === 'sit' ? 'sit' : 'stand')) bad('basePosture must match group');
    }
  }
  if (seen.size === 0) bad('at least one action required');
}

// ---- /action-image ----
export function validateImageReq(input) {
  if (!isStr(input.slug) || !/^[a-z0-9][a-z0-9-]{2,60}$/.test(input.slug)) bad('slug required');
  validateImageSpec(input.imageSpec);
  if (!isStr(input.prompt) || input.prompt.length < 200) bad('prompt required');
}

// ---- /science ----
export function validateScienceWest(out) {
  if (!out || !isStr(out.summary) || !Array.isArray(out.muscles)) bad('west: summary + muscles[]');
  if (out.muscles.length > 3) bad('max 3 muscles');
  for (const m of out.muscles) {
    if (!WL.muscles.includes(m.id)) bad(`unknown muscle id ${m.id}`);
    for (const k of ['name', 'func', 'cause', 'note']) if (!isStr(m[k])) bad(`muscle.${k} required`);
  }
}
export function validateScienceTcm(out) {
  if (!out || !isStr(out.summary) || !Array.isArray(out.meridians) || !Array.isArray(out.acupoints)) bad('tcm shape');
  if (out.meridians.length > 2) bad('max 2 meridians');
  if (out.acupoints.length > 3) bad('max 3 acupoints');
  for (const m of out.meridians) {
    if (!WL.meridians.includes(m.id)) bad(`unknown meridian id ${m.id}`);
    for (const k of ['name', 'route', 'mechanism']) if (!isStr(m[k])) bad(`meridian.${k} required`);
  }
  for (const a of out.acupoints) {
    if (!WL.acupoints.includes(a.id)) bad(`unknown acupoint id ${a.id}`);
    for (const k of ['name', 'meridian', 'location', 'benefit', 'mechanism']) if (!isStr(a[k])) bad(`acupoint.${k} required`);
  }
}
