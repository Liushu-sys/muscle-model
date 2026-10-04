/**
 * BodyMap 动作库
 *
 * ⚠️ 为什么不是「47 块肌肉 × 4 场景 × 3 动作」：那样是 564 条文案，
 *    手写写不完，现场让 AI 生成则质量与安全都不可控。
 *    这里改成「动作 + 标签」：约 30 个动作，每个标明适用状态 / 部位 / 场景 /
 *    器材 / 姿态，第 4 页按「当前场景 × 肌肉状态 × 部位」现场挑 3 个出来。
 *    好处：文案量 564→30，人工能全量校一遍，不同肌肉的建议口径也保持一致。
 *
 * 场景四档：
 *   desk 还在工位，走不开    → 坐着、穿着工装、同事在旁边，动作必须隐蔽
 *   gym  有专业器械           → 健身房，能用器械和大重量
 *   open 有活动场地           → 公园 / 家里空地，能动但不方便躺、没器械
 *   bed  准备休息             → 床上或沙发，只想放松
 */

import type { Muscle, Region } from './muscles'

/** 第 4 页的四档场景 */
export type SceneId = 'desk' | 'gym' | 'open' | 'bed'

export const SCENE_LABEL: Record<SceneId, string> = {
  desk: '还在工位 · 走不开',
  gym: '有器械 · 健身房',
  open: '有场地 · 公园/在家',
  bed: '准备休息 · 床上',
}

export const SCENE_HINT: Record<SceneId, string> = {
  desk: '穿着工装、坐着、同事在旁边的那种',
  gym: '有器械，能大幅动起来',
  open: '能动，但不方便躺下，也没有器械',
  bed: '只想摊着放松',
}

/**
 * 动作方向。区分它的意义在于：第 3 页的诊断是「过劳」还是「过弱」，
 * 直接决定这里该给伸展还是给激活——给反了会加重。
 */
export type ActionKind =
  | 'release'   // 松解：按压 / 滚轴，让持续收缩的肌肉松下来
  | 'stretch'   // 拉伸：把短缩的肌肉拉长
  | 'activate'  // 激活强化：让被抑制的肌肉重新学会发力
  | 'mobilize'  // 活动：整条链一起动开
  | 'relax'     // 舒缓：不追求效果，主要是舒服

export const KIND_LABEL: Record<ActionKind, string> = {
  release: '松解',
  stretch: '拉伸',
  activate: '激活',
  mobilize: '活动',
  relax: '舒缓',
}

export interface Action {
  id: string
  name: string
  /** 针对过劳(T)还是过弱(W)，both 表示两种状态都适用 */
  forState: 'tight' | 'weak' | 'both'
  /** 主要作用的肌肉 id（命中这些 id 时权重最高） */
  muscles: string[]
  /** 兜底匹配的部位粒度 */
  regions: Region[]
  /** 这个动作在哪些场景做得到 */
  scenes: SceneId[]
  gear: 'none' | 'band' | 'gym' | 'wall' | 'foam'
  posture: 'sit' | 'stand' | 'lie' | 'any'
  kind: ActionKind
  /** 怎么做——大白话，能让完全没运动基础的人照着做对 */
  howto: string
  /** 剂量：几次 / 多久 */
  dose: string
  /** 为什么有效，一句话点到关键点 */
  why: string
  /** 做错了会难受的提醒，没有就不写 */
  caution?: string
}

