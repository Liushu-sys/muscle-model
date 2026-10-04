/**
 * App 侧诊断编排：把第 1 页的「选择 + 描述」交给 muscle-model 引擎。
 *
 * 两种输入情况：
 *  1. 用户写了描述 → 直接用描述跑 9 条模式匹配；
 *  2. 描述留空     → 引擎只看文字会落空，这里用「所选肌肉自带的体感词」
 *                    拼一句喂给引擎，再让 kept 选择给模式加分。
 *
 * 红旗（手麻/头晕/夜间痛醒…）永远最先判：命中就不染色、不给动作，
 * 只提示就医——这是肌肉库 README 里的硬规则。
 */
import {
  parseLocal,
  hitRedFlag,
  MUSCLE_MAP,
  type ParseResult,
} from '@model/index'

export type SideSel = 'left' | 'right' | 'both'
/** 肌肉 id → 选中了身体哪一侧 */
export type Selection = Record<string, SideSel>

export interface Diagnosis {
  result: ParseResult
  /** 选中了、但本次模式没判定的肌肉（页面上用中性灰显示） */
  neutralIds: string[]
  /** 命中的红旗词，null = 安全 */
  redFlag: string | null
}

export function runDiagnose(text: string, selection: Selection): Diagnosis {
  const redFlag = hitRedFlag(text)
  const ids = Object.keys(selection)

  let effective = text.trim()
  if (!effective && ids.length > 0) {
    effective = ids
      .flatMap((id) => MUSCLE_MAP[id]?.senses ?? [])
      .slice(0, 5)
      .join('，')
  }

  const result = parseLocal(effective, '', {
    kept: ids,
    added: [],
    dropped: [],
  })

  // outOfScope（模式全落空）时，marks 不会被引擎填充，这里自己兜底成全量中性
  const neutralIds = result.outOfScope
    ? ids
    : (result.marks ?? []).map((m) => m.id)

  return { result, neutralIds, redFlag }
}

/** 选择计数：both 算两处 */
export function countSites(sel: Selection): number {
  return Object.values(sel).reduce((n, s) => n + (s === 'both' ? 2 : 1), 0)
}

/** 点按一侧后的选择状态更新：无→单侧；同侧→取消；异侧→两侧；两侧→收成单侧 */
export function toggleSide(sel: Selection, id: string, side: Exclude<SideSel, 'both'>): Selection {
  const next = { ...sel }
  const cur = next[id]
  if (!cur) next[id] = side
  else if (cur === 'both') next[id] = side
  else if (cur === side) delete next[id]
  else next[id] = 'both'
  return next
}
