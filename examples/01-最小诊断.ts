/**
 * 例 1 · 最小诊断：一句话进去，肌肉清单出来
 *
 * 跑：node --experimental-strip-types examples/01-最小诊断.ts
 *   （Node ≥ 22.6。老版本用 npx tsx examples/01-最小诊断.ts）
 *
 * 这是整个库最核心的一次调用：不需要网络、不需要 AI、不需要 React。
 */
import { parseLocal, hitRedFlag } from '../src/index.ts'

const inputs = [
  '看电脑两小时，左边肩膀又酸又硬',
  '久坐一天，腰直不起来，站起来会好一点',
  '跑步之后膝盖外侧疼',
  '踮脚就抽筋，久站小腿肚发紧',
]

for (const text of inputs) {
  // ⚠️ 红旗必须最先判。命中了就不要再给任何动作建议，直接引导就医。
  const red = hitRedFlag(text)
  if (red) {
    console.log(`\n「${text}」\n🚩 命中红旗词「${red}」——停止自我处理，建议就医`)
    continue
  }

  const r = parseLocal(text, '')
  console.log(`\n「${text}」`)
  console.log(`  命中模式：${r.patternIds.join('、') || '(没认出来)'}`)
  console.log(`  过劳(偏紧)：${r.tight.map((x) => x.muscle.name + (x.inferred ? '*' : '')).join('、') || '—'}`)
  console.log(`  过弱(无力)：${r.weak.map((x) => x.muscle.name + (x.inferred ? '*' : '')).join('、') || '—'}`)
  console.log(`  为什么会这样：${r.reason}`)
  console.log(`  依据：${r.citation}`)
}

console.log('\n* = 推断项（次要结论，图上用虚线画）')
