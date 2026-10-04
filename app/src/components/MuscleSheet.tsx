/**
 * 肌肉详情 Sheet 内容：名称 + 状态标签 + 是什么 / 当前问题 / 建议方向。
 * 文案直接用肌肉库 buildExplainCard 组装，保证和引擎口径一致
 *（书原句 / 同群推断 / 常识判断的引用措辞由库统一处理）。
 */
import { buildExplainCard, type Muscle, type Pattern } from '@model/index'
import BottomSheet from './BottomSheet'

export type SheetState = 'tight' | 'weak' | 'neutral'

interface Props {
  open: boolean
  muscle: Muscle | null
  state: SheetState
  inferred: boolean
  pattern: Pattern | null
  onClose: () => void
}

const TAG: Record<SheetState, { text: string; cls: string }> = {
  tight: { text: '过劳 · 该放松拉伸', cls: 'bg-tight-tint text-tight-deep' },
  weak: { text: '过弱 · 该激活强化', cls: 'bg-weak-tint text-weak-deep' },
  neutral: { text: '暂未判定', cls: 'bg-[#EEF2F2] text-ink-2' },
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h4 className="mb-1 text-[13px] font-semibold text-ink-3">{title}</h4>
      <p className="text-[15px] leading-[1.65] text-ink">{body}</p>
    </div>
  )
}

export default function MuscleSheet({ open, muscle, state, inferred, pattern, onClose }: Props) {
  if (!muscle) return <BottomSheet open={open} onClose={onClose}>{null}</BottomSheet>

  const card = buildExplainCard(muscle, state, pattern)
  const tag = TAG[state]

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="max-h-[72%] overflow-y-auto scroll-hidden px-5 pb-[max(20px,calc(env(safe-area-inset-bottom)+14px))] pt-3">
        {/* 名称行 */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-[22px] font-bold tracking-tight">{muscle.name}</h3>
          <span className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold ${tag.cls}`}>
            {tag.text}
          </span>
        </div>

        <div className="space-y-4">
          <Section title="是什么" body={card.func} />
          <Section title="当前问题" body={card.problem} />
          <Section title="建议方向" body={card.advice} />
        </div>

        {inferred && (
          <p className="mt-4 rounded-xl bg-brand-tint px-3 py-2 text-[12px] leading-relaxed text-brand-deep">
            这条来自同群推断：书中该模式列出了它所在的肌群，但没有单独点名这块肌肉，图上以虚线显示。
          </p>
        )}
        {card.citation && (
          <p className="mt-3 text-[11.5px] leading-relaxed text-ink-3">{card.citation}</p>
        )}
      </div>
    </BottomSheet>
  )
}
