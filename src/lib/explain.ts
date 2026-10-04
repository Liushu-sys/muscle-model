/**
 * 第 3 页解释卡的内容组装。
 *
 * 卡片固定四段（产品定的）：
 *   ① 肌肉名称 + 功能   ② 当前这块肌肉的问题   ③ 为什么会这样   ④ 建议方向
 *
 * 为什么是"推导"而不是手写 47×4 段：
 *   47 块肌肉 × 4 段 = 188 段文案，手写写不完；而其中「功能」其实已经写在
 *   muscles.ts 的 desc 里，「为什么会这样」就是命中模式在书里的成因注释。
 *   这里把它们组装起来，只补状态相关的那几句。
 *
 * ⚠️ 依据来源要诚实：bookNote='clinic' / 'infer' 的肌肉不能说成"书上讲"。
 *
 * ⚠️ 判定"书里有没有点名这块肌肉"必须看 pattern.tight / pattern.weak，
 *    而不是 muscles.ts 的 bookNote —— 书是按「模式」列肌肉名的：
 *    菱形肌在肩胛胸壁模式（p.89）是原句列名，但它并不在颅颈区模式里。
 *    只按 bookNote 判断会把原句列名说成"同群推断"，等于把书里的依据说没了。
 */

import type { Muscle, Region } from '../data/muscles'
import type { Pattern } from '../data/patterns'

export type CardState = 'tight' | 'weak' | 'neutral'

export interface ExplainCard {
  id: string
  name: string
  state: CardState
  /** ① 是什么 + 功能 */
  func: string
  /** ② 当前问题 */
  problem: string
  /** ③ 为什么会这样 */
  cause: string
  /** ④ 建议方向（简要，不写具体动作量） */
  advice: string
  citation?: string
}

/** 各部位的常见成因兜底文案（书里那条模式没有注释时用） */
const CAUSE_BY_REGION: Record<Region, string> = {
  neck_shoulder: '长时间低头看屏幕、头往前伸的姿势，会让这一片持续低强度收缩。',
  upper_back: '手臂长期在身体前面做事（打字、开车、看手机），肩胛被往前拉，这一片就被拉长又得干活。',
  low_back_hip: '久坐让髋前侧缩短、核心不参加工作，负荷就转嫁到这一片。',
  leg: '久坐让下肢长时间不收缩，加上走路或跑步的模式比较单一。',
  arm: '手腕和手指长时间重复精细动作，肌肉一直处在低强度收缩里。',
}

export function buildExplainCard(
  m: Muscle,
  state: CardState,
  pattern?: Pattern | null
): ExplainCard {
  const problem =
    state === 'tight'
      ? '现在偏紧（过劳）：它一直处在缩短、绷着的状态，所以会发酸发硬，活动到某个角度就卡住。'
      : state === 'weak'
        ? '现在偏弱（过弱）：它本来该发力的时候使不上劲，于是别的肌肉替它干活，替的那块就跟着酸。'
        : '这次判定的模式没有覆盖到这块肌肉——你标记了它，但我们没有依据判断它是紧还是弱。'

  const cause = pattern?.note
    ? pattern.note
    : CAUSE_BY_REGION[m.region]

  const advice =
    state === 'tight'
      ? '方向是松解 + 拉伸：先让它松开，再把缩短的长度拉回来。别一上来就用力按到疼，那会让它更缩。'
      : state === 'weak'
        ? '方向是激活 + 强化：让它重新学会发力。拉伸解决不了"没力气"的问题，反而可能更松。'
        : '可以先按你标记的位置整体放松一下，等下次描述得更具体一些再看它。'

  // 引用：按「模式」判断书里有没有点名，而不是按 muscles.ts 的 bookNote。
  // 同一个 id 在不同模式下依据等级不同，这才是准确的口径。
  const page = pattern?.bookPage ?? m.bookPage
  const namedInBook = Boolean(pattern && (pattern.tight.includes(m.id) || pattern.weak.includes(m.id)))
  const inferred = Boolean(
    pattern && (pattern.inferredTight?.includes(m.id) || pattern.inferredWeak?.includes(m.id))
  )
  const cite = !page
    ? undefined
    : namedInBook
      ? `依据《基础肌动学》第4版 p.${page}「关节受限的常见模式」原句列出`
      : inferred
        ? `参考《基础肌动学》第4版 p.${page}（该处列的是它所在的肌群，这块属同群推断）`
        : `《基础肌动学》第4版 p.${page} 未涉及这块肌肉，此处按解剖与常见做法判断`

  return { id: m.id, name: m.name, state, func: m.desc, problem, cause, advice, citation: cite }
}
