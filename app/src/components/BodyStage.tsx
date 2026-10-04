/**
 * 人体图舞台：浮动卡片，把外部 UI 通过 slot 浮在 SVG 之上。
 *
 * slots:
 *   topLeft      — 已选计数等（absolute top-4 left-4）
 *   topRight     — 正反面切换等（absolute top-4 right-4）
 *   bottomCenter — 小提示文字等（absolute bottom-3 left-1/2 -translate-x-1/2）
 */
import BodyMap, {
  type BodyView,
  type MusclePaint,
  type ScreenSide,
} from '@model/react'
import type { ReactNode } from 'react'

interface Props {
  view: BodyView
  paints: Record<string, MusclePaint>
  clickableIdle?: boolean
  onPick?: (muscleId: string, bodySide: ScreenSide) => void
  topLeft?: ReactNode
  topRight?: ReactNode
  bottomCenter?: ReactNode
}

export default function BodyStage({
  view,
  paints,
  clickableIdle,
  onPick,
  topLeft,
  topRight,
  bottomCenter,
}: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-black/[0.03] bg-gradient-to-b from-[#F2F8F7] to-[#EAF3F1] shadow-card">
      {/* 角落柔光 */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-mint/40 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-brand-tint/70 blur-2xl" />

      {/* SVG */}
      <div className="absolute inset-0 flex items-center justify-center px-4 py-2">
        <BodyMap
          view={view}
          mode="diagnose"
          paints={paints}
          clickableIdle={clickableIdle}
          onPick={onPick}
        />
      </div>

      {/* 浮层 UI */}
      {topLeft && (
        <div className="absolute left-3 top-3 z-10">{topLeft}</div>
      )}
      {topRight && (
        <div className="absolute right-3 top-3 z-10">{topRight}</div>
      )}
      {bottomCenter && (
        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">{bottomCenter}</div>
      )}
    </div>
  )
}
