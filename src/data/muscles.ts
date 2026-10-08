/**
 * BodyMap 肌肉库
 * 依据：《基础肌动学》第4版（北京科学技术出版社 2024，ISBN 978-7-5714-3810-4）
 * 书中依据 = "关节受限的常见模式"章节（p.87-89 肩 / p.118 肘 / p.141 腕 /
 * p.235 颅颈区 / p.236 胸椎 / p.281 髋 / p.316 膝 / p.359 踝）
 *
 * ⚠️ type 是"默认倾向"。书里同一块肌肉在不同关节模式下角色可能相反
 *    （如腘绳肌：膝模式=紧张，髋模式=肌力减弱），所以真正判断时要先认模式。
 *    详见 《07-BodyMap-书中依据提取报告》第五节。
 *
 * 📌 共 47 组，与 assets/body_paths.json 的 47 个分组 id 一一对应（2026-10-04 对齐）。
 *    这是硬约束：AI 只能输出本文件里存在的 id，否则前端 filterByLibrary 会丢掉。
 *    两边一旦不对齐，就会出现「AI 说这块肌紧、图上这块不亮」——现场必翻车。
 *    改任何一侧都要同步改另一侧，并用 tools/check_data.py 校验。
 *
 * ⚠️ x / y 是标签锚点的百分比坐标（0-100）。
 *    新增 13 条的 y 取自 body_paths.json 里该组的真实质心 cy；
 *    x 因为矢量左右对称、质心恒在中线 50，所以仍沿用「偏一侧」的示意写法。
 *    旧 34 条的 x / y 是更早的目视估算值，接入矢量图后会统一由 cx / cy 接管。
 *
 * 📌 bookNote 标注依据来源，现场演示时别把推断说成引用：
 *    'book'   = 书里白纸黑字列名了这条肌肉属于紧张侧还是减弱侧
 *    'infer'  = 书里列名了它所在的肌群，这条是同群推断，不是原句
 *    'clinic' = 书里没提，按解剖与常见体态判断
 *    （旧 34 条尚未补标来源，现场前用 tools/check_data.py 对照 docs/07 复核）
 */

export type MuscleType = 'tight' | 'weak'
/**
 * 正面 / 背面 / 双面。
 * 'both' 表示该组在正背两张矢量图里都有路径（三角肌、髂胫束），两张图都要点亮。
 * 旧版手写 BodyFigure 还没消费这个字段，接入 body_paths.json 后生效。
 */
export type Side = 'front' | 'back' | 'both'
export type Region = 'neck_shoulder' | 'upper_back' | 'low_back_hip' | 'leg' | 'arm'

export interface Muscle {
  id: string
  name: string
  alias: string[]
  region: Region
  type: MuscleType
  side: Side
  x: number
  y: number
  desc: string
  senses: string[]
  bookPage?: number   // 书上印的页码，便于溯源
  bookNote?: 'book' | 'infer' | 'clinic'
  paintAs?: string    // 无独立 SVG 路径时，涂色/点击映射到的色块 id（唯一别名真源，如股直肌→股四头肌）
}

