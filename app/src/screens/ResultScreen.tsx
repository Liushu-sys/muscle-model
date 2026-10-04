/**
 * 页面 2 · 诊断结果页
 * AI 摘要 → 图例 → 红蓝着色的人体图 → 点肌肉弹 Sheet
 */
import { useMemo, useState } from 'react'
import { MUSCLE_MAP } from '@model/index'
import type { BodyView, MusclePaint } from '@model/react'
import BodyStage from '../components/BodyStage'
import ViewSwitch from '../components/ViewSwitch'
import MuscleSheet, { type SheetState } from '../components/MuscleSheet'
import type { Diagnosis } from '../lib/diagnose'

interface Props {
  diagnosis: Diagnosis
  onBack: () => void
}

interface SheetTarget {
  id: string
  state: SheetState
  inferred: boolean
}

export default function ResultScreen({ diagnosis, onBack }: Props) {
  const { result, neutralIds, redFlag } = diagnosis
  const [view, setView] = useState<BodyView>('front')
  const [target, setTarget] = useState<SheetTarget | null>(null)

  const tightMap = useMemo(() => new Map(result.tight.map((x) => [x.muscle.id, x])), [result])
  const weakMap = useMemo(() => new Map(result.weak.map((x) => [x.muscle.id, x])), [result])

  // 过劳红 / 过弱蓝 / 未判定灰，虚线 = 推断项
  const paints: Record<string, MusclePaint> = {}
  if (!redFlag) {
    for (const x of result.tight) {
      paints[x.muscle.id] = {
        fill: '#F0584F',
        stroke: '#D8403A',
        dashed: x.inferred,
      }
    }
    for (const x of result.weak) {
      paints[x.muscle.id] = {
        fill: '#3D7DE8',
        stroke: '#2E66C8',
        dashed: x.inferred,
      }
    }
  }
  for (const id of neutralIds) {
    paints[id] = { fill: '#C9D3D4', stroke: '#A9BBBE' }
  }

  const handlePick = (id: string) => {
    const t = tightMap.get(id)
    const w = weakMap.get(id)
    if (t) setTarget({ id, state: 'tight', inferred: t.inferred })
    else if (w) setTarget({ id, state: 'weak', inferred: w.inferred })
    else setTarget({ id, state: 'neutral', inferred: false })
  }

  const tightN = result.tight.length
  const weakN = result.weak.length

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 导航栏 */}
      <div className="relative flex h-11 shrink-0 items-center justify-center pt-safe">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-2 top-safe flex h-11 items-center gap-0.5 pl-2 pr-3 text-[16px] font-medium text-brand active:text-brand-deep no-tap-highlight"
        >
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
            <path
              d="M9.5 1.5L2 10l7.5 8.5"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          返回
        </button>
        <h2 className="text-[17px] font-semibold">诊断结果</h2>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scroll-hidden px-5 pb-6 pt-2">
        {/* AI 摘要 */}
        <div className="rounded-2xl border border-black/[0.03] bg-white p-4 shadow-card">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-tint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3z"
                  fill="#4198AC"
                />
                <path d="M19 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" fill="#7BC0CD" />
              </svg>
            </span>
            <span className="text-[13px] font-semibold text-brand-deep">AI 摘要</span>
          </div>

          {redFlag ? (
            <p className="text-[14.5px] leading-[1.7] text-ink">
              你的描述中出现了
              <span className="font-semibold text-tight">「{redFlag}」</span>
              ，这类信号可能不只是肌肉劳损。先不要自行拉伸或按压，
              <span className="font-semibold text-tight">建议尽快就医或找康复治疗师当面评估</span>
              ；下图保留你选择的位置，供描述病情时参考。
            </p>
          ) : result.outOfScope ? (
            <p className="text-[14.5px] leading-[1.7] text-ink">
              根据你的描述和标记，暂时没有匹配到明确的劳损模式，已保留你选择的位置（灰色）。
              可以返回上一页把感受写得更具体一些，比如「看电脑两小时，左侧肩膀又酸又硬」。
            </p>
          ) : (
            <p className="text-[14.5px] leading-[1.7] text-ink">{result.reason}</p>
          )}
        </div>

        {/* 图例 */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-1">
          <LegendDot color="#F0584F" label="过劳" count={redFlag ? undefined : tightN} />
          <LegendDot color="#3D7DE8" label="过弱" count={redFlag ? undefined : weakN} />
          <LegendDot color="#C9D3D4" label="暂未判定" count={neutralIds.length || undefined} />
          <span className="ml-auto text-[11.5px] text-ink-3">虚线 = 同群推断</span>
        </div>

        {/* 人体图 */}
        <div className="mt-3 h-[48vh] min-h-[320px]">
          <BodyStage view={view} paints={paints} clickableIdle onPick={handlePick} />
        </div>

        <div className="mb-2 mt-3 flex items-center justify-between">
          <p className="text-[12px] text-ink-3">轻点任意肌肉，查看它是什么、怎么了、怎么办</p>
          <ViewSwitch value={view} onChange={setView} />
        </div>
      </div>

      <MuscleSheet
        open={target !== null}
        muscle={target ? MUSCLE_MAP[target.id] ?? null : null}
        state={target?.state ?? 'neutral'}
        inferred={target?.inferred ?? false}
        pattern={result.pattern ?? null}
        onClose={() => setTarget(null)}
      />
    </div>
  )
}

function LegendDot({ color, label, count }: { color: string; label: string; count?: number }) {
  return (
    <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink-2">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
      {count !== undefined && <span className="text-ink-3">{count}</span>}
    </span>
  )
}