export const ACTIONS: Action[] = [
  // ══════════════ 颈肩 ══════════════
  {
    id: 'chin_tuck',
    name: '收下巴（不是低头）',
    forState: 'weak',
    muscles: ['deep_neck_flexor'],
    regions: ['neck_shoulder'],
    scenes: ['desk', 'open', 'bed'],
    gear: 'none', posture: 'sit', kind: 'activate',
    howto: '坐直，目光平视。下巴平着往后缩，缩出"双下巴"的感觉，后颈被拉长，停 3 秒放松。注意是平移不是低头。',
    dose: '10 次 × 2 组',
    why: '专门练长期低头废掉的深层颈屈肌，它是把头拉回正位的关键肌肉。',
    caution: '不要仰头也不要低头，是水平后缩',
  },
  {
    id: 'csm_release',
    name: '按胸锁乳突肌',
    forState: 'tight',
    muscles: ['sternocleidomastoid'],
    regions: ['neck_shoulder'],
    scenes: ['desk', 'gym', 'open', 'bed'],
    gear: 'none', posture: 'sit', kind: 'release',
    howto: '头微微转到对侧、稍后仰，脖子前面那条绷起来的"带子"就是它。用两指指腹从上往下轻按到下发，慢慢打圈，别用指甲掐。',
    dose: '每侧 1 分钟',
    why: '它一缩短就把下巴往前拉，是头前伸姿势的直接推手。',
    caution: '力度到酸胀就够，别按到咳嗽或头晕',
  },
  {
    id: 'scalene_stretch',
    name: '斜角肌拉伸',
    forState: 'tight',
    muscles: ['scalenes'],
    regions: ['neck_shoulder'],
    scenes: ['desk', 'gym', 'open'],
    gear: 'none', posture: 'sit', kind: 'stretch',
    howto: '手绕过头顶放在对侧耳朵上方，把头往侧前方轻轻牵，同时同侧肩膀往下沉。感觉到脖子侧面到锁骨上方一条被拉开。',
    dose: '每侧 30 秒 × 2',
    why: '长期胸式呼吸会让它过劳，紧了会卡住脖子根部，还容易牵涉到手。',
    caution: '有手麻就停下来，别硬拉',
  },
  {
    id: 'subocc_release',
    name: '枕下肌群放松（毛巾卷）',
    forState: 'tight',
    muscles: ['suboccipital'],
    regions: ['neck_shoulder'],
    scenes: ['bed', 'gym', 'open'],
    gear: 'none', posture: 'lie', kind: 'release',
    howto: '把毛巾卷成直径约 8cm 的卷，垫在后脑勺和脖子交界的凹陷处，平躺，头自然往后坠，左右轻轻转头。',
    dose: '5–10 分钟',
    why: '低头看屏幕时最累的就是这群深层小肌肉，它们紧起来最接近"后脑勺酸到头疼"。',
  },
  {
    id: 'levator_release',
    name: '肩胛提肌放松',
    forState: 'tight',
    muscles: ['levator_scapulae', 'splenius_capitis'],
    regions: ['neck_shoulder'],
    scenes: ['desk', 'gym', 'open'],
    gear: 'none', posture: 'sit', kind: 'release',
    howto: '低头、往对侧转 45 度，同侧手够到肩胛骨内上角那个硬点，按着做小幅度的耸肩。',
    dose: '每侧 45 秒',
    why: '就是"一按就痛的那条"，单肩负重背包的人最容易中。',
  },
  {
    id: 'trap_release',
    name: '耸肩再沉肩',
    forState: 'tight',
    muscles: ['trapezius_upper'],
    regions: ['neck_shoulder'],
    scenes: ['desk', 'gym', 'open', 'bed'],
    gear: 'none', posture: 'any', kind: 'release',
    howto: '肩膀用力耸到顶，停 3 秒，然后一下子完全松掉让肩膀掉下来。给它一个明确的"松"的信号。',
    dose: '10 次',
    why: '一直绷着的肌肉只对"彻底松开"有反应，慢慢揉反而没用。',
  },

  // ══════════════ 胸背 / 肩 ══════════════
  {
    id: 'pec_stretch',
    name: '门框胸肌拉伸',
    forState: 'tight',
    muscles: ['pectoralis_major', 'pectoralis_minor'],
    regions: ['upper_back'],
    scenes: ['gym', 'open'],
    gear: 'wall', posture: 'stand', kind: 'stretch',
    howto: '手肘抬到与肩同高，前臂贴门框，身体往前跨一步。手臂位置高一点拉胸小肌，低一点拉胸大肌下部。',
    dose: '每侧 30 秒 × 2',
    why: '含胸驼背时胸前的肌肉会缩短，把肩膀整个往前拽，必须先松开这一侧肩膀才能回去。',
  },
  {
    // 为什么单独做一条：门框在工位不一定有，而"胸前发紧"是办公室最高频的主诉之一。
    // 没有这条时，工位场景下针对胸大肌的动作只剩「毛巾背手」，凑不满 3 个就会
    // 掉进部位兜底，把没诊断到的肌肉推给用户。
    id: 'chair_pec_open',
    name: '扶椅背扩胸',
    forState: 'tight',
    muscles: ['pectoralis_major', 'pectoralis_minor'],
    regions: ['upper_back'],
    scenes: ['desk'],
    gear: 'none', posture: 'sit', kind: 'stretch',
    howto: '坐直，右手抓住椅背或座位右缘，身体慢慢向左前方转开，胸口朝左上打开；感觉到右胸前方被拉开就停住。换边。',
    dose: '每侧 30 秒 × 2',
    why: '把胸前缩短的肌肉拉长，肩膀才有空间往后回到正位——光练夹背不松开前面，两头会一直拔河。',
    caution: '肩膀前面有刺痛、或手臂发麻就停下，退到不痛的幅度',
  },
  {
    id: 'desk_scap_set',
    name: '贴椅背收肩胛',
    forState: 'weak',
    muscles: ['trapezius_middle', 'rhomboid', 'trapezius_lower'],
    regions: ['upper_back'],
    scenes: ['desk'],
    gear: 'none', posture: 'sit', kind: 'activate',
    howto: '把后背贴上椅背，两肘垂在身侧，肩胛骨往后下方压，想象把它们塞进后裤兜；保持 5 秒再松开。全程别耸肩、别挺腰。',
    dose: '10 次 × 2 组，每小时来一组',
    why: '被拉长变弱的肩胛后缩肌需要反复"想起来怎么发力"，坐着的每一次提醒都比去健身房一次更管用。',
  },
  {
    id: 'serratus_desk_push',
    name: '桌面推掌',
    forState: 'weak',
    muscles: ['serratus_anterior'],
    regions: ['upper_back'],
    scenes: ['desk', 'open'],
    gear: 'none', posture: 'sit', kind: 'activate',
    howto: '双手掌根抵住桌沿，手臂几乎伸直。肩胛骨往前送出去（像要用手掌把桌子推开），轻轻发力 5 秒，再放松。',
    dose: '8 次 × 2 组',
    why: '前锯肌负责让肩胛骨贴着胸廓往前滑，它一弱，肩胛骨就翘起来，抬手时肩膀会卡。',
    caution: '不要用力到耸肩或憋气，发力五六成即可',
  },
  {
    // 床上场景针对胸大肌的动作：本页明确要"准备休息"也该有的选择。
    // 没有它时，肩胛胸壁模式在 bed 场景凑不满，只能掉进部位兜底，
    // 把「按胸锁乳突肌」推给一个脖子完全没问题的用户。
    id: 'pec_side_open',
    name: '侧躺开胸',
    forState: 'tight',
    muscles: ['pectoralis_major', 'pectoralis_minor'],
    regions: ['upper_back'],
    scenes: ['bed'],
    gear: 'none', posture: 'lie', kind: 'stretch',
    howto: '侧躺，上侧手掌撑在胸前床面上，慢慢把身体往后转开（像翻身但肩膀留在原地），胸口被拉开就停住。换边。',
    dose: '每侧 30 秒 × 2',
    why: '躺着不用支撑体重，是拉开胸前的肌肉最省力的时候，睡前做一组当晚就松一点。',
    caution: '肩膀前面有刺痛就减小幅度，或先别做',
  },
  {
    id: 'scap_squeeze',
    name: '夹背（背后夹支笔）',
    forState: 'weak',
    muscles: ['rhomboid', 'trapezius_middle'],
    regions: ['upper_back'],
    scenes: ['desk', 'gym', 'open'],
    gear: 'none', posture: 'sit', kind: 'activate',
    howto: '坐直，两肘往后下方靠，肩胛骨往中间收紧，想象夹住背后的东西，停 3 秒松开。全程别耸肩。',
    dose: '10 次 × 2 组',
    why: '菱形肌和中斜方肌弱了，肩胛骨就往外跑，直接造成圆肩和被拉长的酸。',
  },
  {
    id: 'wall_angel',
    name: '靠墙天使',
    forState: 'both',
    muscles: ['pectoralis_minor', 'serratus_anterior', 'trapezius_middle', 'trapezius_lower'],
    regions: ['upper_back', 'neck_shoulder'],
    scenes: ['gym', 'open'],
    gear: 'wall', posture: 'stand', kind: 'mobilize',
    howto: '后脑、上背、臀部贴墙，手臂贴墙摆成投降姿势，手背贴着墙慢慢上下滑动。滑不上去的高度就是紧的地方。',
    dose: '10 次慢做',
    why: '一个动作同时松开胸前、练到肩胛控制，是圆肩含胸的通用动作。',
  },
  {
    id: 'serratus_push',
    name: '肩胛俯卧撑',
    forState: 'weak',
    muscles: ['serratus_anterior'],
    regions: ['upper_back'],
    scenes: ['gym', 'open'],
    gear: 'wall', posture: 'stand', kind: 'activate',
    howto: '面对墙推墙（或做俯卧撑姿势），手肘保持不弯，只让肩胛骨往前撑开、再用力往回收，身体随之微微前后移动。',
    dose: '12 次 × 2 组',
    why: '前锯肌负责把肩胛骨贴住后背，它一弱就会出现翼状肩胛和抬手耸肩。',
    caution: '只有肩胛在动，手肘别弯',
  },
  {
    id: 'ext_rotation',
    name: '弹力带肩外旋',
    forState: 'weak',
    muscles: ['infraspinatus', 'teres_minor', 'supraspinatus'],
    regions: ['upper_back'],
    scenes: ['gym', 'open'],
    gear: 'band', posture: 'stand', kind: 'activate',
    howto: '手肘夹在身体两侧屈 90 度，手握弹力带往外拉开，小臂像开门一样向外转动，再慢慢放回。',
    dose: '15 次 × 3 组',
    why: '外旋肌是肩关节的"安全带"，弱了抬手时肩膀会不稳、容易疼。',
  },
  {
    id: 'lat_stretch',
    name: '背阔肌拉伸',
    forState: 'tight',
    muscles: ['latissimus_dorsi', 'teres_major'],
    regions: ['upper_back'],
    scenes: ['gym', 'open'],
    gear: 'none', posture: 'stand', kind: 'stretch',
    howto: '单手扶柱子或墙，身体往后坐、往外侧倒，感觉从腋下到腰一整条被拉开。身体侧屈一点会更到位。',
    dose: '每侧 30 秒 × 2',
    why: '背阔肌紧会把整个肩膀往下压住，抬手受限很多时候根源在它，不在肩。',
  },
  {
    id: 'deltoid_activate',
    name: '侧平举（小重量）',
    forState: 'weak',
    muscles: ['deltoid'],
    regions: ['upper_back'],
    scenes: ['gym', 'open'],
    gear: 'band', posture: 'stand', kind: 'activate',
    howto: '手握小哑铃或弹力带，手臂从身体两侧抬到肩膀高度，慢抬慢放，别甩。',
    dose: '12 次 × 3 组',
    why: '三角肌中束是抬手的启动肌，它弱了抬手就只能靠耸肩代偿。',
    caution: '重量一定要小，用甩的等于没练',
  },

  // ══════════════ 腰骨盆 ══════════════
  {
    id: 'iliopsoas_stretch',
    name: '弓步髋屈肌拉伸',
    forState: 'tight',
    muscles: ['iliopsoas'],
    regions: ['low_back_hip'],
    scenes: ['gym', 'open'],
    gear: 'none', posture: 'stand', kind: 'stretch',
    howto: '前腿弓步、后腿膝盖跪地，把骨盆往前下方沉，同时后侧手臂往上举并朝对侧侧屈。感觉大腿根前面被拉开。',
    dose: '每侧 30 秒 × 2',
    why: '久坐让髋屈肌一直处在缩短位，是骨盆前倾的一半原因，也是站起来要缓一下的元凶。',
    caution: '别把腰往前顶来凑拉伸幅度',
  },
  {
    id: 'hip_bridge',
    name: '臀桥',
    forState: 'weak',
    muscles: ['gluteus_maximus'],
    regions: ['low_back_hip'],
    scenes: ['gym', 'open', 'bed'],
    gear: 'none', posture: 'lie', kind: 'activate',
    howto: '平躺屈膝，脚踩地与髋同宽，用屁股发力把髋顶起来，到肩-髋-膝一条直线，顶峰收紧 2 秒再慢慢放下。',
    dose: '15 次 × 3 组',
    why: '臀大肌不干活，下背和膝盖就得替它出力，很多腰酸、膝盖不适的根源在这。',
    caution: '应该是屁股酸，练完腰酸说明用腰顶了',
  },
  {
    id: 'cat_cow',
    name: '猫牛式',
    forState: 'both',
    muscles: ['erector_spinae', 'multifidus'],
    regions: ['low_back_hip'],
    scenes: ['gym', 'open', 'bed'],
    gear: 'none', posture: 'lie', kind: 'mobilize',
    howto: '四点跪姿，吸气塌腰抬头，呼气拱背低头，一节一节跟着呼吸动。慢到能感觉到每一节脊椎。',
    dose: '10 个呼吸',
    why: '给整条脊柱"上油"，对久坐后的腰部发僵最直接。',
  },
  {
    id: 'bird_dog',
    name: '鸟狗式',
    forState: 'weak',
    muscles: ['multifidus', 'erector_spinae'],
    regions: ['low_back_hip'],
    scenes: ['gym', 'open'],
    gear: 'none', posture: 'lie', kind: 'activate',
    howto: '四点跪姿，同时伸出对侧的手和腿并伸直，停 3 秒收回。全程骨盆别晃，像背上能放一杯水。',
    dose: '每侧 8 次 × 2 组',
    why: '练的是贴着脊椎、负责一节一节扣住脊柱的多裂肌，它弱了腰就"撑不住"。',
  },
  {
    id: 'clamshell',
    name: '蚌式开合',
    forState: 'weak',
    muscles: ['gluteus_medius'],
    regions: ['low_back_hip', 'leg'],
    scenes: ['gym', 'open', 'bed'],
    gear: 'band', posture: 'lie', kind: 'activate',
    howto: '侧躺屈膝，脚跟并拢，上侧膝盖往上打开到最大，慢慢放下。骨盆别跟着往后转。',
    dose: '每侧 15 次 × 2 组',
    why: '臀中肌管单腿站立的稳定，它弱了走路会晃、膝盖会内扣。',
  },
  {
    id: 'figure_four',
    name: '仰卧四字拉伸',
    forState: 'tight',
    muscles: ['piriformis', 'gluteus_medius'],
    regions: ['low_back_hip'],
    scenes: ['bed', 'open'],
    gear: 'none', posture: 'lie', kind: 'stretch',
    howto: '平躺，一只脚踝搭在另一条腿膝盖上摆成"4"字，双手抱住下方大腿往胸口带。',
    dose: '每侧 1 分钟',
    why: '坐久了屁股深处发紧，大多是臀深层在作怪；这个姿势不动也能拉开。',
    caution: '如果疼往腿后面窜就别做了',
  },
  {
    id: 'core_brace',
    name: '收腹激活（死虫式）',
    forState: 'weak',
    muscles: ['transversus_abdominis', 'rectus_abdominis', 'obliquus_internus'],
    regions: ['low_back_hip'],
    scenes: ['gym', 'open', 'bed'],
    gear: 'none', posture: 'lie', kind: 'activate',
    howto: '平躺双手举向天花板、双腿屈膝抬起。呼气时把腰压向地面（不是憋气猛收），保持腰贴地，缓慢放下对侧手脚交替。',
    dose: '每侧 8 次 × 2 组',
    why: '腹横肌是天然腰带，它不工作腰就失去了支撑。',
    caution: '全程腰不能离地，离了就换轻一点的版本',
  },
  {
    id: 'side_plank',
    name: '侧桥（可从屈膝版开始）',
    forState: 'weak',
    muscles: ['obliquus_externus', 'obliquus_internus', 'quadratus_lumborum'],
    regions: ['low_back_hip'],
    scenes: ['gym', 'open'],
    gear: 'none', posture: 'lie', kind: 'activate',
    howto: '侧躺用肘撑地，把髋抬起来让身体成一条直线。做不到就先屈膝，让膝盖和小腿外侧贴地。',
    dose: '每侧 20–30 秒 × 2',
    why: '练侧腹和腰方肌的耐力，跑步时身体乱晃、转身收不住都跟它们有关。',
  },
  {
    id: 'child_pose',
    name: '婴儿式 / 抱膝滚动',
    forState: 'both',
    muscles: ['erector_spinae', 'quadratus_lumborum'],
    regions: ['low_back_hip'],
    scenes: ['bed', 'open'],
    gear: 'none', posture: 'lie', kind: 'relax',
    howto: '跪坐把上身往前趴，手臂尽量往前伸，屁股坐在脚跟上；或者躺着抱住双膝轻轻左右摇。',
    dose: '1–2 分钟',
    why: '不给肌肉加任务，纯粹让腰部卸力，久坐一天后最舒服的第一步。',
  },

  // ══════════════ 下肢 ══════════════
  {
    id: 'hamstring_stretch',
    name: '毛巾拉腿（躺着拉腘绳肌）',
    forState: 'tight',
    muscles: ['hamstrings'],
    regions: ['leg'],
    scenes: ['gym', 'open', 'bed'],
    gear: 'band', posture: 'lie', kind: 'stretch',
    howto: '平躺，毛巾绕过一侧脚掌，双手拉住毛巾把腿慢慢往胸口带，膝盖能直就直、直不了微屈。',
    dose: '每侧 30 秒 × 2',
    why: '躺着拉最安全，不会像站着体前屈那样拿腰去代偿。',
    caution: '腿麻或疼放射到小腿就松开',
  },
  {
    id: 'wall_squat',
    name: '靠墙静蹲',
    forState: 'weak',
    muscles: ['quadriceps'],
    regions: ['leg'],
    scenes: ['gym', 'open'],
    gear: 'wall', posture: 'stand', kind: 'activate',
    howto: '背贴墙，脚往前站一步，慢慢下滑到膝盖微屈 60–90 度，膝盖不超过脚尖，保持住。',
    dose: '30 秒 × 3 组',
    why: '静态发力对膝盖最友好，同时练到股四头肌控制髌骨轨迹的能力。',
    caution: '膝盖不要超过脚尖，也别蹲太深',
  },
  {
    id: 'quad_set',
    name: '坐姿伸膝勾脚',
    forState: 'weak',
    muscles: ['quadriceps'],
    regions: ['leg'],
    scenes: ['desk', 'bed'],
    gear: 'none', posture: 'sit', kind: 'activate',
    howto: '坐直，小腿慢慢抬到水平，脚尖用力往回勾，绷住大腿前侧肌肉，停 5 秒放下。',
    dose: '每侧 10 次',
    why: '坐着就能给股四头肌上强度，对上下楼梯打软腿最对症。',
  },
  {
    id: 'itb_release',
    name: '髂胫束放松',
    forState: 'tight',
    muscles: ['iliotibial_tract', 'tensor_fasciae_latae'],
    regions: ['leg'],
    scenes: ['gym', 'open', 'bed'],
    gear: 'foam', posture: 'lie', kind: 'release',
    howto: '侧躺，泡沫轴垫在大腿外侧下方，从髋到膝慢慢滚，找到最酸的点停留 20 秒。没有泡沫轴就用手掌横向搓。',
    dose: '每侧 1–2 分钟',
    why: '髂胫束是跑步人群最常见的膝外侧痛来源，它本身拉不动，只能松。',
    caution: '直接拉它不是不行，是效果差；松解 + 练臀更有效',
  },
  {
    id: 'calf_release',
    name: '踮脚 + 靠墙压小腿',
    forState: 'both',
    muscles: ['gastrocnemius', 'soleus', 'fibularis'],
    regions: ['leg'],
    scenes: ['desk', 'gym', 'open', 'bed'],
    gear: 'wall', posture: 'stand', kind: 'activate',
    howto: '先跺——坐着或站着反复抬起脚跟再放下，促进回流；再拉伸——面对墙，后腿伸直、脚跟踩实，身体前倾。两者都做。',
    dose: '踮脚 20 次 + 拉伸每侧 30 秒',
    why: '小腿是"第二心脏"，久坐它停摆，血液回流就变差；动起来比单纯拉更有效。',
  },
  {
    // 为什么要跟上面那条并存：直腿压小腿拉的是腓肠肌，屈膝才能越过它拉到
    // 下面的比目鱼肌。书 p.359 踝模式里这两块是并列列名的，只给一个动作
    // 会让"比目鱼肌过劳"的诊断在页面上落不了地。
    id: 'soleus_stretch',
    name: '屈膝压小腿',
    forState: 'tight',
    muscles: ['soleus', 'gastrocnemius'],
    regions: ['leg'],
    scenes: ['desk', 'gym', 'open', 'bed'],
    gear: 'wall', posture: 'stand', kind: 'stretch',
    howto: '面对墙，后腿屈膝、脚跟踩实，身体慢慢前倾。感觉在跟腱上方、小腿深处被拉开就停住——屈膝是关键。',
    dose: '每侧 30 秒 × 2',
    why: '比目鱼肌藏在腓肠肌下面，直腿拉伸绕不过去；久站久坐的人常常是它先紧。',
    caution: '脚踝有旧伤就别压到极限，退到不痛的幅度',
  },
  {
    // 工位/床上版本的腘绳肌拉伸：毛巾拉腿要躺下，这两个场景做不了，
    // 缺了它「膝盖外侧疼」在工位的三个动作里会有两个靠部位兜底。
    id: 'ham_seated_stretch',
    name: '坐姿伸腿够脚尖',
    forState: 'tight',
    muscles: ['hamstrings', 'iliotibial_tract'],
    regions: ['leg'],
    scenes: ['desk', 'bed'],
    gear: 'none', posture: 'sit', kind: 'stretch',
    howto: '坐直，一条腿往前伸直、脚尖朝上，背保持不弓，从髋部慢慢往前倾到大腿后侧被拉开。想带到外侧就把脚尖稍微内转。',
    dose: '每侧 30 秒 × 2',
    why: '久坐让大腿后侧的肌肉一直处在缩短位、髋又不动，膝盖就替它们扛了压力。',
    caution: '腰不舒服就把手撑在腿上，别弓着背硬够',
  },
  {
    id: 'tibialis_activate',
    name: '勾脚 / 脚跟走路',
    forState: 'weak',
    muscles: ['tibialis_anterior'],
    regions: ['leg'],
    scenes: ['desk', 'gym', 'open', 'bed'],
    gear: 'none', posture: 'sit', kind: 'activate',
    howto: '坐着或站着，脚尖用力往回勾到极限，停 2 秒放松；能站起来就踮着脚走路 30 秒。',
    dose: '20 次 / 走 30 秒',
    why: '胫骨前肌弱了脚抬不起来，走路容易绊脚、小腿前侧容易酸。',
  },
  {
    id: 'adductor_stretch',
    name: '坐姿蛙式 /  butterfly',
    forState: 'tight',
    muscles: ['hip_adductors', 'sartorius'],
    regions: ['leg'],
    scenes: ['gym', 'open', 'bed'],
    gear: 'none', posture: 'lie', kind: 'stretch',
    howto: '坐在地上脚心相对，双手握住脚，膝盖自然往下沉；身体微微前倾加重。',
    dose: '1–2 分钟',
    why: '内收肌久坐会缩短，紧了会限制髋的活动，也会让骨盆更不稳。',
  },

  // ══════════════ 上肢 ══════════════
  {
    id: 'wrist_stretch',
    name: '前臂拉伸（两个方向都拉）',
    forState: 'tight',
    muscles: ['forearm_flexors', 'brachioradialis'],
    regions: ['arm'],
    scenes: ['desk', 'gym', 'open', 'bed'],
    gear: 'none', posture: 'any', kind: 'stretch',
    howto: '手掌朝下，另一只手把手指往下压拉前臂外侧；再翻过来掌朝上、手指往下压拉内侧。两个方向都要做。',
    dose: '每侧每方向 30 秒',
    why: '鼠标键盘让前臂屈肌长期缩着，只拉一个方向没用。',
  },
  {
    id: 'wrist_extend',
    name: '腕伸展（轻重量）',
    forState: 'weak',
    muscles: ['forearm_extensors'],
    regions: ['arm'],
    scenes: ['desk', 'gym', 'open', 'bed'],
    gear: 'band', posture: 'sit', kind: 'activate',
    howto: '前臂搁在桌沿或大腿上，手悬空握个轻东西，手腕慢慢往上抬再放下。',
    dose: '15 次 × 2 组',
    why: '网球肘之类的常见问题的方向是"伸肌偏弱"，不是一味按揉。',
    caution: '重量一定要轻，这是耐力活不是力量活',
  },
  {
    id: 'arm_plateau',
    name: '手肘找支撑 + 大幅活动',
    forState: 'both',
    muscles: ['biceps_brachii', 'triceps_brachii'],
    regions: ['arm'],
    scenes: ['desk', 'gym', 'open', 'bed'],
    gear: 'none', posture: 'any', kind: 'mobilize',
    howto: '先把手肘落在桌面或扶手上（悬空时大臂要一直使劲），再做上臂前后绕圈各 10 圈，最后完整伸直肘再完全弯曲几次。',
    dose: '各 10 次，随时做',
    why: '很多上臂酸其实是"悬空太久"，先去掉负荷再谈拉伸。',
  },
  {
    id: 'subscap_release',
    name: '毛巾背手',
    forState: 'tight',
    muscles: ['subscapularis', 'pectoralis_major'],
    regions: ['upper_back'],
    scenes: ['desk', 'gym', 'open', 'bed'],
    gear: 'none', posture: 'stand', kind: 'release',
    howto: '双手在背后抓一条毛巾，上侧手在上、下侧手在下，用上面的手慢慢把下面的手往上拉；拉到极限停住，再慢慢换边。',
    dose: '每侧 30 秒，每天 1–2 次',
    why: '肩胛下肌是唯一的内旋肌，它一缩短就卡住抬手和手往后背的动作，靠这条毛巾能温和地拉开。',
    caution: '肩膀前面疼就别往上顶，退回轻松的幅度',
  },
  {
    id: 'arch_towel',
    name: '抓毛巾提足弓',
    forState: 'weak',
    muscles: ['tibialis_posterior'],
    regions: ['leg'],
    scenes: ['desk', 'open', 'bed'],
    gear: 'none', posture: 'sit', kind: 'activate',
    howto: '地上放条毛巾，脚踩在上面，只用脚趾反复把毛巾往回抓、把足弓拎起来（脚跟和前脚掌不要离地）。站不起来就坐着做.',
    dose: '每侧 20 次，早晚各一轮',
    why: '胫骨后肌从内侧兜住足弓，它一累足弓就塌，走多了脚底内侧会酸。这个动作是练它的标准做法。',
    caution: '是小幅度精细动作，别用大腿和脚趾去硬拽',
  },
  {
    id: 'lying_er',
    name: '躺着练肩袖（外旋）',
    forState: 'weak',
    muscles: ['supraspinatus', 'infraspinatus', 'teres_minor', 'deltoid'],
    regions: ['upper_back'],
    scenes: ['bed', 'open', 'gym'],
    gear: 'none', posture: 'lie', kind: 'activate',
    howto: '躺着或半躺，手肘旁边垫个小毛巾卷让上臂离开身体一点，屈肘 90 度，用小臂像开门一样向外转，再慢慢放回。想加负荷就手里握瓶水。',
    dose: '每侧 15 次 × 2 组',
    why: '肩袖是肩关节的"安全带"，躺着装也能练——而且躺姿下肩膀不容易耸起来代偿，姿势反而更标准。',
    caution: '幅度别追求大，慢而可控才有效',
  },
  {
    id: 'lying_scap',
    name: '躺着找回肩胛',
    forState: 'both',
    muscles: ['serratus_anterior', 'rhomboid', 'trapezius_middle', 'trapezius_lower'],
    regions: ['upper_back'],
    scenes: ['bed', 'open'],
    gear: 'none', posture: 'lie', kind: 'activate',
    howto: '平躺屈膝，双臂放身体两侧、掌心朝上。呼气时轻轻把肩胛骨往床面沉下去（不是往中间夹），停 3 秒松开，感觉后背平铺在被子上。',
    dose: '10 次 × 2 组',
    why: '抬手时耸肩、肩胛乱跑，根子在这几块的控制丧失；这个动作不加负荷，专门找感觉。',
  },
  {
    id: 'arm_rest',
    name: '把手臂彻底摊开',
    forState: 'both',
    muscles: ['biceps_brachii', 'triceps_brachii', 'brachioradialis', 'forearm_flexors'],
    regions: ['arm'],
    scenes: ['bed'],
    gear: 'none', posture: 'lie', kind: 'relax',
    howto: '躺好，手臂自然摊在身体两侧、掌心朝上，什么都不做。前臂还紧的话，用另一只手从手腕往手肘方向慢慢推按一分钟。',
    dose: '5–10 分钟',
    why: '手臂持续发了一天的力，很多时候最有效的干预就是彻底停止用力。这比再按一遍有用。',
  },
  {
    id: 'bed_wrist',
    name: '躺着手腕伸展',
    forState: 'weak',
    muscles: ['forearm_extensors', 'triceps_brachii'],
    regions: ['arm'],
    scenes: ['bed', 'desk'],
    gear: 'none', posture: 'lie', kind: 'activate',
    howto: '手臂伸直放在床上，掌心朝下、手悬在床沿外，慢慢把手背往回抬到最大再放下；用另一只手搭着给一点轻微阻力会更有效。',
    dose: '15 次 × 2 组',
    why: '网球肘那一类问题的方向是"伸肌偏弱需要练"，不是一味按揉；躺着做最不费力。',
  },
  {
    id: 'sit_core',
    name: '坐着收核心（别人看不出来）',
    forState: 'weak',
    muscles: ['transversus_abdominis', 'rectus_abdominis', 'obliquus_internus', 'obliquus_externus', 'multifidus'],
    regions: ['low_back_hip'],
    scenes: ['desk', 'open', 'bed'],
    gear: 'none', posture: 'sit', kind: 'activate',
    howto: '坐直，手指按在肋骨下缘。呼气时轻轻把腰往椅背方向收（不是憋气猛吸肚子），保持呼吸顺畅，停 10 秒放松。地铁上站着也能做。',
    dose: '10 次',
    why: '腹横肌是天然腰带，它一工作腰就有人兜着；这是唯一一整天都能练的动作。',
    caution: '肚子鼓出来或者憋气了就是做错',
  },
  {
    id: 'sit_glute',
    name: '坐姿夹臀',
    forState: 'weak',
    muscles: ['gluteus_maximus', 'piriformis'],
    regions: ['low_back_hip', 'leg'],
    scenes: ['desk', 'open'],
    gear: 'none', posture: 'sit', kind: 'activate',
    howto: '坐直，一次收紧一侧屁股到最紧，停 5 秒放松，再换另一侧。没有人看得出来。能站起来就走两分钟，效果比这更好。',
    dose: '每侧 10 次',
    why: '坐一整天屁股会"忘了怎么用力"，这个动作是把它重新叫醒，让它在需要的时候能顶上去。',
    caution: '别两边同时收，那样练不到穿透力',
  },
  {
    id: 'desk_lumbar',
    name: '站起后仰 + 腰部有支撑',
    forState: 'tight',
    muscles: ['erector_spinae', 'quadratus_lumborum'],
    regions: ['low_back_hip'],
    scenes: ['desk', 'open'],
    gear: 'none', posture: 'stand', kind: 'release',
    howto: '站起来，双手托住后腰，慢慢往后仰到有牵拉感停 3 秒，做 5 次。坐下后把外套或靠垫卷起来垫在腰后，让腰始终有支撑。',
    dose: '5 次 + 一次调整座椅',
    why: '久坐时腰椎一直被压着，站起来往后仰是给它卸压最直接的动作；很多人其实是椅子不对，不是身体不对。',
  },
  {
    id: 'sit_hip_open',
    name: '坐着开髋',
    forState: 'tight',
    muscles: ['iliopsoas', 'piriformis', 'hip_adductors'],
    regions: ['low_back_hip', 'leg'],
    scenes: ['desk'],
    gear: 'none', posture: 'sit', kind: 'release',
    howto: '坐着把一侧脚踝搭到另一侧膝盖上（像翘二郎腿但脚踝搭上去），身体微微前倾直到腹股沟有牵拉感，两边各做一遍。',
    dose: '每侧 30 秒',
    why: '久坐让髋前侧和深层一直缩着，这是唯一一个穿着工装也能做的版本。',
    caution: '别用手把膝盖往下硬压',
  },
  {
    id: 'neck_isometric',
    name: '颈部抗阻（手掌顶额头）',
    forState: 'weak',
    muscles: ['deep_neck_flexor', 'splenius_capitis'],
    regions: ['neck_shoulder'],
    scenes: ['desk', 'gym', 'open', 'bed'],
    gear: 'none', posture: 'any', kind: 'activate',
    howto: '手掌贴在额头（或后脑、侧头），头往那个方向用力，但手顶住不让头真的动，僵持 5 秒放松。前、后、左、右四个方向各做一遍。',
    dose: '每方向 5 次 × 5 秒',
    why: '等长收缩对脖子最安全：头几乎不动，却能把长期低头废掉的深层颈屈肌重新练起来。',
    caution: '重点是"较劲"不是"推动"，出现头晕就停下',
  },
  {
    id: 'band_pushdown',
    name: '弹力带下压',
    forState: 'weak',
    muscles: ['triceps_brachii'],
    regions: ['arm'],
    scenes: ['gym', 'open'],
    gear: 'band', posture: 'stand', kind: 'activate',
    howto: '弹力带固定在高处，手肘夹在身体两侧，只把前臂往下压直到手臂完全伸直，再慢慢放回。',
    dose: '15 次 × 3 组',
    why: '肘伸肌弱了手会撑不住、胳膊发不上劲；这个动作是练它最不容易做错的方式。',
    caution: '大臂别往外张，也别耸肩代偿',
  },
]

