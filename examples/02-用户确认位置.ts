/**
 * 例 2 · 用户确认位置后重算（对应 App 的第 2 页 → 第 3 页）
 *
 * 跑：node --experimental-strip-types examples/02-用户确认位置.ts
 *
 * 这一步的作用是**收窄**，不是"用户点什么我们就判什么"：
 *   点掉一块 = 告诉引擎"这块不算"（否决）
 *   补点一块 = 给所属模式加分
 * 判定权始终在 9 条模式手里，用户只能在模式已经给出的候选里增删。
 * 这样设计是为了保住「同一块肌肉在不同模式下角色相反」这个事实
 *（比如腘绳肌：膝模式是紧张，髋模式是肌力减弱）。
 */
import { parseLocal } from '../src/index.ts'

// 这条主诉会同时擦到「颅颈区」和「肩胛胸壁」两个模式，
// 正好用来演示：点掉一块肌肉会怎样改变最终结论。
const input = '看手机脖子酸，头往前探，肩膀沉'

// 第一次：引擎自己猜
const guess = parseLocal(input, '')
const guessIds = [...guess.tight, ...guess.weak].map((x) => x.muscle.id)
console.log('引擎初判：')
console.log('  命中模式：', guess.patternIds.join('、'))
console.log('  过劳：', guess.tight.map((x) => x.muscle.name).join('、') || '—')
console.log('  过弱：', guess.weak.map((x) => x.muscle.name).join('、') || '—')

// 用户在图上把「胸锁乳突肌」点掉了（它在过劳组里）
const dropped = ['sternocleidomastoid']
const choice = {
  kept: guessIds.filter((id) => !dropped.includes(id)), // 保留的
  added: [] as string[],                                 // 这次没额外补点
  dropped,                                               // 被否掉的
}

const refined = parseLocal(input, '', choice)
console.log('\n用户点掉「胸锁乳突肌」之后重算：')
console.log('  命中模式：', refined.patternIds.join('、') || '(全部落空)')
console.log('  过劳：', refined.tight.map((x) => x.muscle.name).join('、') || '—')
console.log('  过弱：', refined.weak.map((x) => x.muscle.name).join('、') || '—')
console.log('  已被排除：', (refined.vetoed ?? []).join('、') || '—')

// 用户补点了一块引擎没判的肌肉（比如他觉得髂胫束也紧）
const added = parseLocal(input, '', { kept: [], added: ['iliotibial_tract'], dropped: [] })
console.log('\n用户额外补点一块不相干的「髂胫束」：')
console.log('  过劳：', added.tight.map((x) => x.muscle.name).join('、') || '—')
console.log('  中性标记（不判过劳/过弱，只承认你点了）：',
  (added.marks ?? []).map((m) => m.name).join('、') || '—')

console.log('\n注意最后一条：补点不会污染诊断，它只进 marks（第 3 页画成灰色）。')
console.log('这是刻意的——"你觉得"不等于"我们判"，判定权不能交给用户。')
