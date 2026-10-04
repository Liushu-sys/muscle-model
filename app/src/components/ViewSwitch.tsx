/** iOS 风格分段控件：正面 / 背面 */
import { motion } from 'framer-motion'
import type { BodyView } from '@model/react'

const OPTIONS: { value: BodyView; label: string }[] = [
  { value: 'front', label: '正面' },
  { value: 'back', label: '背面' },
]

export default function ViewSwitch({
  value,
  onChange,
}: {
  value: BodyView
  onChange: (v: BodyView) => void
}) {
  return (
    <div className="flex rounded-full bg-[#E9EFEE] p-0.5">
      {OPTIONS.map((o) => {
        const active = value === o.value
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`relative rounded-full px-3.5 py-1 text-[13px] font-medium transition-colors no-tap-highlight ${
              active ? 'text-brand-deep' : 'text-ink-3'
            }`}
          >
            {active && (
              <motion.span
                layoutId="view-switch-pill"
                className="absolute inset-0 rounded-full bg-white shadow-[0_2px_8px_rgba(31,68,77,0.12)]"
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}