export const MUSCLES: Muscle[] = [
  // ============ 颈肩 neck_shoulder ============
  {
    id: 'sternocleidomastoid',
    name: '胸锁乳突肌',
    alias: ['胸锁乳突肌'],
    region: 'neck_shoulder', type: 'tight', side: 'front', x: 42, y: 18.0,
    desc: '脖子前面两侧，长期低头会变短，把下巴往前拉',
    senses: ['脖子前面紧', '头前伸', '下巴往前探', '脖子酸'],
    bookPage: 235,   // 「双侧胸锁乳突肌紧张」
  },
  {
    id: 'deep_neck_flexor',
    name: '深层颈屈肌',
    alias: ['颈深屈肌', '颈长肌', '头长肌', '颅颈回缩肌'],
    region: 'neck_shoulder', type: 'weak', side: 'front', x: 52.5, y: 15.0,
    desc: '脖子前面深层，负责收下巴，长期低头会变弱',
    senses: ['收下巴没力气', '头往前探', '脖子撑不住头', '后颈发沉'],
    bookPage: 235,   // 「颅颈回缩肌或伸肌肌力减弱或疲劳」
  },
  {
    id: 'suboccipital',
    name: '枕下肌群',
    alias: ['枕下肌'],
    region: 'neck_shoulder', type: 'tight', side: 'back', x: 50.0, y: 12.0,
    desc: '后脑勺和脖子交界处的深层小肌肉，低头久了最累的就是它',
    senses: ['后脑勺酸', '后脑勺和脖子交界处疼', '头疼', '太阳穴紧'],
    bookPage: 235,   // 「枕下肌群的紧张」
  },
  {
    id: 'splenius_capitis',
    name: '头夹肌',
    alias: ['夹肌', '颈浅伸肌'],
    region: 'neck_shoulder', type: 'tight', side: 'back', x: 46.0, y: 16.5,
    desc: '后颈两侧，负责抬头和转头，长期前伸姿势会过劳',
    senses: ['后脑勺发沉', '抬头费劲', '转头酸胀'],
    bookPage: 217,
  },
  {
    id: 'levator_scapulae',
    name: '肩胛提肌',
    alias: [],
    region: 'neck_shoulder', type: 'tight', side: 'back', x: 42.0, y: 20.5,
    desc: '从颈椎连到肩胛骨内上角，一按就痛的那条',
    senses: ['肩胛骨内侧上方疼', '一按就痛', '落枕', '脖子连肩膀酸'],
    bookPage: 235,   // 颅颈区「可能的原因」中列出
  },
  {
    id: 'trapezius_upper',
    name: '上斜方肌',
    alias: ['斜方肌上束', '斜方肌'],
    region: 'neck_shoulder', type: 'tight', side: 'back', x: 35.5, y: 22.0,
    desc: '脖子两侧到肩膀的大片，一紧张就往上耸肩',
    senses: ['脖子酸', '脖子两侧发紧', '耸肩', '转头受限', '肩膀僵硬'],
    bookPage: 89,    // 肩胛胸壁模式「肩胛骨上旋肌力减弱：斜方肌上束」
  },
  {
    id: 'scalenes',
    name: '斜角肌',
    alias: ['前斜角肌', '中斜角肌'],
    region: 'neck_shoulder', type: 'tight', side: 'front', x: 45, y: 13.4,
    desc: '脖子两侧深层，连着第 1、2 根肋骨，长期用胸式呼吸会过劳',
    senses: ['脖子根部两侧紧', '肩膀往上的地方发紧', '呼吸浅', '转头受限', '手容易凉'],
    bookNote: 'clinic',   // 书未列名。按解剖常识：提肋辅助吸气 + 颈椎侧屈稳定，头前伸必代偿
  },

  // ============ 胸背 upper_back ============
  {
    id: 'pectoralis_major',
    name: '胸大肌',
    alias: [],
    region: 'upper_back', type: 'tight', side: 'front', x: 37, y: 27,
    desc: '胸前主力，含胸驼背时它会缩短变紧',
    senses: ['胸前发紧', '含胸', '圆肩', '扩胸不舒服'],
    bookPage: 89,    // 「胸部前侧肌肉紧张：胸大肌」
  },
  {
    id: 'pectoralis_minor',
    name: '胸小肌',
    alias: [],
    region: 'upper_back', type: 'tight', side: 'front', x: 40, y: 23,
    desc: '胸大肌深层，连到肩胛骨，紧了会把肩膀往前拽',
    senses: ['胸前深层紧', '呼吸浅', '驼背', '肩膀往前'],
    bookPage: 89,    // 「胸部前侧肌肉紧张：胸小肌」
  },
  {
    id: 'subscapularis',
    name: '肩胛下肌',
    alias: [],
    region: 'upper_back', type: 'tight', side: 'front', x: 31, y: 29,
    desc: '肩胛骨前面，肩袖里唯一的内旋肌，紧了会限制抬手',
    senses: ['肩膀前面深处酸', '抬手卡住', '手往后背够不到'],
    bookPage: 88,    // 「内旋肌紧张：肩胛下肌」
  },
  {
    id: 'latissimus_dorsi',
    name: '背阔肌',
    alias: [],
    region: 'upper_back', type: 'tight', side: 'back', x: 36, y: 36,
    desc: '腋下后方最宽的那块，紧了会把肩膀往下拽',
    senses: ['腋下后方紧', '抬手受限', '腰背两侧紧'],
    bookPage: 88,    // 「肩部内收肌或伸肌紧张：背阔肌」
  },
  {
    id: 'teres_major',
    name: '大圆肌',
    alias: [],
    region: 'upper_back', type: 'tight', side: 'back', x: 32, y: 22.3,
    desc: '背阔肌的小助手，从肩胛骨下角连到上臂，紧了会把肩膀往下往内拽',
    senses: ['腋后方深处紧', '手臂往后够不到', '后背排骨缝发酸'],
    bookPage: 88,    // 「内旋肌紧张：胸大肌、肩胛下肌、背阔肌、大圆肌」——书里列名
    bookNote: 'book',
  },
  {
    id: 'supraspinatus',
    name: '冈上肌',
    alias: ['肩上肌'],
    region: 'upper_back', type: 'weak', side: 'back', x: 34, y: 24,
    desc: '肩胛骨上方深层，负责启动抬手动作，抬手费劲时常是它没力气',
    senses: ['抬手费劲', '抬手肩膀疼', '手臂抬不起来', '侧举没劲'],
    bookPage: 88,    // 「外展肌或前屈肌肌力减弱：冈上肌」
  },
  {
    id: 'infraspinatus',
    name: '冈下肌',
    alias: [],
    region: 'upper_back', type: 'weak', side: 'back', x: 33, y: 27,
    desc: '肩胛骨背面，负责把手臂往外转，久坐含胸会变弱',
    senses: ['肩膀后面深处酸', '手往后背够不到', '肩不稳'],
    bookPage: 88,    // 「外旋肌肌力减弱：冈下肌」
  },
  {
    id: 'teres_minor',
    name: '小圆肌',
    alias: [],
    region: 'upper_back', type: 'weak', side: 'back', x: 32, y: 20.1,
    desc: '冈下肌的搭档，一起负责手臂外旋，常和冈下肌一起变弱',
    senses: ['肩膀后面深处酸', '手往后背够不到', '手臂外转没力', '肩前不稳'],
    bookPage: 88,    // 「外旋肌肌力减弱：冈下肌、小圆肌、三角肌后束」——书里列名
    bookNote: 'book',
  },
  {
    id: 'deltoid',
    name: '三角肌',
    alias: ['肩上肌群', '肩头'],
    region: 'upper_back', type: 'weak', side: 'both', x: 27, y: 19.3,
    desc: '肩膀外面那个圆包，前中后三束一起才凑得出抬手这个动作',
    // ℹ️ 书里三束全落在「过弱」一侧：前束 / 中束→「外展肌或前屈肌肌力减弱」，
    //    后束→「外旋肌肌力减弱」，所以整组默认标 weak（日常说的"前束很紧"是另一回事）
    senses: ['肩膀没劲', '抬手费劲', '手臂侧举发抖', '肩膀塌'],
    bookPage: 88,    // 「外展肌或前屈肌肌力减弱：三角肌前束、三角肌中束…」
    bookNote: 'book',
  },
  {
    id: 'serratus_anterior',
    name: '前锯肌',
    alias: [],
    region: 'upper_back', type: 'weak', side: 'front', x: 34, y: 33,
    desc: '肋骨侧面，负责让肩胛骨贴着后背，弱了肩胛骨会翘起来',
    senses: ['抬手费力', '翼状肩胛', '肩膀不平', '抬手耸肩'],
    bookPage: 89,    // 「肩胛骨上旋肌力减弱：前锯肌」
  },
  {
    id: 'rhomboid',
    name: '菱形肌',
    alias: ['大菱形肌', '小菱形肌'],
    region: 'upper_back', type: 'weak', side: 'back', x: 42, y: 25,
    desc: '两肩之间，负责把肩胛骨往中间夹，含胸时被拉长变弱',
    senses: ['两肩之间酸', '肩胛骨内侧缘疼', '夹背没力'],
    bookPage: 89,    // 「肩胛骨后缩肌力减弱：菱形肌」（见文档第五节：也可为紧张）
  },
  {
    id: 'trapezius_middle',
    name: '中斜方肌',
    alias: ['斜方肌中束'],
    region: 'upper_back', type: 'weak', side: 'back', x: 39, y: 28,
    desc: '两肩之间偏中，负责把肩胛骨往后收',
    senses: ['肩胛骨不稳', '夹背没力', '两肩之间酸'],
    bookPage: 89,    // 「肩胛骨后缩肌力减弱：斜方肌中束」
  },
  {
    id: 'trapezius_lower',
    name: '下斜方肌',
    alias: ['斜方肌下束'],
    region: 'upper_back', type: 'weak', side: 'back', x: 45, y: 33,
    desc: '中背部，负责抬手时把肩胛骨往下压住',
    senses: ['中背部空', '抬手肩胛乱跑', '背部没力'],
    bookPage: 89,    // 「肩胛骨上旋肌力减弱：斜方肌下束」
  },

  // ============ 腰骨盆 low_back_hip ============
  {
    id: 'iliopsoas',
    name: '髂腰肌',
    alias: ['腰大肌', '髂肌'],
    region: 'low_back_hip', type: 'tight', side: 'front', x: 46, y: 50,
    desc: '从腰椎连到大腿骨，久坐会变短，是骨盆前倾的一半原因',
    senses: ['久坐后髋前侧紧', '站起来要缓一下', '腰酸', '小腹前顶'],
    bookPage: 281,   // 「髋关节屈肌紧张：髂腰肌」
  },
  {
    id: 'quadratus_lumborum',
    name: '腰方肌',
    alias: [],
    region: 'low_back_hip', type: 'tight', side: 'back', x: 43, y: 42,
    desc: '腰两侧深层，负责侧屈和稳住骨盆',
    senses: ['腰侧面酸', '单侧腰紧', '久坐一侧疼'],
    bookPage: 225,
  },
  {
    id: 'erector_spinae',
    name: '竖脊肌',
    alias: ['骶棘肌', '腰髂肋肌', '胸最长肌'],
    region: 'low_back_hip', type: 'tight', side: 'back', x: 47, y: 38,
    desc: '脊柱两侧的长条肌肉（腰段易紧、胸段易弱）',
    senses: ['腰两侧发僵', '久坐后直不起来', '弯腰酸'],
    bookPage: 236,   // 胸椎模式「竖脊肌区域性肌力减弱」；腰段见 281「腰背部伸肌紧张」
  },
  {
    id: 'multifidus',
    name: '多裂肌',
    alias: ['竖脊肌深层'],
    region: 'low_back_hip', type: 'weak', side: 'back', x: 48, y: 25.9,
    desc: '贴着脊椎骨长的短肌肉，一节一节把脊柱扣住，久坐最容易失活',
    senses: ['脊柱两侧深处酸', '久坐腰空', '弯腰起来要扶着', '腰说不上哪里疼'],
    bookNote: 'clinic',   // 书未列名。依据：它是最典型的节段稳定肌，久坐失活是公认现象
  },
  {
    id: 'rectus_abdominis',
    name: '腹直肌',
    alias: [],
    region: 'low_back_hip', type: 'weak', side: 'front', x: 50, y: 42,
    desc: '肚子前面，负责让骨盆后倾、稳住腰',
    senses: ['肚子撑不住腰', '仰卧起坐起不来', '腰容易闪'],
    bookPage: 281,   // 「强化腹部肌肉力量」
  },
  {
    id: 'transversus_abdominis',
    name: '腹横肌',
    // ⚠️ 原 alias 里的 '腹内斜肌' / '腹外斜肌' 已移除——这两块现在各自独立成组，
    //    留着会让 AI 把"侧腹紧"错误匹配到腹横肌这块深层肌上
    alias: [],
    region: 'low_back_hip', type: 'weak', side: 'front', x: 44, y: 40,
    desc: '肚子最深一层，像天然束腰，弱了腰就没支撑',
    senses: ['核心发不上力', '腰容易闪', '肚子松'],
    bookPage: 235,   // 「核心稳定性训练」
  },
  {
    id: 'obliquus_externus',
    name: '腹外斜肌',
    alias: ['侧腹'],
    region: 'low_back_hip', type: 'weak', side: 'front', x: 42, y: 34.3,
    desc: '腰两侧最外面一层，负责转身和向侧面弯腰，久坐不转体就慢慢没力',
    senses: ['腰两侧没力', '转身不得劲', '侧弯摇晃', '肚子松垮'],
    bookNote: 'infer',   // 书未列名。p.281 只泛说"强化腹部肌肉力量"，属同群推断
  },
  {
    id: 'obliquus_internus',
    name: '腹内斜肌',
    alias: [],
    region: 'low_back_hip', type: 'weak', side: 'front', x: 45, y: 40.3,
    desc: '腹外斜肌下面一层，转身时负责刹车，还和腹横肌一起撑住腰腹',
    senses: ['转身收不住', '核心发不上力', '跑步身体乱晃', '腰容易闪'],
    bookNote: 'infer',   // 同 obliquus_externus
  },
  {
    id: 'gluteus_maximus',
    name: '臀大肌',
    alias: [],
    region: 'low_back_hip', type: 'weak', side: 'back', x: 40, y: 54,
    desc: '屁股主力，久坐会变弱，弱了上楼和站起都费劲',
    senses: ['屁股没力', '上楼腿先累', '站起来费劲', '腰酸'],
    bookPage: 281,   // 「髋关节后伸肌力减弱：臀大肌」→ 治法「臀桥」
  },
  {
    id: 'gluteus_medius',
    name: '臀中肌',
    alias: [],
    region: 'leg', type: 'weak', side: 'back', x: 33, y: 52,
    desc: '屁股外侧，负责单腿站立稳定，弱了膝盖会内扣',
    senses: ['单腿站不稳', '走路晃', '膝盖内扣', '胯外侧酸'],
    bookPage: 281,
  },
  {
    id: 'piriformis',
    name: '梨状肌',
    alias: [],
    region: 'low_back_hip', type: 'tight', side: 'back', x: 45, y: 55,
    desc: '屁股深层，坐久了会紧，紧了可能刺激到附近的坐骨神经',
    // ⚠️ 原 senses 里的"坐久麻"已删除——"麻"是红旗词会被护栏拦截，留着自相矛盾
    senses: ['屁股深处酸', '屁股疼连腿', '久坐屁股疼'],
    bookPage: 253,
  },
  {
    id: 'tensor_fasciae_latae',
    name: '阔筋膜张肌',
    // ⚠️ 原 alias 里的 '髂胫束' 已移除——髂胫束现在独立成组（iliotibial_tract）
    alias: [],
    region: 'leg', type: 'tight', side: 'front', x: 35, y: 54,
    desc: '大腿外侧上方，往下接髂胫束，紧了会拉着膝盖外侧',
    senses: ['大腿外侧紧', '跑步膝外侧痛', '胯外侧紧'],
    bookPage: 281,
  },

  // ============ 下肢 leg ============
  {
    id: 'iliotibial_tract',
    name: '髂胫束',
    alias: ['大腿外侧那条筋'],
    region: 'leg', type: 'tight', side: 'both', x: 31, y: 58.4,
    desc: '大腿外侧从上到下一整条筋膜带，跑步久了变紧会磨到膝盖外侧',
    senses: ['大腿外侧发紧', '跑步膝盖外侧疼', '侧卧胯疼', '腿外侧条索感'],
    bookNote: 'infer',   // 书未单独列。它是阔筋膜张肌的延续（TFL 在 p.281 有依据）
  },
  {
    id: 'hamstrings',
    name: '腘绳肌',
    alias: ['股二头肌', '半腱肌', '半膜肌'],
    region: 'leg', type: 'tight', side: 'back', x: 41, y: 64,
    desc: '大腿后侧（注意：在膝模式里是紧张，在髋模式里是弱）',
    senses: ['大腿后侧紧', '弯腰摸不到地', '腘窝紧'],
    bookPage: 316,   // 膝模式「膝屈肌紧张」；髋模式见 281（后伸肌力减弱）
  },
  {
    id: 'quadriceps',
    name: '股四头肌',
    alias: ['股内侧肌', '股外侧肌', '股中间肌'],
    region: 'leg', type: 'weak', side: 'front', x: 40, y: 63,
    desc: '大腿前面（股内侧肌、股外侧肌、股中间肌），负责伸直膝盖，弱了膝盖会发软。注：股直肌已单独列出',
    senses: ['膝盖发软', '下楼梯打软腿', '膝盖前面疼'],
    bookPage: 316,   // 「伸膝肌减弱：股四头肌的四块肌肉」；股直肌在 p.281 髋模式为紧张组，已拆为独立 id
  },
  {
    id: 'rectus_femoris',
    name: '股直肌',
    alias: ['股直肌（股四头肌）'],
    region: 'low_back_hip', type: 'tight', side: 'front', x: 40, y: 63,
    // 无独立 SVG 路径，涂色与点击映射到股四头肌色块（paintAs 为唯一别名真源）
    paintAs: 'quadriceps',
    desc: '股四头肌中唯一跨过髋和膝两个关节的肌肉，久坐会短缩，把骨盆往前拉',
    senses: ['髋前面紧', '大腿根前面紧', '久坐站起来髋前扯着'],
    bookPage: 281,   // 髋模式 p.281「髋关节屈肌紧张：髂腰肌、股直肌」
  },
  {
    id: 'hip_adductors',
    name: '髋内收肌',
    alias: ['髋内收肌群', '内收肌', '大收肌', '长收肌'],
    region: 'leg', type: 'tight', side: 'front', x: 47, y: 57,
    desc: '大腿内侧，负责把腿夹回来',
    senses: ['大腿内侧紧', '胯内侧酸', '腿并不拢'],
    bookPage: 253,
  },
  {
    id: 'sartorius',
    name: '缝匠肌',
    alias: [],
    region: 'leg', type: 'tight', side: 'front', x: 46, y: 60.2,
    desc: '从胯骨斜着绕过大腿内侧到膝盖，同时管屈髋屈膝，久坐会缩短',
    senses: ['大腿内侧偏前紧', '盘腿费劲', '膝盖内侧痛', '蹲不下去'],
    bookNote: 'infer',   // 书未列名。p.316「屈膝肌紧张」原句是腘绳肌，缝匠肌同属跨双关节屈肌
  },
  {
    id: 'gastrocnemius',
    name: '腓肠肌',
    // ⚠️ 原 alias 里的 '比目鱼肌' 已移除——比目鱼肌现在独立成组（soleus）
    alias: ['小腿三头肌'],
    region: 'leg', type: 'tight', side: 'back', x: 40, y: 79,
    desc: '小腿肚，跨膝和踝两个关节，紧了会拉跟腱',
    senses: ['小腿肚紧', '踮脚抽筋', '跟腱紧', '走多了小腿酸'],
    bookPage: 359,   // 「踝跖屈肌紧张：腓肠肌、比目鱼肌」
  },
  {
    id: 'soleus',
    name: '比目鱼肌',
    alias: ['小腿深层'],
    region: 'leg', type: 'tight', side: 'back', x: 41, y: 82.7,
    desc: '腓肠肌底下的宽扁肌肉，站着时的主力，常穿高跟鞋或久站会变紧',
    senses: ['小腿深处紧', '久站小腿酸', '踮脚不稳', '脚踝硬'],
    bookPage: 359,   // 「踝跖屈肌紧张：腓肠肌、比目鱼肌」——书里列名
    bookNote: 'book',
  },
  {
    id: 'fibularis',
    name: '腓骨肌群',
    alias: ['腓骨长肌', '腓骨短肌'],
    region: 'leg', type: 'tight', side: 'back', x: 37, y: 86.3,
    desc: '小腿外侧，负责脚往外翻和踩稳地面，紧了脚踝容易僵',
    senses: ['小腿外侧紧', '脚踝外侧酸', '崴脚后一直不舒服', '脚掌外侧吃力'],
    // ⚠️ 直觉容易把这块当成"崴脚后变弱"，但书 p.359 明确把腓骨长肌 / 短肌
    //    列在「踝跖屈肌紧张」一侧，默认按书的口径走
    bookPage: 359,   // 「踝跖屈肌紧张：腓肠肌、比目鱼肌、胫骨后肌、趾长屈肌、腓骨长肌和腓骨短肌」
    bookNote: 'book',
  },
  {
    id: 'tibialis_posterior',
    name: '胫骨后肌',
    alias: [],
    region: 'leg', type: 'tight', side: 'back', x: 42, y: 87.1,
    desc: '小腿最深层，从内侧兜住足弓，紧或疲劳都会让脚底内侧发酸',
    senses: ['脚底内侧酸', '脚踝里面疼', '走多了足弓痛', '脚踩不平'],
    // ⚠️ 常见说法是"胫骨后肌功能不全导致足弓塌陷"（偏弱，
    //    但书 p.359 把它列在「踝跖屈肌紧张」，默认按书走，文案别写成塌陷
    bookPage: 359,   // 「踝跖屈肌紧张：…胫骨后肌…」——书里列名
    bookNote: 'book',
  },
  {
    id: 'tibialis_anterior',
    name: '胫骨前肌',
    alias: [],
    region: 'leg', type: 'weak', side: 'front', x: 39, y: 80,
    desc: '小腿前面，负责勾脚，弱了走路容易绊脚',
    senses: ['勾脚没力', '走路绊脚', '小腿前侧酸'],
    bookPage: 359,   // 「踝背伸肌肌力减弱」
  },

  // ============ 上肢 arm（可选，默认不参与判断）============
  {
    id: 'biceps_brachii',
    name: '肱二头肌',
    alias: [],
    region: 'arm', type: 'tight', side: 'front', x: 27, y: 31,
    desc: '上臂前面，屈肘的主力',
    senses: ['上臂前面紧', '胳膊伸不直'],
    bookPage: 118,   // 肘模式「屈肘肌群紧张：肱二头肌」
  },
  {
    id: 'triceps_brachii',
    name: '肱三头肌',
    alias: [],
    region: 'arm', type: 'weak', side: 'back', x: 73, y: 31,
    desc: '上臂后面，伸肘的主力',
    senses: ['胳膊没劲', '手撑不住'],
    bookPage: 118,   // 「肘伸肌群肌力减弱：肱三头肌」
  },
  {
    id: 'brachioradialis',
    name: '肱桡肌',
    alias: [],
    region: 'arm', type: 'tight', side: 'front', x: 26, y: 37.4,
    desc: '前臂外侧靠肘的那条，攥东西和拎东西时发力，用鼠标久了会紧',
    senses: ['前臂外侧发紧', '手肘下方酸', '拎东西费劲', '鼠标手'],
    bookNote: 'infer',   // 书未列名。p.118「屈肘肌群紧张」的同群推断
  },
  {
    id: 'forearm_flexors',
    name: '前臂屈肌群',
    alias: ['腕屈肌', '桡侧腕屈肌', '尺侧腕屈肌'],
    region: 'arm', type: 'tight', side: 'front', x: 25, y: 43,
    desc: '前臂内侧，管握拳和屈腕，打字久了会紧',
    senses: ['前臂内侧紧', '手腕酸', '打字累', '高尔夫球肘'],
    bookPage: 141,   // 腕模式「腕屈肌紧张」
  },
  {
    id: 'forearm_extensors',
    name: '前臂伸肌群',
    alias: ['腕伸肌', '桡侧腕伸肌'],
    region: 'arm', type: 'weak', side: 'back', x: 75, y: 43,
    desc: '前臂外侧，管抬手背，弱了容易网球肘',
    senses: ['前臂外侧疼', '手背没劲', '网球肘'],
    bookPage: 141,   // 「腕伸肌肌力减弱」
  },
]

// 部位中文名
export const REGION_LABEL: Record<Region, string> = {
  neck_shoulder: '颈肩',
  upper_back: '胸背',
  low_back_hip: '腰骨盆',
  leg: '下肢',
  arm: '上肢',
}

// 前端必须做：拿 AI 返回的 id 跟这里做交集过滤，库外的一律丢掉
export const MUSCLE_IDS = new Set(MUSCLES.map(m => m.id))
export const MUSCLE_MAP = Object.fromEntries(MUSCLES.map(m => [m.id, m]))

export function filterByLibrary(ids: string[] = []): string[] {
  return ids.filter(id => MUSCLE_IDS.has(id))
}
