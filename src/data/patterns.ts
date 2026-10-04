/**
 * BodyMap · 关节受限模式库
 * 依据：《基础肌动学》第4版（北京科学技术出版社 2024，ISBN 978-7-5714-3810-4）
 *       书中「关节受限的常见模式」板块
 *
 * ⭐ 这一层是整个产品的判断核心，不是可选的：
 *   书里同一块肌肉在不同模式下角色可能相反
 *   （腘绳肌：膝模式=紧张要牵伸 / 髋模式=减弱要强化；
 *    菱形肌：盂肱模式=紧张 / 肩胛胸壁模式=减弱）
 *   所以不能直接让 AI 猜 tight/weak，必须先锁定「是哪个关节模式」。
 *
 * 判断顺序：用户体感 → 【本文件的模式】→ tight/weak 肌肉 id → 去 muscles.ts 查坐标 → 点亮
 */

import type { Muscle } from './muscles'

export interface Pattern {
  id: string
  joint: string          // 关节名（书里的小标题）
  bookPage: number       // 书页，溯源用
  limitation: string     // 受限模式（书中原文）
  tight: string[]        // 紧张 / 短缩 的肌肉 id  ← 产品里叫「过劳」
  weak: string[]         // 肌力减弱 / 疲劳 的肌肉 id ← 产品里叫「过弱」
  /** 推断项：书中同一章节有依据，但不在该模式的原文板块内。UI 用浅色小点，不算主结论 */
  inferredTight?: string[]
  inferredWeak?: string[]
  impact: string         // 功能影响（书中原文）
  treatment: string      // 常见的治疗方法（书中原文）
  note?: string          // 书中注释，含日常场景，讲 pitch 很有用
  senses: string[]       // 用户可能说的话（体感关键词），用于挑选模式
  demo?: boolean         // true = Demo 主讲链路
}