/** 状态 → 优先给哪类动作（顺序即优先级） */
const KIND_PRIORITY: Record<'tight' | 'weak', ActionKind[]> = {
  tight: ['release', 'stretch', 'mobilize', 'relax', 'activate'],
  weak: ['activate', 'mobilize', 'stretch', 'release', 'relax'],
}

export interface PickQuery {
  scene: SceneId
  /** 目标肌肉 id 列表（第 3 页诊断出来的） */
  muscleIds: string[]
  /** 这些肌肉的状态 */
  state: 'tight' | 'weak'
  /** 兜底用的部位 */
  regions: Region[]
  /**
   * 用户在第 2 页明确否掉的肌肉。主要针对它们的动作不要再出现——
   * 否则会出现「第 2 页我点掉了胸锁乳突肌，第 4 页又让我去按它」这种跨页打脸。
   * 只否掉"整个动作都围着被否肌肉转"的那些；一个动作要是还管着别的肌肉，仍可用。
   */
  avoidIds?: string[]
}

/**
 * 第 4 页的动作挑选：给当前场景挑 3 个动作。
 *
 * 打分：精准命中肌肉 > 命中部位；方向对的状态权重最高；不同 kind 之间做去重，
 * 避免给用户三个都是拉伸（体验上像同一个动作抄了三遍）。
 */
