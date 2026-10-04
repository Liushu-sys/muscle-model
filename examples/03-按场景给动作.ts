/**
 * 例 3 · 按"你此刻在哪"给 3 个能做的动作（对应 App 的第 4 页）
 *
 * 跑：node --experimental-strip-types examples/03-按场景给动作.ts
 *
 * 场景只有 4 档，唯一来源是 SCENE_LABEL：
 *   desk 还在工位（走不开） / gym 有专业器械 / open 有活动场地 / bed 准备休息
 */
import {
  parseLocal, pickActions, actionTargetLabel,
  SCENE_LABEL, MUSCLES, type SceneId,
} from '../src/index.ts'

const r = parseLocal('看电脑两小时，左边肩膀又酸又硬', '')
const tightIds = r.tight.map((x) => x.muscle.id)
const weakIds = r.weak.map((x) => x.muscle.id)
const diagIds = [...tightIds, ...weakIds]
const regions = [...new Set([...r.tight, ...r.weak].map((x) => x.muscle.region))]

for (const scene of Object.keys(SCENE_LABEL) as SceneId[]) {
  const picked: string[] = []

  // 过劳组给 2 个（有弱组就只给 2，留 1 个名额给过弱）
  const quotaTight = weakIds.length ? 2 : 3
  for (const a of pickActions({ scene, muscleIds: tightIds, state: 'tight', regions }, quotaTight)) {
    picked.push(a.id)
  }
  // 过弱组给 1 个：光拉伸不补弱，过两天还会回来
  if (weakIds.length) {
    for (const a of pickActions({ scene, muscleIds: weakIds, state: 'weak', regions }, 1)) {
      if (!picked.includes(a.id)) picked.push(a.id)
    }
  }

  console.log(`\n【${SCENE_LABEL[scene]}】`)
  let i = 1
  for (const id of picked) {
    // 注意：真实使用时 pickActions 返回的是 Action 对象，这里为了演示去重才转 id
    const a = pickActions({ scene, muscleIds: tightIds, state: 'tight', regions }, 99)
      .concat(pickActions({ scene, muscleIds: weakIds, state: 'weak', regions }, 99))
      .find((x) => x.id === id)!
    const label = actionTargetLabel(a, MUSCLES, diagIds)
    console.log(`  ${i++}. ${a.name}`)
    console.log(`     ${a.howto}`)
    console.log(`     剂量：${a.dose}`)
    // label.text 已经自带前缀：命中时是「针对：某块肌肉」，
    // 没命中时诚实降级成「相关部位：xxx」——不冒充实测结论。
    console.log(`     ${label.exact ? '' : '⚠︎ '}${label.text}`)
  }
}