export const PATTERNS: Pattern[] = [
  // ==================== 核心链路（Demo 主讲） ====================
  {
    id: 'cranio_cervical',
    joint: '颅颈区',
    bookPage: 235,
    limitation: '头部过度前伸姿势',
    tight: ['sternocleidomastoid', 'suboccipital', 'levator_scapulae'],
    weak: ['deep_neck_flexor'],
    // 头夹肌在书 p.217 有依据（负责抬头和转头），但不在 p.235 这个模式的原文里，故列为推断项
    inferredTight: ['splenius_capitis'],
    impact: '支撑头部和颈部的伸肌应力增加；该区域"激痛点"增加；头痛风险增加；颞下颌关节疼痛风险增加',
    treatment: '强化颅颈区回缩肌肌力（收下颌运动）；枕下肌群软组织松动；牵伸枕下肌群和胸锁乳突肌',
    note: '过度的头部前伸姿势可能是由活动参与引起，如操作电脑的工作或经常看手机……颅颈区域前侧的肌肉会发生短缩，以适应其新的习惯长度。',
    senses: [
      '脖子酸', '脖子后面酸', '脖子两侧紧', '后脑勺沉', '后脑勺发沉',
      '转头费劲', '头疼', '头晕沉沉', '落枕', '转不动', '抬头费劲',
      '脖子僵', '头前伸', '看手机脖子酸',
    ],
    demo: true,
  },
  {
    id: 'scapulothoracic',
    joint: '肩胛胸壁关节',
    bookPage: 89,
    limitation: '肩胛骨过度下旋、前伸和前倾（通常伴有胸椎过度后凸和头部前伸）',
    tight: ['pectoralis_major', 'pectoralis_minor'],
    weak: ['rhomboid', 'trapezius_middle', 'serratus_anterior', 'trapezius_upper', 'trapezius_lower'],
    impact: '影响肩胛骨正常运动，进而影响肩关节活动；常与圆肩相关',
    treatment: '强化肩胛骨后缩肌力量；强化肩胛骨上旋肌力量；牵伸胸大肌和胸小肌；改善胸背姿势；强化胸椎伸肌力量',
    note: '这种肩胛胸壁位置通常与圆肩有关，并且由于需要将手放在身前的任务很多，如打字、驾驶、发短信，甚至在课堂上做笔记，因而似乎非常常见。',
    senses: [
      '肩膀沉', '耸着肩', '肩膀僵', '圆肩', '含胸', '驼背',
      '挺不直', '肩胛骨内侧酸', '两肩之间酸', '肩膀酸',
    ],
    demo: true,
  },
  {
    id: 'shoulder_glenohumeral',
    joint: '盂肱关节',
    bookPage: 87,
    limitation: '肩关节外展或前屈受限 / 外旋不足',
    tight: ['pectoralis_major', 'latissimus_dorsi', 'subscapularis'],
    // 三角肌是书 p.87 原文列名：「外展肌或前屈肌肌力减弱：三角肌前束、三角肌中束、冈上肌」
    // —— 书里三角肌就排在冈上肌之前，所以放在首位。
    // ⚠️ 这个模式 weak 共 6 块但只显示前 3（slice(0,3)），放末尾会被截掉。
    //    被挤到第 4 位的前锯肌不会消失：它在肩胛胸壁模式的 weak 里仍是第 3 位。
    weak: ['deltoid', 'supraspinatus', 'infraspinatus', 'serratus_anterior', 'trapezius_upper', 'trapezius_lower'],
    impact: '抬手、够后背等日常动作受限',
    treatment: '牵伸紧张肌肉、软组织松解、关节松动、强化减弱肌肉的力量',
    senses: ['抬手费劲', '抬手肩膀疼', '手够不到后背', '梳头费劲', '肩膀转不开',
      '肩膀没劲', '手臂侧举发抖'],
    demo: true,
  },
  {
    id: 'hip',
    joint: '髋关节',
    bookPage: 281,
    limitation: '髋关节伸展减少 / 髋关节屈曲挛缩',
    tight: ['iliopsoas', 'quadriceps', 'erector_spinae'],
    weak: ['gluteus_maximus', 'hamstrings', 'rectus_abdominis', 'transversus_abdominis'],
    // 臀中肌：书 p.281 同页讨论髋部外展肌作用，但不在该模式原文的Weak清单里
    inferredWeak: ['gluteus_medius'],
    impact: '长期骨盆前倾导致腰椎过度前凸；腰背部伸肌紧张',
    treatment: '牵伸髋屈肌；牵伸腰背部伸肌；强化髋伸肌肌力（臀桥）；如有前骨盆倾斜需强化腹部肌肉力量',
    note: '髋屈肌构成了骨盆前倾力偶的一半。如果这些肌肉变得紧张，即使没有腰背部伸肌的配合，骨盆也可能会向前倾斜。（长时间坐姿被明确列为成因）',
    senses: [
      '腰酸', '久坐直不起来', '站久了腰酸', '髋前面紧', '大腿根前面紧',
      '骨盆前倾', '屁股塌', '上楼腿没劲', '腰挺不直',
    ],
    demo: true,
  },

  // ==================== 扩展链路（能答，Demo 一句带过） ====================
  {
    id: 'thoracic',
    joint: '胸椎区域',
    bookPage: 236,
    limitation: '胸椎过度后凸（驼背）',
    tight: ['pectoralis_major', 'pectoralis_minor', 'iliopsoas'],
    weak: ['erector_spinae'],
    impact: '与头颈部前伸和圆肩相关，影响躯干伸展能力',
    treatment: '强化胸段伸肌肌力；强化髋伸肌肌力；牵伸躯干屈肌、胸大肌和胸小肌、髋屈肌',
    senses: ['驼背', '挺不直背', '后背圆', '胸椎僵', '上背部酸'],
  },
  {
    id: 'knee',
    joint: '膝关节',
    bookPage: 316,
    limitation: '伸展不足 / 屈曲挛缩',
    tight: ['hamstrings'],
    weak: ['quadriceps'],
    // 髂胫束书里没列名（p.281 只点到它的起点阔筋膜张肌），所以按推断项处理。
    // 放 tight 主项也塞得下，但那样同一处会多出一个"像书里写的"结论；
    // 放推断层既不挤主项，UI 上又如实标成浅色小点。
    inferredTight: ['iliotibial_tract'],
    impact: '影响蹲起、上下楼梯与步行',
    treatment: '牵伸屈膝肌群；强化股四头肌肌力',
    senses: ['大腿后侧紧', '弯腰摸不到地', '膝盖发软', '下楼梯打软腿', '蹲不下去',
      '跑步膝盖外侧疼', '大腿外侧发紧'],
  },
  {
    id: 'ankle',
    joint: '踝关节',
    bookPage: 359,
    limitation: '背伸受限 / 跖屈挛缩',
    // 比目鱼肌是书 p.359 原文「踝跖屈肌紧张：腓肠肌、比目鱼肌、…」里点了名的，
    // 属主项不是推断项；该模式 tight 原本只有 1 块，slice(0,3) 还有名额，直接进 tight
    tight: ['gastrocnemius', 'soleus'],
    weak: ['tibialis_anterior'],
    impact: '影响下蹲、上下楼梯与步态',
    treatment: '牵伸跖屈肌；强化踝背伸肌肌力',
    senses: ['小腿肚紧', '脚后跟疼', '踮脚抽筋', '脚背勾不起来', '跟腱紧',
      '久站小腿酸', '小腿深处紧', '脚踝硬'],
  },
  {
    id: 'wrist',
    joint: '腕关节',
    bookPage: 141,
    limitation: '腕伸展不足',
    tight: ['forearm_flexors'],
    weak: ['forearm_extensors'],
    impact: '影响抓握与手腕活动，久用鼠标键盘者常见',
    treatment: '牵伸紧张的腕屈肌；强化腕伸肌力量',
    senses: ['手腕酸', '打字累', '鼠标手', '手腕发紧', '前臂内侧紧'],
  },
  {
    id: 'elbow',
    joint: '肘关节复合体',
    bookPage: 118,
    limitation: '伸展减弱 / 屈曲挛缩',
    tight: ['biceps_brachii'],
    weak: ['triceps_brachii'],
    impact: '影响手臂完全伸直',
    treatment: '牵伸肘屈肌；强化肘伸肌',
    // 原有的 3 条太窄（全是"伸不直/前面紧"）。现实里来问肘的几乎都带一个具体动作
    // ——拧毛巾、端锅、握鼠标后肘外侧疼。词不够就会掉进别人家：测试里
    // "手肘外侧疼，拧毛巾使劲就疼" 曾经因为共用「外侧」「疼」而被判成膝盖模式。
    senses: [
      '胳膊伸不直', '手肘前面紧', '上臂前面紧',
      '手肘疼', '手肘外侧疼', '手肘内侧疼', '网球肘', '高尔夫球肘',
      '拧毛巾疼', '拧毛巾手肘疼', '端东西手肘疼', '提东西手肘疼',
      '手肘酸', '手肘使不上劲',
    ],
  },
]