export function pickActions(q: PickQuery, n = 3): Action[] {
  const pri = KIND_PRIORITY[q.state]
  const scored = ACTIONS
    .filter((a) => a.scenes.includes(q.scene))
    .filter((a) => a.forState === q.state || a.forState === 'both')
    .filter((a) => {
      const avoid = q.avoidIds ?? []
      if (!avoid.length || !a.muscles.length) return true
      // 还有一块没被否的肌肉就留着；全被否了才拿掉
      return a.muscles.some((id) => !avoid.includes(id))
    })
    .map((a) => {
      let score = 0
      const hitMuscle = a.muscles.filter((id) => q.muscleIds.includes(id)).length
      const hitRegion = a.regions.filter((r) => q.regions.includes(r)).length
      score += hitMuscle * 6
      score += hitRegion * 2
      score += (pri.length - pri.indexOf(a.kind)) * 0.6
      return { a, score, hitMuscle, hitRegion }
    })
    .filter((x) => x.hitMuscle > 0 || x.hitRegion > 0)
    .sort((x, y) => y.score - x.score)

  const out: Action[] = []
  const usedKind = new Set<ActionKind>()
  const take = (list: typeof scored, byKind: boolean) => {
    for (const x of list) {
      if (out.length >= n) break
      if (out.includes(x.a)) continue
      if (byKind && usedKind.has(x.a.kind)) continue
      out.push(x.a)
      usedKind.add(x.a.kind)
    }
  }

  // ⚠️ 顺序很关键：必须先"只看命中了诊断肌肉的动作"。
  //    早期版本把所有候选混在一起、按分数降序 + 每种方向取一个，结果是
  //    一条只靠部位兜底的动作（分数低但方向不重复）会把一条真正命中诊断肌肉、
  //    方向重复的动作挤掉——用户看到的就是"你让我按一块你根本没诊断出来的肌肉"。
  //    所以：命中肌肉的优先，方向错开只在这一层内部做；实在不够才允许部位兜底。
  const hitList = scored.filter((x) => x.hitMuscle > 0)
  const looseList = scored.filter((x) => x.hitMuscle === 0)

  take(hitList, true)    // ① 命中肌肉 + 方向错开
  take(hitList, false)   // ② 命中肌肉，方向允许重复
  take(looseList, true)  // ③ 才轮到部位兜底
  // 第三轮兜底：连部位都没命中也认了，按方向优先级补够 n 个。
  // 宁可给一个"这个场景做得到的通用动作"，也不要让第 4 页只显示一两条显得残缺——
  // 而且这些动作本身对改善体态是有益的，只是没那么针对。
  if (out.length < n) {
    const rest = ACTIONS
      .filter((a) => a.scenes.includes(q.scene) && !out.includes(a))
      .filter((a) => a.forState === q.state || a.forState === 'both')
      .filter((a) => {
        const avoid = q.avoidIds ?? []
        if (!avoid.length || !a.muscles.length) return true
        return a.muscles.some((id) => !avoid.includes(id))
      })
      .sort((a, b) => pri.indexOf(a.kind) - pri.indexOf(b.kind))
    for (const a of rest) {
      if (out.length >= n) break
      out.push(a)
    }
  }
  return out.slice(0, n)
}

