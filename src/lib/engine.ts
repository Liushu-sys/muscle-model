import { MUSCLES, type Muscle } from '../data/muscles'
import { PATTERNS, type Pattern } from '../data/patterns'

export type EngineMode = 'local' | 'ai'

export interface MuscleResult {
  muscle: Muscle
  kind: 'tight' | 'weak'
  inferred: boolean
  queryPro: string
  queryPlain: string
  queryAvoid: string
}

export interface ParseResult {
  patternIds: string[]
  pattern?: Pattern
  tight: MuscleResult[]
  weak: MuscleResult[]
  /**
   * 用户在第 2 页标记了、但本次命中的模式并没有判定它的肌肉。
   * 第 3 页用中性态显示：尊重用户的标记，但不擅自给它判过劳/过弱——
   * 判定权始终在模式层，这个字段存在的意义是让用户不至于觉得"白点了"。
   */
  marks?: Muscle[]
  /**
   * 用户在第 2 页否掉的肌肉 id。第 4 页挑动作时要避开它们——
   * 否则会出现「第 2 页我把这块点掉了，第 4 页又让我去按它」的跨页矛盾。
   */
  vetoed?: string[]
  reason: string
  impact: string
  treatment: string
  note?: string
  citation: string
  outOfScope: boolean
  redFlag: boolean
  engine: EngineMode
}

/** 红旗词：命中即不解析，直接提示就医 */
export const RED_FLAGS = [
  '手麻', '手臂发麻', '腿麻', '发麻', '放射性', '头晕', '恶心',
  '视力模糊', '夜间痛醒', '晚上痛醒', '外伤', '摔过', '发烧',
  '走路不稳', '大小便异常', '体重突然下降', '体重骤降', '触电',
]

/* 场景表不在这里。唯一来源是 data/actions.ts 的 SCENE_LABEL / SCENE_HINT
   （desk 工位 / gym 健身房 / open 公园或家里 / bed 床上，共 4 档）。
   这里曾经有一份 5 档的旧 SCENES（工位/教室/通勤/居家/睡前），
   跟动作库那 4 档对不上且全项目无人引用，已删除——
   两套场景表并存是接进新项目时最容易踩的坑。 */

const AVOID_BY_REGION: Record<string, string> = {
  neck_shoulder: '颈椎病',
  upper_back: '驼背矫正带',
  low_back_hip: '腰椎间盘突出',
  leg: '静脉曲张',
  arm: '网球肘膏药',
}

export function hitRedFlag(text: string): string | null {
  for (const f of RED_FLAGS) if (text.includes(f)) return f
  return null
}

/**
 * 单条体感词与用户输入的匹配分。
 * 用「字符覆盖率 × 2-gram 命中加成」，避免"的""了"这类单字噪声误判。
 */
function scoreSense(input: string, sense: string): number {
  let hit = 0
  for (const ch of sense) if (input.includes(ch)) hit++
  const cover = hit / sense.length
  let bigram = 0
  for (let i = 0; i < sense.length - 1; i++) {
    if (input.includes(sense.slice(i, i + 2))) bigram++
  }
  if (bigram === 0) return 0
  // ⚠️ 覆盖率下限不能省。只按「有没有连续两字重合」放行的话，
  //    "手肘外侧疼" 会因为和「跑步膝盖外侧疼」共用「外侧」「侧疼」而命中膝模式
  //    （覆盖率只有 3/7≈0.43）——用户说肘疼，我们给他开膝盖的动作，
  //    这种错比"没认出来"严重得多：前者是错的，后者只是没帮上。
  if (cover < 0.5) return 0
  return cover * (1 + 0.15 * bigram)
}

