/**
 * muscle-model —— 主出口（纯 TypeScript，零运行时依赖，不碰 React）
 *
 * 任何环境都能用：Node / Vite / Next / 小程序 / 后端服务。
 * 需要 React 人体图组件的话，从 `muscle-model/react` 引入。
 *
 *   import { parseLocal, MUSCLES, pickActions } from 'muscle-model'
 */

/* ── 肌肉库：47 组定义 ───────────────────────────────────────────── */
export {
  MUSCLES,
  MUSCLE_MAP,
  MUSCLE_IDS,
  REGION_LABEL,
  filterByLibrary,
} from './data/muscles'
export type { Muscle, Region, Side, MuscleType } from './data/muscles'

/* ── 模式库：9 条症状→肌肉映射 ───────────────────────────────────── */
export {
  PATTERNS,
  DEMO_PATTERN_IDS,
  matchPatternsBySense,
  dedupeConflict,
  buildExplanation,
} from './data/patterns'
export type { Pattern } from './data/patterns'

/* ── 诊断引擎 ────────────────────────────────────────────────────── */
/* 场景表（SCENE_LABEL / SCENE_HINT）在下面 actions 那段导出，那里是唯一来源 */
export {
  parseLocal,
  matchPatterns,
  refinePatterns,
  hitRedFlag,
  buildSystemPrompt,
  RED_FLAGS,
} from './lib/engine'
export type {
  ParseResult,
  MuscleResult,
  ExamineChoice,
  EngineMode,
} from './lib/engine'

/* ── 解释卡：四段式文案组装 ──────────────────────────────────────── */
export { buildExplainCard } from './lib/explain'
export type { ExplainCard, CardState } from './lib/explain'

/* ── 动作库：50 个动作 + 按场景挑选 ──────────────────────────────── */
/* 注意：actions.ts 里也有一个同名的 REGION_LABEL，为避免和肌肉库的
   那个撞车，这里不导出它 —— 需要部位名请用上面 muscles 的 REGION_LABEL。 */
export {
  ACTIONS,
  pickActions,
  actionTargetLabel,
  actionTargetName,
  SCENE_LABEL,
  SCENE_HINT,
  KIND_LABEL,
} from './data/actions'
export type { Action, ActionKind, SceneId, PickQuery } from './data/actions'
