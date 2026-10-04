/**
 * 页面 1 · 选择页
 * 顶部：标题 + 副标题（仅此）
 * 中部：肌肉图撑满剩余全部空间
 *        —— 「已选 X 处」浮在图内左上、「正面/背面」浮在图内右上
 *        —— 点按肌肉时图内底部弹出名称气泡
 * 底部：描述输入框 + 诊断按钮
 */
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MUSCLE_MAP } from '@model/index'
import type { BodyView, MusclePaint, ScreenSide } from '@model/react'
import BodyStage from '../components/BodyStage'
import ViewSwitch from '../components/ViewSwitch'
import { countSites, toggleSide, type Selection } from '../lib/diagnose'

interface Props {
  selection: Selection
  onSelectionChange: (s: Selection) => void
  description: string
  onDescriptionChange: (v: string) => void
  onSubmit: () => void
}

export default function SelectScreen({
  selection,
  onSelectionChange,
  description,
  onDescriptionChange,
  onSubmit,
}: Props) {
  const [view, setView] = useState<BodyView>('front')
  const [lastTap, setLastTap] = useState<{ id: string; selected: boolean; seq: number } | null>(null)
  const count = countSites(selection)
  const disabled = count === 0

  // 点按名称气泡 1.6s 后自动淡出
  useEffect(() => {
    if (!lastTap) return
    const t = setTimeout(() => setLastTap(null), 1600)
    return () => clearTimeout(t)
  }, [lastTap])

  // 选中态：青蓝填充，按身体侧着色
  const paints: Record<string, MusclePaint> = {}
  for (const [id, sides] of Object.entries(selection)) {
    paints[id] = { fill: '#4198AC', stroke: '#337F92', sides }
  }

  const handlePick = (id: string, bodySide: ScreenSide) => {
    const next = toggleSide(selection, id, bodySide)
    onSelectionChange(next)
    setLastTap({ id, selected: Boolean(next[id]), seq: Date.now() })
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 顶部：只留标题与副标题 */}
      <div className="shrink-0 px-5 pb-3 pt-[max(20px,calc(env(safe-area-inset-top)+8px))]">
        <h1 className="text-[34px] font-bold leading-tight tracking-tight">Body Map</h1>
        <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">
          点击你感到不适的肌肉区域
          <span className="text-ink-3">（可多选、可取消选择）</span>
        </p>
      </div>

      {/* 中部：肌肉图撑满剩余空间 */}
      <div className="mx-5 min-h-0 flex-1">
        <BodyStage
          view={view}
          paints={paints}
          clickableIdle
          onPick={handlePick}
          topLeft={
            <span
              className={`rounded-full px-3 py-1 text-[13px] font-semibold shadow-[0_2px_10px_rgba(31,68,77,0.10)] backdrop-blur transition-colors ${
                count > 0 ? 'bg-white/90 text-brand-deep' : 'bg-white/70 text-ink-3'
              }`}
            >
              已选 {count} 处
            </span>
          }
          topRight={<ViewSwitch value={view} onChange={setView} />}
          bottomCenter={
            <AnimatePresence mode="wait">
              {lastTap && (
                <motion.span
                  key={lastTap.seq}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.18 }}
                  className="pointer-events-none rounded-full bg-ink/85 px-3.5 py-1.5 text-[12.5px] font-medium text-white shadow-lg"
                >
                  {MUSCLE_MAP[lastTap.id]?.name ?? lastTap.id}
                  <span className="text-white/70"> · {lastTap.selected ? '已加入' : '已取消'}</span>
                </motion.span>
              )}
            </AnimatePresence>
          }
        />
      </div>

      {/* 底部输入栏 */}
      <div className="shrink-0 bg-white/95 px-4 pb-[max(12px,calc(env(safe-area-inset-bottom)+8px))] pt-3 shadow-bar backdrop-blur">
        <div className="flex items-center gap-2 rounded-full bg-[#F1F4F4] py-1.5 pl-4 pr-1.5">
          <input
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !disabled) onSubmit()
            }}
            placeholder="添加描述：感到酸痛"
            maxLength={80}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-ink"
          />
          <button
            type="button"
            aria-label="开始诊断"
            disabled={disabled}
            onClick={onSubmit}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 no-tap-highlight ${
              disabled
                ? 'cursor-default bg-[#DDE4E3] text-[#AFB9B8]'
                : 'bg-brand text-white shadow-[0_4px_12px_rgba(65,152,172,0.4)] active:scale-95 active:bg-brand-deep'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