/** 本地匹配：返回命中的模式（按分数排序） */
export function matchPatterns(input: string): { id: string; score: number }[] {
  return PATTERNS
    .map((p) => ({ id: p.id, score: Math.max(0, ...p.senses.map((s) => scoreSense(input, s))) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
}

/* ══════════════════════════════════════════════════════════
   第 2 页 → 第 3 页 的闭环
   用户在第 2 页确认/取消/新增位置，必须真实改变第 3 页的诊断结论，
   否则那一页就是装饰品。做法是让选择结果回头修正模式评分：
   - 保留或手动选中某块肌肉 → 它所属的模式加分
   - 取消了系统推荐的肌肉   → 它所属的模式降权
   ⚠️ 不能反过来让「部位直接决定肌肉」——那会绕开 9 条模式依据，
      丢掉「同一块肌肉在不同模式下角色相反」这个产品唯一的差异点。
   ══════════════════════════════════════════════════════════ */

export interface ExamineChoice {
  /** 用户确认保留的（系统推荐且没被取消）肌肉 id */
  kept: string[]
  /** 系统推荐但被用户取消的肌肉 id */
  dropped: string[]
  /** 用户手动额外选中的位置/肌肉 id */
  added: string[]
}

/** 某模式涉及的全体肌肉（含推断层） */
function poolOf(p: Pattern): string[] {
  return dedupe([
    ...p.tight,
    ...p.weak,
    ...(p.inferredTight ?? []),
    ...(p.inferredWeak ?? []),
  ])
}

const KEEP_BONUS = 0.22   // 每块被确认的肌肉给所属模式加的分
const DROP_RATE = 0.55    // 每块被取消的肌肉给所属模式乘的折扣（连乘）

export function refinePatterns(
  hits: { id: string; score: number }[],
  choice: ExamineChoice
): { id: string; score: number }[] {
  const { kept = [], dropped = [], added = [] } = choice
  if (!kept.length && !dropped.length && !added.length) return hits

  // 手动新增的按"确认"处理；已在 kept 里的不重复计分
  const positive = dedupe([...kept, ...added])
  // 只看本地已经命中的模式：不匹配任何模式的输入不该凭左上角被凭空激活
  return hits
    .map((h) => {
      const p = PATTERNS.find((x) => x.id === h.id)
      if (!p) return h
      const pool = poolOf(p)
      let score = h.score
      score += positive.filter((id) => pool.includes(id)).length * KEEP_BONUS
      score *= Math.pow(DROP_RATE, dropped.filter((id) => pool.includes(id)).length)
      return { id: h.id, score }
    })
    .sort((a, b) => b.score - a.score)
}

/** 组装某模式下某肌肉的完整结果（含检索词） */
function buildMuscleResult(id: string, kind: 'tight' | 'weak', inferred: boolean, sceneWord: string): MuscleResult | null {
  const muscle = MUSCLES.find((m) => m.id === id)
  if (!muscle) return null
  const action = kind === 'tight' ? '拉伸' : '激活'
  return {
    muscle,
    kind,
    inferred,
    queryPro: `${muscle.name} ${action} ${sceneWord}`,
    queryPlain: `${muscle.senses[0] ?? muscle.name} ${action}`,
    queryAvoid: AVOID_BY_REGION[muscle.region] ?? '偏方',
  }
}

/** 主解析入口：本地模式 */
export function parseLocal(input: string, sceneWord: string, choice?: ExamineChoice): ParseResult {
  const hits = choice ? refinePatterns(matchPatterns(input), choice) : matchPatterns(input)
  const top = hits[0]

  if (!top || top.score < 0.45) {
    return {
      patternIds: [], tight: [], weak: [], reason: '', impact: '', treatment: '', citation: '',
      outOfScope: true, redFlag: false, engine: 'local',
    }
  }

  // 第二名分数接近就一起纳入（如"圆肩驼背"同时命中肩胛胸壁 + 胸椎）
  const ids = [top.id]
  if (hits[1] && hits[1].score >= top.score * 0.85) ids.push(hits[1].id)

  const chosen = PATTERNS.filter((p) => ids.includes(p.id))
  const tightIds = dedupe(chosen.flatMap((p) => p.tight))
  const weakIds = dedupe(chosen.flatMap((p) => p.weak))
  const infTightRaw = dedupe(chosen.flatMap((p) => p.inferredTight ?? []))
  const infWeakRaw = dedupe(chosen.flatMap((p) => p.inferredWeak ?? []))

  // 去重：同一肌肉不能既是紧张又是减弱（以「治疗方法」为准，已手工处理过，这里是保险）
  const conflict = tightIds.filter((id) => weakIds.includes(id))

  // 用户在第 2 页点掉的肌肉 = 对这块肌肉的一票否决。它同时做两件事：
  //   ① 给它所属的模式降权（在 refinePatterns 里，降够了整个模式会被换掉）；
  //   ② 把它自己从最终清单里拿掉。
  // 少了 ② 就会出现「第 2 页写着"不对就点掉"，点掉之后第 3 页照旧列着它」——
  // 用户只会认为那个按钮是坏的，整页结论的可信度也跟着掉。
  // 注意这仍然是"否决"而不是"指定"：点掉一块不会让没点的那块凭空冒出来，
  // 顺序和归属始终由 9 条模式决定。
  const veto = new Set(choice?.dropped ?? [])
  const tightFinal = tightIds.filter((id) => !conflict.includes(id) && !veto.has(id))
  const weakFinal = weakIds.filter((id) => !conflict.includes(id) && !veto.has(id))
  const infTight = infTightRaw.filter((id) => !veto.has(id))
  const infWeak = infWeakRaw.filter((id) => !veto.has(id))

  const main = chosen[0]
  const reason = buildReason(main, input)

  // 主项最多 3 个；「推断项」额外最多补 1 个，且不占用主名额
  // （之前直接拼起来再 slice(0,3)，会把推断项挤掉，导致图上少一个点）
  // ⚠️ 必须先留一份 id 数组：map 之后 tightMain 就变成 MuscleResult[] 了，
  //    再拿 id(string) 去 includes 会恒为 false，去重直接失效，
  //    同一块肌肉会在主项和推断项里各出现一次（图上同一个点被点亮两遍）。
  const tightMainIds = tightFinal.slice(0, 3)
  const tightMain = tightMainIds.map((id) => buildMuscleResult(id, 'tight', false, sceneWord))
  const tightInfIds = infTight.filter((id) => !tightMainIds.includes(id)).slice(0, 1)
  const tightInf = tightInfIds.map((id) => buildMuscleResult(id, 'tight', true, sceneWord))
  const weakMainIds = weakFinal.slice(0, 3)
  const weakMain = weakMainIds.map((id) => buildMuscleResult(id, 'weak', false, sceneWord))
  const weakInfIds = infWeak.filter((id) => !weakMainIds.includes(id)).slice(0, 1)
  const weakInf = weakInfIds.map((id) => buildMuscleResult(id, 'weak', true, sceneWord))

  // 用户手动标记、但本次模式没判到的肌肉 —— 中性态回给第 3 页。
  // 注意只减「实际会显示出来的」 id：被 slice(0,3) 挤掉的那些同样没算判定到。
  const shownIds = dedupe([...tightMainIds, ...tightInfIds, ...weakMainIds, ...weakInfIds])
  const marks = choice
    ? dedupe([...(choice.added ?? []), ...(choice.kept ?? [])])
        .filter((id) => !shownIds.includes(id))
        .map((id) => MUSCLES.find((m) => m.id === id))
        .filter(Boolean) as Muscle[]
    : []

  return {
    patternIds: ids,
    pattern: main,
    tight: [...tightMain, ...tightInf].filter(Boolean) as MuscleResult[],
    weak: [...weakMain, ...weakInf].filter(Boolean) as MuscleResult[],
    marks: marks.length ? marks : undefined,
    vetoed: veto.size ? [...veto] : undefined,
    reason,
    impact: main.impact,
    treatment: main.treatment,
    note: main.note,
    citation: `依据《基础肌动学》第4版 p.${main.bookPage}「${main.joint}关节受限的常见模式」`,
    outOfScope: false,
    redFlag: false,
    engine: 'local',
  }
}

function dedupe(a: string[]) {
  return Array.from(new Set(a))
}

/** 生成一句人话解释：把书中机制翻译成用户听得懂的话 */
function buildReason(p: Pattern, input: string): string {
  const base = `你说的"${input.trim()}"，比较接近书中「${p.joint}」的这种模式：${p.limitation}。`
  const how = p.id === 'cranio_cervical'
    ? '长期低头看手机、用电脑，脖子前侧的肌肉会慢慢适应变短的姿势，后侧支撑的肌肉则被拉得越来越累。'
    : p.id === 'scapulothoracic'
    ? '经常把手放在身前做事（打字、开车、看手机），胸前会变紧，背后就容易被拉长没力气。'
    : p.id === 'hip'
    ? '长时间坐着会让髋部前侧的肌肉缩短，屁股那侧的力量用不上，腰就得多出力。'
    : p.id === 'shoulder_glenohumeral'
    ? '肩关节前侧长期处于内收内旋的姿势，前面变紧、负责外旋的肌肉就容易跟不上。'
    : `这类问题通常是一部分肌肉长期紧张、另一部分肌肉被抑制所导致的。`
  return base + how
}

/* ==================== AI 模式（可选，需填 API Key） ==================== */

export function buildSystemPrompt(): string {
  const patternBrief = PATTERNS.map((p) =>
    `- ${p.id}（${p.joint} p.${p.bookPage}）受限模式：${p.limitation}\n` +
    `  紧张(${p.tight.join('/')})；减弱(${p.weak.join('/')})`
  ).join('\n')
  const muscleBrief = MUSCLES.map((m) => `${m.id}=${m.name}`).join('、')
  return `你是体感翻译器。用户用大白话描述身体感受，你把它翻译成具体的肌肉。
你只做检索和翻译，不做诊断，不给医学结论。

【知识依据】《基础肌动学》第4版（ISBN 978-7-5714-3810-4）「关节受限的常见模式」：
${patternBrief}

【判断顺序】
1. 先判断用户说的是哪个模式（从上面这些 id 里选）
2. 再按该模式给出：紧张肌肉（=过劳，该拉伸）、减弱肌肉（=过弱，该激活）
3. 只能从下面的肌肉库里选 id，不许发明新肌肉名
4. 一次最多 3 块紧张 + 3 块减弱
5. 同一块肌肉在不同模式下角色可能相反，以模式为准

【肌肉库】${muscleBrief}

【输出】只输出 JSON，不要 markdown 代码块：
{"pattern":"模式id","tight":["id"],"weak":["id"],"reason":"一句大白话解释","impact":"功能影响"}
若用户说的完全不在上述模式范围内，返回 {"out_of_scope":true}`
}

export async function parseWithAI(input: string, apiKey: string, sceneWord: string): Promise<ParseResult> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  try {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: input },
        ],
        temperature: 0.2,
      }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const raw: string = data?.choices?.[0]?.message?.content ?? ''
    const json = JSON.parse(raw.replace(/```json|```/g, '').trim())
    if (json.out_of_scope) {
      return { patternIds: [], tight: [], weak: [], reason: '', impact: '', treatment: '', citation: '',
               outOfScope: true, redFlag: false, engine: 'ai' }
    }
    const lib = new Set(MUSCLES.map((m) => m.id))
    const tightIds: string[] = (json.tight ?? []).filter((i: string) => lib.has(i)).slice(0, 3)
    const weakIds: string[] = (json.weak ?? []).filter((i: string) => lib.has(i)).slice(0, 3)
    const conflict = tightIds.filter((i) => weakIds.includes(i))
    const p = PATTERNS.find((x) => x.id === json.pattern)
    return {
      patternIds: p ? [p.id] : [],
      pattern: p,
      tight: tightIds.filter((i) => !conflict.includes(i))
        .map((i) => buildMuscleResult(i, 'tight', false, sceneWord)).filter(Boolean) as MuscleResult[],
      weak: weakIds.map((i) => buildMuscleResult(i, 'weak', false, sceneWord)).filter(Boolean) as MuscleResult[],
      reason: json.reason ?? '',
      impact: json.impact ?? p?.impact ?? '',
      treatment: p?.treatment ?? '',
      note: p?.note,
      citation: p ? `依据《基础肌动学》第4版 p.${p.bookPage}「${p.joint}关节受限的常见模式」` : '',
      outOfScope: false,
      redFlag: false,
      engine: 'ai',
    }
  } finally {
    clearTimeout(timer)
  }
}
