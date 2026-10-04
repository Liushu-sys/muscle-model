/**
 * muscle-model —— React 出口
 *
 * 只有这一个文件需要 React。如果你只做后端诊断 / 非 React 前端，
 * 别 import 这里，用主出口 `muscle-model` 就行，打包体积会小很多。
 *
 *   import BodyMap, { type BodyView, TIGHT_FILL } from 'muscle-model/react'
 */

export { default as BodyMap } from './components/BodyMap'
export { default } from './components/BodyMap'
export {
  screenToBody,
  bodyToScreen,
  hasInView,
  anchorOf,
  IDLE_FILL,
  IDLE_STROKE,
  SELECT_FILL,
  SELECT_STROKE,
  TIGHT_FILL,
  WEAK_FILL,
} from './components/BodyMap'
export type {
  BodyView,
  BodySide,
  ScreenSide,
  MusclePaint,
  BodyMapProps,
} from './components/BodyMap'

/* 肌肉数据也顺手转出来，画图时常常要查名字 */
export { MUSCLES, MUSCLE_MAP, REGION_LABEL } from './data/muscles'
export type { Muscle, Region } from './data/muscles'
