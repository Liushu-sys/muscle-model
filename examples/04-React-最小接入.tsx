/**
 * 例 4 · React 项目里画一张能点的人体图
 *
 * 这个文件不参与 tsc 检查（语法示例用），接进你自己的项目即可。
 *
 * 关键点只有一个：**解剖学左右和屏幕左右在正面图上是反的**。
 * 正面图看着在你屏幕左边的那一侧，是用户的**右**侧身体。
 * screenToBody() 帮你转，onPick 回调给你的已经是身体侧，别自己再翻一次。
 */
import { useState } from 'react'
import { parseLocal, MUSCLES, type ParseResult } from 'muscle-model'
import BodyMap, {
  type BodyView, type BodySide, type ScreenSide, type MusclePaint,
  TIGHT_FILL, WEAK_FILL, SELECT_FILL, SELECT_STROKE,
} from 'muscle-model/react'

export default function MiniDemo() {
  const [view, setView] = useState<BodyView>('front')
  const [result, setResult] = useState<ParseResult | null>(null)
  const [selection, setSelection] = useState<Record<string, BodySide>>({})

  const diagnose = (text: string) => setResult(parseLocal(text, ''))

  // 第 3 页：红=过劳，蓝=过弱，虚线=推断项
  const paints: Record<string, MusclePaint> = {}
  for (const x of result?.tight ?? []) {
    paints[x.muscle.id] = { fill: TIGHT_FILL, dashed: x.inferred }
  }
  for (const x of result?.weak ?? []) {
    paints[x.muscle.id] = { fill: WEAK_FILL, dashed: x.inferred }
  }
  // 用户手动标记但引擎没判的：中性态，不擅自给它判过劳/过弱
  for (const m of result?.marks ?? []) {
    paints[m.id] ??= { fill: '#E8E2DA', dashed: true, faded: true }
  }

  // 第 2 页：选中色是中性暖色，不要用红色——红在这个产品里已经等于"过劳"
  const confirmPaints: Record<string, MusclePaint> = {}
  for (const [id, side] of Object.entries(selection)) {
    confirmPaints[id] = { fill: SELECT_FILL, stroke: SELECT_STROKE, sides: side }
  }

  const onPick = (id: string, bodySide: ScreenSide) => {
    setSelection((prev) => {
      const cur = prev[id]
      const next = { ...prev }
      // 无 → 设侧；两侧 → 收成单侧；同侧 → 取消；异侧 → 两侧
      if (!cur) next[id] = bodySide
      else if (cur === 'both') next[id] = bodySide
      else if (cur === bodySide) delete next[id]
      else next[id] = 'both'
      return next
    })
  }

  return (
    <div>
      <button onClick={() => diagnose('看电脑两小时，左边肩膀又酸又硬')}>
        诊断一句示例
      </button>

      <button onClick={() => setView(view === 'front' ? 'back' : 'front')}>
        {view === 'front' ? '看背面' : '看正面'}
      </button>

      <p style={{ fontSize: 12, opacity: 0.6 }}>
        {view === 'front'
          ? '图上的左边，是你身体的右侧'
          : '图上的左边，就是你的左侧'}
      </p>

      <BodyMap
        view={view}
        mode={result ? 'diagnose' : 'confirm'}
        paints={result ? paints : confirmPaints}
        clickableIdle={!result}
        onPick={onPick}
      />

      <ul>
        {(result?.tight ?? []).map((x) => (
          <li key={x.muscle.id}>过劳：{x.muscle.name}</li>
        ))}
        {(result?.weak ?? []).map((x) => (
          <li key={x.muscle.id}>过弱：{x.muscle.name}</li>
        ))}
      </ul>

      <p>共 {MUSCLES.length} 组肌肉可选</p>
    </div>
  )
}
