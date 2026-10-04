/**
 * BodyMap 人体矢量图
 *
 * 数据源：assets/body_sides.json（由 tools/gen_body_sides.py 从 body_paths.json 派生）
 *  - 40 组肌肉天然左右分离，直接按侧渲染
 *  - 9 组横跨脊柱（斜方肌、背阔肌、竖脊肌…），左右两份都放完整路径，靠 clipPath 裁开
 *
 * 两种着色模式：
 *  - diagnose：红=过劳 / 蓝=过弱，由第 3 页的诊断结果驱动
 *  - confirm ：橙色描边的中性选中色，由用户在第 2 页点选驱动
 *    刻意不用红蓝：第 2 页选的是"位置"，不是"这块肌肉紧还是弱"，
 *    颜色语义要留给第 3 页，否则用户会困惑"刚才都是红的怎么现在一红一蓝"。
 *
 * ⚠️ 左右是解剖口径：正面图屏幕左=身体右侧，背面图屏幕左=身体左侧。
 *    组件内部统一用 screenSide 画，对外暴露 bodySide，转换在这两个函数里。
 */
import { useId, useMemo } from 'react'
import sidesData from '../assets/body_sides.json'
import { MUSCLES } from '../data/muscles'

export type BodyView = 'front' | 'back'
/** 屏幕上的左右 */
export type ScreenSide = 'left' | 'right'
/** 用户说的身体左右 */
export type BodySide = 'left' | 'right' | 'both'

interface SideShape {
  d: string
  cx: number
  cy: number
}
interface GroupShape {
  needsClip: boolean
  left: SideShape
  right: SideShape
}
interface SidesData {
  viewBox: number[]
  midline: number
  outline: Record<BodyView, string>
  front: Record<string, GroupShape>
  back: Record<string, GroupShape>
}

const SIDES = sidesData as unknown as SidesData

/** 屏幕左 ↔ 身体侧 的转换（自反：调用两次回到原值） */
export function screenToBody(view: BodyView, s: ScreenSide): ScreenSide {
  return view === 'front' ? (s === 'left' ? 'right' : 'left') : s
}
export function bodyToScreen(view: BodyView, b: ScreenSide): ScreenSide {
  return screenToBody(view, b)
}

export const IDLE_FILL = '#F6F0E9'
export const IDLE_STROKE = '#E3D5C8'
export const SELECT_FILL = '#F7E2D4'
export const SELECT_STROKE = '#D97757'
export const TIGHT_FILL = '#E0703F'
export const WEAK_FILL = '#5578A8'

export type MusclePaint = {
  fill: string
  stroke?: string
  /** 虚线 = 推断项（次要结论） */
  dashed?: boolean
  /** 变淡 = 用户没确认的 */
  faded?: boolean
  /**
   * 只在身体的哪一侧着色。两侧都画出来，但只有这一侧上色——
   * 这样"左侧斜方肌"能精确表达，图上也不会只剩半个人。
   */
  sides?: BodySide
}

export interface BodyMapProps {
  view: BodyView
  mode: 'diagnose' | 'confirm'
  /** 肌肉 id → 怎么画。不在表里的按"未命中"画 */
  paints?: Record<string, MusclePaint>
  /** 只画哪一侧。both = 两侧都画 */
  sideFilter?: BodySide
  /** 未命中的肌肉是否也能点（第 2 页要能手动加选） */
  clickableIdle?: boolean
  activeId?: string | null
  onPick?: (muscleId: string, bodySide: ScreenSide) => void
}