/** 给 explain：这块肌肉为什么推荐这个动作 */
/** 部位标签，用于「这个动作没精确命中诊断肌肉」时的诚实说法 */
export const REGION_LABEL: Record<Region, string> = {
  neck_shoulder: '颈肩一片',
  upper_back: '肩背一片',
  low_back_hip: '腰髋一片',
  leg: '腿上一片',
  arm: '手臂一片',
}

/**
 * 动作卡上那行「针对：……」。
 *
 * ⚠️ 只准出现本次诊断出的肌肉。第 4 页是靠「肌肉 id 命中」+「部位兜底」两层挑动作的，
 *    兜底挑上来的动作很可能针对的是同部位、但这次没诊断到的肌肉（比如诊断是胸大肌，
 *    兜底却上来一条按胸锁乳突肌的）。把它的名字照抄到卡片上，用户会问
 *    "你刚才根本没说我脖子有问题，怎么让我按这里"——诊断和建议对不上，整条链路的可信度就没了。
 *    所以：命中了就写肌肉名；没命中就退成部位说法，不冒充实测结论。
 */
export function actionTargetLabel(a: Action, lib: Muscle[], diagIds: string[]): { text: string; exact: boolean } {
  const hit = a.muscles
    .filter((id) => diagIds.includes(id))
    .map((id) => lib.find((m) => m.id === id)?.name)
    .filter(Boolean) as string[]
  if (hit.length) return { text: `针对：${hit.join('、')}`, exact: true }
  const regions = a.regions.map((r) => REGION_LABEL[r]).filter(Boolean)
  return { text: `相关部位：${regions.length ? regions.join('、') : '整体'}`, exact: false }
}

export function actionTargetName(a: Action, lib: Muscle[]): string {
  const hit = a.muscles.map((id) => lib.find((m) => m.id === id)?.name).filter(Boolean) as string[]
  return hit.length ? hit.join('、') : a.name
}
