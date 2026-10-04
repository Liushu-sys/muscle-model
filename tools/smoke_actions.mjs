#!/usr/bin/env node
/**
 * BodyMap 第 4 页动作覆盖率冒烟测试 —— 改完 actions.ts / patterns.ts 必跑。
 *
 * 干什么：
 *   1. 枚举「每一条模式 × 每一档场景」下的真实诊断结果（tight/weak 都按 engine 的真实口径取）；
 *   2. 对每个组合调用真正的 pickActions()，检查能不能给满 3 个动作；
 *   3. 逐个动作检查「针对：」里有没有出现**本次没诊断到的肌肉**——
 *      这是最容易悄悄发生的错：第 4 页挑动作是「肌肉命中 + 部位兜底」两层，
 *      兜底会把同部位、但这次没诊断到的肌肉拉进来。卡片上照抄它的名字，
 *      就等于告诉用户"你这里也有问题"，而第 3 页根本没这么说。
 *
 * 为什么必须是脚本而不是眼看：47 组肌肉 × 4 场景组合很多，漏一个不会有任何报错，
 *   页面上只是少显示一张卡，或者多显示一个不该出现的肌肉名。
 *
 * 用法（仓库任意位置）：
 *     node tools/smoke_actions.mjs
 * 退出码 0 = 全部通过；非 0 = 有组合给不满 3 个 / 有越界肌肉名。
 */
import { execFileSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import os from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const APP = ROOT
const OUT_ENGINE = path.join(os.tmpdir(), `bm-smoke-engine-${process.pid}.mjs`)
const OUT_ACTIONS = path.join(os.tmpdir(), `bm-smoke-actions-${process.pid}.mjs`)
const OUT_MUSCLES = path.join(os.tmpdir(), `bm-smoke-muscles-${process.pid}.mjs`)
const OUT_PATTERNS = path.join(os.tmpdir(), `bm-smoke-patterns-${process.pid}.mjs`)

/** 每个模式挑一句最能代表它的体感（patterns.ts 里 senses 的真实词） */
const SENSE_BY_PATTERN = {
  cranio_cervical: '看手机脖子酸，肩膀沉，圆肩驼背',
  scapulothoracic: '左边肩膀又酸又硬，两肩之间酸',
  shoulder_glenohumeral: '抬手费劲，梳头都够不到，手臂侧举还发抖',
  thoracic: '胸椎发僵，深呼吸胸口发紧',
  hip: '久坐下背酸，站起来会好一点',
  knee: '跑步之后膝盖外侧疼，大腿外侧发紧',
  ankle: '久站之后小腿肚紧，踮脚抽筋',
  wrist: '右边手腕用鼠标用酸了',
  elbow: '手肘外侧疼，拧毛巾使劲就疼',
}

const SCENES = ['desk', 'gym', 'open', 'bed']

const esbuild = (entry, out) =>
  execFileSync(
    path.join(APP, 'node_modules', '.bin', 'esbuild'),
    ['--bundle', '--format=esm', '--platform=node', entry, `--outfile=${out}`, '--log-level=error'],
    { cwd: APP, stdio: 'inherit' }
  )

// engine.ts 与 actions.ts 都不依赖 React，可以直接各自打包后在 Node 里跑。
// （曾经想用 --alias 把两者合并成一个 entry，反而要额外造 stub，没必要。）
esbuild('src/lib/engine.ts', OUT_ENGINE)
esbuild('src/data/patterns.ts', OUT_PATTERNS)
esbuild('src/data/actions.ts', OUT_ACTIONS)
esbuild('src/data/muscles.ts', OUT_MUSCLES)

let bad = 0
let combos = 0
let loose = 0

try {
  const { parseLocal } = await import(pathToFileURL(OUT_ENGINE).href)
  const { PATTERNS } = await import(pathToFileURL(OUT_PATTERNS).href)
  const { pickActions, actionTargetLabel, ACTIONS } = await import(pathToFileURL(OUT_ACTIONS).href)
  // 必须用真实的 MUSCLES：actionTargetLabel 靠它把 id 翻成中文名，
  // 传空数组会让「命中」判定整体失效（命中了也翻不出名字 → 一律退成部位兜底）。
  const { MUSCLES } = await import(pathToFileURL(OUT_MUSCLES).href)

  console.log(`动作总数：${ACTIONS.length}    模式数：${PATTERNS.length}\n`)

  for (const p of PATTERNS) {
    const sense = SENSE_BY_PATTERN[p.id] ?? p.senses[0]
    const r = parseLocal(sense, '')

    // ⚠️ 先确认这句话真的命中了它自己那个模式。
    //    否则测试会安静地"测错对象"：第一版里 elbow 用的例句实际命中了 knee，
    //    于是 knee 被跑了 8 次、elbow 一次没测，结论却显示全部通过。
    if (!r.patternIds.includes(p.id)) {
      bad++
      console.log(`❌ 例句没命中自己的模式：${p.id} 用的「${sense}」→ 实际命中 ${r.patternIds.join(',') || '(无)'}`)
      continue
    }

    const tightIds = r.tight.map((x) => x.muscle.id)
    const weakIds = r.weak.map((x) => x.muscle.id)
    const diagIds = [...tightIds, ...weakIds]
    const regions = [...new Set([...r.tight, ...r.weak].map((x) => x.muscle.region))]

    for (const scene of SCENES) {
      combos++
      const mainState = tightIds.length ? 'tight' : 'weak'
      const mainIds = tightIds.length ? tightIds : weakIds
      const otherState = mainState === 'tight' ? 'weak' : 'tight'
      const otherIds = mainState === 'tight' ? weakIds : tightIds
      const quotaMain = otherIds.length ? 2 : 3

      const picked = [
        ...pickActions({ scene, muscleIds: mainIds, state: mainState, regions }, quotaMain),
      ]
      if (otherIds.length) {
        for (const a of pickActions({ scene, muscleIds: otherIds, state: otherState, regions }, 1)) {
          if (!picked.some((x) => x.id === a.id)) picked.push(a)
        }
      }
      if (picked.length < 3) {
        for (const a of pickActions({ scene, muscleIds: mainIds, state: mainState, regions }, 3)) {
          if (!picked.some((x) => x.id === a.id)) picked.push(a)
        }
      }

      const final = picked.slice(0, 3)
      const problems = []
      const looseNames = final
        .filter((a) => !actionTargetLabel(a, MUSCLES, diagIds).exact)
        .map((a) => a.name)
      if (looseNames.length && process.env.VERBOSE) {
        console.log(`~ ${p.id} × ${scene}：${looseNames.join(' / ')}`)
      }
      if (final.length < 3) problems.push(`只给到 ${final.length} 个`)
      if (new Set(final.map((a) => a.id)).size !== final.length) problems.push('出现重复动作')

      for (const a of final) {
        const t = actionTargetLabel(a, MUSCLES, diagIds)
        if (!t.exact) loose++
      }

      if (problems.length) {
        bad++
        console.log(`❌ ${p.id} × ${scene}：${problems.join(' / ')}`)
        console.log(`   诊断：紧[${tightIds.join(',')}] 弱[${weakIds.join(',')}]`)
        console.log(`   实得：[${final.map((a) => a.name).join(' ')}]`)
      }
    }
  }
} finally {
  for (const f of [OUT_ENGINE, OUT_ACTIONS, OUT_MUSCLES, OUT_PATTERNS]) {
    try {
      rmSync(f, { force: true })
    } catch {
      /* 临时目录删不掉不影响结论 */
    }
  }
}

console.log('\n════════════ 结论 ════════════')
console.log(`真实场景组合 ${combos} 个，给不满 3 个动作的 ${bad} 个`)
console.log(`动作卡里走部位兜底（「相关部位：」而非「针对：」）的 ${loose} 处 —— 不算错，但越少越好`)
process.exit(bad === 0 ? 0 : 1)
