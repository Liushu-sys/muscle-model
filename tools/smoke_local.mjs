#!/usr/bin/env node
/**
 * BodyMap 本地引擎冒烟测试 —— 改完 patterns.ts 必跑。
 *
 * 干什么：真实调用 parseLocal()，打印每个体感输入会点亮哪些肌肉，
 *        并检查有没有「同一块肌肉被点亮两次」（主项 + 推断项重复）。
 *
 * 为什么必须有：patterns.ts 里 tight/weak 主项只取前 3、推断项只取 1（engine.ts
 *        slice(0,3) / slice(0,1)）。加新肌肉时放错层或排在 3 名开外，它会
 *        **永远不亮**，而且完全不报错。这个文件能把沉默的失效当场炸出来。
 *
 * 用法（仓库任意位置）：
 *     node tools/smoke_local.mjs
 */
import { execFileSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import os from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const APP = ROOT
// 打进系统临时目录：不污染仓库，也就不需要清理权限
const OUT = path.join(os.tmpdir(), `bm-smoke-engine-${process.pid}.mjs`)

// ── 重点盯这几块（改成你要验证的 id 即可）──────────────────
const TARGETS = {
  deltoid: '三角肌',
  soleus: '比目鱼肌',
  iliotibial_tract: '髂胫束',
}

const CASES = [
  ['抬手费劲，梳头都够不到，手臂侧举还发抖', ''],
  ['久站之后小腿肚紧，踮脚抽筋', ''],
  ['跑步之后膝盖外侧疼，大腿外侧发紧', ''],
  ['看手机脖子酸，肩膀沉，圆肩驼背', ''],
]

const fmt = (arr) =>
  arr
    .map((m) => (TARGETS[m.muscle.id] ? `★${TARGETS[m.muscle.id]}` : m.muscle.name) + (m.inferred ? '(推断)' : ''))
    .join('，') || '(无)'

execFileSync(
  path.join(APP, 'node_modules', '.bin', 'esbuild'),
  ['--bundle', '--format=esm', '--platform=node', 'src/lib/engine.ts', `--outfile=${OUT}`, '--log-level=error'],
  { cwd: APP, stdio: 'inherit' }
)

const OUT_PATTERNS = path.join(os.tmpdir(), `bm-smoke-local-patterns-${process.pid}.mjs`)

for (const [entry, out] of [
  ['src/lib/engine.ts', OUT],
  ['src/data/patterns.ts', OUT_PATTERNS],
]) {
  execFileSync(
    path.join(APP, 'node_modules', '.bin', 'esbuild'),
    ['--bundle', '--format=esm', '--platform=node', entry, `--outfile=${out}`, '--log-level=error'],
    { cwd: APP, stdio: 'inherit' }
  )
}

let found
let dupCount = 0
let selfBad = 0
try {
  const { parseLocal, matchPatterns } = await import(pathToFileURL(OUT).href)
  // PATTERNS 只从 patterns.ts 拿：engine.ts 只是 import 它，没有 re-export。
  const { PATTERNS } = await import(pathToFileURL(OUT_PATTERNS).href)
  found = new Set()

  for (const [input, scene] of CASES) {
    const r = parseLocal(input, scene)
    console.log('\n──────────────────────────────')
    console.log('输入：', input)
    console.log('命中模式：', r.patternIds.join(', ') || '(无)')
    console.log('偏紧：', fmt(r.tight))
    console.log('偏弱：', fmt(r.weak))

    const all = [...r.tight, ...r.weak].map((m) => m.muscle.id)
    for (const id of all) if (TARGETS[id]) found.add(id)
    const dup = all.filter((x, i) => all.indexOf(x) !== i)
    if (dup.length) dupCount++
  }

  console.log('\n════════ 目标肌肉是否被点亮 ════════')
  for (const [id, cn] of Object.entries(TARGETS)) console.log(`${found.has(id) ? '✅' : '❌'} ${cn} (${id})`)
  console.log(`\n点亮 ${found.size}/${Object.keys(TARGETS).length}，重复点亮用例 ${dupCount} 条`)

  /* ── 体感词自洽检查 ─────────────────────────────────────────────
   * 把 patterns.ts 里每一条 senses 原样喂回 matchPatterns()，看它认出来的
   * 是不是**它自己所属的模式**。词库是手写的，很容易出现"这条词跟别人家的词
   * 撞了两个汉字"，结果用户说肘疼、我们打开膝盖（实测发生过：手肘外侧疼 →
   * 命中 knee，因为和「跑步膝盖外侧疼」共用「外侧」「侧疼」，单字覆盖率只有 0.43）。
   * 这种错不会报错，只会安静地给出完全无关的诊断——所以每次改 patterns 都要跑。
   *
   * 判定标准是"进前二"而不是"必须第一"：有些词天生跨模式（「驼背」既是胸椎过度后凸
   * 也是圆肩体态，两个模式都有资格认它）。落到第二名只提示，不算失败——
   * 真正要拦的是"完全认到别人家去了"。
   */
  console.log('\n════════ 体感词自洽检查 ════════')
  let selfWarn = 0
  for (const p of PATTERNS) {
    for (const s of p.senses) {
      const rank = matchPatterns(s).findIndex((x) => x.id === p.id)
      if (rank < 0) {
        selfBad++
        console.log(`❌ 「${s}」属于 ${p.id}，前二名里没有它`)
      } else if (rank === 1) {
        selfWarn++
        console.log(`· 「${s}」属于 ${p.id}，被排在第 2（跨模式词，可接受）`)
      }
    }
  }
  console.log(
    (selfBad === 0 ? '✅ 每条体感词都指向自己的模式' : `共 ${selfBad} 条完全串味`)
    + (selfWarn ? `；${selfWarn} 条排在第 2` : '')
  )
} finally {
  for (const f of [OUT, OUT_PATTERNS]) {
    try {
      rmSync(f, { force: true })
    } catch {
      // 临时目录删不掉无所谓，不影响结果
    }
  }
}

process.exit(
  found.size === Object.keys(TARGETS).length && dupCount === 0 && selfBad === 0 ? 0 : 1
)
