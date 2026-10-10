// 基准图选择、T3 两阶段串联、成图落盘缓存、对外 URL。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ApiError } from './validators.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REF_DIR = path.join(__dirname, '..', 'assets', 'ref');
const CACHE_DIR = path.join(__dirname, '..', 'cache', 'actions');

function refPathFor(spec) {
  const suffix = spec.cropRef === 'upper_body' ? '__upper' : '';
  const file = path.join(REF_DIR, `${spec.basePosture}_${spec.view}${suffix}.png`);
  if (!fs.existsSync(file)) throw new ApiError(422, 'BAD_REQUEST', `reference image missing: ${path.basename(file)}`);
  return file;
}

export function publicUrl(file) {
  return `/api/img/actions/gen/${path.basename(file)}`; // 见 Caddy 重写规则
}
// 注：index.js 的静态服务匹配 /api/img/ 前缀；为与上面 URL 一致，Caddy 重写 /api/img/actions/gen/* 时保留前缀。
//    实际静态路由按 basename 取文件，目录固定为 cache/actions。

function stripWatermark(buf) {
  // TODO(M4): 平台水印后处理。两个候选：
  //  1) 引入 sharp 对右下角水印区做白底羽化覆盖（与离线 6 基准图同款手法）；
  //  2) 若万相支持关闭水印的参数则优先用参数。
  // 当前零依赖版本原样返回；prompt 的 NEGATIVE - APPEARANCE 已要求无水印。
  return buf;
}

export async function getOrGenerateImage(input, generate) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const final = path.join(CACHE_DIR, `${input.slug}.jpg`);
  if (fs.existsSync(final) && fs.statSync(final).size > 5000) return final; // 缓存命中不重复计费

  const refPath = refPathFor(input.imageSpec);

  let buf = await generate(input.prompt, refPath, input.imageSpec.fidelity, null);

  if (input.imageSpec.twoStage) {
    // T3：阶段一 low 打大形 → 落临时文件 → 阶段二 high 还原面部/服装
    const stage1 = path.join(CACHE_DIR, `${input.slug}.stage1.jpg`);
    fs.writeFileSync(stage1, buf);
    buf = await generate(input.imagePrompt, refPath, input.imageSpec.fidelity, stage1);
    fs.rmSync(stage1, { force: true });
  }

  fs.writeFileSync(final, stripWatermark(buf));
  return final;
}