/**
 * 用体感关键词猜一到两个候选模式。
 * 用途：① AI 超时/不可用时的本地兜底 ② 给用户看"我们理解你大概说的是这类问题"
 * @returns 按命中数排序的模式 id
 */
export function matchPatternsBySense(input: string): string[] {
  const score: Record<string, number> = {}
  for (const p of PATTERNS) {
    let n = 0
    for (const s of p.senses) if (input.includes(s)) n += s.length // 长词权重更高
    if (n > 0) score[p.id] = n
  }
  return Object.entries(score)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([id]) => id)
}

/**
 * ⚠️ 必须做：同一块肌肉在一个模式里可能同时出现在 tight 和 weak
 * （书里肩胛胸壁模式就是这样：菱形肌既是"下旋肌紧张"又是"后缩肌力减弱"）。
 *
 * UI 上一个点不能既是红色又是绿色，所以要去重。
 * 规则：以该模式「治疗方法」里明确点到的一侧为准。
 *      治疗方法写"强化 XX" → 归 weak；写"牵伸 XX" → 归 tight。
 * 本表里已经手工去重过了，这个函数是兜底保险，防止 AI 返回脏数据。
 */
export function dedupeConflict(
  tight: string[],
  weak: string[],
  _patternId: string,
  treatmentHint: 'prefer_weak' | 'prefer_tight' = 'prefer_weak'
): { tight: string[]; weak: string[] } {
  const dup = tight.filter((id) => weak.includes(id))
  if (dup.length === 0) return { tight, weak }
  return treatmentHint === 'prefer_weak'
    ? { tight: tight.filter((id) => !dup.includes(id)), weak }
    : { tight, weak: weak.filter((id) => !dup.includes(id)) }
}

/**
 * 把模式 + 肌肉库拼成人话解释，供 UI 的"理论解释层"使用。
 * 文案直接引用书中概念，不做诊断表述。
 */
export function buildExplanation(patternId: string, library: Muscle[]) {
  const p = PATTERNS.find((x) => x.id === patternId)
  if (!p) return null
  const find = (id: string) => library.find((m) => m.id === id)
  return {
    pattern: p.limitation,
    joint: p.joint,
    bookPage: p.bookPage,
    tightDetail: p.tight.map(find).filter(Boolean) as Muscle[],
    weakDetail: p.weak.map(find).filter(Boolean) as Muscle[],
    impact: p.impact,
    treatment: p.treatment,
    note: p.note,
    // 引用文案，注意用词是"依据"不是"认证"
    citation: `依据《基础肌动学》第4版 p.${p.bookPage}「${p.joint}关节受限的常见模式」`,
  }
}

/** Demo 主讲链路：演示时优先保证这几条答得准 */
export const DEMO_PATTERN_IDS = PATTERNS.filter((p) => p.demo).map((p) => p.id)