export default function BodyMap({
  view, mode, paints = {}, sideFilter = 'both',
  clickableIdle = false, activeId = null, onPick,
}: BodyMapProps) {
  const uid = useId().replace(/:/g, '')
  const clipL = `bm-l-${uid}`
  const clipR = `bm-r-${uid}`

  const { outline, groups, W, H, MID } = useMemo(() => {
    const d = SIDES
    return {
      outline: d.outline[view],
      groups: d[view],
      W: d.viewBox[0],
      H: d.viewBox[1],
      MID: d.midline,
    }
  }, [view])

  const nameOf = useMemo(
    () => Object.fromEntries(MUSCLES.map((m) => [m.id, m.name])),
    []
  )

  // 要画的屏幕侧
  const drawSides: ScreenSide[] =
    sideFilter === 'both' ? ['left', 'right'] : [bodyToScreen(view, sideFilter as ScreenSide)]

  const entries = Object.entries(groups)

  /** 这一侧要不要上色：paints 存在，且没限定侧别或限定到了这一侧 */
  const isPainted = (id: string, screenSide: ScreenSide) => {
    const p = paints[id]
    if (!p) return false
    if (!p.sides || p.sides === 'both') return true
    return p.sides === screenToBody(view, screenSide)
  }

  // 分两遍画：先所有未着色的一侧/肌肉，再画着色的。
  // 否则深层小肌肉（冈上肌、多裂肌…）会被表层大肌肉盖住，永远点不到。
  // 注意按 (肌肉 × 侧) 分组，因为同一块肌肉可能只着色一侧。
  const pairs = entries.flatMap(([id]) =>
    drawSides.map((s) => ({ id, side: s, painted: isPainted(id, s) }))
  )
  const ordered = [...pairs.filter((p) => !p.painted), ...pairs.filter((p) => p.painted)]

  const renderOne = (id: string, screenSide: ScreenSide, painted: boolean) => {
    const g = groups[id]
    if (!g) return null
    const seg = g[screenSide]
    const p = paints[id]
    const isActive = activeId === id
    const clip = g.needsClip ? `url(#${screenSide === 'left' ? clipL : clipR})` : undefined

    let fill = IDLE_FILL
    let stroke = IDLE_STROKE
    let opacity = 1
    if (mode === 'confirm') {
      if (painted) { fill = SELECT_FILL; stroke = SELECT_STROKE }
    } else if (p) {
      fill = p.fill
      stroke = p.stroke ?? p.fill
      if (p.dashed) stroke = p.fill
      if (p.faded) opacity = 0.45
    }

    const canClick = painted || clickableIdle
    return (
      <path
        key={`${id}-${screenSide}`}
        d={seg.d}
        clipPath={clip}
        fill={fill}
        stroke={isActive ? '#2C2C2A' : stroke}
        strokeWidth={isActive ? 2.2 : painted ? 1.8 : 1.1}
        strokeDasharray={mode === 'diagnose' && p?.dashed ? '4 2.5' : undefined}
        opacity={opacity}
        style={{ cursor: canClick && onPick ? 'pointer' : 'default', transition: 'fill .18s, stroke .18s' }}
        onClick={canClick && onPick ? () => onPick(id, screenToBody(view, screenSide)) : undefined}
        pointerEvents={clip ? undefined : 'visiblePainted'}
      >
        <title>{nameOf[id] ?? id}</title>
      </path>
    )
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="bm-svg" role="img" aria-label={`人体${view === 'front' ? '正' : '背'}面图`}>
      <defs>
        <clipPath id={clipL}><rect x={0} y={0} width={MID} height={H} /></clipPath>
        <clipPath id={clipR}><rect x={MID} y={0} width={MID} height={H} /></clipPath>
      </defs>

      <path d={outline} fill="#FAF6F1" stroke="#A6907F" strokeWidth={1.1} />

      <g>
        {ordered.map(({ id, side, painted }) => renderOne(id, side, painted))}
      </g>
    </svg>
  )
}

/** 某块肌肉在这张视图上有没有路径（用真实几何判断，不看 muscles.ts 的倾向字段） */
export function hasInView(view: BodyView, id: string): boolean {
  return Boolean(SIDES[view]?.[id])
}

/** 取某肌肉在某侧的质心，给标签定位用 */
export function anchorOf(view: BodyView, id: string, bodySide: BodySide) {
  const g = SIDES[view]?.[id]
  if (!g) return null
  if (bodySide === 'both') {
    return { x: (g.left.cx + g.right.cx) / 2, y: (g.left.cy + g.right.cy) / 2 }
  }
  const seg = g[bodyToScreen(view, bodySide)]
  return { x: seg.cx, y: seg.cy }
}
