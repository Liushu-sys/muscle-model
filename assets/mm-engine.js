// src/data/muscles.ts
var MUSCLES = [
  // ============ 颈肩 neck_shoulder ============
  {
    id: "sternocleidomastoid",
    name: "\u80F8\u9501\u4E73\u7A81\u808C",
    alias: ["\u80F8\u9501\u4E73\u7A81\u808C"],
    region: "neck_shoulder",
    type: "tight",
    side: "front",
    x: 42,
    y: 18,
    desc: "\u8116\u5B50\u524D\u9762\u4E24\u4FA7\uFF0C\u957F\u671F\u4F4E\u5934\u4F1A\u53D8\u77ED\uFF0C\u628A\u4E0B\u5DF4\u5F80\u524D\u62C9",
    senses: ["\u8116\u5B50\u524D\u9762\u7D27", "\u5934\u524D\u4F38", "\u4E0B\u5DF4\u5F80\u524D\u63A2", "\u8116\u5B50\u9178"],
    bookPage: 235
    // 「双侧胸锁乳突肌紧张」
  },
  {
    id: "deep_neck_flexor",
    name: "\u6DF1\u5C42\u9888\u5C48\u808C",
    alias: ["\u9888\u6DF1\u5C48\u808C", "\u9888\u957F\u808C", "\u5934\u957F\u808C", "\u9885\u9888\u56DE\u7F29\u808C"],
    region: "neck_shoulder",
    type: "weak",
    side: "front",
    x: 52.5,
    y: 15,
    desc: "\u8116\u5B50\u524D\u9762\u6DF1\u5C42\uFF0C\u8D1F\u8D23\u6536\u4E0B\u5DF4\uFF0C\u957F\u671F\u4F4E\u5934\u4F1A\u53D8\u5F31",
    senses: ["\u6536\u4E0B\u5DF4\u6CA1\u529B\u6C14", "\u5934\u5F80\u524D\u63A2", "\u8116\u5B50\u6491\u4E0D\u4F4F\u5934", "\u540E\u9888\u53D1\u6C89"],
    bookPage: 235
    // 「颅颈回缩肌或伸肌肌力减弱或疲劳」
  },
  {
    id: "suboccipital",
    name: "\u6795\u4E0B\u808C\u7FA4",
    alias: ["\u6795\u4E0B\u808C"],
    region: "neck_shoulder",
    type: "tight",
    side: "back",
    x: 50,
    y: 12,
    desc: "\u540E\u8111\u52FA\u548C\u8116\u5B50\u4EA4\u754C\u5904\u7684\u6DF1\u5C42\u5C0F\u808C\u8089\uFF0C\u4F4E\u5934\u4E45\u4E86\u6700\u7D2F\u7684\u5C31\u662F\u5B83",
    senses: ["\u540E\u8111\u52FA\u9178", "\u540E\u8111\u52FA\u548C\u8116\u5B50\u4EA4\u754C\u5904\u75BC", "\u5934\u75BC", "\u592A\u9633\u7A74\u7D27"],
    bookPage: 235
    // 「枕下肌群的紧张」
  },
  {
    id: "splenius_capitis",
    name: "\u5934\u5939\u808C",
    alias: ["\u5939\u808C", "\u9888\u6D45\u4F38\u808C"],
    region: "neck_shoulder",
    type: "tight",
    side: "back",
    x: 46,
    y: 16.5,
    desc: "\u540E\u9888\u4E24\u4FA7\uFF0C\u8D1F\u8D23\u62AC\u5934\u548C\u8F6C\u5934\uFF0C\u957F\u671F\u524D\u4F38\u59FF\u52BF\u4F1A\u8FC7\u52B3",
    senses: ["\u540E\u8111\u52FA\u53D1\u6C89", "\u62AC\u5934\u8D39\u52B2", "\u8F6C\u5934\u9178\u80C0"],
    bookPage: 217
  },
  {
    id: "levator_scapulae",
    name: "\u80A9\u80DB\u63D0\u808C",
    alias: [],
    region: "neck_shoulder",
    type: "tight",
    side: "back",
    x: 42,
    y: 20.5,
    desc: "\u4ECE\u9888\u690E\u8FDE\u5230\u80A9\u80DB\u9AA8\u5185\u4E0A\u89D2\uFF0C\u4E00\u6309\u5C31\u75DB\u7684\u90A3\u6761",
    senses: ["\u80A9\u80DB\u9AA8\u5185\u4FA7\u4E0A\u65B9\u75BC", "\u4E00\u6309\u5C31\u75DB", "\u843D\u6795", "\u8116\u5B50\u8FDE\u80A9\u8180\u9178"],
    bookPage: 235
    // 颅颈区「可能的原因」中列出
  },
  {
    id: "trapezius_upper",
    name: "\u4E0A\u659C\u65B9\u808C",
    alias: ["\u659C\u65B9\u808C\u4E0A\u675F", "\u659C\u65B9\u808C"],
    region: "neck_shoulder",
    type: "tight",
    side: "back",
    x: 35.5,
    y: 22,
    desc: "\u8116\u5B50\u4E24\u4FA7\u5230\u80A9\u8180\u7684\u5927\u7247\uFF0C\u4E00\u7D27\u5F20\u5C31\u5F80\u4E0A\u8038\u80A9",
    senses: ["\u8116\u5B50\u9178", "\u8116\u5B50\u4E24\u4FA7\u53D1\u7D27", "\u8038\u80A9", "\u8F6C\u5934\u53D7\u9650", "\u80A9\u8180\u50F5\u786C"],
    bookPage: 89
    // 肩胛胸壁模式「肩胛骨上旋肌力减弱：斜方肌上束」
  },
  {
    id: "scalenes",
    name: "\u659C\u89D2\u808C",
    alias: ["\u524D\u659C\u89D2\u808C", "\u4E2D\u659C\u89D2\u808C"],
    region: "neck_shoulder",
    type: "tight",
    side: "front",
    x: 45,
    y: 13.4,
    desc: "\u8116\u5B50\u4E24\u4FA7\u6DF1\u5C42\uFF0C\u8FDE\u7740\u7B2C 1\u30012 \u6839\u808B\u9AA8\uFF0C\u957F\u671F\u7528\u80F8\u5F0F\u547C\u5438\u4F1A\u8FC7\u52B3",
    senses: ["\u8116\u5B50\u6839\u90E8\u4E24\u4FA7\u7D27", "\u80A9\u8180\u5F80\u4E0A\u7684\u5730\u65B9\u53D1\u7D27", "\u547C\u5438\u6D45", "\u8F6C\u5934\u53D7\u9650", "\u624B\u5BB9\u6613\u51C9"],
    bookNote: "clinic"
    // 书未列名。按解剖常识：提肋辅助吸气 + 颈椎侧屈稳定，头前伸必代偿
  },
  // ============ 胸背 upper_back ============
  {
    id: "pectoralis_major",
    name: "\u80F8\u5927\u808C",
    alias: [],
    region: "upper_back",
    type: "tight",
    side: "front",
    x: 37,
    y: 27,
    desc: "\u80F8\u524D\u4E3B\u529B\uFF0C\u542B\u80F8\u9A7C\u80CC\u65F6\u5B83\u4F1A\u7F29\u77ED\u53D8\u7D27",
    senses: ["\u80F8\u524D\u53D1\u7D27", "\u542B\u80F8", "\u5706\u80A9", "\u6269\u80F8\u4E0D\u8212\u670D"],
    bookPage: 89
    // 「胸部前侧肌肉紧张：胸大肌」
  },
  {
    id: "pectoralis_minor",
    name: "\u80F8\u5C0F\u808C",
    alias: [],
    region: "upper_back",
    type: "tight",
    side: "front",
    x: 40,
    y: 23,
    desc: "\u80F8\u5927\u808C\u6DF1\u5C42\uFF0C\u8FDE\u5230\u80A9\u80DB\u9AA8\uFF0C\u7D27\u4E86\u4F1A\u628A\u80A9\u8180\u5F80\u524D\u62FD",
    senses: ["\u80F8\u524D\u6DF1\u5C42\u7D27", "\u547C\u5438\u6D45", "\u9A7C\u80CC", "\u80A9\u8180\u5F80\u524D"],
    bookPage: 89
    // 「胸部前侧肌肉紧张：胸小肌」
  },
  {
    id: "subscapularis",
    name: "\u80A9\u80DB\u4E0B\u808C",
    alias: [],
    region: "upper_back",
    type: "tight",
    side: "front",
    x: 31,
    y: 29,
    desc: "\u80A9\u80DB\u9AA8\u524D\u9762\uFF0C\u80A9\u8896\u91CC\u552F\u4E00\u7684\u5185\u65CB\u808C\uFF0C\u7D27\u4E86\u4F1A\u9650\u5236\u62AC\u624B",
    senses: ["\u80A9\u8180\u524D\u9762\u6DF1\u5904\u9178", "\u62AC\u624B\u5361\u4F4F", "\u624B\u5F80\u540E\u80CC\u591F\u4E0D\u5230"],
    bookPage: 88
    // 「内旋肌紧张：肩胛下肌」
  },
  {
    id: "latissimus_dorsi",
    name: "\u80CC\u9614\u808C",
    alias: [],
    region: "upper_back",
    type: "tight",
    side: "back",
    x: 36,
    y: 36,
    desc: "\u814B\u4E0B\u540E\u65B9\u6700\u5BBD\u7684\u90A3\u5757\uFF0C\u7D27\u4E86\u4F1A\u628A\u80A9\u8180\u5F80\u4E0B\u62FD",
    senses: ["\u814B\u4E0B\u540E\u65B9\u7D27", "\u62AC\u624B\u53D7\u9650", "\u8170\u80CC\u4E24\u4FA7\u7D27"],
    bookPage: 88
    // 「肩部内收肌或伸肌紧张：背阔肌」
  },
  {
    id: "teres_major",
    name: "\u5927\u5706\u808C",
    alias: [],
    region: "upper_back",
    type: "tight",
    side: "back",
    x: 32,
    y: 22.3,
    desc: "\u80CC\u9614\u808C\u7684\u5C0F\u52A9\u624B\uFF0C\u4ECE\u80A9\u80DB\u9AA8\u4E0B\u89D2\u8FDE\u5230\u4E0A\u81C2\uFF0C\u7D27\u4E86\u4F1A\u628A\u80A9\u8180\u5F80\u4E0B\u5F80\u5185\u62FD",
    senses: ["\u814B\u540E\u65B9\u6DF1\u5904\u7D27", "\u624B\u81C2\u5F80\u540E\u591F\u4E0D\u5230", "\u540E\u80CC\u6392\u9AA8\u7F1D\u53D1\u9178"],
    bookPage: 88,
    // 「内旋肌紧张：胸大肌、肩胛下肌、背阔肌、大圆肌」——书里列名
    bookNote: "book"
  },
  {
    id: "supraspinatus",
    name: "\u5188\u4E0A\u808C",
    alias: ["\u80A9\u4E0A\u808C"],
    region: "upper_back",
    type: "weak",
    side: "back",
    x: 34,
    y: 24,
    desc: "\u80A9\u80DB\u9AA8\u4E0A\u65B9\u6DF1\u5C42\uFF0C\u8D1F\u8D23\u542F\u52A8\u62AC\u624B\u52A8\u4F5C\uFF0C\u62AC\u624B\u8D39\u52B2\u65F6\u5E38\u662F\u5B83\u6CA1\u529B\u6C14",
    senses: ["\u62AC\u624B\u8D39\u52B2", "\u62AC\u624B\u80A9\u8180\u75BC", "\u624B\u81C2\u62AC\u4E0D\u8D77\u6765", "\u4FA7\u4E3E\u6CA1\u52B2"],
    bookPage: 88
    // 「外展肌或前屈肌肌力减弱：冈上肌」
  },
  {
    id: "infraspinatus",
    name: "\u5188\u4E0B\u808C",
    alias: [],
    region: "upper_back",
    type: "weak",
    side: "back",
    x: 33,
    y: 27,
    desc: "\u80A9\u80DB\u9AA8\u80CC\u9762\uFF0C\u8D1F\u8D23\u628A\u624B\u81C2\u5F80\u5916\u8F6C\uFF0C\u4E45\u5750\u542B\u80F8\u4F1A\u53D8\u5F31",
    senses: ["\u80A9\u8180\u540E\u9762\u6DF1\u5904\u9178", "\u624B\u5F80\u540E\u80CC\u591F\u4E0D\u5230", "\u80A9\u4E0D\u7A33"],
    bookPage: 88
    // 「外旋肌肌力减弱：冈下肌」
  },
  {
    id: "teres_minor",
    name: "\u5C0F\u5706\u808C",
    alias: [],
    region: "upper_back",
    type: "weak",
    side: "back",
    x: 32,
    y: 20.1,
    desc: "\u5188\u4E0B\u808C\u7684\u642D\u6863\uFF0C\u4E00\u8D77\u8D1F\u8D23\u624B\u81C2\u5916\u65CB\uFF0C\u5E38\u548C\u5188\u4E0B\u808C\u4E00\u8D77\u53D8\u5F31",
    senses: ["\u80A9\u8180\u540E\u9762\u6DF1\u5904\u9178", "\u624B\u5F80\u540E\u80CC\u591F\u4E0D\u5230", "\u624B\u81C2\u5916\u8F6C\u6CA1\u529B", "\u80A9\u524D\u4E0D\u7A33"],
    bookPage: 88,
    // 「外旋肌肌力减弱：冈下肌、小圆肌、三角肌后束」——书里列名
    bookNote: "book"
  },
  {
    id: "deltoid",
    name: "\u4E09\u89D2\u808C",
    alias: ["\u80A9\u4E0A\u808C\u7FA4", "\u80A9\u5934"],
    region: "upper_back",
    type: "weak",
    side: "both",
    x: 27,
    y: 19.3,
    desc: "\u80A9\u8180\u5916\u9762\u90A3\u4E2A\u5706\u5305\uFF0C\u524D\u4E2D\u540E\u4E09\u675F\u4E00\u8D77\u624D\u51D1\u5F97\u51FA\u62AC\u624B\u8FD9\u4E2A\u52A8\u4F5C",
    // ℹ️ 书里三束全落在「过弱」一侧：前束 / 中束→「外展肌或前屈肌肌力减弱」，
    //    后束→「外旋肌肌力减弱」，所以整组默认标 weak（日常说的"前束很紧"是另一回事）
    senses: ["\u80A9\u8180\u6CA1\u52B2", "\u62AC\u624B\u8D39\u52B2", "\u624B\u81C2\u4FA7\u4E3E\u53D1\u6296", "\u80A9\u8180\u584C"],
    bookPage: 88,
    // 「外展肌或前屈肌肌力减弱：三角肌前束、三角肌中束…」
    bookNote: "book"
  },
  {
    id: "serratus_anterior",
    name: "\u524D\u952F\u808C",
    alias: [],
    region: "upper_back",
    type: "weak",
    side: "front",
    x: 34,
    y: 33,
    desc: "\u808B\u9AA8\u4FA7\u9762\uFF0C\u8D1F\u8D23\u8BA9\u80A9\u80DB\u9AA8\u8D34\u7740\u540E\u80CC\uFF0C\u5F31\u4E86\u80A9\u80DB\u9AA8\u4F1A\u7FD8\u8D77\u6765",
    senses: ["\u62AC\u624B\u8D39\u529B", "\u7FFC\u72B6\u80A9\u80DB", "\u80A9\u8180\u4E0D\u5E73", "\u62AC\u624B\u8038\u80A9"],
    bookPage: 89
    // 「肩胛骨上旋肌力减弱：前锯肌」
  },
  {
    id: "rhomboid",
    name: "\u83F1\u5F62\u808C",
    alias: ["\u5927\u83F1\u5F62\u808C", "\u5C0F\u83F1\u5F62\u808C"],
    region: "upper_back",
    type: "weak",
    side: "back",
    x: 42,
    y: 25,
    desc: "\u4E24\u80A9\u4E4B\u95F4\uFF0C\u8D1F\u8D23\u628A\u80A9\u80DB\u9AA8\u5F80\u4E2D\u95F4\u5939\uFF0C\u542B\u80F8\u65F6\u88AB\u62C9\u957F\u53D8\u5F31",
    senses: ["\u4E24\u80A9\u4E4B\u95F4\u9178", "\u80A9\u80DB\u9AA8\u5185\u4FA7\u7F18\u75BC", "\u5939\u80CC\u6CA1\u529B"],
    bookPage: 89
    // 「肩胛骨后缩肌力减弱：菱形肌」（见文档第五节：也可为紧张）
  },
  {
    id: "trapezius_middle",
    name: "\u4E2D\u659C\u65B9\u808C",
    alias: ["\u659C\u65B9\u808C\u4E2D\u675F"],
    region: "upper_back",
    type: "weak",
    side: "back",
    x: 39,
    y: 28,
    desc: "\u4E24\u80A9\u4E4B\u95F4\u504F\u4E2D\uFF0C\u8D1F\u8D23\u628A\u80A9\u80DB\u9AA8\u5F80\u540E\u6536",
    senses: ["\u80A9\u80DB\u9AA8\u4E0D\u7A33", "\u5939\u80CC\u6CA1\u529B", "\u4E24\u80A9\u4E4B\u95F4\u9178"],
    bookPage: 89
    // 「肩胛骨后缩肌力减弱：斜方肌中束」
  },
  {
    id: "trapezius_lower",
    name: "\u4E0B\u659C\u65B9\u808C",
    alias: ["\u659C\u65B9\u808C\u4E0B\u675F"],
    region: "upper_back",
    type: "weak",
    side: "back",
    x: 45,
    y: 33,
    desc: "\u4E2D\u80CC\u90E8\uFF0C\u8D1F\u8D23\u62AC\u624B\u65F6\u628A\u80A9\u80DB\u9AA8\u5F80\u4E0B\u538B\u4F4F",
    senses: ["\u4E2D\u80CC\u90E8\u7A7A", "\u62AC\u624B\u80A9\u80DB\u4E71\u8DD1", "\u80CC\u90E8\u6CA1\u529B"],
    bookPage: 89
    // 「肩胛骨上旋肌力减弱：斜方肌下束」
  },
  // ============ 腰骨盆 low_back_hip ============
  {
    id: "iliopsoas",
    name: "\u9AC2\u8170\u808C",
    alias: ["\u8170\u5927\u808C", "\u9AC2\u808C"],
    region: "low_back_hip",
    type: "tight",
    side: "front",
    x: 46,
    y: 50,
    desc: "\u4ECE\u8170\u690E\u8FDE\u5230\u5927\u817F\u9AA8\uFF0C\u4E45\u5750\u4F1A\u53D8\u77ED\uFF0C\u662F\u9AA8\u76C6\u524D\u503E\u7684\u4E00\u534A\u539F\u56E0",
    senses: ["\u4E45\u5750\u540E\u9ACB\u524D\u4FA7\u7D27", "\u7AD9\u8D77\u6765\u8981\u7F13\u4E00\u4E0B", "\u8170\u9178", "\u5C0F\u8179\u524D\u9876"],
    bookPage: 281
    // 「髋关节屈肌紧张：髂腰肌」
  },
  {
    id: "quadratus_lumborum",
    name: "\u8170\u65B9\u808C",
    alias: [],
    region: "low_back_hip",
    type: "tight",
    side: "back",
    x: 43,
    y: 42,
    desc: "\u8170\u4E24\u4FA7\u6DF1\u5C42\uFF0C\u8D1F\u8D23\u4FA7\u5C48\u548C\u7A33\u4F4F\u9AA8\u76C6",
    senses: ["\u8170\u4FA7\u9762\u9178", "\u5355\u4FA7\u8170\u7D27", "\u4E45\u5750\u4E00\u4FA7\u75BC"],
    bookPage: 225
  },
  {
    id: "erector_spinae",
    name: "\u7AD6\u810A\u808C",
    alias: ["\u9AB6\u68D8\u808C", "\u8170\u9AC2\u808B\u808C", "\u80F8\u6700\u957F\u808C"],
    region: "low_back_hip",
    type: "tight",
    side: "back",
    x: 47,
    y: 38,
    desc: "\u810A\u67F1\u4E24\u4FA7\u7684\u957F\u6761\u808C\u8089\uFF08\u8170\u6BB5\u6613\u7D27\u3001\u80F8\u6BB5\u6613\u5F31\uFF09",
    senses: ["\u8170\u4E24\u4FA7\u53D1\u50F5", "\u4E45\u5750\u540E\u76F4\u4E0D\u8D77\u6765", "\u5F2F\u8170\u9178"],
    bookPage: 236
    // 胸椎模式「竖脊肌区域性肌力减弱」；腰段见 281「腰背部伸肌紧张」
  },
  {
    id: "multifidus",
    name: "\u591A\u88C2\u808C",
    alias: ["\u7AD6\u810A\u808C\u6DF1\u5C42"],
    region: "low_back_hip",
    type: "weak",
    side: "back",
    x: 48,
    y: 25.9,
    desc: "\u8D34\u7740\u810A\u690E\u9AA8\u957F\u7684\u77ED\u808C\u8089\uFF0C\u4E00\u8282\u4E00\u8282\u628A\u810A\u67F1\u6263\u4F4F\uFF0C\u4E45\u5750\u6700\u5BB9\u6613\u5931\u6D3B",
    senses: ["\u810A\u67F1\u4E24\u4FA7\u6DF1\u5904\u9178", "\u4E45\u5750\u8170\u7A7A", "\u5F2F\u8170\u8D77\u6765\u8981\u6276\u7740", "\u8170\u8BF4\u4E0D\u4E0A\u54EA\u91CC\u75BC"],
    bookNote: "clinic"
    // 书未列名。依据：它是最典型的节段稳定肌，久坐失活是公认现象
  },
  {
    id: "rectus_abdominis",
    name: "\u8179\u76F4\u808C",
    alias: [],
    region: "low_back_hip",
    type: "weak",
    side: "front",
    x: 50,
    y: 42,
    desc: "\u809A\u5B50\u524D\u9762\uFF0C\u8D1F\u8D23\u8BA9\u9AA8\u76C6\u540E\u503E\u3001\u7A33\u4F4F\u8170",
    senses: ["\u809A\u5B50\u6491\u4E0D\u4F4F\u8170", "\u4EF0\u5367\u8D77\u5750\u8D77\u4E0D\u6765", "\u8170\u5BB9\u6613\u95EA"],
    bookPage: 281
    // 「强化腹部肌肉力量」
  },
  {
    id: "transversus_abdominis",
    name: "\u8179\u6A2A\u808C",
    // ⚠️ 原 alias 里的 '腹内斜肌' / '腹外斜肌' 已移除——这两块现在各自独立成组，
    //    留着会让 AI 把"侧腹紧"错误匹配到腹横肌这块深层肌上
    alias: [],
    region: "low_back_hip",
    type: "weak",
    side: "front",
    x: 44,
    y: 40,
    desc: "\u809A\u5B50\u6700\u6DF1\u4E00\u5C42\uFF0C\u50CF\u5929\u7136\u675F\u8170\uFF0C\u5F31\u4E86\u8170\u5C31\u6CA1\u652F\u6491",
    senses: ["\u6838\u5FC3\u53D1\u4E0D\u4E0A\u529B", "\u8170\u5BB9\u6613\u95EA", "\u809A\u5B50\u677E"],
    bookPage: 235
    // 「核心稳定性训练」
  },
  {
    id: "obliquus_externus",
    name: "\u8179\u5916\u659C\u808C",
    alias: ["\u4FA7\u8179"],
    region: "low_back_hip",
    type: "weak",
    side: "front",
    x: 42,
    y: 34.3,
    desc: "\u8170\u4E24\u4FA7\u6700\u5916\u9762\u4E00\u5C42\uFF0C\u8D1F\u8D23\u8F6C\u8EAB\u548C\u5411\u4FA7\u9762\u5F2F\u8170\uFF0C\u4E45\u5750\u4E0D\u8F6C\u4F53\u5C31\u6162\u6162\u6CA1\u529B",
    senses: ["\u8170\u4E24\u4FA7\u6CA1\u529B", "\u8F6C\u8EAB\u4E0D\u5F97\u52B2", "\u4FA7\u5F2F\u6447\u6643", "\u809A\u5B50\u677E\u57AE"],
    bookNote: "infer"
    // 书未列名。p.281 只泛说"强化腹部肌肉力量"，属同群推断
  },
  {
    id: "obliquus_internus",
    name: "\u8179\u5185\u659C\u808C",
    alias: [],
    region: "low_back_hip",
    type: "weak",
    side: "front",
    x: 45,
    y: 40.3,
    desc: "\u8179\u5916\u659C\u808C\u4E0B\u9762\u4E00\u5C42\uFF0C\u8F6C\u8EAB\u65F6\u8D1F\u8D23\u5239\u8F66\uFF0C\u8FD8\u548C\u8179\u6A2A\u808C\u4E00\u8D77\u6491\u4F4F\u8170\u8179",
    senses: ["\u8F6C\u8EAB\u6536\u4E0D\u4F4F", "\u6838\u5FC3\u53D1\u4E0D\u4E0A\u529B", "\u8DD1\u6B65\u8EAB\u4F53\u4E71\u6643", "\u8170\u5BB9\u6613\u95EA"],
    bookNote: "infer"
    // 同 obliquus_externus
  },
  {
    id: "gluteus_maximus",
    name: "\u81C0\u5927\u808C",
    alias: [],
    region: "low_back_hip",
    type: "weak",
    side: "back",
    x: 40,
    y: 54,
    desc: "\u5C41\u80A1\u4E3B\u529B\uFF0C\u4E45\u5750\u4F1A\u53D8\u5F31\uFF0C\u5F31\u4E86\u4E0A\u697C\u548C\u7AD9\u8D77\u90FD\u8D39\u52B2",
    senses: ["\u5C41\u80A1\u6CA1\u529B", "\u4E0A\u697C\u817F\u5148\u7D2F", "\u7AD9\u8D77\u6765\u8D39\u52B2", "\u8170\u9178"],
    bookPage: 281
    // 「髋关节后伸肌力减弱：臀大肌」→ 治法「臀桥」
  },
  {
    id: "gluteus_medius",
    name: "\u81C0\u4E2D\u808C",
    alias: [],
    region: "leg",
    type: "weak",
    side: "back",
    x: 33,
    y: 52,
    desc: "\u5C41\u80A1\u5916\u4FA7\uFF0C\u8D1F\u8D23\u5355\u817F\u7AD9\u7ACB\u7A33\u5B9A\uFF0C\u5F31\u4E86\u819D\u76D6\u4F1A\u5185\u6263",
    senses: ["\u5355\u817F\u7AD9\u4E0D\u7A33", "\u8D70\u8DEF\u6643", "\u819D\u76D6\u5185\u6263", "\u80EF\u5916\u4FA7\u9178"],
    bookPage: 281
  },
  {
    id: "piriformis",
    name: "\u68A8\u72B6\u808C",
    alias: [],
    region: "low_back_hip",
    type: "tight",
    side: "back",
    x: 45,
    y: 55,
    desc: "\u5C41\u80A1\u6DF1\u5C42\uFF0C\u5750\u4E45\u4E86\u4F1A\u7D27\uFF0C\u7D27\u4E86\u53EF\u80FD\u523A\u6FC0\u5230\u9644\u8FD1\u7684\u5750\u9AA8\u795E\u7ECF",
    // ⚠️ 原 senses 里的"坐久麻"已删除——"麻"是红旗词会被护栏拦截，留着自相矛盾
    senses: ["\u5C41\u80A1\u6DF1\u5904\u9178", "\u5C41\u80A1\u75BC\u8FDE\u817F", "\u4E45\u5750\u5C41\u80A1\u75BC"],
    bookPage: 253
  },
  {
    id: "tensor_fasciae_latae",
    name: "\u9614\u7B4B\u819C\u5F20\u808C",
    // ⚠️ 原 alias 里的 '髂胫束' 已移除——髂胫束现在独立成组（iliotibial_tract）
    alias: [],
    region: "leg",
    type: "tight",
    side: "front",
    x: 35,
    y: 54,
    desc: "\u5927\u817F\u5916\u4FA7\u4E0A\u65B9\uFF0C\u5F80\u4E0B\u63A5\u9AC2\u80EB\u675F\uFF0C\u7D27\u4E86\u4F1A\u62C9\u7740\u819D\u76D6\u5916\u4FA7",
    senses: ["\u5927\u817F\u5916\u4FA7\u7D27", "\u8DD1\u6B65\u819D\u5916\u4FA7\u75DB", "\u80EF\u5916\u4FA7\u7D27"],
    bookPage: 281
  },
  // ============ 下肢 leg ============
  {
    id: "iliotibial_tract",
    name: "\u9AC2\u80EB\u675F",
    alias: ["\u5927\u817F\u5916\u4FA7\u90A3\u6761\u7B4B"],
    region: "leg",
    type: "tight",
    side: "both",
    x: 31,
    y: 58.4,
    desc: "\u5927\u817F\u5916\u4FA7\u4ECE\u4E0A\u5230\u4E0B\u4E00\u6574\u6761\u7B4B\u819C\u5E26\uFF0C\u8DD1\u6B65\u4E45\u4E86\u53D8\u7D27\u4F1A\u78E8\u5230\u819D\u76D6\u5916\u4FA7",
    senses: ["\u5927\u817F\u5916\u4FA7\u53D1\u7D27", "\u8DD1\u6B65\u819D\u76D6\u5916\u4FA7\u75BC", "\u4FA7\u5367\u80EF\u75BC", "\u817F\u5916\u4FA7\u6761\u7D22\u611F"],
    bookNote: "infer"
    // 书未单独列。它是阔筋膜张肌的延续（TFL 在 p.281 有依据）
  },
  {
    id: "hamstrings",
    name: "\u8158\u7EF3\u808C",
    alias: ["\u80A1\u4E8C\u5934\u808C", "\u534A\u8171\u808C", "\u534A\u819C\u808C"],
    region: "leg",
    type: "tight",
    side: "back",
    x: 41,
    y: 64,
    desc: "\u5927\u817F\u540E\u4FA7\uFF08\u6CE8\u610F\uFF1A\u5728\u819D\u6A21\u5F0F\u91CC\u662F\u7D27\u5F20\uFF0C\u5728\u9ACB\u6A21\u5F0F\u91CC\u662F\u5F31\uFF09",
    senses: ["\u5927\u817F\u540E\u4FA7\u7D27", "\u5F2F\u8170\u6478\u4E0D\u5230\u5730", "\u8158\u7A9D\u7D27"],
    bookPage: 316
    // 膝模式「膝屈肌紧张」；髋模式见 281（后伸肌力减弱）
  },
  {
    id: "quadriceps",
    name: "\u80A1\u56DB\u5934\u808C",
    alias: ["\u80A1\u5185\u4FA7\u808C", "\u80A1\u5916\u4FA7\u808C", "\u80A1\u4E2D\u95F4\u808C"],
    region: "leg",
    type: "weak",
    side: "front",
    x: 40,
    y: 63,
    desc: "\u5927\u817F\u524D\u9762\uFF08\u80A1\u5185\u4FA7\u808C\u3001\u80A1\u5916\u4FA7\u808C\u3001\u80A1\u4E2D\u95F4\u808C\uFF09\uFF0C\u8D1F\u8D23\u4F38\u76F4\u819D\u76D6\uFF0C\u5F31\u4E86\u819D\u76D6\u4F1A\u53D1\u8F6F\u3002\u6CE8\uFF1A\u80A1\u76F4\u808C\u5DF2\u5355\u72EC\u5217\u51FA",
    senses: ["\u819D\u76D6\u53D1\u8F6F", "\u4E0B\u697C\u68AF\u6253\u8F6F\u817F", "\u819D\u76D6\u524D\u9762\u75BC"],
    bookPage: 316
    // 「伸膝肌减弱：股四头肌的四块肌肉」；股直肌在 p.281 髋模式为紧张组，已拆为独立 id
  },
  {
    id: "rectus_femoris",
    name: "\u80A1\u76F4\u808C",
    alias: ["\u80A1\u76F4\u808C\uFF08\u80A1\u56DB\u5934\u808C\uFF09"],
    region: "low_back_hip",
    type: "tight",
    side: "front",
    x: 40,
    y: 63,
    // 无独立 SVG 路径，涂色与点击别名统一走 paintAs（唯一别名真源）
    paintAs: "quadriceps",
    desc: "\u80A1\u56DB\u5934\u808C\u4E2D\u552F\u4E00\u8DE8\u8FC7\u9ACB\u548C\u819D\u4E24\u4E2A\u5173\u8282\u7684\u808C\u8089\uFF0C\u4E45\u5750\u4F1A\u77ED\u7F29\uFF0C\u628A\u9AA8\u76C6\u5F80\u524D\u62C9",
    senses: ["\u9ACB\u524D\u9762\u7D27", "\u5927\u817F\u6839\u524D\u9762\u7D27", "\u4E45\u5750\u7AD9\u8D77\u6765\u9ACB\u524D\u626F\u7740"],
    bookPage: 281
    // 髋模式 p.281「髋关节屈肌紧张：髂腰肌、股直肌」
  },
  {
    id: "hip_adductors",
    name: "\u9ACB\u5185\u6536\u808C",
    alias: ["\u9ACB\u5185\u6536\u808C\u7FA4", "\u5185\u6536\u808C", "\u5927\u6536\u808C", "\u957F\u6536\u808C"],
    region: "leg",
    type: "tight",
    side: "front",
    x: 47,
    y: 57,
    desc: "\u5927\u817F\u5185\u4FA7\uFF0C\u8D1F\u8D23\u628A\u817F\u5939\u56DE\u6765",
    senses: ["\u5927\u817F\u5185\u4FA7\u7D27", "\u80EF\u5185\u4FA7\u9178", "\u817F\u5E76\u4E0D\u62E2"],
    bookPage: 253
  },
  {
    id: "sartorius",
    name: "\u7F1D\u5320\u808C",
    alias: [],
    region: "leg",
    type: "tight",
    side: "front",
    x: 46,
    y: 60.2,
    desc: "\u4ECE\u80EF\u9AA8\u659C\u7740\u7ED5\u8FC7\u5927\u817F\u5185\u4FA7\u5230\u819D\u76D6\uFF0C\u540C\u65F6\u7BA1\u5C48\u9ACB\u5C48\u819D\uFF0C\u4E45\u5750\u4F1A\u7F29\u77ED",
    senses: ["\u5927\u817F\u5185\u4FA7\u504F\u524D\u7D27", "\u76D8\u817F\u8D39\u52B2", "\u819D\u76D6\u5185\u4FA7\u75DB", "\u8E72\u4E0D\u4E0B\u53BB"],
    bookNote: "infer"
    // 书未列名。p.316「屈膝肌紧张」原句是腘绳肌，缝匠肌同属跨双关节屈肌
  },
  {
    id: "gastrocnemius",
    name: "\u8153\u80A0\u808C",
    // ⚠️ 原 alias 里的 '比目鱼肌' 已移除——比目鱼肌现在独立成组（soleus）
    alias: ["\u5C0F\u817F\u4E09\u5934\u808C"],
    region: "leg",
    type: "tight",
    side: "back",
    x: 40,
    y: 79,
    desc: "\u5C0F\u817F\u809A\uFF0C\u8DE8\u819D\u548C\u8E1D\u4E24\u4E2A\u5173\u8282\uFF0C\u7D27\u4E86\u4F1A\u62C9\u8DDF\u8171",
    senses: ["\u5C0F\u817F\u809A\u7D27", "\u8E2E\u811A\u62BD\u7B4B", "\u8DDF\u8171\u7D27", "\u8D70\u591A\u4E86\u5C0F\u817F\u9178"],
    bookPage: 359
    // 「踝跖屈肌紧张：腓肠肌、比目鱼肌」
  },
  {
    id: "soleus",
    name: "\u6BD4\u76EE\u9C7C\u808C",
    alias: ["\u5C0F\u817F\u6DF1\u5C42"],
    region: "leg",
    type: "tight",
    side: "back",
    x: 41,
    y: 82.7,
    desc: "\u8153\u80A0\u808C\u5E95\u4E0B\u7684\u5BBD\u6241\u808C\u8089\uFF0C\u7AD9\u7740\u65F6\u7684\u4E3B\u529B\uFF0C\u5E38\u7A7F\u9AD8\u8DDF\u978B\u6216\u4E45\u7AD9\u4F1A\u53D8\u7D27",
    senses: ["\u5C0F\u817F\u6DF1\u5904\u7D27", "\u4E45\u7AD9\u5C0F\u817F\u9178", "\u8E2E\u811A\u4E0D\u7A33", "\u811A\u8E1D\u786C"],
    bookPage: 359,
    // 「踝跖屈肌紧张：腓肠肌、比目鱼肌」——书里列名
    bookNote: "book"
  },
  {
    id: "fibularis",
    name: "\u8153\u9AA8\u808C\u7FA4",
    alias: ["\u8153\u9AA8\u957F\u808C", "\u8153\u9AA8\u77ED\u808C"],
    region: "leg",
    type: "tight",
    side: "back",
    x: 37,
    y: 86.3,
    desc: "\u5C0F\u817F\u5916\u4FA7\uFF0C\u8D1F\u8D23\u811A\u5F80\u5916\u7FFB\u548C\u8E29\u7A33\u5730\u9762\uFF0C\u7D27\u4E86\u811A\u8E1D\u5BB9\u6613\u50F5",
    senses: ["\u5C0F\u817F\u5916\u4FA7\u7D27", "\u811A\u8E1D\u5916\u4FA7\u9178", "\u5D34\u811A\u540E\u4E00\u76F4\u4E0D\u8212\u670D", "\u811A\u638C\u5916\u4FA7\u5403\u529B"],
    // ⚠️ 直觉容易把这块当成"崴脚后变弱"，但书 p.359 明确把腓骨长肌 / 短肌
    //    列在「踝跖屈肌紧张」一侧，默认按书的口径走
    bookPage: 359,
    // 「踝跖屈肌紧张：腓肠肌、比目鱼肌、胫骨后肌、趾长屈肌、腓骨长肌和腓骨短肌」
    bookNote: "book"
  },
  {
    id: "tibialis_posterior",
    name: "\u80EB\u9AA8\u540E\u808C",
    alias: [],
    region: "leg",
    type: "tight",
    side: "back",
    x: 42,
    y: 87.1,
    desc: "\u5C0F\u817F\u6700\u6DF1\u5C42\uFF0C\u4ECE\u5185\u4FA7\u515C\u4F4F\u8DB3\u5F13\uFF0C\u7D27\u6216\u75B2\u52B3\u90FD\u4F1A\u8BA9\u811A\u5E95\u5185\u4FA7\u53D1\u9178",
    senses: ["\u811A\u5E95\u5185\u4FA7\u9178", "\u811A\u8E1D\u91CC\u9762\u75BC", "\u8D70\u591A\u4E86\u8DB3\u5F13\u75DB", "\u811A\u8E29\u4E0D\u5E73"],
    // ⚠️ 常见说法是"胫骨后肌功能不全导致足弓塌陷"（偏弱，
    //    但书 p.359 把它列在「踝跖屈肌紧张」，默认按书走，文案别写成塌陷
    bookPage: 359,
    // 「踝跖屈肌紧张：…胫骨后肌…」——书里列名
    bookNote: "book"
  },
  {
    id: "tibialis_anterior",
    name: "\u80EB\u9AA8\u524D\u808C",
    alias: [],
    region: "leg",
    type: "weak",
    side: "front",
    x: 39,
    y: 80,
    desc: "\u5C0F\u817F\u524D\u9762\uFF0C\u8D1F\u8D23\u52FE\u811A\uFF0C\u5F31\u4E86\u8D70\u8DEF\u5BB9\u6613\u7ECA\u811A",
    senses: ["\u52FE\u811A\u6CA1\u529B", "\u8D70\u8DEF\u7ECA\u811A", "\u5C0F\u817F\u524D\u4FA7\u9178"],
    bookPage: 359
    // 「踝背伸肌肌力减弱」
  },
  // ============ 上肢 arm（可选，默认不参与判断）============
  {
    id: "biceps_brachii",
    name: "\u80B1\u4E8C\u5934\u808C",
    alias: [],
    region: "arm",
    type: "tight",
    side: "front",
    x: 27,
    y: 31,
    desc: "\u4E0A\u81C2\u524D\u9762\uFF0C\u5C48\u8098\u7684\u4E3B\u529B",
    senses: ["\u4E0A\u81C2\u524D\u9762\u7D27", "\u80F3\u818A\u4F38\u4E0D\u76F4"],
    bookPage: 118
    // 肘模式「屈肘肌群紧张：肱二头肌」
  },
  {
    id: "triceps_brachii",
    name: "\u80B1\u4E09\u5934\u808C",
    alias: [],
    region: "arm",
    type: "weak",
    side: "back",
    x: 73,
    y: 31,
    desc: "\u4E0A\u81C2\u540E\u9762\uFF0C\u4F38\u8098\u7684\u4E3B\u529B",
    senses: ["\u80F3\u818A\u6CA1\u52B2", "\u624B\u6491\u4E0D\u4F4F"],
    bookPage: 118
    // 「肘伸肌群肌力减弱：肱三头肌」
  },
  {
    id: "brachioradialis",
    name: "\u80B1\u6861\u808C",
    alias: [],
    region: "arm",
    type: "tight",
    side: "front",
    x: 26,
    y: 37.4,
    desc: "\u524D\u81C2\u5916\u4FA7\u9760\u8098\u7684\u90A3\u6761\uFF0C\u6525\u4E1C\u897F\u548C\u62CE\u4E1C\u897F\u65F6\u53D1\u529B\uFF0C\u7528\u9F20\u6807\u4E45\u4E86\u4F1A\u7D27",
    senses: ["\u524D\u81C2\u5916\u4FA7\u53D1\u7D27", "\u624B\u8098\u4E0B\u65B9\u9178", "\u62CE\u4E1C\u897F\u8D39\u52B2", "\u9F20\u6807\u624B"],
    bookNote: "infer"
    // 书未列名。p.118「屈肘肌群紧张」的同群推断
  },
  {
    id: "forearm_flexors",
    name: "\u524D\u81C2\u5C48\u808C\u7FA4",
    alias: ["\u8155\u5C48\u808C", "\u6861\u4FA7\u8155\u5C48\u808C", "\u5C3A\u4FA7\u8155\u5C48\u808C"],
    region: "arm",
    type: "tight",
    side: "front",
    x: 25,
    y: 43,
    desc: "\u524D\u81C2\u5185\u4FA7\uFF0C\u7BA1\u63E1\u62F3\u548C\u5C48\u8155\uFF0C\u6253\u5B57\u4E45\u4E86\u4F1A\u7D27",
    senses: ["\u524D\u81C2\u5185\u4FA7\u7D27", "\u624B\u8155\u9178", "\u6253\u5B57\u7D2F", "\u9AD8\u5C14\u592B\u7403\u8098"],
    bookPage: 141
    // 腕模式「腕屈肌紧张」
  },
  {
    id: "forearm_extensors",
    name: "\u524D\u81C2\u4F38\u808C\u7FA4",
    alias: ["\u8155\u4F38\u808C", "\u6861\u4FA7\u8155\u4F38\u808C"],
    region: "arm",
    type: "weak",
    side: "back",
    x: 75,
    y: 43,
    desc: "\u524D\u81C2\u5916\u4FA7\uFF0C\u7BA1\u62AC\u624B\u80CC\uFF0C\u5F31\u4E86\u5BB9\u6613\u7F51\u7403\u8098",
    senses: ["\u524D\u81C2\u5916\u4FA7\u75BC", "\u624B\u80CC\u6CA1\u52B2", "\u7F51\u7403\u8098"],
    bookPage: 141
    // 「腕伸肌肌力减弱」
  }
];
var REGION_LABEL = {
  neck_shoulder: "\u9888\u80A9",
  upper_back: "\u80F8\u80CC",
  low_back_hip: "\u8170\u9AA8\u76C6",
  leg: "\u4E0B\u80A2",
  arm: "\u4E0A\u80A2"
};
// \u533A\u57DF\u2192\u5019\u9009\u808C\u8089\u6620\u5C04\u8868\uFF08\u53EA\u8D1F\u8D23\u7B5B\u9009\uFF0C\u4E0D\u5224\u5B9A\u72B6\u6001\uFF09
var REGION_CANDIDATES = {
  neck_shoulder: {
    name: "\u9888\u80A9",
    candidates: [
      { id: "trapezius_upper",     relation: "local",     note: "\u9888\u4FA7\u5230\u80A9\u90E8\uFF0C\u6700\u5E38\u89C1\u4E0D\u9002\u70B9" },
      { id: "levator_scapulae",    relation: "local",     note: "\u9888\u5230\u80A9\u80DB\u9AA8\u4E0A\u89D2" },
      { id: "sternocleidomastoid",relation: "local",     note: "\u9885\u524D\u5916\u4FA7" },
      { id: "suboccipital",        relation: "local",     note: "\u540E\u8111\u52FA\u4E0E\u9885\u4EA4\u754C\u5904" },
      { id: "splenius_capitis",    relation: "local",     note: "\u540E\u9885\u4E24\u4FA7" },
      { id: "scalenes",            relation: "local",     note: "\u9885\u90E8\u6DF1\u5C42" },
      { id: "deep_neck_flexor",    relation: "stabilizer",note: "\u9885\u6DF1\u5C42\u7A33\u5B9A\u808C\uFF0C\u4E3B\u89C2\u65E0\u529B\u4E0D\u80FD\u5224\u5B9A\u5176\u5F31" },
      { id: "pectoralis_minor",    relation: "referred",  note: "\u80F8\u524D\u6DF1\u5C42\u7D27\u5F20\u53EF\u7275\u6D89\u81F3\u9885\u80A9" }
    ]
  },
  upper_back: {
    name: "\u80F8\u80CC",
    candidates: [
      { id: "pectoralis_major",    relation: "local",    note: "\u80F8\u524D\u4E3B\u529B" },
      { id: "pectoralis_minor",    relation: "local",    note: "\u80F8\u5927\u808C\u6DF1\u5C42" },
      { id: "subscapularis",       relation: "local",    note: "\u80A9\u80DB\u9AA8\u524D\u9762" },
      { id: "serratus_anterior",   relation: "local",    note: "\u80F8\u5ED3\u4FA7\u9762" },
      { id: "rhomboid",            relation: "local",    note: "\u4E24\u80A9\u80DB\u9AA8\u4E4B\u95F4" },
      { id: "trapezius_middle",     relation: "local",    note: "\u80A9\u80DB\u9AA8\u5185\u4FA7" },
      { id: "trapezius_lower",      relation: "local",    note: "\u80F8\u80CC\u4E0B\u90E8" },
      { id: "latissimus_dorsi",    relation: "local",    note: "\u814B\u4E0B\u540E\u65B9" },
      { id: "infraspinatus",       relation: "local",    note: "\u80A9\u80DB\u9AA8\u540E\u9762" },
      { id: "teres_major",         relation: "local",    note: "\u80A9\u80DB\u9AA8\u4E0B\u65B9" },
      { id: "teres_minor",         relation: "local",    note: "\u80A9\u80DB\u9AA8\u540E\u4E0B" },
      { id: "supraspinatus",       relation: "local",    note: "\u80A9\u80DB\u9AA8\u4E0A\u65B9" }
    ]
  },
  low_back_hip: {
    name: "\u8170\u9AA8\u76C6",
    candidates: [
      { id: "erector_spinae",      relation: "local",    note: "\u810A\u67F1\u4E24\u4FA7\u7AD6\u808C" },
      { id: "multifidus",         relation: "stabilizer",note: "\u810A\u67F1\u6DF1\u5C42\u7A33\u5B9A" },
      { id: "quadratus_lumborum", relation: "local",    note: "\u8170\u90E8\u4E24\u4FA7\u6DF1\u5C42" },
      { id: "latissimus_dorsi",    relation: "local",    note: "\u8170\u80CC\u533A\u5BBD\u5C3F\u90E8" },
      { id: "obliquus_externus",  relation: "local",    note: "\u8179\u90E8\u4FA7\u9762\u6D45\u5C42" },
      { id: "obliquus_internus",  relation: "local",    note: "\u8179\u90E8\u6DF1\u5C42" },
      { id: "rectus_abdominis",   relation: "local",    note: "\u8179\u90E8\u6B63\u4E2D" },
      { id: "transversus_abdominis",relation: "stabilizer",note: "\u8179\u90E8\u6700\u6DF1\u5C42\u7A33\u5B9A" },
      { id: "rectus_femoris",     relation: "local",    note: "\u80A1\u56DB\u5934\u808C\u4E2D\u8DE8\u9ACB\u819D\u7684\u80A1\u76F4\u808C\uFF0Cp.281 \u9ACB\u6A21\u5F0F\u7D27\u5F20\u7EC4\uFF08\u65E0\u72EC\u7ACB\u8DEF\u5F84\uFF0C\u8272\u5757\u6620\u5C04\u80A1\u56DB\u5934\u808C\uFF09" },
      { id: "iliopsoas",          relation: "local",    note: "\u8170\u5927\u808C\u8FDE\u63A5\u810A\u67F1\u548C\u80A1\u9AA8" },
      { id: "piriformis",         relation: "local",    note: "\u81C0\u90E8\u6DF1\u5C42" },
      { id: "gluteus_maximus",    relation: "local",    note: "\u81C0\u90E8\u4E3B\u529B" },
      { id: "gluteus_medius",     relation: "local",    note: "\u81C0\u90E8\u4FA7\u9762" },
      { id: "tensor_fasciae_latae",relation: "local",   note: "\u9ADB\u9AA8\u5916\u4FA7" }
    ]
  },
  leg: {
    name: "\u4E0B\u80A2",
    candidates: [
      { id: "quadriceps",          relation: "local",    note: "\u5927\u817F\u524D\u4FA7" },
      { id: "hamstrings",          relation: "local",    note: "\u5927\u817F\u540E\u4FA7" },
      { id: "sartorius",           relation: "local",    note: "\u5927\u817F\u5185\u4FA7\u7EC6\u957F" },
      { id: "hip_adductors",      relation: "local",    note: "\u5927\u817F\u5185\u4FA7" },
      { id: "iliotibial_tract",    relation: "local",    note: "\u5927\u817F\u5916\u4FA7\u7B80" },
      { id: "gastrocnemius",       relation: "local",    note: "\u5C0F\u817F\u540E\u4FA7\u6D45\u5C42" },
      { id: "soleus",              relation: "local",    note: "\u5C0F\u817F\u540E\u4FA7\u6DF1\u5C42" },
      { id: "tibialis_anterior",   relation: "local",    note: "\u5C0F\u817F\u524D\u4FA7" },
      { id: "tibialis_posterior",  relation: "stabilizer",note: "\u5C0F\u817F\u6DF1\u5C42\u7A33\u5B9A" },
      { id: "fibularis",           relation: "local",    note: "\u5C0F\u817F\u5916\u4FA7" }
    ]
  },
  arm: {
    name: "\u4E0A\u80A2",
    candidates: [
      { id: "deltoid",             relation: "local",    note: "\u80A9\u90E8\u4E09\u89D2\u808C" },
      { id: "biceps_brachii",      relation: "local",    note: "\u4E0A\u81C2\u524D\u4FA7" },
      { id: "brachioradialis",     relation: "local",    note: "\u524D\u81C2\u5C48\u808C" },
      { id: "triceps_brachii",     relation: "local",    note: "\u4E0A\u81C2\u540E\u4FA7" },
      { id: "forearm_flexors",     relation: "local",    note: "\u524D\u81C2\u5C48\u808C\u7FA4" },
      { id: "forearm_extensors",   relation: "local",    note: "\u540E\u81C2\u4F38\u808C\u7FA4" }
    ]
  }
};
// \u6309 SVG \u5750\u6807\u5224\u5B9A\u89E3\u5256\u5B66\u4FA7\u522B\uFF08\u6B63\u9762\u5DE6\u4FA7\u5C4F\u5E55=\u4EBA\u4F53\u53F3\u4FA7\uFF0C\u80CC\u9762\u5DE6\u4FA7\u5C4F\u5E55=\u4EBA\u4F53\u5DE6\u4FA7\uFF09
function getSide(svgX, view) {
  var isLeftOfCenter = svgX < 100;
  if (Math.abs(svgX - 100) < 5) return "midline";
  if (view === "front") {
    return isLeftOfCenter ? "right" : "left";
  } else {
    return isLeftOfCenter ? "left" : "right";
  }
}
// 简单感觉词→关键词映射，用于和模式 senses 做模糊匹配
// 注意：这只是"线索"，不直接决定肌肉状态
// 关键词必须≥2字，避免单字误匹配（如"酸"会匹配所有含"酸"的 senses）
var FEEL_KEYWORDS = {
  "\u9178\u75DB": ["\u9178\u75DB", "\u53D1\u9178"],      // 酸痛→精确"酸痛"或"发酸"
  "\u50F5\u786C": ["\u50F5\u786C", "\u53D1\u50F5", "\u53D1\u7D27"],  // 僵硬→精确"僵硬/发僵/发紧"
  "\u65E0\u529B": ["\u6CA1\u52B2", "\u6CA1\u529B\u6C14", "\u53D1\u4E0D\u4E0A\u529B", "\u6251\u4E0D\u4F4F"],  // 无力→精确匹配
  "\u5176\u4ED6": []               // 其他→靠 freeText 直接匹配
};
// 检查感觉词能否匹配某条 sense 文本
// 规则：精确子串匹配 OR 关键词匹配（关键词必须≥2字）
function feelMatchesSense(feel, sense) {
  if (!feel || !sense) return false;
  // 1. 精确子串匹配（feel 或 sense 互含对方完整词）
  if (sense.indexOf(feel) !== -1 || feel.indexOf(sense) !== -1) return true;
  // 2. 关键词匹配：从 FEEL_KEYWORDS 取该感觉的关键词，逐个检查是否被 sense 包含
  var keywords = FEEL_KEYWORDS[feel];
  if (keywords) {
    for (var i = 0; i < keywords.length; i++) {
      if (keywords[i].length >= 2 && sense.indexOf(keywords[i]) !== -1) return true;
    }
  }
  return false;
}
// 证据等级定义（非概率，是证据充分度）
// L1: 命中模式且≥2条独立线索 → 可涂色
// L2: 命中模式或单条强线索 → 可涂色（虚线）
// L3: 仅候选映射或理论倾向 → 不涂色
// L0: 信息不足 → 不涂色
function analyzeReports(reports, patterns, muscleMap) {
  var results = [];
  (reports || []).forEach(function(rep) {
    var rc = REGION_CANDIDATES[rep.regionId];
    if (!rc) return;
    // 预处理：将 freeText 作为强匹配源，简单感觉标签只作为线索
    var freeText = rep.freeText || '';
    var hasFreeText = freeText.length > 0;
    // 步骤1：区域→候选肌肉映射（纯映射，不判定状态）
    rc.candidates.forEach(function(cand) {
      var m = muscleMap[cand.id];
      if (!m) return;
      var status = "candidate";
      var evidenceLevel = "L3";  // 默认 L3：仅候选映射
      var clues = [];
      // 步骤2：感觉词与肌肉 senses 匹配（只产生线索，不直接定状态）
      if (rep.feel) {
        if (m.senses && m.senses.some(function(s) { return feelMatchesSense(rep.feel, s); })) {
          clues.push("\u611F\u89C9\u8BCD\u4E0E\u8BE5\u808C\u8089\u7684\u5E38\u89C1\u75C7\u72B6\u5339\u914D");
        }
      }
      // 步骤3：模式匹配（只有 freeText 精确匹配模式 senses 才决定状态）
      // 简单感觉标签（酸痛/僵硬/无力）只产生线索，不触发状态变更
      var inTight = false, inWeak = false;
      var patternHits = [];
      (patterns || []).forEach(function(pt) {
        var inThisTight = (pt.tight || []).some(function(x) { return (typeof x === "string" ? x : x.id) === cand.id; });
        var inThisWeak = (pt.weak || []).some(function(x) { return (typeof x === "string" ? x : x.id) === cand.id; });
        var inThisInferredTight = (pt.inferredTight || []).some(function(x) { return (typeof x === "string" ? x : x.id) === cand.id; });
        var inThisInferredWeak = (pt.inferredWeak || []).some(function(x) { return (typeof x === "string" ? x : x.id) === cand.id; });
        // 只有 freeText 精确匹配模式 senses 才触发状态变更
        var senseHit = false;
        if (hasFreeText && pt.senses) {
          senseHit = pt.senses.some(function(s) {
            return s.indexOf(freeText) !== -1 || freeText.indexOf(s) !== -1;
          });
        }
        if (senseHit) {
          if (inThisTight) { inTight = true; patternHits.push({id: pt.id, role: "tight", bookPage: pt.bookPage}); clues.push("\u547D\u4E2D" + pt.id + "\u6A21\u5F0F\u7684\u7D27\u5F20\u808C\u7EC4"); }
          if (inThisWeak) { inWeak = true; patternHits.push({id: pt.id, role: "weak", bookPage: pt.bookPage}); clues.push("\u547D\u4E2D" + pt.id + "\u6A21\u5F0F\u7684\u8584\u5F31\u808C\u7EC4"); }
          if (inThisInferredTight) { patternHits.push({id: pt.id, role: "inferred_tight", bookPage: pt.bookPage}); clues.push("\u63A8\u65AD\u53EF\u80FD\u5C5E\u4E8E" + pt.id + "\u6A21\u5F0F\u7684\u7D27\u5F20\u808C\u7EC4\uFF08\u63A8\u65AD\u9879\uFF0C\u975E\u4E66\u7C4D\u539F\u6587\u76F4\u63A5\u5217\u51FA\uFF09"); }
          if (inThisInferredWeak) { patternHits.push({id: pt.id, role: "inferred_weak", bookPage: pt.bookPage}); clues.push("\u63A8\u65AD\u53EF\u80FD\u5C5E\u4E8E" + pt.id + "\u6A21\u5F0F\u7684\u8584\u5F31\u808C\u7EC4\uFF08\u63A8\u65AD\u9879\uFF09"); }
        }
      });
      // 步骤4：状态判定（基于模式命中，不基于 m.type）
      var clueCount = clues.length;
      if (inTight && !inWeak) {
        status = "possibly_tight";
        evidenceLevel = clueCount >= 2 ? "L1" : "L2";
      } else if (inWeak && !inTight) {
        status = "possibly_weak";
        evidenceLevel = clueCount >= 2 ? "L1" : "L2";
      } else if (inTight && inWeak) {
        status = "candidate";  // 冲突，降级
        evidenceLevel = "L2";
        clues.push("\u8BE5\u808C\u8089\u5728\u4E0D\u540C\u6A21\u5F0F\u4E2D\u627F\u62C5\u4E0D\u540C\u89D2\u8272\uFF0C\u5F53\u524D\u4FE1\u606F\u4E0D\u8DB3\u4EE5\u5224\u65AD");
      } else {
        status = "candidate";
        evidenceLevel = "L3";
      }
      // 步骤5：保护——深层稳定肌不靠主观感觉判弱
      if (cand.relation === "stabilizer" && status === "possibly_weak") {
        status = "candidate";
        evidenceLevel = "L3";
        clues.push("\u8BE5\u808C\u8089\u4E3A\u6DF1\u5C42\u7A33\u5B9A\u808C\uFF0C\u9700\u4E13\u4E1A\u8BC4\u4F30\u624D\u80FD\u5224\u5B9A\u5176\u72B6\u6001");
      }
      // 步骤6：无任何线索→unknown
      if (clueCount === 0 && !inTight && !inWeak) {
        status = "unknown";
        evidenceLevel = "L0";
      }
      // 位置 hint
      if (rep.clickHintMuscleId === cand.id) {
        clues.push("\u7528\u6237\u70B9\u51FB\u4F4D\u7F6E\u76F4\u63A5\u4F4D\u4E8E\u8BE5\u808C\u8089\u533A\u57DF");
      }
      results.push({
        muscleId: cand.id,
        muscleName: m.name,
        region: rep.regionId,
        side: rep.side,
        status: status,
        evidenceLevel: evidenceLevel,
        clues: clues,
        relation: cand.relation,
        patternHits: patternHits,
        allowColor: status === "possibly_tight" || status === "possibly_weak"
      });
    });
  });
  // 步骤7：去重——同一肌肉同一侧别取最高优先级
  var seen = {};
  results.forEach(function(r) {
    var key = r.muscleId + "|" + (r.side || "midline");
    if (!seen[key] || priorityOf(r.status) > priorityOf(seen[key].status)) {
      seen[key] = r;
    }
  });
  var deduped = [];
  Object.keys(seen).forEach(function(k) { deduped.push(seen[k]); });
  return deduped;
}
function priorityOf(status) {
  if (status === "possibly_tight" || status === "possibly_weak") return 3;
  if (status === "candidate") return 2;
  return 1;
}
var MUSCLE_IDS = new Set(MUSCLES.map((m) => m.id));
var MUSCLE_MAP = Object.fromEntries(MUSCLES.map((m) => [m.id, m]));
function filterByLibrary(ids = []) {
  return ids.filter((id) => MUSCLE_IDS.has(id));
}

// src/data/patterns.ts
var PATTERNS = [
  // ==================== 核心链路（Demo 主讲） ====================
  {
    id: "cranio_cervical",
    joint: "\u9885\u9888\u533A",
    bookPage: 235,
    limitation: "\u5934\u90E8\u8FC7\u5EA6\u524D\u4F38\u59FF\u52BF",
    tight: ["sternocleidomastoid", "suboccipital", "levator_scapulae"],
    weak: ["deep_neck_flexor"],
    // 头夹肌在书 p.217 有依据（负责抬头和转头），但不在 p.235 这个模式的原文里，故列为推断项
    inferredTight: ["splenius_capitis"],
    impact: '\u652F\u6491\u5934\u90E8\u548C\u9888\u90E8\u7684\u4F38\u808C\u5E94\u529B\u589E\u52A0\uFF1B\u8BE5\u533A\u57DF"\u6FC0\u75DB\u70B9"\u589E\u52A0\uFF1B\u5934\u75DB\u98CE\u9669\u589E\u52A0\uFF1B\u989E\u4E0B\u988C\u5173\u8282\u75BC\u75DB\u98CE\u9669\u589E\u52A0',
    treatment: "\u5F3A\u5316\u9885\u9888\u533A\u56DE\u7F29\u808C\u808C\u529B\uFF08\u6536\u4E0B\u988C\u8FD0\u52A8\uFF09\uFF1B\u6795\u4E0B\u808C\u7FA4\u8F6F\u7EC4\u7EC7\u677E\u52A8\uFF1B\u7275\u4F38\u6795\u4E0B\u808C\u7FA4\u548C\u80F8\u9501\u4E73\u7A81\u808C",
    note: "\u8FC7\u5EA6\u7684\u5934\u90E8\u524D\u4F38\u59FF\u52BF\u53EF\u80FD\u662F\u7531\u6D3B\u52A8\u53C2\u4E0E\u5F15\u8D77\uFF0C\u5982\u64CD\u4F5C\u7535\u8111\u7684\u5DE5\u4F5C\u6216\u7ECF\u5E38\u770B\u624B\u673A\u2026\u2026\u9885\u9888\u533A\u57DF\u524D\u4FA7\u7684\u808C\u8089\u4F1A\u53D1\u751F\u77ED\u7F29\uFF0C\u4EE5\u9002\u5E94\u5176\u65B0\u7684\u4E60\u60EF\u957F\u5EA6\u3002",
    senses: [
      "\u8116\u5B50\u9178",
      "\u8116\u5B50\u540E\u9762\u9178",
      "\u8116\u5B50\u4E24\u4FA7\u7D27",
      "\u540E\u8111\u52FA\u6C89",
      "\u540E\u8111\u52FA\u53D1\u6C89",
      "\u8F6C\u5934\u8D39\u52B2",
      "\u5934\u75BC",
      "\u5934\u6655\u6C89\u6C89",
      "\u843D\u6795",
      "\u8F6C\u4E0D\u52A8",
      "\u62AC\u5934\u8D39\u52B2",
      "\u8116\u5B50\u50F5",
      "\u5934\u524D\u4F38",
      "\u770B\u624B\u673A\u8116\u5B50\u9178"
    ],
    demo: true
  },
  {
    id: "scapulothoracic",
    joint: "\u80A9\u80DB\u80F8\u58C1\u5173\u8282",
    bookPage: 89,
    limitation: "\u80A9\u80DB\u9AA8\u8FC7\u5EA6\u4E0B\u65CB\u3001\u524D\u4F38\u548C\u524D\u503E\uFF08\u901A\u5E38\u4F34\u6709\u80F8\u690E\u8FC7\u5EA6\u540E\u51F8\u548C\u5934\u90E8\u524D\u4F38\uFF09",
    tight: ["pectoralis_major", "pectoralis_minor"],
    weak: ["rhomboid", "trapezius_middle", "serratus_anterior", "trapezius_upper", "trapezius_lower"],
    impact: "\u5F71\u54CD\u80A9\u80DB\u9AA8\u6B63\u5E38\u8FD0\u52A8\uFF0C\u8FDB\u800C\u5F71\u54CD\u80A9\u5173\u8282\u6D3B\u52A8\uFF1B\u5E38\u4E0E\u5706\u80A9\u76F8\u5173",
    treatment: "\u5F3A\u5316\u80A9\u80DB\u9AA8\u540E\u7F29\u808C\u529B\u91CF\uFF1B\u5F3A\u5316\u80A9\u80DB\u9AA8\u4E0A\u65CB\u808C\u529B\u91CF\uFF1B\u7275\u4F38\u80F8\u5927\u808C\u548C\u80F8\u5C0F\u808C\uFF1B\u6539\u5584\u80F8\u80CC\u59FF\u52BF\uFF1B\u5F3A\u5316\u80F8\u690E\u4F38\u808C\u529B\u91CF",
    note: "\u8FD9\u79CD\u80A9\u80DB\u80F8\u58C1\u4F4D\u7F6E\u901A\u5E38\u4E0E\u5706\u80A9\u6709\u5173\uFF0C\u5E76\u4E14\u7531\u4E8E\u9700\u8981\u5C06\u624B\u653E\u5728\u8EAB\u524D\u7684\u4EFB\u52A1\u5F88\u591A\uFF0C\u5982\u6253\u5B57\u3001\u9A7E\u9A76\u3001\u53D1\u77ED\u4FE1\uFF0C\u751A\u81F3\u5728\u8BFE\u5802\u4E0A\u505A\u7B14\u8BB0\uFF0C\u56E0\u800C\u4F3C\u4E4E\u975E\u5E38\u5E38\u89C1\u3002",
    senses: [
      "\u80A9\u8180\u6C89",
      "\u8038\u7740\u80A9",
      "\u80A9\u8180\u50F5",
      "\u5706\u80A9",
      "\u542B\u80F8",
      "\u9A7C\u80CC",
      "\u633A\u4E0D\u76F4",
      "\u80A9\u80DB\u9AA8\u5185\u4FA7\u9178",
      "\u4E24\u80A9\u4E4B\u95F4\u9178",
      "\u80A9\u8180\u9178"
    ],
    demo: true
  },
  {
    id: "shoulder_glenohumeral",
    joint: "\u76C2\u80B1\u5173\u8282",
    bookPage: 87,
    limitation: "\u80A9\u5173\u8282\u5916\u5C55\u6216\u524D\u5C48\u53D7\u9650 / \u5916\u65CB\u4E0D\u8DB3",
    tight: ["pectoralis_major", "latissimus_dorsi", "subscapularis"],
    // 三角肌是书 p.87 原文列名：「外展肌或前屈肌肌力减弱：三角肌前束、三角肌中束、冈上肌」
    // —— 书里三角肌就排在冈上肌之前，所以放在首位。
    // ⚠️ 这个模式 weak 共 6 块但只显示前 3（slice(0,3)），放末尾会被截掉。
    //    被挤到第 4 位的前锯肌不会消失：它在肩胛胸壁模式的 weak 里仍是第 3 位。
    weak: ["deltoid", "supraspinatus", "infraspinatus", "serratus_anterior", "trapezius_upper", "trapezius_lower"],
    impact: "\u62AC\u624B\u3001\u591F\u540E\u80CC\u7B49\u65E5\u5E38\u52A8\u4F5C\u53D7\u9650",
    treatment: "\u7275\u4F38\u7D27\u5F20\u808C\u8089\u3001\u8F6F\u7EC4\u7EC7\u677E\u89E3\u3001\u5173\u8282\u677E\u52A8\u3001\u5F3A\u5316\u51CF\u5F31\u808C\u8089\u7684\u529B\u91CF",
    senses: [
      "\u62AC\u624B\u8D39\u52B2",
      "\u62AC\u624B\u80A9\u8180\u75BC",
      "\u624B\u591F\u4E0D\u5230\u540E\u80CC",
      "\u68B3\u5934\u8D39\u52B2",
      "\u80A9\u8180\u8F6C\u4E0D\u5F00",
      "\u80A9\u8180\u6CA1\u52B2",
      "\u624B\u81C2\u4FA7\u4E3E\u53D1\u6296"
    ],
    demo: true
  },
  {
    id: "hip",
    joint: "\u9ACB\u5173\u8282",
    bookPage: 281,
    limitation: "\u9ACB\u5173\u8282\u4F38\u5C55\u51CF\u5C11 / \u9ACB\u5173\u8282\u5C48\u66F2\u631B\u7F29",
    tight: ["iliopsoas", "rectus_femoris", "erector_spinae"],
    weak: ["gluteus_maximus", "hamstrings", "rectus_abdominis", "transversus_abdominis"],
    // 臀中肌：书 p.281 同页讨论髋部外展肌作用，但不在该模式原文的Weak清单里
    inferredWeak: ["gluteus_medius"],
    impact: "\u957F\u671F\u9AA8\u76C6\u524D\u503E\u5BFC\u81F4\u8170\u690E\u8FC7\u5EA6\u524D\u51F8\uFF1B\u8170\u80CC\u90E8\u4F38\u808C\u7D27\u5F20",
    treatment: "\u7275\u4F38\u9ACB\u5C48\u808C\uFF1B\u7275\u4F38\u8170\u80CC\u90E8\u4F38\u808C\uFF1B\u5F3A\u5316\u9ACB\u4F38\u808C\u808C\u529B\uFF08\u81C0\u6865\uFF09\uFF1B\u5982\u6709\u524D\u9AA8\u76C6\u503E\u659C\u9700\u5F3A\u5316\u8179\u90E8\u808C\u8089\u529B\u91CF",
    note: "\u9ACB\u5C48\u808C\u6784\u6210\u4E86\u9AA8\u76C6\u524D\u503E\u529B\u5076\u7684\u4E00\u534A\u3002\u5982\u679C\u8FD9\u4E9B\u808C\u8089\u53D8\u5F97\u7D27\u5F20\uFF0C\u5373\u4F7F\u6CA1\u6709\u8170\u80CC\u90E8\u4F38\u808C\u7684\u914D\u5408\uFF0C\u9AA8\u76C6\u4E5F\u53EF\u80FD\u4F1A\u5411\u524D\u503E\u659C\u3002\uFF08\u957F\u65F6\u95F4\u5750\u59FF\u88AB\u660E\u786E\u5217\u4E3A\u6210\u56E0\uFF09",
    senses: [
      "\u8170\u9178",
      "\u4E45\u5750\u76F4\u4E0D\u8D77\u6765",
      "\u7AD9\u4E45\u4E86\u8170\u9178",
      "\u9ACB\u524D\u9762\u7D27",
      "\u5927\u817F\u6839\u524D\u9762\u7D27",
      "\u9AA8\u76C6\u524D\u503E",
      "\u5C41\u80A1\u584C",
      "\u4E0A\u697C\u817F\u6CA1\u52B2",
      "\u8170\u633A\u4E0D\u76F4"
    ],
    demo: true
  },
  // ==================== 扩展链路（能答，Demo 一句带过） ====================
  {
    id: "thoracic",
    joint: "\u80F8\u690E\u533A\u57DF",
    bookPage: 236,
    limitation: "\u80F8\u690E\u8FC7\u5EA6\u540E\u51F8\uFF08\u9A7C\u80CC\uFF09",
    tight: ["pectoralis_major", "pectoralis_minor", "iliopsoas"],
    weak: ["erector_spinae"],
    impact: "\u4E0E\u5934\u9888\u90E8\u524D\u4F38\u548C\u5706\u80A9\u76F8\u5173\uFF0C\u5F71\u54CD\u8EAF\u5E72\u4F38\u5C55\u80FD\u529B",
    treatment: "\u5F3A\u5316\u80F8\u6BB5\u4F38\u808C\u808C\u529B\uFF1B\u5F3A\u5316\u9ACB\u4F38\u808C\u808C\u529B\uFF1B\u7275\u4F38\u8EAF\u5E72\u5C48\u808C\u3001\u80F8\u5927\u808C\u548C\u80F8\u5C0F\u808C\u3001\u9ACB\u5C48\u808C",
    senses: ["\u9A7C\u80CC", "\u633A\u4E0D\u76F4\u80CC", "\u540E\u80CC\u5706", "\u80F8\u690E\u50F5", "\u4E0A\u80CC\u90E8\u9178"]
  },
  {
    id: "knee",
    joint: "\u819D\u5173\u8282",
    bookPage: 316,
    limitation: "\u4F38\u5C55\u4E0D\u8DB3 / \u5C48\u66F2\u631B\u7F29",
    tight: ["hamstrings"],
    weak: ["quadriceps"],
    // 髂胫束书里没列名（p.281 只点到它的起点阔筋膜张肌），所以按推断项处理。
    // 放 tight 主项也塞得下，但那样同一处会多出一个"像书里写的"结论；
    // 放推断层既不挤主项，UI 上又如实标成浅色小点。
    inferredTight: ["iliotibial_tract"],
    impact: "\u5F71\u54CD\u8E72\u8D77\u3001\u4E0A\u4E0B\u697C\u68AF\u4E0E\u6B65\u884C",
    treatment: "\u7275\u4F38\u5C48\u819D\u808C\u7FA4\uFF1B\u5F3A\u5316\u80A1\u56DB\u5934\u808C\u808C\u529B",
    senses: [
      "\u5927\u817F\u540E\u4FA7\u7D27",
      "\u5F2F\u8170\u6478\u4E0D\u5230\u5730",
      "\u819D\u76D6\u53D1\u8F6F",
      "\u4E0B\u697C\u68AF\u6253\u8F6F\u817F",
      "\u8E72\u4E0D\u4E0B\u53BB",
      "\u8DD1\u6B65\u819D\u76D6\u5916\u4FA7\u75BC",
      "\u5927\u817F\u5916\u4FA7\u53D1\u7D27"
    ]
  },
  {
    id: "ankle",
    joint: "\u8E1D\u5173\u8282",
    bookPage: 359,
    limitation: "\u80CC\u4F38\u53D7\u9650 / \u8DD6\u5C48\u631B\u7F29",
    // 比目鱼肌是书 p.359 原文「踝跖屈肌紧张：腓肠肌、比目鱼肌、…」里点了名的，
    // 属主项不是推断项；该模式 tight 原本只有 1 块，slice(0,3) 还有名额，直接进 tight
    tight: ["gastrocnemius", "soleus"],
    weak: ["tibialis_anterior"],
    impact: "\u5F71\u54CD\u4E0B\u8E72\u3001\u4E0A\u4E0B\u697C\u68AF\u4E0E\u6B65\u6001",
    treatment: "\u7275\u4F38\u8DD6\u5C48\u808C\uFF1B\u5F3A\u5316\u8E1D\u80CC\u4F38\u808C\u808C\u529B",
    senses: [
      "\u5C0F\u817F\u809A\u7D27",
      "\u811A\u540E\u8DDF\u75BC",
      "\u8E2E\u811A\u62BD\u7B4B",
      "\u811A\u80CC\u52FE\u4E0D\u8D77\u6765",
      "\u8DDF\u8171\u7D27",
      "\u4E45\u7AD9\u5C0F\u817F\u9178",
      "\u5C0F\u817F\u6DF1\u5904\u7D27",
      "\u811A\u8E1D\u786C"
    ]
  },
  {
    id: "wrist",
    joint: "\u8155\u5173\u8282",
    bookPage: 141,
    limitation: "\u8155\u4F38\u5C55\u4E0D\u8DB3",
    tight: ["forearm_flexors"],
    weak: ["forearm_extensors"],
    impact: "\u5F71\u54CD\u6293\u63E1\u4E0E\u624B\u8155\u6D3B\u52A8\uFF0C\u4E45\u7528\u9F20\u6807\u952E\u76D8\u8005\u5E38\u89C1",
    treatment: "\u7275\u4F38\u7D27\u5F20\u7684\u8155\u5C48\u808C\uFF1B\u5F3A\u5316\u8155\u4F38\u808C\u529B\u91CF",
    senses: ["\u624B\u8155\u9178", "\u6253\u5B57\u7D2F", "\u9F20\u6807\u624B", "\u624B\u8155\u53D1\u7D27", "\u524D\u81C2\u5185\u4FA7\u7D27"]
  },
  {
    id: "elbow",
    joint: "\u8098\u5173\u8282\u590D\u5408\u4F53",
    bookPage: 118,
    limitation: "\u4F38\u5C55\u51CF\u5F31 / \u5C48\u66F2\u631B\u7F29",
    tight: ["biceps_brachii"],
    weak: ["triceps_brachii"],
    impact: "\u5F71\u54CD\u624B\u81C2\u5B8C\u5168\u4F38\u76F4",
    treatment: "\u7275\u4F38\u8098\u5C48\u808C\uFF1B\u5F3A\u5316\u8098\u4F38\u808C",
    // 原有的 3 条太窄（全是"伸不直/前面紧"）。现实里来问肘的几乎都带一个具体动作
    // ——拧毛巾、端锅、握鼠标后肘外侧疼。词不够就会掉进别人家：测试里
    // "手肘外侧疼，拧毛巾使劲就疼" 曾经因为共用「外侧」「疼」而被判成膝盖模式。
    senses: [
      "\u80F3\u818A\u4F38\u4E0D\u76F4",
      "\u624B\u8098\u524D\u9762\u7D27",
      "\u4E0A\u81C2\u524D\u9762\u7D27",
      "\u624B\u8098\u75BC",
      "\u624B\u8098\u5916\u4FA7\u75BC",
      "\u624B\u8098\u5185\u4FA7\u75BC",
      "\u7F51\u7403\u8098",
      "\u9AD8\u5C14\u592B\u7403\u8098",
      "\u62E7\u6BDB\u5DFE\u75BC",
      "\u62E7\u6BDB\u5DFE\u624B\u8098\u75BC",
      "\u7AEF\u4E1C\u897F\u624B\u8098\u75BC",
      "\u63D0\u4E1C\u897F\u624B\u8098\u75BC",
      "\u624B\u8098\u9178",
      "\u624B\u8098\u4F7F\u4E0D\u4E0A\u52B2"
    ]
  }
];
// ════════════════════════════════════════════════════════════════════
// 位置驱动诊断（docs/12 阶段1）
// 用户点「身体位置」→ resolveSlot 判 9 个 slot 之一 → 一对一映射失衡类型
// → analyzeBySlots 端出该类型完整过劳/过弱名单（跨区域全显示）。
// 旧文字链路 analyzeReports/matchPatterns/parseLocal 自阶段1起停用，保留不删。
// ════════════════════════════════════════════════════════════════════

// 9 个身体位置 → 9 个失衡类型（一对一）。framework 是解释外壳，不是第 10 种类型。
// bookName = 书原名（双层命名的第一层，卡片标题用）；plain = 通俗表现（第二层）。
var BODY_SLOTS = [
  { id: "neck", short: "颅颈型", name: "脖子", patternId: "cranio_cervical", framework: "UCS",
    bookName: "颅颈区 · 头部过度前伸姿势",
    plain: "头不自觉往前探，脖子后面发沉发紧，看手机电脑久了更明显" },
  { id: "chest", short: "圆肩型", name: "胸口/肩胛间", patternId: "scapulothoracic", framework: "UCS",
    bookName: "肩胛胸壁关节 · 肩胛骨过度下旋、前伸和前倾",
    plain: "含胸、两肩往前扣，肩胛骨之间发酸，打字开车看手机久了加重" },
  { id: "shoulder_girdle", short: "肩卡型", name: "肩外侧/肩后深层", patternId: "shoulder_glenohumeral", framework: "UCS",
    bookName: "盂肱关节 · 肩外展/前屈受限、外旋不足",
    plain: "抬手、梳头、手往后背够的时候费劲或卡住" },
  { id: "mid_back", short: "驼背型", name: "上背脊柱", patternId: "thoracic", framework: "cross",
    bookName: "胸椎区域 · 胸椎过度后凸（驼背）",
    plain: "背挺不直、习惯性驼背，常和圆肩、头前伸一起出现" },
  { id: "low_back_hip", short: "骨盆前倾型", name: "腰/骨盆/臀", patternId: "hip", framework: "LCS",
    bookName: "髋关节 · 伸展减少、屈曲挛缩（骨盆前倾）",
    plain: "久坐后髋前面紧、站起来要缓一下，腰容易累，屁股使不上劲" },
  { id: "thigh", short: "膝型", name: "大腿/膝", patternId: "knee", framework: "joint",
    bookName: "膝关节 · 伸展不足、屈曲挛缩",
    plain: "膝盖发软、上下楼打软腿、大腿后侧紧" },
  { id: "calf", short: "踝型", name: "小腿/踝", patternId: "ankle", framework: "joint",
    bookName: "踝关节 · 背伸受限、跖屈挛缩",
    plain: "小腿肚和跟腱紧、勾脚费劲、走路容易绊" },
  { id: "upper_arm", short: "肘型", name: "上臂/肘", patternId: "elbow", framework: "joint",
    bookName: "肘关节复合体 · 伸展减弱、屈曲挛缩",
    plain: "胳膊伸不直、手肘前后侧发紧" },
  { id: "forearm", short: "腕型", name: "前臂/腕", patternId: "wrist", framework: "joint",
    bookName: "腕关节 · 腕伸展不足",
    plain: "手腕酸、打字握鼠标后发紧" }
];
var BODY_SLOTS_BY_ID = Object.fromEntries(BODY_SLOTS.map((s) => [s.id, s]));

// 框架层：类型的解释外壳。desc 用于类型卡框架标签行的展开说明。
// limb=true 表示该类型用「关节活动度受限」模式解释，不属于上下交叉综合征（docs/12 §2）。
var FRAMEWORKS = {
  UCS: {
    id: "UCS-01", name: "上交叉综合征",
    tag: "上交叉综合征 · 相关成分", limb: false,
    desc: "颈肩胸区域“前侧偏紧、后侧偏弱”的连锁失衡：胸前与颈后肌肉紧张，颈深屈肌和肩胛稳定肌偏弱，常一起表现为头前伸、圆肩。"
  },
  LCS: {
    id: "LCS-01", name: "下交叉综合征",
    tag: "下交叉综合征 · 相关成分", limb: false,
    desc: "腰骨盆区域“屈髋肌与腰背肌偏紧、腹肌与臀肌偏弱”的力偶失衡，久坐下常见，表现为骨盆前倾和腰部容易累。"
  },
  cross: {
    id: "cross", name: "跨上/下交叉",
    tag: "跨上/下交叉相关", limb: false,
    desc: "胸椎后凸（驼背）位于上、下交叉之间，常与圆肩、头前伸或骨盆前倾同时出现。"
  },
  joint: {
    id: "joint", name: "独立关节模式",
    tag: "独立关节模式", limb: true,
    desc: "该类型用单一关节的活动度受限模式解释，不属于上交叉或下交叉综合征。"
  }
};

// D10 文案红线：每张类型卡底部固定免责声明
var DIAGNOSIS_DISCLAIMER = "以上为该失衡模式中的常见肌肉关系，不代表您个人肌肉状态的确认。";
// 书证引用统一格式
var BOOK_REF = "依据《基础肌动学》第 4 版";

// 兜底坐标矩形（SVG viewBox 200×460，docs/12 §3.1 初值，实测微调后回填图纸）
var SLOT_RECTS = {
  armXLo: 35, armXHi: 165,     // 两侧上肢带分界
  neckY: 55,                   // 颈线
  hipYLo: 140, hipYHi: 255,    // 腰背/骨盆/臀
  thighYLo: 255, thighYHi: 330,
  calfYLo: 330,
  armSplitY: 180,              // 上臂/前臂分界
  views: {
    front: { shoulderXLo: 55, shoulderXHi: 145, chestYHi: 110, bandYLo: 110, bandXHalf: 20 },
    back:  { shoulderXLo: 70, shoulderXHi: 130, chestYHi: 100, bandYLo: 100, bandXHalf: 30 }
  }
};

// 肌肉 id → slot（docs/12 §3.2）。归属依据：取该肌肉有书原句支持的类型所在 slot；
// 无类型肌肉按解剖位置归 slot（点中它们照常按坐标兜底触发类型，自己不涂色）。
var MUSCLE_SLOT_MAP = {
  // neck
  sternocleidomastoid: "neck", deep_neck_flexor: "neck", suboccipital: "neck",
  splenius_capitis: "neck", levator_scapulae: "neck", scalenes: "neck",
  // chest（圆肩型）：上/下斜方肌虽长在颈肩视觉区，书 p89 减弱组归此 slot
  pectoralis_major: "chest", pectoralis_minor: "chest", rhomboid: "chest",
  trapezius_middle: "chest", serratus_anterior: "chest",
  trapezius_upper: "chest", trapezius_lower: "chest",
  // shoulder_girdle（肩卡型）
  subscapularis: "shoulder_girdle", latissimus_dorsi: "shoulder_girdle",
  supraspinatus: "shoulder_girdle", infraspinatus: "shoulder_girdle",
  deltoid: "shoulder_girdle", teres_major: "shoulder_girdle", teres_minor: "shoulder_girdle",
  // mid_back（驼背型）
  erector_spinae: "mid_back",
  // low_back_hip（骨盆前倾型）
  iliopsoas: "low_back_hip", quadratus_lumborum: "low_back_hip", multifidus: "low_back_hip",
  rectus_abdominis: "low_back_hip", transversus_abdominis: "low_back_hip",
  obliquus_externus: "low_back_hip", obliquus_internus: "low_back_hip",
  gluteus_maximus: "low_back_hip", gluteus_medius: "low_back_hip",
  piriformis: "low_back_hip", tensor_fasciae_latae: "low_back_hip",
  // thigh（膝型）；rectus_femoris 仅数据层，点击首选仍可能落在股四头肌色块
  quadriceps: "thigh", rectus_femoris: "thigh", hamstrings: "thigh",
  sartorius: "thigh", hip_adductors: "thigh", iliotibial_tract: "thigh",
  // calf（踝型）
  gastrocnemius: "calf", soleus: "calf", fibularis: "calf",
  tibialis_posterior: "calf", tibialis_anterior: "calf",
  // upper_arm（肘型）
  biceps_brachii: "upper_arm", triceps_brachii: "upper_arm", brachioradialis: "upper_arm",
  // forearm（腕型）
  forearm_flexors: "forearm", forearm_extensors: "forearm"
};

// thoracic 特例：PATTERNS.thoracic.tight 里的胸大肌/胸小肌/髂腰肌是书 p236 的
// 「治疗牵伸对象」，不是该模式判定的紧张组——图上不涂红，卡片只列文字（docs/12 §4④）。
var SLOT_PATTERN_OVERRIDE = {
  thoracic: { tight: [], stretchOnly: ["pectoralis_major", "pectoralis_minor", "iliopsoas"] }
};

// 多角色肌肉的「色块视觉位置所属 slot」（docs/12 §6.2 冲突优先级）。
// 同一块肌肉在不同类型里角色相反时，色块颜色优先取它视觉所在 slot 的类型：
// - 腘绳肌：骨盆型=弱 / 膝型=紧，色块在大腿 → 紧（红）
// - 竖脊肌：驼背型=弱 / 骨盆型=紧，色块腰背段在 low_back_hip → 紧（红）
// - 股四头肌色块：股直肌（骨盆型紧）与股四头肌（膝型弱）共用，色块在大腿 → 膝型优先（紫）
var PAINT_TARGET_SLOT = {
  hamstrings: "thigh",
  erector_spinae: "low_back_hip",
  quadriceps: "thigh"
};

function paintTargetOf(muscleId) {
  const m = MUSCLE_MAP[muscleId];
  return m && m.paintAs ? m.paintAs : muscleId;
}

// 双层保险：首选肌肉 id 映射；点缝隙/轮廓/无类型肌肉时走坐标矩形兜底。
function resolveSlot(svgX, svgY, view, hintMuscleId) {
  if (hintMuscleId && MUSCLE_SLOT_MAP[hintMuscleId]) {
    return { slotId: MUSCLE_SLOT_MAP[hintMuscleId], by: "muscle" };
  }
  return { slotId: resolveSlotByRect(svgX, svgY, view), by: "rect" };
}

function resolveSlotByRect(x, y, view) {
  const cfg = SLOT_RECTS.views[view] || SLOT_RECTS.views.front;
  // 两侧上肢：肩峰端（y<颈线）归 neck，与既有规则一致
  if (x < SLOT_RECTS.armXLo || x > SLOT_RECTS.armXHi) {
    if (y < SLOT_RECTS.neckY) return "neck";
    return y < SLOT_RECTS.armSplitY ? "upper_arm" : "forearm";
  }
  if (y < SLOT_RECTS.neckY) return "neck";
  if (y >= SLOT_RECTS.calfYLo) return "calf";
  if (y >= SLOT_RECTS.thighYLo) return "thigh";
  if (y >= SLOT_RECTS.hipYLo) return "low_back_hip";
  // 55≤y<140：胸背一个视觉大区里塞了圆肩/肩卡/驼背 3 个类型
  if (view === "back") {
    if (y < cfg.chestYHi) {
      return (x < cfg.shoulderXLo || x > cfg.shoulderXHi) ? "shoulder_girdle" : "chest";
    }
    // y100–140：脊柱中带（下斜方肌区）仍属圆肩 slot，两侧归胸椎
    return Math.abs(x - 100) <= cfg.bandXHalf ? "chest" : "mid_back";
  }
  // front
  if (y < cfg.chestYHi) {
    return (x < cfg.shoulderXLo || x > cfg.shoulderXHi) ? "shoulder_girdle" : "chest";
  }
  // y110–140：胸骨/肋脊中线窄带归胸椎，两侧胸壁下缘归圆肩
  return Math.abs(x - 100) <= cfg.bandXHalf ? "mid_back" : "chest";
}

// 位置 → 类型 → 完整名单。
// marks: [{slotId, side}]；同 slot+side 只产生一条 hit（D8：多点多类型卡并列）。
// colored: 全部命中类型名单并集，同色块跨类型角色冲突时按 PAINT_TARGET_SLOT 取色。
function analyzeBySlots(marks) {
  const hits = [];
  const hitKeys = new Set();
  (marks || []).forEach((mk) => {
    if (!mk || !mk.slotId) return;
    const side = mk.side || "midline";
    const key = mk.slotId + "|" + side;
    if (hitKeys.has(key)) return;
    hitKeys.add(key);
    const slot = BODY_SLOTS_BY_ID[mk.slotId];
    if (!slot) return;
    const p = PATTERNS.find((x) => x.id === slot.patternId);
    if (!p) return;
    const ov = SLOT_PATTERN_OVERRIDE[p.id];
    const display = ov ? Object.assign({}, p, { tight: ov.tight, stretchOnly: ov.stretchOnly }) : p;
    hits.push({ slotId: slot.id, patternId: p.id, side: side, pattern: display });
  });

  // 按「实际涂色块」聚合候选（rectus_femoris 与 quadriceps 会聚到同一块）
  const byTarget = new Map();
  hits.forEach((h, idx) => {
    const add = (ids, state, level) => {
      (ids || []).forEach((id) => {
        if (!MUSCLE_MAP[id]) return;
        const target = paintTargetOf(id);
        if (!byTarget.has(target)) byTarget.set(target, []);
        byTarget.get(target).push({
          muscleId: id, targetId: target, state: state, level: level,
          patternId: h.patternId, slotId: h.slotId, order: idx
        });
      });
    };
    add(h.pattern.tight, "tight", "main");
    add(h.pattern.weak, "weak", "main");
    // 推断层整体退役：inferredTight/inferredWeak 数据保留，但不参与涂色与展示
  });

  const colored = [];
  byTarget.forEach((list, target) => {
    let pick = null;
    const preferredSlot = PAINT_TARGET_SLOT[target];
    if (preferredSlot) pick = list.find((e) => e.slotId === preferredSlot);
    if (!pick) pick = list.slice().sort((a, b) => a.order - b.order)[0];
    colored.push({
      muscleId: pick.muscleId, targetId: target,
      state: pick.state, level: pick.level, patternId: pick.patternId
    });
  });
  return { hits: hits, colored: colored };
}

// ════════════════════════════════════════════════════════════════════
// 目录式症状诊断（docs/13）
// 四大区域热区 → 用户从症状目录自选 → symptomUnion 确定性合并涂色。
// 取代 9-slot 位置猜测：没有坐标兜底、没有 slot 冲突仲裁。
// ════════════════════════════════════════════════════════════════════

var REGIONS4 = [
  { id: "neck", name: "肩颈", hint: "脖子、后脑勺、斜方肌、含胸圆肩" },
  { id: "arm", name: "肩臂", hint: "肩膀、手肘、手腕、前臂" },
  { id: "upperback", name: "肩背", hint: "圆背驼背、肩胛骨、后背心、肩膀头" },
  { id: "back", name: "腰腹", hint: "腰、腰骶一侧、小肚子" },
  { id: "leg", name: "臀腿", hint: "屁股、大腿、膝盖、小腿、脚踝" }
];
var REGIONS4_BY_ID = Object.fromEntries(REGIONS4.map((r) => [r.id, r]));

// docs/13 修订：五大区 → 肌肉块归类（仅诊断页1点选即时反馈用，不参与结果涂色判定）。
// 跨区肌肉在多个区各出现一次，点任一相关区都会染色：
// 肩颈∩肩臂（上斜方/肩胛提/胸大/胸小）、肩颈∩肩臂∩肩背（三角肌）、肩颈∩肩背（中斜方）、腰腹∩臀腿（髂腰肌/竖脊肌）。
var REGION_PAINT = {
  neck: [
    "sternocleidomastoid", "deep_neck_flexor", "suboccipital", "splenius_capitis",
    "levator_scapulae", "trapezius_upper", "scalenes",
    // 与肩臂重叠：胸肌属上交叉紧张链（Janda UCS），牵涉痛投射肩前（Travell）
    "pectoralis_major", "pectoralis_minor",
    // 三角肌（肩颈∩肩臂∩肩背）：正面肩颈点选含肩峰覆盖肌；背面肩颈含后束
    "deltoid",
    // 中斜方（肩颈∩肩背）：背面肩颈点选时同步染色
    "trapezius_middle"
  ],
  arm: [
    // 与肩颈重叠 4 块
    "trapezius_upper", "levator_scapulae", "pectoralis_major", "pectoralis_minor",
    // 三角肌同时属于肩臂（肩峰覆盖肌）
    "deltoid",
    // 肘/前臂（肩胛带肌群已划入肩背区）
    "biceps_brachii", "triceps_brachii", "brachioradialis",
    "forearm_flexors", "forearm_extensors"
  ],
  upperback: [
    // 肩胛胸壁/肩袖/背部肌群 + 三角肌（视觉上整个背面肩部）
    "subscapularis", "latissimus_dorsi",
    "teres_major", "supraspinatus", "infraspinatus", "teres_minor", "deltoid",
    "serratus_anterior", "rhomboid", "trapezius_middle", "trapezius_lower"
  ],
  back: [
    "erector_spinae", "multifidus", "quadratus_lumborum",
    "rectus_abdominis", "transversus_abdominis", "obliquus_externus", "obliquus_internus",
    // 与臀腿重叠：髂腰肌起于腰椎内面，腰段观感属于腰腹
    "iliopsoas"
  ],
  leg: [
    // 与腰背重叠 2 块
    "iliopsoas", "erector_spinae",
    // 髋臀
    "gluteus_maximus", "gluteus_medius", "piriformis", "rectus_femoris",
    "tensor_fasciae_latae", "iliotibial_tract",
    // 大腿/膝
    "hamstrings", "quadriceps", "hip_adductors", "sartorius",
    // 小腿/踝
    "gastrocnemius", "soleus", "fibularis", "tibialis_posterior", "tibialis_anterior"
  ]
};

// 每条症状 = 一个确定性的紧/弱方案。evidence: book(书内模式) / synthesis(多页书据综合) / literature(书外文献)
// sourcePattern 关联 PATTERNS 以复用书金句/页码；stretchOnly 只列名牵伸，永不涂色。
var SYMPTOMS = [
  {
    id: "fwd_head", region: "neck", order: 1,
    menu: "探颈",
    shortName: "探颈",
    subFeel: "<b>颈后</b>酸沉发紧",
    subPosture: "侧面看头往前探，耳朵跑到肩膀前面",
    proName: "颅颈区 · 头部过度前伸姿势",
    manifest: "侧面看头习惯性往前探、耳朵跑到肩膀前面；颈后酸沉发紧，后脑勺发沉，晨起偶尔像「落枕」，转脖子不如以前灵活。",
    explain: "头每向前探一点，颈椎要承担的重量就明显增加。前侧的胸锁乳突肌长期短缩去适应这个姿势，后侧的枕下肌群被拉住持续做功，而真正该把头稳稳托住的深层颈屈肌却被抑制、使不上劲。",
    tight: ["sternocleidomastoid", "suboccipital", "levator_scapulae"],
    weak: ["deep_neck_flexor"],
    inferredTight: ["splenius_capitis"],
    sourcePattern: "cranio_cervical", evidence: "book"
  },
  {
    id: "round_shoulder", region: "neck", order: 2,
    menu: "圆肩",
    shortName: "圆肩",
    subFeel: "<b>斜方肌</b>僵硬",
    subPosture: "两肩往前扣，自然站立时手心朝后",
    proName: "肩胛胸壁关节 · 肩胛骨过度前伸下旋（圆肩姿势）",
    manifest: "肩带往前向内扣，自然站立时手心朝后；刻意挺胸坚持不了多久，两肩胛骨之间酸胀。",
    explain: "打字、开车、刷手机让胸大肌和胸小肌持续缩短，把肩胛骨往前拉；背后的菱形肌、斜方肌中束被拉长还要发力维持，前锯肌和斜方肌上、下束力量不足，肩胛骨转不回正常位置。",
    tight: ["pectoralis_major", "pectoralis_minor"],
    weak: ["rhomboid", "trapezius_middle", "serratus_anterior", "trapezius_upper", "trapezius_lower"],
    sourcePattern: "scapulothoracic", evidence: "book"
  },
  {
    id: "upper_crossed", region: "neck", order: 3,
    menu: "上交叉体态",
    shortName: "上交叉体态",
    subFeel: "<b>颈肩</b>僵厚，容易头痛",
    subPosture: "脖子根鼓包，头前探+圆肩同时有",
    proName: "上交叉综合征（Upper Crossed Syndrome）",
    manifest: "头前探、圆肩同时存在，脖子根摸起来鼓厚；颈肩背整片僵硬，容易伴随头痛和肩前侧不适。",
    explain: "这是前两条合在一起的完整形态：紧张的胸肌、枕下肌群、上斜方肌，与被抑制的深层颈屈肌和肩胛稳定肌，在躯干前后交叉成一个「X」。上斜方肌属于「越紧越没力」的过劳肌——只按揉放松只能管一时，背后无力的肌肉不被唤醒，紧张很快会回来。",
    tight: ["trapezius_upper", "levator_scapulae", "sternocleidomastoid", "suboccipital", "pectoralis_major", "pectoralis_minor"],
    weak: ["deep_neck_flexor", "rhomboid", "trapezius_middle", "trapezius_lower", "serratus_anterior"],
    inferredTight: ["scalenes"],
    sourcePattern: "scapulothoracic", evidence: "literature",
    evidenceNote: "「上交叉综合征表现为颈前侧与胸前侧肌肉缩短、颈深屈肌与肩胛稳定肌被抑制，两组肌肉在躯干前后交叉成 X 形的失衡模式」——Vladimir Janda 提出的经典体态综合征；紧/弱分组另见 Chang MC 等系统综述（Healthcare，2023），书内依据 p.89、p.235"
  },
  {
    id: "shoulder_impinge", region: "arm", order: 4,
    menu: "肩部卡压",
    shortName: "肩部卡压",
    subFeel: "抬臂时<b>肩前</b>卡痛",
    subPosture: "圆肩含胸的人更容易出现",
    proName: "盂肱关节 · 外展前屈受限伴外旋不足（肩峰下撞击倾向）",
    manifest: "圆肩含胸体态的人更容易出现：抬胳膊过头顶时肩前卡住或疼痛，手够不到后背拉链，梳头穿衣费力。",
    explain: "胸大肌、肩胛下肌、背阔肌这组内旋肌紧张，把肱骨头往前上方顶；负责外旋和外展的冈下肌、冈上肌、三角肌力量不足，抬臂时肱骨头在肩峰下的间隙被夹住，于是出现「卡」和痛。",
    tight: ["pectoralis_major", "latissimus_dorsi", "subscapularis"],
    weak: ["deltoid", "supraspinatus", "infraspinatus", "serratus_anterior", "trapezius_upper", "trapezius_lower"],
    inferredTight: ["teres_major"],
    inferredWeak: ["teres_minor"],
    sourcePattern: "shoulder_glenohumeral", evidence: "book",
    evidenceNote: "「肩胛骨位置与运动异常、肩袖肌群力量不足会使肩峰下间隙变窄，是肩峰下撞击的重要力学机制」——Michener LA 等，Clinical Biomechanics，2003（肩峰下撞击解剖与生物力学机制综述），书内依据 p.87"
  },
  {
    id: "mouse_wrist", region: "arm", order: 5,
    menu: "腕部劳损",
    shortName: "腕部劳损",
    subFeel: "<b>手腕</b>酸涩无力",
    subPosture: "全天键盘鼠标的人最常见",
    proName: "腕关节 · 伸展不足（屈腕肌短缩模式）",
    manifest: "手腕长期保持微屈握持姿势（键盘鼠标一族最常见）；一天下来手腕酸、发涩，转动时有牵拉感，握东西久了容易累。",
    explain: "握鼠标时手腕长期处于微屈位置，前臂屈肌群持续缩短；拮抗的腕伸肌群被拉长且肌力下降，腕关节前后力线失衡。",
    tight: ["forearm_flexors"],
    weak: ["forearm_extensors"],
    sourcePattern: "wrist", evidence: "book",
    evidenceNote: "「长期保持固定手腕姿势与重复性负荷，是工作相关上肢肌肉骨骼问题的核心危险因素」——Buckle PW & Devereux JJ，Applied Ergonomics，2002（工作相关颈与上肢肌肉骨骼疾患综述），书内依据 p.141",
    redFlag: "如果拇指、食指、中指发麻，夜间麻醒、甩甩手会缓解，可能是腕管综合征，建议线下就医评估。"
  },
  {
    id: "elbow_flex", region: "arm", order: 6,
    menu: "肘伸不直",
    shortName: "肘伸不直",
    subFeel: "<b>肘部</b>僵硬伸不直",
    subPosture: "手臂习惯保持微屈，很少完全伸直",
    proName: "肘关节复合体 · 屈曲挛缩倾向",
    manifest: "手臂习惯保持微屈、很少完全伸直；想伸直时肘窝前面被拉住，上臂前侧紧张，活动开以后会松一些。",
    explain: "长期屈肘操作鼠标和手机，屈肘的肱二头肌适应了短缩长度，拮抗的肱三头肌肌力不足，肘关节长期达不到完全伸展的位置。",
    tight: ["biceps_brachii"],
    weak: ["triceps_brachii"],
    sourcePattern: "elbow", evidence: "book",
    evidenceNote: "「肌肉长期被固定在缩短位置会发生适应性短缩（肌节数量减少），关节活动范围随之下降」——Williams PE & Goldspink G，Journal of Anatomy，1978（肌肉适应性短缩的经典实验研究），书内依据 p.118",
    redFlag: "如果痛点固定在肘外侧一个点，拧毛巾、端锅时明显加重，更可能是网球肘（肌腱过用），不属于「紧-弱失衡」，以休息减负为主，持续不缓解请就医。"
  },
  {
    id: "thoracic_kyphosis", region: "upperback", order: 7,
    menu: "圆背",
    shortName: "圆背",
    subFeel: "<b>后背中段</b>酸累",
    subPosture: "上背圆下去，刻意挺胸撑不过几分钟",
    proName: "胸椎 · 过度后凸（圆背姿势）",
    manifest: "上背圆下去、刻意挺胸撑不过几分钟；后背中段发僵酸累，吸气时胸廓打不开。",
    explain: "胸段竖脊肌区域性无力，撑不住脊柱；胸前侧肌肉和髋屈肌短缩，把躯干往前下方拉，胸椎活动度随之下降。这个模式里胸肌和髂腰肌是「可以配合牵伸」的对象，但不是它判定的紧张侧，图上不标红。",
    tight: [],
    weak: ["erector_spinae"],
    stretchOnly: ["pectoralis_major", "pectoralis_minor", "iliopsoas"],
    sourcePattern: "thoracic", evidence: "book",
    evidenceNote: "「胸椎过度后凸与躯干伸肌力量不足密切相关，针对性的伸肌强化训练可改善后凸角度与功能」——Katzman WB 等，J Orthop Sports Phys Ther，2010（胸椎后凸的病因、后果与管理综述），书内依据 p.236"
  },
  {
    id: "stiff_low_back", region: "back", order: 11,
    menu: "久坐腰僵",
    shortName: "久坐腰僵",
    subFeel: "<b>腰部</b>大片发紧",
    subPosture: "常伴骨盆前倾、站姿塌腰",
    proName: "久坐型腰椎活动受限（髋屈短缩 · 腰背等长过用 · 核心臀肌抑制）",
    manifest: "常伴骨盆前倾、站姿塌腰；腰部大片发紧而不是固定一个点刺痛，坐下和刚站起来那一下最难受，站直活动几分钟后缓解。",
    explain: "久坐时髂腰肌长时间处在短缩位，起身后拉住骨盆，让腰椎被迫过度后伸；腰段竖脊肌和腰方肌于是持续等长代偿。同时腹横肌和臀大肌被抑制，腰椎前后两道稳定保护都变弱。",
    tight: ["iliopsoas", "erector_spinae", "quadratus_lumborum"],
    weak: ["transversus_abdominis", "gluteus_maximus"],
    evidence: "synthesis", bookPage: 281,
    evidenceNote: "综合《基础肌动学》第4版 p.281（久坐致髋屈短缩、腰背伸肌紧张）、p.225（腰方肌为腰段稳定肌）、p.235（核心稳定训练）",
    redFlag: "如果麻木串到脚背，或出现大小便控制异常，请立即线下就医。"
  },
  {
    id: "ql_lopsided", region: "back", order: 12,
    menu: "单侧腰过载",
    shortName: "单侧腰过载",
    subFeel: "<b>腰骶一侧</b>深部酸",
    subPosture: "身子感觉是拧的，照镜子骨盆一高一低",
    proName: "腰方肌不对称过载（骨盆侧稳定失衡）",
    manifest: "身子感觉是拧的，照镜子可能发现骨盆一高一低；腰骶交界一侧深部酸胀，翻身、单腿站立或久坐后加重。",
    explain: "跷二郎腿、单侧负重、坐椅子歪向一边，会让一侧腰方肌长期短缩；臀中肌本是走路时稳住骨盆的肌肉，它无力时，腰方肌被迫向上提拉骨盆来代偿——连接腰方肌与对侧臀中肌的「外侧肌筋膜悬带」就此失灵。",
    tight: ["quadratus_lumborum"],
    weak: ["gluteus_medius", "transversus_abdominis"],
    evidence: "synthesis", bookPage: 225,
    evidenceNote: "书内依据 p.225（腰方肌）、p.253–256（臀中肌与骨盆侧向稳定）；悬带代偿机制见肌筋膜研究（Willard 等，2012）"
  },
  // ── 肩背区（新增）：肩胛骨/上背主诉入口，感受标题 + 体态确认 ──
  {
    id: "scap_inner_ache", region: "upperback", order: 8,
    menu: "肩胛间酸",
    shortName: "肩胛间酸",
    subFeel: "<b>两肩胛之间</b>酸胀",
    subPosture: "含胸时两块肩胛骨往两边跑开",
    proName: "肩胛胸壁关节 · 肩胛内侧肌群拉长性过载（菱形肌-中斜方代偿模式）",
    manifest: "含胸伏案时两块肩胛骨往两边跑开；后背心、两肩胛之间酸胀痛，位置偏脊柱两旁，扩胸、躺平或洗个热水澡能松快一些，总想让人帮忙捶捶那个位置。",
    explain: "含胸伏案时，胸前侧肌肉持续缩短，把两块肩胛骨往前、往外拉。肩胛骨内侧的菱形肌和斜方肌中束被拉长的同时，还要一直发力把肩胛骨往回拽——肌肉在被拉长的位置上反复做功，最容易酸累。这片酸不是它们太强，而是它们太辛苦。",
    tight: ["pectoralis_major", "pectoralis_minor"],
    weak: ["rhomboid", "trapezius_middle"],
    evidence: "synthesis",
    evidenceNote: "「肩胛运动失常常表现为肩胛内侧缘距脊柱变宽，与胸前侧肌肉紧张和肩胛稳定肌无力的失衡组合有关」——Kibler WB & Sciascia A，British Journal of Sports Medicine，2010（肩胛运动失常现状综述）；Janda 上交叉失衡链，书内依据 p.89",
    redFlag: "如果疼痛集中在脊柱正中某一个点、夜间痛醒或伴发热，建议就医排查其他原因。"
  },
  {
    id: "humeral_glide", region: "upperback", order: 9,
    menu: "肱骨前移",
    shortName: "肱骨前移",
    subFeel: "<b>肩前</b>酸胀发紧",
    subPosture: "侧面看肩膀头往前跑，仰躺时手肘悬空",
    proName: "盂肱关节 · 肱骨头前移倾向（圆肩链环节）",
    manifest: "自然站立时从侧面看，肩膀头明显跑到身体中线前面，肩前像多出一小块；仰面躺平放松时，手肘悬空落不到床面；肩前侧按压有酸胀感。",
    explain: "胸小肌和肩关节后侧组织偏紧，从前后两个方向把肱骨头往前推；负责把肱骨头稳在关节窝里的冈下肌、小圆肌力量不足，前锯肌和下斜方肌又没能把肩胛骨收回到位。前推的力量大、后收的力量小，肱骨头就慢慢前移了。它常和圆肩一起出现，是同一条失衡链上的环节。",
    tight: ["pectoralis_minor"],
    weak: ["serratus_anterior", "trapezius_lower", "infraspinatus", "teres_minor"],
    evidence: "synthesis",
    evidenceNote: "「胸小肌静息长度偏短与肩胛前倾、内旋角度增大显著相关」——Borstad JD & Ludewig PM，J Orthop Sports Phys Ther，2005（胸小肌长度与肩胛运动学关系研究）；肱骨头前移与肩后侧组织紧张、外旋肌无力的失衡组合为康复临床共识",
    redFlag: "如果肩前是刺痛、抬臂到某个角度明显卡住，可同时参考肩臂区的「肩部卡压」；外伤后出现的肩前痛建议就医。"
  },
  {
    id: "winged_scapula", region: "upperback", order: 10,
    menu: "翼状肩胛",
    shortName: "翼状肩胛",
    subFeel: "抬手一会儿<b>肩</b>就酸",
    subPosture: "肩胛骨内侧或下角翘着，推墙时更明显",
    proName: "肩胛胸壁关节 · 前锯肌为主的肩胛稳定失衡（翼状肩胛倾向）",
    manifest: "放松站立时从背后看，肩胛骨内侧缘或下角翘起来、贴不住胸廓；双手推墙时翘得更明显；长时间抬手写字、撑桌面容易酸，背双肩包肩带容易往下滑。",
    explain: "前锯肌像一条宽宽的带子，负责把肩胛骨牢牢贴在胸廓弧面上。它力量不足时，肩胛骨就会「飘」起来；斜方肌中下束本该从内侧拉住肩胛骨，它们偏弱时翘起更明显。胸小肌紧张会把肩胛骨前缘往前下方拽，让下角翘得更出。久坐、长期单肩背包、缺乏上肢推力训练，都可能让前锯肌慢慢「睡着」。",
    tight: ["pectoralis_minor"],
    weak: ["serratus_anterior", "trapezius_middle", "trapezius_lower"],
    evidence: "synthesis",
    evidenceNote: "「翼状肩胛最常见的原因是前锯肌功能不足（胸长神经支配），斜方肌功能不足可使其进一步加重」——Martin RM & Fish DE，Current Reviews in Musculoskeletal Medicine，2008（翼状肩胛解剖、诊断与治疗综述）",
    redFlag: "外伤、手术或颈部剧痛后突然出现的单侧明显翘起，伴抬臂明显无力，可能与支配肌肉的神经受影响有关，建议线下就医评估，不建议自行训练。"
  },
  {
    id: "pelvic_tilt", region: "leg", order: 13,
    menu: "骨盆前倾",
    shortName: "骨盆前倾",
    subFeel: "<b>腰</b>酸累",
    subPosture: "站着塌腰挺肚子，平躺时腰贴不到床面",
    proName: "髋关节 · 屈曲挛缩致骨盆前倾（下交叉姿势）",
    manifest: "站姿腰曲过大、小腹前顶，平躺时腰贴不到床面，久站后腰骶部酸累。",
    explain: "髂腰肌、股直肌和腰背伸肌组成「前倾力偶」，把骨盆往前下方拉；腹肌和臀大肌这组向后的力偶力量不足，骨盆前倾，腰椎被迫代偿性前凸。",
    tight: ["iliopsoas", "rectus_femoris", "erector_spinae"],
    weak: ["gluteus_maximus", "hamstrings", "rectus_abdominis", "transversus_abdominis"],
    inferredWeak: ["gluteus_medius"],
    sourcePattern: "hip", evidence: "book"
  },
  {
    id: "glute_amnesia", region: "leg", order: 14,
    menu: "臀肌失忆",
    shortName: "臀肌失忆",
    subFeel: "<b>臀部</b>发麻使不上劲",
    subPosture: "臀部松软扁平，走路爬楼感觉不到发力",
    proName: "臀肌失忆症（Gluteal Amnesia · 死臀综合征）",
    manifest: "臀部松软扁平、看起来塌；久坐后臀部像「睡过去」一样使不上劲——这里的「麻」不是压麻了，而是站起来感觉不到它发力，做臀桥时腰和大腿后侧先酸。",
    explain: "久坐让髋屈肌（髂腰肌、股直肌、阔筋膜张肌）持续处于缩短激活状态，神经系统通过「交互抑制」长期关闭它的拮抗肌——臀大肌和臀中肌。臀部不发力后，腰、腘绳肌和膝盖被迫代偿，连锁出现腰酸和膝痛。",
    tight: ["iliopsoas", "rectus_femoris", "tensor_fasciae_latae"],
    weak: ["gluteus_maximus", "gluteus_medius"],
    evidence: "synthesis", bookPage: 281,
    evidenceNote: "书内依据 p.281、p.253；交互抑制与臀肌抑制机制为康复医学共识，北京市卫健委 2025 年健康科普亦有专门介绍"
  },
  {
    id: "knee_soft", region: "leg", order: 15,
    menu: "膝盖打软",
    shortName: "膝盖打软",
    subFeel: "<b>膝盖</b>发软",
    subPosture: "下楼时膝盖容易往里扣",
    proName: "膝关节 · 伸展不足 / 屈曲挛缩倾向",
    manifest: "下楼时膝盖容易往里扣；上下楼梯膝盖打软，下蹲到底困难，膝前侧酸，大腿后侧长期发紧。",
    explain: "腘绳肌紧张，拉着小腿让膝关节长期达不到完全伸直；股四头肌肌力不足，无法稳定髌骨、也无力完成伸膝的最后一段。",
    tight: ["hamstrings"],
    weak: ["quadriceps"],
    inferredTight: ["iliotibial_tract"],
    sourcePattern: "knee", evidence: "book",
    evidenceNote: "「股四头肌力量不足与膝关节不稳、打软感和功能下降显著相关」——Slemenda C 等，Annals of Internal Medicine，1997（股四头肌无力与膝关节关系的经典队列研究），书内依据 p.316"
  },
  {
    id: "ankle_stiff", region: "leg", order: 16,
    menu: "脚踝僵硬",
    shortName: "脚踝僵硬",
    subFeel: "<b>小腿后侧</b>发紧",
    subPosture: "下蹲时脚跟踩不实",
    proName: "踝关节 · 背伸受限 / 跖屈挛缩倾向",
    manifest: "下蹲时脚跟踩不实、会离地；久坐起身脚发僵，小腿后侧发紧，走路觉得踝活动不开。",
    explain: "久坐屈膝加上日常穿鞋，让小腿后侧的腓肠肌、比目鱼肌适应了短缩长度；拮抗的胫骨前肌无力，踝背伸角度不足，下蹲和步态只能靠别处代偿。",
    tight: ["gastrocnemius", "soleus"],
    weak: ["tibialis_anterior"],
    inferredTight: ["tibialis_posterior", "fibularis"],
    sourcePattern: "ankle", evidence: "book",
    evidenceNote: "「孤立性腓肠肌紧张会明显限制踝背伸角度，是多种踝足部问题的常见力学基础」——DiGiovanni CW 等，Journal of Bone and Joint Surgery Am，2002（腓肠肌紧张的奠基性临床研究），书内依据 p.359"
  },
  {
    id: "piriformis_tight", region: "leg", order: 17,
    menu: "梨状肌紧张",
    shortName: "梨状肌紧张",
    subFeel: "<b>臀部深处</b>酸胀",
    subPosture: "常盘腿坐、跷二郎腿的人常见",
    proName: "梨状肌紧张（髋外旋肌短缩模式）",
    manifest: "常盘腿坐、跷二郎腿的人常见：臀部中央深部酸胀，椅面顶到该处时加重，大腿根部活动受限。",
    explain: "久坐屈髋时梨状肌持续受压、容易短缩或痉挛；臀中肌、臀大肌被抑制后，髋关节外旋稳定更多压给梨状肌，形成「越紧越累、越累越紧」的循环。",
    tight: ["piriformis"],
    weak: ["gluteus_medius", "gluteus_maximus"],
    evidence: "synthesis", bookPage: 253,
    evidenceNote: "书内依据 p.253（梨状肌属髋外旋肌群）；久坐梨状肌受压机制为康复临床常见模式",
    redFlag: "如果疼痛或麻木沿大腿后侧一直串到小腿、脚上，可能涉及坐骨神经，建议线下就医。"
  }
];
var SYMPTOM_BY_ID = Object.fromEntries(SYMPTOMS.map((s) => [s.id, s]));

// docs/13 修订：选择逻辑改为全局单选直替，互斥组（MUTEX_GROUPS/MUTEX_PAIRS/mutexBlocked）已退役删除。

// 多症状涂色并集（docs/13 §2 合并规则）。
// ids 按用户选择顺序传入；返回 colored / stretchOnly / conflicts。
function symptomUnion(ids) {
  const ordered = (ids || []).filter((id) => SYMPTOM_BY_ID[id]);
  const byTarget = new Map();
  const conflicts = [];
  ordered.forEach((sid, idx) => {
    const s = SYMPTOM_BY_ID[sid];
    const add = (muscleIds, state, level) => {
      (muscleIds || []).forEach((mid) => {
        if (!MUSCLE_MAP[mid]) return;
        const target = paintTargetOf(mid);
        if (!byTarget.has(target)) byTarget.set(target, []);
        byTarget.get(target).push({ muscleId: mid, targetId: target, state, level, symptomId: sid, order: idx });
      });
    };
    add(s.tight, "tight", "main");
    add(s.weak, "weak", "main");
    // 推断层整体退役：inferredTight/inferredWeak 数据保留，但不参与涂色与展示
  });

  const colored = [];
  byTarget.forEach((list, target) => {
    // 规则2：状态冲突 → 选择顺序最早的症状为准
    let pick = list.slice().sort((a, b) => a.order - b.order)[0];
    const winners = list.filter((e) => e.state === pick.state);
    // 规则3：同状态下主项优先于推断项
    const main = winners.find((e) => e.level === "main");
    if (main) pick = main;
    // 被丢弃的相反状态 → 记录冲突（卡片仍展示本症状名单，只是不涂色）
    list.forEach((e) => {
      if (e.state !== pick.state) {
        conflicts.push({ targetId: target, muscleId: e.muscleId, state: e.state,
          symptomId: e.symptomId, droppedBySymptomId: pick.symptomId });
      }
    });
    colored.push({
      muscleId: pick.muscleId, targetId: target, state: pick.state, level: pick.level,
      symptomId: pick.symptomId,
      symptomIds: Array.from(new Set(list.filter((e) => e.state === pick.state).map((e) => e.symptomId)))
    });
  });

  const stretchOnly = Array.from(new Set(ordered.reduce((acc, sid) => {
    return acc.concat(SYMPTOM_BY_ID[sid].stretchOnly || []);
  }, []).filter((id) => MUSCLE_MAP[id])));

  return { symptomIds: ordered, colored: colored, stretchOnly: stretchOnly, conflicts: conflicts };
}

// 症状 → 第三页动作包（docs/13 修订：姿势与治疗目的解耦）
// 四槽各自可空：sitRelease 坐姿·放松紧张侧 / sitStrengthen 坐姿·强化薄弱侧
//             standRelease 站姿·放松 / standStrengthen 站姿·强化
// 每个姿势板块保底 1 个、最多 2 个；缺格留空，绝不凑数。标注 posture:'any' 的动作允许跨板块复用。
var SYMPTOM_ACTIONS = {
  fwd_head:           { sitRelease: "levator_release",        sitStrengthen: "chin_tuck",            standRelease: "stand_neck_side_stretch", standStrengthen: "neck_isometric" },
  round_shoulder:     { sitRelease: "chair_pec_open",         sitStrengthen: "desk_scap_set",        standRelease: "pec_stretch",             standStrengthen: "wall_angel" },
  upper_crossed:      { sitRelease: "chair_pec_open",         sitStrengthen: "desk_scap_set",        standRelease: "pec_stretch",             standStrengthen: "wall_angel" },
  shoulder_impinge:   { sitRelease: "sit_pec_er_stretch",     sitStrengthen: "serratus_desk_push",   standRelease: "lat_stretch",             standStrengthen: "ext_rotation" },
  mouse_wrist:        { sitRelease: "wrist_stretch",          sitStrengthen: "wrist_extend",         standRelease: "wrist_stretch",           standStrengthen: "wrist_extend" },
  elbow_flex:         { sitRelease: "biceps_wall_stretch",    sitStrengthen: "sit_chair_dip",        standRelease: "biceps_wall_stretch",     standStrengthen: "band_pushdown" },
  // 圆背无判定紧张侧：放松格取 stretchOnly（胸肌）
  thoracic_kyphosis:  { sitRelease: "chair_pec_open",         sitStrengthen: "sit_thoracic_ext",     standRelease: "pec_stretch",             standStrengthen: "stand_thoracic_ext" },
  stiff_low_back:     { sitRelease: "sit_hip_open",           sitStrengthen: "sit_core",             standRelease: "desk_lumbar",             standStrengthen: "stand_glute_kick" },
  ql_lopsided:        { sitRelease: "sit_ql_sidebend",        sitStrengthen: "sit_core",             standRelease: "desk_lumbar",             standStrengthen: "stand_abd_leg" },
  // 肩背区（新增）：放松胸前侧紧张，强化前锯肌/菱形肌/中下斜方/肩袖外旋
  scap_inner_ache:    { sitRelease: "rhomboid_stretch_sit",   sitStrengthen: "desk_scap_set",        standRelease: "pec_stretch",             standStrengthen: "wall_angel" },
  humeral_glide:      { sitRelease: "sit_pec_er_stretch",     sitStrengthen: "serratus_desk_push",   standRelease: "pec_stretch",             standStrengthen: "ext_rotation" },
  winged_scapula:     { sitRelease: "rhomboid_stretch_sit",   sitStrengthen: "serratus_desk_push",   standRelease: "pec_stretch",             standStrengthen: "wall_angel" },
  pelvic_tilt:        { sitRelease: "sit_hip_open",           sitStrengthen: "sit_core",             standRelease: "iliopsoas_stretch",       standStrengthen: "stand_glute_kick" },
  glute_amnesia:      { sitRelease: "sit_hip_open",           sitStrengthen: "sit_glute",            standRelease: "standing_tfl_stretch",    standStrengthen: "stand_glute_kick" },
  knee_soft:          { sitRelease: "ham_seated_stretch",     sitStrengthen: "quad_set",             standRelease: "stand_ham_stretch",       standStrengthen: "wall_squat" },
  ankle_stiff:        { sitRelease: "sit_calf_towel",         sitStrengthen: "tibialis_activate",    standRelease: "soleus_stretch",          standStrengthen: "tibialis_activate" },
  piriformis_tight:   { sitRelease: "sit_hip_open",           sitStrengthen: "sit_glute",            standRelease: "standing_figure4",        standStrengthen: "stand_abd_leg" }
};
// 症状 → 长期建议（posture 姿势 / behavior 行为 / environment 环境）
var SYMPTOM_ADVICE = {
  fwd_head: {
    posture: ["屏幕垫高到与视线平齐，少做低头动作", "每隔一段时间做一次收下巴，让头回到肩膀正上方"],
    behavior: ["减少长时间低头刷手机，手机尽量举到眼前", "用电脑每 30–45 分钟起身活动 2 分钟"],
    environment: ["检查电脑屏幕上沿是否与眼睛齐平", "选择高度合适的枕头，让颈部休息时保持自然位置"]
  },
  round_shoulder: {
    posture: ["坐姿保持双肩放松下沉，避免含胸内扣", "打字时手肘有支撑，不让肩膀耸起"],
    behavior: ["用电脑一段时间后起身扩胸活动", "每 30–45 分钟起身活动 2 分钟"],
    environment: ["调整桌椅高度，让前臂能自然平放桌面", "让键盘鼠标处于更自然的操作范围，避免向前探肩"]
  },
  upper_crossed: {
    posture: ["坐立时想象头顶被向上提，下巴微收、肩下沉", "避免长时间维持头前伸加圆肩的固定姿势"],
    behavior: ["每 30–45 分钟起身做扩胸和收下巴", "减少连续久坐，安排固定的肩背强化练习"],
    environment: ["屏幕与视线平齐，键盘鼠标贴近身体", "椅背对中上背有支撑，必要时加靠垫"]
  },
  shoulder_impinge: {
    posture: ["避免长时间抬臂或举手过肩的固定姿势", "背包双肩轮换，减少单侧负重"],
    behavior: ["抬手疼痛的角度先回避，不硬撑", "每天做肩袖和肩胛稳定的轻量练习"],
    environment: ["常用物品放在肩高以下的柜层，减少够高动作", "调整工位让手臂不必一直外展"]
  },
  mouse_wrist: {
    posture: ["握鼠标时手腕保持中立，不压在桌沿", "前臂有支撑，手腕不悬空"],
    behavior: ["连续用键鼠一段时间后活动手腕手指", "减少重复性抓握和长时间单手操作"],
    environment: ["使用腕托或把键盘鼠标放到更顺手的位置", "桌沿做圆角处理，避免手腕长期顶着硬边"]
  },
  elbow_flex: {
    posture: ["操作鼠标键盘时手肘有支撑、角度放松", "避免长时间紧握手机、屈肘受压"],
    behavior: ["定时把手臂完全伸直活动几下", "减少长时间屈肘负重（提重物）"],
    environment: ["桌椅高度让肘部自然约 90 度", "给前臂增加支撑面，减少肘部持续受力"]
  },
  thoracic_kyphosis: {
    posture: ["坐姿保持上背舒展，避免整个人塌进椅背", "每小时做几次双手抱头的上背后仰"],
    behavior: ["用电脑一段时间后起身扩胸伸展", "规律安排胸背和胸椎活动度练习"],
    environment: ["屏幕高度足够，避免上背长期弓着看屏幕", "椅背支撑在腰和上背，不顶后脑勺"]
  },
  stiff_low_back: {
    posture: ["腰后放腰靠，保持腰椎自然曲度", "坐姿双脚平放地面，不跷二郎腿"],
    behavior: ["每坐 30–45 分钟起身慢走 2 分钟再弯腰", "久坐后先活动开，再做弯腰搬东西的动作"],
    environment: ["椅子高度让大腿与地面平行、膝略低于髋", "桌下留够伸腿空间，方便定时换姿势"]
  },
  ql_lopsided: {
    posture: ["双脚平放、两侧坐骨均匀承重，不歪坐", "尽量不跷二郎腿，单侧负重要左右换着来"],
    behavior: ["每 30–45 分钟起身做侧向伸展", "安排臀中肌强化练习（侧抬腿、蚌式）"],
    environment: ["椅子高度让双脚能完全踩实地面", "常用物品放在正前方，减少扭身去够"]
  },
  pelvic_tilt: {
    posture: ["站姿均匀承重，避免塌腰挺肚", "坐姿腰后有支撑，不让骨盆全程后倒或前倾"],
    behavior: ["每天安排臀桥和核心轻练习", "减少连续久坐，定时站起做髋部伸展"],
    environment: ["椅子高度让大腿与地面平行、膝略低于髋", "腰后放腰靠支撑腰椎自然曲度"]
  },
  glute_amnesia: {
    posture: ["久坐时每隔一段时间主动收紧臀部几秒", "起身走路时刻意感受脚跟蹬地、臀部发力"],
    behavior: ["每 30–45 分钟起身活动，让臀部定期「开机」", "每天 10 分钟臀桥、蚌式或后踢腿唤醒臀部"],
    environment: ["避免坐过软过深的沙发，减少臀部受压", "椅子高度让双脚完全踩实、膝盖不高于髋"]
  },
  knee_soft: {
    posture: ["久站久坐多换姿势，减少膝关节长期锁直", "上下楼梯慢一点，下楼尤其不逞强"],
    behavior: ["规律做靠墙静蹲和坐姿伸膝强化股四头肌", "运动前先活动开膝关节"],
    environment: ["椅子高度以起立时不用手撑、膝盖不费力为宜", "湿滑地面注意防滑，避免膝盖突然受力"]
  },
  ankle_stiff: {
    posture: ["久坐后起身先活动脚踝再走", "坐姿避免脚尖一直朝下"],
    behavior: ["每天做小腿牵伸和勾脚练习", "久坐定时做脚踝上下绕环"],
    environment: ["桌下留够伸腿和勾脚的空间", "鞋履选择鞋底软硬适中、给脚踝活动余地的款式"]
  },
  piriformis_tight: {
    posture: ["坐姿双脚平放，避免盘腿和跷二郎腿", "久坐时重心两侧轮换，不一直压一侧臀部"],
    behavior: ["每 30–45 分钟起身走动伸展", "规律做髋部外旋肌牵伸和臀中肌强化"],
    environment: ["椅面软硬适中，减少臀部深处持续受压", "椅子高度让双脚完全踩实，髋部不被架高"]
  }
};
function actionPackageFor(symptomId) {
  const map = SYMPTOM_ACTIONS[symptomId] || {};
  const advice = SYMPTOM_ADVICE[symptomId] || { posture: [], behavior: [], environment: [] };
  return {
    symptomId: symptomId,
    // 四槽（docs/13 修订）：值为动作 id 或 null
    sitRelease: map.sitRelease || null,
    sitStrengthen: map.sitStrengthen || null,
    standRelease: map.standRelease || null,
    standStrengthen: map.standStrengthen || null,
    advice: advice
  };
}

function matchPatternsBySense(input) {
  const score = {};
  for (const p of PATTERNS) {
    let n = 0;
    for (const s of p.senses) if (input.includes(s)) n += s.length;
    if (n > 0) score[p.id] = n;
  }
  return Object.entries(score).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([id]) => id);
}
function dedupeConflict(tight, weak, _patternId, treatmentHint = "prefer_weak") {
  const dup = tight.filter((id) => weak.includes(id));
  if (dup.length === 0) return { tight, weak };
  return treatmentHint === "prefer_weak" ? { tight: tight.filter((id) => !dup.includes(id)), weak } : { tight, weak: weak.filter((id) => !dup.includes(id)) };
}
function buildExplanation(patternId, library) {
  const p = PATTERNS.find((x) => x.id === patternId);
  if (!p) return null;
  const find = (id) => library.find((m) => m.id === id);
  return {
    pattern: p.limitation,
    joint: p.joint,
    bookPage: p.bookPage,
    tightDetail: p.tight.map(find).filter(Boolean),
    weakDetail: p.weak.map(find).filter(Boolean),
    impact: p.impact,
    treatment: p.treatment,
    note: p.note,
    // 引用文案，注意用词是"依据"不是"认证"
    citation: `\u4F9D\u636E\u300A\u57FA\u7840\u808C\u52A8\u5B66\u300B\u7B2C4\u7248 p.${p.bookPage}\u300C${p.joint}\u5173\u8282\u53D7\u9650\u7684\u5E38\u89C1\u6A21\u5F0F\u300D`
  };
}
var DEMO_PATTERN_IDS = PATTERNS.filter((p) => p.demo).map((p) => p.id);

// src/lib/engine.ts
var RED_FLAGS = [
  "\u624B\u9EBB",
  "\u624B\u81C2\u53D1\u9EBB",
  "\u817F\u9EBB",
  "\u53D1\u9EBB",
  "\u653E\u5C04\u6027",
  "\u5934\u6655",
  "\u6076\u5FC3",
  "\u89C6\u529B\u6A21\u7CCA",
  "\u591C\u95F4\u75DB\u9192",
  "\u665A\u4E0A\u75DB\u9192",
  "\u5916\u4F24",
  "\u6454\u8FC7",
  "\u53D1\u70E7",
  "\u8D70\u8DEF\u4E0D\u7A33",
  "\u5927\u5C0F\u4FBF\u5F02\u5E38",
  "\u4F53\u91CD\u7A81\u7136\u4E0B\u964D",
  "\u4F53\u91CD\u9AA4\u964D",
  "\u89E6\u7535"
];
var AVOID_BY_REGION = {
  neck_shoulder: "\u9888\u690E\u75C5",
  upper_back: "\u9A7C\u80CC\u77EB\u6B63\u5E26",
  low_back_hip: "\u8170\u690E\u95F4\u76D8\u7A81\u51FA",
  leg: "\u9759\u8109\u66F2\u5F20",
  arm: "\u7F51\u7403\u8098\u818F\u836F"
};
function hitRedFlag(text) {
  for (const f of RED_FLAGS) if (text.includes(f)) return f;
  return null;
}
function scoreSense(input, sense) {
  let hit = 0;
  for (const ch of sense) if (input.includes(ch)) hit++;
  const cover = hit / sense.length;
  let bigram = 0;
  for (let i = 0; i < sense.length - 1; i++) {
    if (input.includes(sense.slice(i, i + 2))) bigram++;
  }
  if (bigram === 0) return 0;
  if (cover < 0.5) return 0;
  return cover * (1 + 0.15 * bigram);
}
function matchPatterns(input) {
  return PATTERNS.map((p) => ({ id: p.id, score: Math.max(0, ...p.senses.map((s) => scoreSense(input, s))) })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
}
function poolOf(p) {
  return dedupe([
    ...p.tight,
    ...p.weak,
    ...p.inferredTight ?? [],
    ...p.inferredWeak ?? []
  ]);
}
var KEEP_BONUS = 0.22;
var DROP_RATE = 0.55;
function refinePatterns(hits, choice) {
  const { kept = [], dropped = [], added = [] } = choice;
  if (!kept.length && !dropped.length && !added.length) return hits;
  const positive = dedupe([...kept, ...added]);
  return hits.map((h) => {
    const p = PATTERNS.find((x) => x.id === h.id);
    if (!p) return h;
    const pool = poolOf(p);
    let score = h.score;
    score += positive.filter((id) => pool.includes(id)).length * KEEP_BONUS;
    score *= Math.pow(DROP_RATE, dropped.filter((id) => pool.includes(id)).length);
    return { id: h.id, score };
  }).sort((a, b) => b.score - a.score);
}
function buildMuscleResult(id, kind, inferred, sceneWord) {
  const muscle = MUSCLES.find((m) => m.id === id);
  if (!muscle) return null;
  const action = kind === "tight" ? "\u62C9\u4F38" : "\u6FC0\u6D3B";
  return {
    muscle,
    kind,
    inferred,
    queryPro: `${muscle.name} ${action} ${sceneWord}`,
    queryPlain: `${muscle.senses[0] ?? muscle.name} ${action}`,
    queryAvoid: AVOID_BY_REGION[muscle.region] ?? "\u504F\u65B9"
  };
}
function parseLocal(input, sceneWord, choice) {
  const hits = choice ? refinePatterns(matchPatterns(input), choice) : matchPatterns(input);
  const top = hits[0];
  if (!top || top.score < 0.45) {
    return {
      patternIds: [],
      tight: [],
      weak: [],
      reason: "",
      impact: "",
      treatment: "",
      citation: "",
      outOfScope: true,
      redFlag: false,
      engine: "local"
    };
  }
  const ids = [top.id];
  if (hits[1] && hits[1].score >= top.score * 0.85) ids.push(hits[1].id);
  const chosen = PATTERNS.filter((p) => ids.includes(p.id));
  const tightIds = dedupe(chosen.flatMap((p) => p.tight));
  const weakIds = dedupe(chosen.flatMap((p) => p.weak));
  const infTightRaw = dedupe(chosen.flatMap((p) => p.inferredTight ?? []));
  const infWeakRaw = dedupe(chosen.flatMap((p) => p.inferredWeak ?? []));
  const conflict = tightIds.filter((id) => weakIds.includes(id));
  const veto = new Set(choice?.dropped ?? []);
  const tightFinal = tightIds.filter((id) => !conflict.includes(id) && !veto.has(id));
  const weakFinal = weakIds.filter((id) => !conflict.includes(id) && !veto.has(id));
  const infTight = infTightRaw.filter((id) => !veto.has(id));
  const infWeak = infWeakRaw.filter((id) => !veto.has(id));
  const main = chosen[0];
  const reason = buildReason(main, input);
  const tightMainIds = tightFinal.slice(0, 3);
  const tightMain = tightMainIds.map((id) => buildMuscleResult(id, "tight", false, sceneWord));
  const tightInfIds = infTight.filter((id) => !tightMainIds.includes(id)).slice(0, 1);
  const tightInf = tightInfIds.map((id) => buildMuscleResult(id, "tight", true, sceneWord));
  const weakMainIds = weakFinal.slice(0, 3);
  const weakMain = weakMainIds.map((id) => buildMuscleResult(id, "weak", false, sceneWord));
  const weakInfIds = infWeak.filter((id) => !weakMainIds.includes(id)).slice(0, 1);
  const weakInf = weakInfIds.map((id) => buildMuscleResult(id, "weak", true, sceneWord));
  const shownIds = dedupe([...tightMainIds, ...tightInfIds, ...weakMainIds, ...weakInfIds]);
  const marks = choice ? dedupe([...choice.added ?? [], ...choice.kept ?? []]).filter((id) => !shownIds.includes(id)).map((id) => MUSCLES.find((m) => m.id === id)).filter(Boolean) : [];
  return {
    patternIds: ids,
    pattern: main,
    tight: [...tightMain, ...tightInf].filter(Boolean),
    weak: [...weakMain, ...weakInf].filter(Boolean),
    marks: marks.length ? marks : void 0,
    vetoed: veto.size ? [...veto] : void 0,
    reason,
    impact: main.impact,
    treatment: main.treatment,
    note: main.note,
    citation: `\u4F9D\u636E\u300A\u57FA\u7840\u808C\u52A8\u5B66\u300B\u7B2C4\u7248 p.${main.bookPage}\u300C${main.joint}\u5173\u8282\u53D7\u9650\u7684\u5E38\u89C1\u6A21\u5F0F\u300D`,
    outOfScope: false,
    redFlag: false,
    engine: "local"
  };
}
function dedupe(a) {
  return Array.from(new Set(a));
}
function buildReason(p, input) {
  const base = `\u4F60\u8BF4\u7684"${input.trim()}"\uFF0C\u6BD4\u8F83\u63A5\u8FD1\u4E66\u4E2D\u300C${p.joint}\u300D\u7684\u8FD9\u79CD\u6A21\u5F0F\uFF1A${p.limitation}\u3002`;
  const how = p.id === "cranio_cervical" ? "\u957F\u671F\u4F4E\u5934\u770B\u624B\u673A\u3001\u7528\u7535\u8111\uFF0C\u8116\u5B50\u524D\u4FA7\u7684\u808C\u8089\u4F1A\u6162\u6162\u9002\u5E94\u53D8\u77ED\u7684\u59FF\u52BF\uFF0C\u540E\u4FA7\u652F\u6491\u7684\u808C\u8089\u5219\u88AB\u62C9\u5F97\u8D8A\u6765\u8D8A\u7D2F\u3002" : p.id === "scapulothoracic" ? "\u7ECF\u5E38\u628A\u624B\u653E\u5728\u8EAB\u524D\u505A\u4E8B\uFF08\u6253\u5B57\u3001\u5F00\u8F66\u3001\u770B\u624B\u673A\uFF09\uFF0C\u80F8\u524D\u4F1A\u53D8\u7D27\uFF0C\u80CC\u540E\u5C31\u5BB9\u6613\u88AB\u62C9\u957F\u6CA1\u529B\u6C14\u3002" : p.id === "hip" ? "\u957F\u65F6\u95F4\u5750\u7740\u4F1A\u8BA9\u9ACB\u90E8\u524D\u4FA7\u7684\u808C\u8089\u7F29\u77ED\uFF0C\u5C41\u80A1\u90A3\u4FA7\u7684\u529B\u91CF\u7528\u4E0D\u4E0A\uFF0C\u8170\u5C31\u5F97\u591A\u51FA\u529B\u3002" : p.id === "shoulder_glenohumeral" ? "\u80A9\u5173\u8282\u524D\u4FA7\u957F\u671F\u5904\u4E8E\u5185\u6536\u5185\u65CB\u7684\u59FF\u52BF\uFF0C\u524D\u9762\u53D8\u7D27\u3001\u8D1F\u8D23\u5916\u65CB\u7684\u808C\u8089\u5C31\u5BB9\u6613\u8DDF\u4E0D\u4E0A\u3002" : `\u8FD9\u7C7B\u95EE\u9898\u901A\u5E38\u662F\u4E00\u90E8\u5206\u808C\u8089\u957F\u671F\u7D27\u5F20\u3001\u53E6\u4E00\u90E8\u5206\u808C\u8089\u88AB\u6291\u5236\u6240\u5BFC\u81F4\u7684\u3002`;
  return base + how;
}
function buildSystemPrompt() {
  const patternBrief = PATTERNS.map(
    (p) => `- ${p.id}\uFF08${p.joint} p.${p.bookPage}\uFF09\u53D7\u9650\u6A21\u5F0F\uFF1A${p.limitation}
  \u7D27\u5F20(${p.tight.join("/")})\uFF1B\u51CF\u5F31(${p.weak.join("/")})`
  ).join("\n");
  const muscleBrief = MUSCLES.map((m) => `${m.id}=${m.name}`).join("\u3001");
  return `\u4F60\u662F\u4F53\u611F\u7FFB\u8BD1\u5668\u3002\u7528\u6237\u7528\u5927\u767D\u8BDD\u63CF\u8FF0\u8EAB\u4F53\u611F\u53D7\uFF0C\u4F60\u628A\u5B83\u7FFB\u8BD1\u6210\u5177\u4F53\u7684\u808C\u8089\u3002
\u4F60\u53EA\u505A\u68C0\u7D22\u548C\u7FFB\u8BD1\uFF0C\u4E0D\u505A\u8BCA\u65AD\uFF0C\u4E0D\u7ED9\u533B\u5B66\u7ED3\u8BBA\u3002

\u3010\u77E5\u8BC6\u4F9D\u636E\u3011\u300A\u57FA\u7840\u808C\u52A8\u5B66\u300B\u7B2C4\u7248\uFF08ISBN 978-7-5714-3810-4\uFF09\u300C\u5173\u8282\u53D7\u9650\u7684\u5E38\u89C1\u6A21\u5F0F\u300D\uFF1A
${patternBrief}

\u3010\u5224\u65AD\u987A\u5E8F\u3011
1. \u5148\u5224\u65AD\u7528\u6237\u8BF4\u7684\u662F\u54EA\u4E2A\u6A21\u5F0F\uFF08\u4ECE\u4E0A\u9762\u8FD9\u4E9B id \u91CC\u9009\uFF09
2. \u518D\u6309\u8BE5\u6A21\u5F0F\u7ED9\u51FA\uFF1A\u7D27\u5F20\u808C\u8089\uFF08=\u8FC7\u52B3\uFF0C\u8BE5\u62C9\u4F38\uFF09\u3001\u51CF\u5F31\u808C\u8089\uFF08=\u8FC7\u5F31\uFF0C\u8BE5\u6FC0\u6D3B\uFF09
3. \u53EA\u80FD\u4ECE\u4E0B\u9762\u7684\u808C\u8089\u5E93\u91CC\u9009 id\uFF0C\u4E0D\u8BB8\u53D1\u660E\u65B0\u808C\u8089\u540D
4. \u4E00\u6B21\u6700\u591A 3 \u5757\u7D27\u5F20 + 3 \u5757\u51CF\u5F31
5. \u540C\u4E00\u5757\u808C\u8089\u5728\u4E0D\u540C\u6A21\u5F0F\u4E0B\u89D2\u8272\u53EF\u80FD\u76F8\u53CD\uFF0C\u4EE5\u6A21\u5F0F\u4E3A\u51C6

\u3010\u808C\u8089\u5E93\u3011${muscleBrief}

\u3010\u8F93\u51FA\u3011\u53EA\u8F93\u51FA JSON\uFF0C\u4E0D\u8981 markdown \u4EE3\u7801\u5757\uFF1A
{"pattern":"\u6A21\u5F0Fid","tight":["id"],"weak":["id"],"reason":"\u4E00\u53E5\u5927\u767D\u8BDD\u89E3\u91CA","impact":"\u529F\u80FD\u5F71\u54CD"}
\u82E5\u7528\u6237\u8BF4\u7684\u5B8C\u5168\u4E0D\u5728\u4E0A\u8FF0\u6A21\u5F0F\u8303\u56F4\u5185\uFF0C\u8FD4\u56DE {"out_of_scope":true}`;
}

// src/lib/explain.ts
var CAUSE_BY_REGION = {
  neck_shoulder: "\u957F\u65F6\u95F4\u4F4E\u5934\u770B\u5C4F\u5E55\u3001\u5934\u5F80\u524D\u4F38\u7684\u59FF\u52BF\uFF0C\u4F1A\u8BA9\u8FD9\u4E00\u7247\u6301\u7EED\u4F4E\u5F3A\u5EA6\u6536\u7F29\u3002",
  upper_back: "\u624B\u81C2\u957F\u671F\u5728\u8EAB\u4F53\u524D\u9762\u505A\u4E8B\uFF08\u6253\u5B57\u3001\u5F00\u8F66\u3001\u770B\u624B\u673A\uFF09\uFF0C\u80A9\u80DB\u88AB\u5F80\u524D\u62C9\uFF0C\u8FD9\u4E00\u7247\u5C31\u88AB\u62C9\u957F\u53C8\u5F97\u5E72\u6D3B\u3002",
  low_back_hip: "\u4E45\u5750\u8BA9\u9ACB\u524D\u4FA7\u7F29\u77ED\u3001\u6838\u5FC3\u4E0D\u53C2\u52A0\u5DE5\u4F5C\uFF0C\u8D1F\u8377\u5C31\u8F6C\u5AC1\u5230\u8FD9\u4E00\u7247\u3002",
  leg: "\u4E45\u5750\u8BA9\u4E0B\u80A2\u957F\u65F6\u95F4\u4E0D\u6536\u7F29\uFF0C\u52A0\u4E0A\u8D70\u8DEF\u6216\u8DD1\u6B65\u7684\u6A21\u5F0F\u6BD4\u8F83\u5355\u4E00\u3002",
  arm: "\u624B\u8155\u548C\u624B\u6307\u957F\u65F6\u95F4\u91CD\u590D\u7CBE\u7EC6\u52A8\u4F5C\uFF0C\u808C\u8089\u4E00\u76F4\u5904\u5728\u4F4E\u5F3A\u5EA6\u6536\u7F29\u91CC\u3002"
};
function buildExplainCard(m, state, pattern) {
  const problem = state === "tight" ? "\u73B0\u5728\u504F\u7D27\uFF08\u8FC7\u52B3\uFF09\uFF1A\u5B83\u4E00\u76F4\u5904\u5728\u7F29\u77ED\u3001\u7EF7\u7740\u7684\u72B6\u6001\uFF0C\u6240\u4EE5\u4F1A\u53D1\u9178\u53D1\u786C\uFF0C\u6D3B\u52A8\u5230\u67D0\u4E2A\u89D2\u5EA6\u5C31\u5361\u4F4F\u3002" : state === "weak" ? "\u73B0\u5728\u504F\u5F31\uFF08\u8FC7\u5F31\uFF09\uFF1A\u5B83\u672C\u6765\u8BE5\u53D1\u529B\u7684\u65F6\u5019\u4F7F\u4E0D\u4E0A\u52B2\uFF0C\u4E8E\u662F\u522B\u7684\u808C\u8089\u66FF\u5B83\u5E72\u6D3B\uFF0C\u66FF\u7684\u90A3\u5757\u5C31\u8DDF\u7740\u9178\u3002" : "\u8FD9\u6B21\u5224\u5B9A\u7684\u6A21\u5F0F\u6CA1\u6709\u8986\u76D6\u5230\u8FD9\u5757\u808C\u8089\u2014\u2014\u4F60\u6807\u8BB0\u4E86\u5B83\uFF0C\u4F46\u6211\u4EEC\u6CA1\u6709\u4F9D\u636E\u5224\u65AD\u5B83\u662F\u7D27\u8FD8\u662F\u5F31\u3002";
  const cause = pattern?.note ? pattern.note : CAUSE_BY_REGION[m.region];
  const advice = state === "tight" ? "\u65B9\u5411\u662F\u677E\u89E3 + \u62C9\u4F38\uFF1A\u5148\u8BA9\u5B83\u677E\u5F00\uFF0C\u518D\u628A\u7F29\u77ED\u7684\u957F\u5EA6\u62C9\u56DE\u6765\u3002\u522B\u4E00\u4E0A\u6765\u5C31\u7528\u529B\u6309\u5230\u75BC\uFF0C\u90A3\u4F1A\u8BA9\u5B83\u66F4\u7F29\u3002" : state === "weak" ? '\u65B9\u5411\u662F\u6FC0\u6D3B + \u5F3A\u5316\uFF1A\u8BA9\u5B83\u91CD\u65B0\u5B66\u4F1A\u53D1\u529B\u3002\u62C9\u4F38\u89E3\u51B3\u4E0D\u4E86"\u6CA1\u529B\u6C14"\u7684\u95EE\u9898\uFF0C\u53CD\u800C\u53EF\u80FD\u66F4\u677E\u3002' : "\u53EF\u4EE5\u5148\u6309\u4F60\u6807\u8BB0\u7684\u4F4D\u7F6E\u6574\u4F53\u653E\u677E\u4E00\u4E0B\uFF0C\u7B49\u4E0B\u6B21\u63CF\u8FF0\u5F97\u66F4\u5177\u4F53\u4E00\u4E9B\u518D\u770B\u5B83\u3002";
  const page = pattern?.bookPage ?? m.bookPage;
  const namedInBook = Boolean(pattern && (pattern.tight.includes(m.id) || pattern.weak.includes(m.id)));
  const inferred = Boolean(
    pattern && (pattern.inferredTight?.includes(m.id) || pattern.inferredWeak?.includes(m.id))
  );
  const cite = !page ? void 0 : namedInBook ? `\u4F9D\u636E\u300A\u57FA\u7840\u808C\u52A8\u5B66\u300B\u7B2C4\u7248 p.${page}\u300C\u5173\u8282\u53D7\u9650\u7684\u5E38\u89C1\u6A21\u5F0F\u300D\u539F\u53E5\u5217\u51FA` : inferred ? `\u53C2\u8003\u300A\u57FA\u7840\u808C\u52A8\u5B66\u300B\u7B2C4\u7248 p.${page}\uFF08\u8BE5\u5904\u5217\u7684\u662F\u5B83\u6240\u5728\u7684\u808C\u7FA4\uFF0C\u8FD9\u5757\u5C5E\u540C\u7FA4\u63A8\u65AD\uFF09` : `\u300A\u57FA\u7840\u808C\u52A8\u5B66\u300B\u7B2C4\u7248 p.${page} \u672A\u6D89\u53CA\u8FD9\u5757\u808C\u8089\uFF0C\u6B64\u5904\u6309\u89E3\u5256\u4E0E\u5E38\u89C1\u505A\u6CD5\u5224\u65AD`;
  return { id: m.id, name: m.name, state, func: m.desc, problem, cause, advice, citation: cite };
}

// src/data/actions.ts
var SCENE_LABEL = {
  desk: "\u8FD8\u5728\u5DE5\u4F4D \xB7 \u8D70\u4E0D\u5F00",
  gym: "\u6709\u5668\u68B0 \xB7 \u5065\u8EAB\u623F",
  open: "\u6709\u573A\u5730 \xB7 \u516C\u56ED/\u5728\u5BB6",
  bed: "\u51C6\u5907\u4F11\u606F \xB7 \u5E8A\u4E0A"
};
var SCENE_HINT = {
  desk: "\u7A7F\u7740\u5DE5\u88C5\u3001\u5750\u7740\u3001\u540C\u4E8B\u5728\u65C1\u8FB9\u7684\u90A3\u79CD",
  gym: "\u6709\u5668\u68B0\uFF0C\u80FD\u5927\u5E45\u52A8\u8D77\u6765",
  open: "\u80FD\u52A8\uFF0C\u4F46\u4E0D\u65B9\u4FBF\u8EBA\u4E0B\uFF0C\u4E5F\u6CA1\u6709\u5668\u68B0",
  bed: "\u53EA\u60F3\u644A\u7740\u653E\u677E"
};
var KIND_LABEL = {
  release: "\u677E\u89E3",
  stretch: "\u62C9\u4F38",
  activate: "\u6FC0\u6D3B",
  mobilize: "\u6D3B\u52A8",
  relax: "\u8212\u7F13"
};
var ACTIONS = [
  // ══════════════ 颈肩 ══════════════
  {
    id: "chin_tuck",
    name: "\u6536\u4E0B\u5DF4\uFF08\u4E0D\u662F\u4F4E\u5934\uFF09",
    forState: "weak",
    muscles: ["deep_neck_flexor"],
    regions: ["neck_shoulder"],
    scenes: ["desk", "open", "bed"],
    gear: "none",
    posture: "sit",
    kind: "activate",
    howto: '\u5750\u76F4\uFF0C\u76EE\u5149\u5E73\u89C6\u3002\u4E0B\u5DF4\u5E73\u7740\u5F80\u540E\u7F29\uFF0C\u7F29\u51FA"\u53CC\u4E0B\u5DF4"\u7684\u611F\u89C9\uFF0C\u540E\u9888\u88AB\u62C9\u957F\uFF0C\u505C 3 \u79D2\u653E\u677E\u3002\u6CE8\u610F\u662F\u5E73\u79FB\u4E0D\u662F\u4F4E\u5934\u3002',
    dose: "10 \u6B21 \xD7 2 \u7EC4",
    why: "\u4E13\u95E8\u7EC3\u957F\u671F\u4F4E\u5934\u5E9F\u6389\u7684\u6DF1\u5C42\u9888\u5C48\u808C\uFF0C\u5B83\u662F\u628A\u5934\u62C9\u56DE\u6B63\u4F4D\u7684\u5173\u952E\u808C\u8089\u3002",
    caution: "\u4E0D\u8981\u4EF0\u5934\u4E5F\u4E0D\u8981\u4F4E\u5934\uFF0C\u662F\u6C34\u5E73\u540E\u7F29"
  },
  {
    id: "csm_release",
    name: "\u6309\u80F8\u9501\u4E73\u7A81\u808C",
    forState: "tight",
    muscles: ["sternocleidomastoid"],
    regions: ["neck_shoulder"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "none",
    posture: "sit",
    kind: "release",
    howto: '\u5934\u5FAE\u5FAE\u8F6C\u5230\u5BF9\u4FA7\u3001\u7A0D\u540E\u4EF0\uFF0C\u8116\u5B50\u524D\u9762\u90A3\u6761\u7EF7\u8D77\u6765\u7684"\u5E26\u5B50"\u5C31\u662F\u5B83\u3002\u7528\u4E24\u6307\u6307\u8179\u4ECE\u4E0A\u5F80\u4E0B\u8F7B\u6309\u5230\u4E0B\u53D1\uFF0C\u6162\u6162\u6253\u5708\uFF0C\u522B\u7528\u6307\u7532\u6390\u3002',
    dose: "\u6BCF\u4FA7 1 \u5206\u949F",
    why: "\u5B83\u4E00\u7F29\u77ED\u5C31\u628A\u4E0B\u5DF4\u5F80\u524D\u62C9\uFF0C\u662F\u5934\u524D\u4F38\u59FF\u52BF\u7684\u76F4\u63A5\u63A8\u624B\u3002",
    caution: "\u529B\u5EA6\u5230\u9178\u80C0\u5C31\u591F\uFF0C\u522B\u6309\u5230\u54B3\u55FD\u6216\u5934\u6655"
  },
  {
    id: "scalene_stretch",
    name: "\u659C\u89D2\u808C\u62C9\u4F38",
    forState: "tight",
    muscles: ["scalenes"],
    regions: ["neck_shoulder"],
    scenes: ["desk", "gym", "open"],
    gear: "none",
    posture: "sit",
    kind: "stretch",
    howto: "\u624B\u7ED5\u8FC7\u5934\u9876\u653E\u5728\u5BF9\u4FA7\u8033\u6735\u4E0A\u65B9\uFF0C\u628A\u5934\u5F80\u4FA7\u524D\u65B9\u8F7B\u8F7B\u7275\uFF0C\u540C\u65F6\u540C\u4FA7\u80A9\u8180\u5F80\u4E0B\u6C89\u3002\u611F\u89C9\u5230\u8116\u5B50\u4FA7\u9762\u5230\u9501\u9AA8\u4E0A\u65B9\u4E00\u6761\u88AB\u62C9\u5F00\u3002",
    dose: "\u6BCF\u4FA7 30 \u79D2 \xD7 2",
    why: "\u957F\u671F\u80F8\u5F0F\u547C\u5438\u4F1A\u8BA9\u5B83\u8FC7\u52B3\uFF0C\u7D27\u4E86\u4F1A\u5361\u4F4F\u8116\u5B50\u6839\u90E8\uFF0C\u8FD8\u5BB9\u6613\u7275\u6D89\u5230\u624B\u3002",
    caution: "\u6709\u624B\u9EBB\u5C31\u505C\u4E0B\u6765\uFF0C\u522B\u786C\u62C9"
  },
  {
    id: "subocc_release",
    name: "\u6795\u4E0B\u808C\u7FA4\u653E\u677E\uFF08\u6BDB\u5DFE\u5377\uFF09",
    forState: "tight",
    muscles: ["suboccipital"],
    regions: ["neck_shoulder"],
    scenes: ["bed", "gym", "open"],
    gear: "none",
    posture: "lie",
    kind: "release",
    howto: "\u628A\u6BDB\u5DFE\u5377\u6210\u76F4\u5F84\u7EA6 8cm \u7684\u5377\uFF0C\u57AB\u5728\u540E\u8111\u52FA\u548C\u8116\u5B50\u4EA4\u754C\u7684\u51F9\u9677\u5904\uFF0C\u5E73\u8EBA\uFF0C\u5934\u81EA\u7136\u5F80\u540E\u5760\uFF0C\u5DE6\u53F3\u8F7B\u8F7B\u8F6C\u5934\u3002",
    dose: "5\u201310 \u5206\u949F",
    why: '\u4F4E\u5934\u770B\u5C4F\u5E55\u65F6\u6700\u7D2F\u7684\u5C31\u662F\u8FD9\u7FA4\u6DF1\u5C42\u5C0F\u808C\u8089\uFF0C\u5B83\u4EEC\u7D27\u8D77\u6765\u6700\u63A5\u8FD1"\u540E\u8111\u52FA\u9178\u5230\u5934\u75BC"\u3002'
  },
  {
    id: "levator_release",
    name: "\u80A9\u80DB\u63D0\u808C\u653E\u677E",
    forState: "tight",
    muscles: ["levator_scapulae", "splenius_capitis"],
    regions: ["neck_shoulder"],
    scenes: ["desk", "gym", "open"],
    gear: "none",
    posture: "sit",
    kind: "release",
    howto: "\u4F4E\u5934\u3001\u5F80\u5BF9\u4FA7\u8F6C 45 \u5EA6\uFF0C\u540C\u4FA7\u624B\u591F\u5230\u80A9\u80DB\u9AA8\u5185\u4E0A\u89D2\u90A3\u4E2A\u786C\u70B9\uFF0C\u6309\u7740\u505A\u5C0F\u5E45\u5EA6\u7684\u8038\u80A9\u3002",
    dose: "\u6BCF\u4FA7 45 \u79D2",
    why: '\u5C31\u662F"\u4E00\u6309\u5C31\u75DB\u7684\u90A3\u6761"\uFF0C\u5355\u80A9\u8D1F\u91CD\u80CC\u5305\u7684\u4EBA\u6700\u5BB9\u6613\u4E2D\u3002'
  },
  {
    id: "trap_release",
    name: "\u8038\u80A9\u518D\u6C89\u80A9",
    forState: "tight",
    muscles: ["trapezius_upper"],
    regions: ["neck_shoulder"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "none",
    posture: "any",
    kind: "release",
    howto: '\u80A9\u8180\u7528\u529B\u8038\u5230\u9876\uFF0C\u505C 3 \u79D2\uFF0C\u7136\u540E\u4E00\u4E0B\u5B50\u5B8C\u5168\u677E\u6389\u8BA9\u80A9\u8180\u6389\u4E0B\u6765\u3002\u7ED9\u5B83\u4E00\u4E2A\u660E\u786E\u7684"\u677E"\u7684\u4FE1\u53F7\u3002',
    dose: "10 \u6B21",
    why: '\u4E00\u76F4\u7EF7\u7740\u7684\u808C\u8089\u53EA\u5BF9"\u5F7B\u5E95\u677E\u5F00"\u6709\u53CD\u5E94\uFF0C\u6162\u6162\u63C9\u53CD\u800C\u6CA1\u7528\u3002'
  },
  // ══════════════ 胸背 / 肩 ══════════════
  {
    id: "pec_stretch",
    name: "\u95E8\u6846\u80F8\u808C\u62C9\u4F38",
    forState: "tight",
    muscles: ["pectoralis_major", "pectoralis_minor"],
    regions: ["upper_back"],
    scenes: ["gym", "open"],
    gear: "wall",
    posture: "stand",
    kind: "stretch",
    howto: "\u624B\u8098\u62AC\u5230\u4E0E\u80A9\u540C\u9AD8\uFF0C\u524D\u81C2\u8D34\u95E8\u6846\uFF0C\u8EAB\u4F53\u5F80\u524D\u8DE8\u4E00\u6B65\u3002\u624B\u81C2\u4F4D\u7F6E\u9AD8\u4E00\u70B9\u62C9\u80F8\u5C0F\u808C\uFF0C\u4F4E\u4E00\u70B9\u62C9\u80F8\u5927\u808C\u4E0B\u90E8\u3002",
    dose: "\u6BCF\u4FA7 30 \u79D2 \xD7 2",
    why: "\u542B\u80F8\u9A7C\u80CC\u65F6\u80F8\u524D\u7684\u808C\u8089\u4F1A\u7F29\u77ED\uFF0C\u628A\u80A9\u8180\u6574\u4E2A\u5F80\u524D\u62FD\uFF0C\u5FC5\u987B\u5148\u677E\u5F00\u8FD9\u4E00\u4FA7\u80A9\u8180\u624D\u80FD\u56DE\u53BB\u3002"
  },
  {
    // 为什么单独做一条：门框在工位不一定有，而"胸前发紧"是办公室最高频的主诉之一。
    // 没有这条时，工位场景下针对胸大肌的动作只剩「毛巾背手」，凑不满 3 个就会
    // 掉进部位兜底，把没诊断到的肌肉推给用户。
    id: "chair_pec_open",
    name: "\u6276\u6905\u80CC\u6269\u80F8",
    forState: "tight",
    muscles: ["pectoralis_major", "pectoralis_minor"],
    regions: ["upper_back"],
    scenes: ["desk"],
    gear: "none",
    posture: "sit",
    kind: "stretch",
    howto: "\u5750\u76F4\uFF0C\u53F3\u624B\u6293\u4F4F\u6905\u80CC\u6216\u5EA7\u4F4D\u53F3\u7F18\uFF0C\u8EAB\u4F53\u6162\u6162\u5411\u5DE6\u524D\u65B9\u8F6C\u5F00\uFF0C\u80F8\u53E3\u671D\u5DE6\u4E0A\u6253\u5F00\uFF1B\u611F\u89C9\u5230\u53F3\u80F8\u524D\u65B9\u88AB\u62C9\u5F00\u5C31\u505C\u4F4F\u3002\u6362\u8FB9\u3002",
    dose: "\u6BCF\u4FA7 30 \u79D2 \xD7 2",
    why: "\u628A\u80F8\u524D\u7F29\u77ED\u7684\u808C\u8089\u62C9\u957F\uFF0C\u80A9\u8180\u624D\u6709\u7A7A\u95F4\u5F80\u540E\u56DE\u5230\u6B63\u4F4D\u2014\u2014\u5149\u7EC3\u5939\u80CC\u4E0D\u677E\u5F00\u524D\u9762\uFF0C\u4E24\u5934\u4F1A\u4E00\u76F4\u62D4\u6CB3\u3002",
    caution: "\u80A9\u8180\u524D\u9762\u6709\u523A\u75DB\u3001\u6216\u624B\u81C2\u53D1\u9EBB\u5C31\u505C\u4E0B\uFF0C\u9000\u5230\u4E0D\u75DB\u7684\u5E45\u5EA6"
  },
  {
    id: "desk_scap_set",
    name: "\u8D34\u6905\u80CC\u6536\u80A9\u80DB",
    forState: "weak",
    muscles: ["trapezius_middle", "rhomboid", "trapezius_lower"],
    regions: ["upper_back"],
    scenes: ["desk"],
    gear: "none",
    posture: "sit",
    kind: "activate",
    howto: "\u628A\u540E\u80CC\u8D34\u4E0A\u6905\u80CC\uFF0C\u4E24\u8098\u5782\u5728\u8EAB\u4FA7\uFF0C\u80A9\u80DB\u9AA8\u5F80\u540E\u4E0B\u65B9\u538B\uFF0C\u60F3\u8C61\u628A\u5B83\u4EEC\u585E\u8FDB\u540E\u88E4\u515C\uFF1B\u4FDD\u6301 5 \u79D2\u518D\u677E\u5F00\u3002\u5168\u7A0B\u522B\u8038\u80A9\u3001\u522B\u633A\u8170\u3002",
    dose: "10 \u6B21 \xD7 2 \u7EC4\uFF0C\u6BCF\u5C0F\u65F6\u6765\u4E00\u7EC4",
    why: '\u88AB\u62C9\u957F\u53D8\u5F31\u7684\u80A9\u80DB\u540E\u7F29\u808C\u9700\u8981\u53CD\u590D"\u60F3\u8D77\u6765\u600E\u4E48\u53D1\u529B"\uFF0C\u5750\u7740\u7684\u6BCF\u4E00\u6B21\u63D0\u9192\u90FD\u6BD4\u53BB\u5065\u8EAB\u623F\u4E00\u6B21\u66F4\u7BA1\u7528\u3002'
  },
  {
    id: "serratus_desk_push",
    name: "\u684C\u9762\u63A8\u638C",
    forState: "weak",
    muscles: ["serratus_anterior"],
    regions: ["upper_back"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "sit",
    kind: "activate",
    howto: "\u53CC\u624B\u638C\u6839\u62B5\u4F4F\u684C\u6CBF\uFF0C\u624B\u81C2\u51E0\u4E4E\u4F38\u76F4\u3002\u80A9\u80DB\u9AA8\u5F80\u524D\u9001\u51FA\u53BB\uFF08\u50CF\u8981\u7528\u624B\u638C\u628A\u684C\u5B50\u63A8\u5F00\uFF09\uFF0C\u8F7B\u8F7B\u53D1\u529B 5 \u79D2\uFF0C\u518D\u653E\u677E\u3002",
    dose: "8 \u6B21 \xD7 2 \u7EC4",
    why: "\u524D\u952F\u808C\u8D1F\u8D23\u8BA9\u80A9\u80DB\u9AA8\u8D34\u7740\u80F8\u5ED3\u5F80\u524D\u6ED1\uFF0C\u5B83\u4E00\u5F31\uFF0C\u80A9\u80DB\u9AA8\u5C31\u7FD8\u8D77\u6765\uFF0C\u62AC\u624B\u65F6\u80A9\u8180\u4F1A\u5361\u3002",
    caution: "\u4E0D\u8981\u7528\u529B\u5230\u8038\u80A9\u6216\u618B\u6C14\uFF0C\u53D1\u529B\u4E94\u516D\u6210\u5373\u53EF"
  },
  {
    // 床上场景针对胸大肌的动作：本页明确要"准备休息"也该有的选择。
    // 没有它时，肩胛胸壁模式在 bed 场景凑不满，只能掉进部位兜底，
    // 把「按胸锁乳突肌」推给一个脖子完全没问题的用户。
    id: "pec_side_open",
    name: "\u4FA7\u8EBA\u5F00\u80F8",
    forState: "tight",
    muscles: ["pectoralis_major", "pectoralis_minor"],
    regions: ["upper_back"],
    scenes: ["bed"],
    gear: "none",
    posture: "lie",
    kind: "stretch",
    howto: "\u4FA7\u8EBA\uFF0C\u4E0A\u4FA7\u624B\u638C\u6491\u5728\u80F8\u524D\u5E8A\u9762\u4E0A\uFF0C\u6162\u6162\u628A\u8EAB\u4F53\u5F80\u540E\u8F6C\u5F00\uFF08\u50CF\u7FFB\u8EAB\u4F46\u80A9\u8180\u7559\u5728\u539F\u5730\uFF09\uFF0C\u80F8\u53E3\u88AB\u62C9\u5F00\u5C31\u505C\u4F4F\u3002\u6362\u8FB9\u3002",
    dose: "\u6BCF\u4FA7 30 \u79D2 \xD7 2",
    why: "\u8EBA\u7740\u4E0D\u7528\u652F\u6491\u4F53\u91CD\uFF0C\u662F\u62C9\u5F00\u80F8\u524D\u7684\u808C\u8089\u6700\u7701\u529B\u7684\u65F6\u5019\uFF0C\u7761\u524D\u505A\u4E00\u7EC4\u5F53\u665A\u5C31\u677E\u4E00\u70B9\u3002",
    caution: "\u80A9\u8180\u524D\u9762\u6709\u523A\u75DB\u5C31\u51CF\u5C0F\u5E45\u5EA6\uFF0C\u6216\u5148\u522B\u505A"
  },
  {
    id: "scap_squeeze",
    name: "\u5939\u80CC\uFF08\u80CC\u540E\u5939\u652F\u7B14\uFF09",
    forState: "weak",
    muscles: ["rhomboid", "trapezius_middle"],
    regions: ["upper_back"],
    scenes: ["desk", "gym", "open"],
    gear: "none",
    posture: "sit",
    kind: "activate",
    howto: "\u5750\u76F4\uFF0C\u4E24\u8098\u5F80\u540E\u4E0B\u65B9\u9760\uFF0C\u80A9\u80DB\u9AA8\u5F80\u4E2D\u95F4\u6536\u7D27\uFF0C\u60F3\u8C61\u5939\u4F4F\u80CC\u540E\u7684\u4E1C\u897F\uFF0C\u505C 3 \u79D2\u677E\u5F00\u3002\u5168\u7A0B\u522B\u8038\u80A9\u3002",
    dose: "10 \u6B21 \xD7 2 \u7EC4",
    why: "\u83F1\u5F62\u808C\u548C\u4E2D\u659C\u65B9\u808C\u5F31\u4E86\uFF0C\u80A9\u80DB\u9AA8\u5C31\u5F80\u5916\u8DD1\uFF0C\u76F4\u63A5\u9020\u6210\u5706\u80A9\u548C\u88AB\u62C9\u957F\u7684\u9178\u3002"
  },
  {
    id: "wall_angel",
    name: "\u9760\u5899\u5929\u4F7F",
    forState: "both",
    muscles: ["pectoralis_minor", "serratus_anterior", "trapezius_middle", "trapezius_lower"],
    regions: ["upper_back", "neck_shoulder"],
    scenes: ["gym", "open"],
    gear: "wall",
    posture: "stand",
    kind: "mobilize",
    howto: "\u540E\u8111\u3001\u4E0A\u80CC\u3001\u81C0\u90E8\u8D34\u5899\uFF0C\u624B\u81C2\u8D34\u5899\u6446\u6210\u6295\u964D\u59FF\u52BF\uFF0C\u624B\u80CC\u8D34\u7740\u5899\u6162\u6162\u4E0A\u4E0B\u6ED1\u52A8\u3002\u6ED1\u4E0D\u4E0A\u53BB\u7684\u9AD8\u5EA6\u5C31\u662F\u7D27\u7684\u5730\u65B9\u3002",
    dose: "10 \u6B21\u6162\u505A",
    why: "\u4E00\u4E2A\u52A8\u4F5C\u540C\u65F6\u677E\u5F00\u80F8\u524D\u3001\u7EC3\u5230\u80A9\u80DB\u63A7\u5236\uFF0C\u662F\u5706\u80A9\u542B\u80F8\u7684\u901A\u7528\u52A8\u4F5C\u3002"
  },
  {
    id: "serratus_push",
    name: "\u80A9\u80DB\u4FEF\u5367\u6491",
    forState: "weak",
    muscles: ["serratus_anterior"],
    regions: ["upper_back"],
    scenes: ["gym", "open"],
    gear: "wall",
    posture: "stand",
    kind: "activate",
    howto: "\u9762\u5BF9\u5899\u63A8\u5899\uFF08\u6216\u505A\u4FEF\u5367\u6491\u59FF\u52BF\uFF09\uFF0C\u624B\u8098\u4FDD\u6301\u4E0D\u5F2F\uFF0C\u53EA\u8BA9\u80A9\u80DB\u9AA8\u5F80\u524D\u6491\u5F00\u3001\u518D\u7528\u529B\u5F80\u56DE\u6536\uFF0C\u8EAB\u4F53\u968F\u4E4B\u5FAE\u5FAE\u524D\u540E\u79FB\u52A8\u3002",
    dose: "12 \u6B21 \xD7 2 \u7EC4",
    why: "\u524D\u952F\u808C\u8D1F\u8D23\u628A\u80A9\u80DB\u9AA8\u8D34\u4F4F\u540E\u80CC\uFF0C\u5B83\u4E00\u5F31\u5C31\u4F1A\u51FA\u73B0\u7FFC\u72B6\u80A9\u80DB\u548C\u62AC\u624B\u8038\u80A9\u3002",
    caution: "\u53EA\u6709\u80A9\u80DB\u5728\u52A8\uFF0C\u624B\u8098\u522B\u5F2F"
  },
  {
    id: "ext_rotation",
    name: "\u5F39\u529B\u5E26\u80A9\u5916\u65CB",
    forState: "weak",
    muscles: ["infraspinatus", "teres_minor", "supraspinatus"],
    regions: ["upper_back"],
    scenes: ["gym", "open"],
    gear: "band",
    posture: "stand",
    kind: "activate",
    howto: "\u624B\u8098\u5939\u5728\u8EAB\u4F53\u4E24\u4FA7\u5C48 90 \u5EA6\uFF0C\u624B\u63E1\u5F39\u529B\u5E26\u5F80\u5916\u62C9\u5F00\uFF0C\u5C0F\u81C2\u50CF\u5F00\u95E8\u4E00\u6837\u5411\u5916\u8F6C\u52A8\uFF0C\u518D\u6162\u6162\u653E\u56DE\u3002",
    dose: "15 \u6B21 \xD7 3 \u7EC4",
    why: '\u5916\u65CB\u808C\u662F\u80A9\u5173\u8282\u7684"\u5B89\u5168\u5E26"\uFF0C\u5F31\u4E86\u62AC\u624B\u65F6\u80A9\u8180\u4F1A\u4E0D\u7A33\u3001\u5BB9\u6613\u75BC\u3002'
  },
  {
    id: "lat_stretch",
    name: "\u80CC\u9614\u808C\u62C9\u4F38",
    forState: "tight",
    muscles: ["latissimus_dorsi", "teres_major"],
    regions: ["upper_back"],
    scenes: ["gym", "open"],
    gear: "none",
    posture: "stand",
    kind: "stretch",
    howto: "\u5355\u624B\u6276\u67F1\u5B50\u6216\u5899\uFF0C\u8EAB\u4F53\u5F80\u540E\u5750\u3001\u5F80\u5916\u4FA7\u5012\uFF0C\u611F\u89C9\u4ECE\u814B\u4E0B\u5230\u8170\u4E00\u6574\u6761\u88AB\u62C9\u5F00\u3002\u8EAB\u4F53\u4FA7\u5C48\u4E00\u70B9\u4F1A\u66F4\u5230\u4F4D\u3002",
    dose: "\u6BCF\u4FA7 30 \u79D2 \xD7 2",
    why: "\u80CC\u9614\u808C\u7D27\u4F1A\u628A\u6574\u4E2A\u80A9\u8180\u5F80\u4E0B\u538B\u4F4F\uFF0C\u62AC\u624B\u53D7\u9650\u5F88\u591A\u65F6\u5019\u6839\u6E90\u5728\u5B83\uFF0C\u4E0D\u5728\u80A9\u3002"
  },
  {
    id: "deltoid_activate",
    name: "\u4FA7\u5E73\u4E3E\uFF08\u5C0F\u91CD\u91CF\uFF09",
    forState: "weak",
    muscles: ["deltoid"],
    regions: ["upper_back"],
    scenes: ["gym", "open"],
    gear: "band",
    posture: "stand",
    kind: "activate",
    howto: "\u624B\u63E1\u5C0F\u54D1\u94C3\u6216\u5F39\u529B\u5E26\uFF0C\u624B\u81C2\u4ECE\u8EAB\u4F53\u4E24\u4FA7\u62AC\u5230\u80A9\u8180\u9AD8\u5EA6\uFF0C\u6162\u62AC\u6162\u653E\uFF0C\u522B\u7529\u3002",
    dose: "12 \u6B21 \xD7 3 \u7EC4",
    why: "\u4E09\u89D2\u808C\u4E2D\u675F\u662F\u62AC\u624B\u7684\u542F\u52A8\u808C\uFF0C\u5B83\u5F31\u4E86\u62AC\u624B\u5C31\u53EA\u80FD\u9760\u8038\u80A9\u4EE3\u507F\u3002",
    caution: "\u91CD\u91CF\u4E00\u5B9A\u8981\u5C0F\uFF0C\u7528\u7529\u7684\u7B49\u4E8E\u6CA1\u7EC3"
  },
  // ══════════════ 腰骨盆 ══════════════
  {
    id: "iliopsoas_stretch",
    name: "\u5F13\u6B65\u9ACB\u5C48\u808C\u62C9\u4F38",
    forState: "tight",
    muscles: ["iliopsoas"],
    regions: ["low_back_hip"],
    scenes: ["gym", "open"],
    gear: "none",
    posture: "stand",
    kind: "stretch",
    howto: "\u524D\u817F\u5F13\u6B65\u3001\u540E\u817F\u819D\u76D6\u8DEA\u5730\uFF0C\u628A\u9AA8\u76C6\u5F80\u524D\u4E0B\u65B9\u6C89\uFF0C\u540C\u65F6\u540E\u4FA7\u624B\u81C2\u5F80\u4E0A\u4E3E\u5E76\u671D\u5BF9\u4FA7\u4FA7\u5C48\u3002\u611F\u89C9\u5927\u817F\u6839\u524D\u9762\u88AB\u62C9\u5F00\u3002",
    dose: "\u6BCF\u4FA7 30 \u79D2 \xD7 2",
    why: "\u4E45\u5750\u8BA9\u9ACB\u5C48\u808C\u4E00\u76F4\u5904\u5728\u7F29\u77ED\u4F4D\uFF0C\u662F\u9AA8\u76C6\u524D\u503E\u7684\u4E00\u534A\u539F\u56E0\uFF0C\u4E5F\u662F\u7AD9\u8D77\u6765\u8981\u7F13\u4E00\u4E0B\u7684\u5143\u51F6\u3002",
    caution: "\u522B\u628A\u8170\u5F80\u524D\u9876\u6765\u51D1\u62C9\u4F38\u5E45\u5EA6"
  },
  {
    id: "hip_bridge",
    name: "\u81C0\u6865",
    forState: "weak",
    muscles: ["gluteus_maximus"],
    regions: ["low_back_hip"],
    scenes: ["gym", "open", "bed"],
    gear: "none",
    posture: "lie",
    kind: "activate",
    howto: "\u5E73\u8EBA\u5C48\u819D\uFF0C\u811A\u8E29\u5730\u4E0E\u9ACB\u540C\u5BBD\uFF0C\u7528\u5C41\u80A1\u53D1\u529B\u628A\u9ACB\u9876\u8D77\u6765\uFF0C\u5230\u80A9-\u9ACB-\u819D\u4E00\u6761\u76F4\u7EBF\uFF0C\u9876\u5CF0\u6536\u7D27 2 \u79D2\u518D\u6162\u6162\u653E\u4E0B\u3002",
    dose: "15 \u6B21 \xD7 3 \u7EC4",
    why: "\u81C0\u5927\u808C\u4E0D\u5E72\u6D3B\uFF0C\u4E0B\u80CC\u548C\u819D\u76D6\u5C31\u5F97\u66FF\u5B83\u51FA\u529B\uFF0C\u5F88\u591A\u8170\u9178\u3001\u819D\u76D6\u4E0D\u9002\u7684\u6839\u6E90\u5728\u8FD9\u3002",
    caution: "\u5E94\u8BE5\u662F\u5C41\u80A1\u9178\uFF0C\u7EC3\u5B8C\u8170\u9178\u8BF4\u660E\u7528\u8170\u9876\u4E86"
  },
  {
    id: "cat_cow",
    name: "\u732B\u725B\u5F0F",
    forState: "both",
    muscles: ["erector_spinae", "multifidus"],
    regions: ["low_back_hip"],
    scenes: ["gym", "open", "bed"],
    gear: "none",
    posture: "lie",
    kind: "mobilize",
    howto: "\u56DB\u70B9\u8DEA\u59FF\uFF0C\u5438\u6C14\u584C\u8170\u62AC\u5934\uFF0C\u547C\u6C14\u62F1\u80CC\u4F4E\u5934\uFF0C\u4E00\u8282\u4E00\u8282\u8DDF\u7740\u547C\u5438\u52A8\u3002\u6162\u5230\u80FD\u611F\u89C9\u5230\u6BCF\u4E00\u8282\u810A\u690E\u3002",
    dose: "10 \u4E2A\u547C\u5438",
    why: '\u7ED9\u6574\u6761\u810A\u67F1"\u4E0A\u6CB9"\uFF0C\u5BF9\u4E45\u5750\u540E\u7684\u8170\u90E8\u53D1\u50F5\u6700\u76F4\u63A5\u3002'
  },
  {
    id: "bird_dog",
    name: "\u9E1F\u72D7\u5F0F",
    forState: "weak",
    muscles: ["multifidus", "erector_spinae"],
    regions: ["low_back_hip"],
    scenes: ["gym", "open"],
    gear: "none",
    posture: "lie",
    kind: "activate",
    howto: "\u56DB\u70B9\u8DEA\u59FF\uFF0C\u540C\u65F6\u4F38\u51FA\u5BF9\u4FA7\u7684\u624B\u548C\u817F\u5E76\u4F38\u76F4\uFF0C\u505C 3 \u79D2\u6536\u56DE\u3002\u5168\u7A0B\u9AA8\u76C6\u522B\u6643\uFF0C\u50CF\u80CC\u4E0A\u80FD\u653E\u4E00\u676F\u6C34\u3002",
    dose: "\u6BCF\u4FA7 8 \u6B21 \xD7 2 \u7EC4",
    why: '\u7EC3\u7684\u662F\u8D34\u7740\u810A\u690E\u3001\u8D1F\u8D23\u4E00\u8282\u4E00\u8282\u6263\u4F4F\u810A\u67F1\u7684\u591A\u88C2\u808C\uFF0C\u5B83\u5F31\u4E86\u8170\u5C31"\u6491\u4E0D\u4F4F"\u3002'
  },
  {
    id: "clamshell",
    name: "\u868C\u5F0F\u5F00\u5408",
    forState: "weak",
    muscles: ["gluteus_medius"],
    regions: ["low_back_hip", "leg"],
    scenes: ["gym", "open", "bed"],
    gear: "band",
    posture: "lie",
    kind: "activate",
    howto: "\u4FA7\u8EBA\u5C48\u819D\uFF0C\u811A\u8DDF\u5E76\u62E2\uFF0C\u4E0A\u4FA7\u819D\u76D6\u5F80\u4E0A\u6253\u5F00\u5230\u6700\u5927\uFF0C\u6162\u6162\u653E\u4E0B\u3002\u9AA8\u76C6\u522B\u8DDF\u7740\u5F80\u540E\u8F6C\u3002",
    dose: "\u6BCF\u4FA7 15 \u6B21 \xD7 2 \u7EC4",
    why: "\u81C0\u4E2D\u808C\u7BA1\u5355\u817F\u7AD9\u7ACB\u7684\u7A33\u5B9A\uFF0C\u5B83\u5F31\u4E86\u8D70\u8DEF\u4F1A\u6643\u3001\u819D\u76D6\u4F1A\u5185\u6263\u3002"
  },
  {
    id: "figure_four",
    name: "\u4EF0\u5367\u56DB\u5B57\u62C9\u4F38",
    forState: "tight",
    muscles: ["piriformis", "gluteus_medius"],
    regions: ["low_back_hip"],
    scenes: ["bed", "open"],
    gear: "none",
    posture: "lie",
    kind: "stretch",
    howto: '\u5E73\u8EBA\uFF0C\u4E00\u53EA\u811A\u8E1D\u642D\u5728\u53E6\u4E00\u6761\u817F\u819D\u76D6\u4E0A\u6446\u6210"4"\u5B57\uFF0C\u53CC\u624B\u62B1\u4F4F\u4E0B\u65B9\u5927\u817F\u5F80\u80F8\u53E3\u5E26\u3002',
    dose: "\u6BCF\u4FA7 1 \u5206\u949F",
    why: "\u5750\u4E45\u4E86\u5C41\u80A1\u6DF1\u5904\u53D1\u7D27\uFF0C\u5927\u591A\u662F\u81C0\u6DF1\u5C42\u5728\u4F5C\u602A\uFF1B\u8FD9\u4E2A\u59FF\u52BF\u4E0D\u52A8\u4E5F\u80FD\u62C9\u5F00\u3002",
    caution: "\u5982\u679C\u75BC\u5F80\u817F\u540E\u9762\u7A9C\u5C31\u522B\u505A\u4E86"
  },
  {
    id: "core_brace",
    name: "\u6536\u8179\u6FC0\u6D3B\uFF08\u6B7B\u866B\u5F0F\uFF09",
    forState: "weak",
    muscles: ["transversus_abdominis", "rectus_abdominis", "obliquus_internus"],
    regions: ["low_back_hip"],
    scenes: ["gym", "open", "bed"],
    gear: "none",
    posture: "lie",
    kind: "activate",
    howto: "\u5E73\u8EBA\u53CC\u624B\u4E3E\u5411\u5929\u82B1\u677F\u3001\u53CC\u817F\u5C48\u819D\u62AC\u8D77\u3002\u547C\u6C14\u65F6\u628A\u8170\u538B\u5411\u5730\u9762\uFF08\u4E0D\u662F\u618B\u6C14\u731B\u6536\uFF09\uFF0C\u4FDD\u6301\u8170\u8D34\u5730\uFF0C\u7F13\u6162\u653E\u4E0B\u5BF9\u4FA7\u624B\u811A\u4EA4\u66FF\u3002",
    dose: "\u6BCF\u4FA7 8 \u6B21 \xD7 2 \u7EC4",
    why: "\u8179\u6A2A\u808C\u662F\u5929\u7136\u8170\u5E26\uFF0C\u5B83\u4E0D\u5DE5\u4F5C\u8170\u5C31\u5931\u53BB\u4E86\u652F\u6491\u3002",
    caution: "\u5168\u7A0B\u8170\u4E0D\u80FD\u79BB\u5730\uFF0C\u79BB\u4E86\u5C31\u6362\u8F7B\u4E00\u70B9\u7684\u7248\u672C"
  },
  {
    id: "side_plank",
    name: "\u4FA7\u6865\uFF08\u53EF\u4ECE\u5C48\u819D\u7248\u5F00\u59CB\uFF09",
    forState: "weak",
    muscles: ["obliquus_externus", "obliquus_internus", "quadratus_lumborum"],
    regions: ["low_back_hip"],
    scenes: ["gym", "open"],
    gear: "none",
    posture: "lie",
    kind: "activate",
    howto: "\u4FA7\u8EBA\u7528\u8098\u6491\u5730\uFF0C\u628A\u9ACB\u62AC\u8D77\u6765\u8BA9\u8EAB\u4F53\u6210\u4E00\u6761\u76F4\u7EBF\u3002\u505A\u4E0D\u5230\u5C31\u5148\u5C48\u819D\uFF0C\u8BA9\u819D\u76D6\u548C\u5C0F\u817F\u5916\u4FA7\u8D34\u5730\u3002",
    dose: "\u6BCF\u4FA7 20\u201330 \u79D2 \xD7 2",
    why: "\u7EC3\u4FA7\u8179\u548C\u8170\u65B9\u808C\u7684\u8010\u529B\uFF0C\u8DD1\u6B65\u65F6\u8EAB\u4F53\u4E71\u6643\u3001\u8F6C\u8EAB\u6536\u4E0D\u4F4F\u90FD\u8DDF\u5B83\u4EEC\u6709\u5173\u3002"
  },
  {
    id: "child_pose",
    name: "\u5A74\u513F\u5F0F / \u62B1\u819D\u6EDA\u52A8",
    forState: "both",
    muscles: ["erector_spinae", "quadratus_lumborum"],
    regions: ["low_back_hip"],
    scenes: ["bed", "open"],
    gear: "none",
    posture: "lie",
    kind: "relax",
    howto: "\u8DEA\u5750\u628A\u4E0A\u8EAB\u5F80\u524D\u8DB4\uFF0C\u624B\u81C2\u5C3D\u91CF\u5F80\u524D\u4F38\uFF0C\u5C41\u80A1\u5750\u5728\u811A\u8DDF\u4E0A\uFF1B\u6216\u8005\u8EBA\u7740\u62B1\u4F4F\u53CC\u819D\u8F7B\u8F7B\u5DE6\u53F3\u6447\u3002",
    dose: "1\u20132 \u5206\u949F",
    why: "\u4E0D\u7ED9\u808C\u8089\u52A0\u4EFB\u52A1\uFF0C\u7EAF\u7CB9\u8BA9\u8170\u90E8\u5378\u529B\uFF0C\u4E45\u5750\u4E00\u5929\u540E\u6700\u8212\u670D\u7684\u7B2C\u4E00\u6B65\u3002"
  },
  // ══════════════ 下肢 ══════════════
  {
    id: "hamstring_stretch",
    name: "\u6BDB\u5DFE\u62C9\u817F\uFF08\u8EBA\u7740\u62C9\u8158\u7EF3\u808C\uFF09",
    forState: "tight",
    muscles: ["hamstrings"],
    regions: ["leg"],
    scenes: ["gym", "open", "bed"],
    gear: "band",
    posture: "lie",
    kind: "stretch",
    howto: "\u5E73\u8EBA\uFF0C\u6BDB\u5DFE\u7ED5\u8FC7\u4E00\u4FA7\u811A\u638C\uFF0C\u53CC\u624B\u62C9\u4F4F\u6BDB\u5DFE\u628A\u817F\u6162\u6162\u5F80\u80F8\u53E3\u5E26\uFF0C\u819D\u76D6\u80FD\u76F4\u5C31\u76F4\u3001\u76F4\u4E0D\u4E86\u5FAE\u5C48\u3002",
    dose: "\u6BCF\u4FA7 30 \u79D2 \xD7 2",
    why: "\u8EBA\u7740\u62C9\u6700\u5B89\u5168\uFF0C\u4E0D\u4F1A\u50CF\u7AD9\u7740\u4F53\u524D\u5C48\u90A3\u6837\u62FF\u8170\u53BB\u4EE3\u507F\u3002",
    caution: "\u817F\u9EBB\u6216\u75BC\u653E\u5C04\u5230\u5C0F\u817F\u5C31\u677E\u5F00"
  },
  {
    id: "wall_squat",
    name: "\u9760\u5899\u9759\u8E72",
    forState: "weak",
    muscles: ["quadriceps"],
    regions: ["leg"],
    scenes: ["gym", "open"],
    gear: "wall",
    posture: "stand",
    kind: "activate",
    howto: "\u80CC\u8D34\u5899\uFF0C\u811A\u5F80\u524D\u7AD9\u4E00\u6B65\uFF0C\u6162\u6162\u4E0B\u6ED1\u5230\u819D\u76D6\u5FAE\u5C48 60\u201390 \u5EA6\uFF0C\u819D\u76D6\u4E0D\u8D85\u8FC7\u811A\u5C16\uFF0C\u4FDD\u6301\u4F4F\u3002",
    dose: "30 \u79D2 \xD7 3 \u7EC4",
    why: "\u9759\u6001\u53D1\u529B\u5BF9\u819D\u76D6\u6700\u53CB\u597D\uFF0C\u540C\u65F6\u7EC3\u5230\u80A1\u56DB\u5934\u808C\u63A7\u5236\u9ACC\u9AA8\u8F68\u8FF9\u7684\u80FD\u529B\u3002",
    caution: "\u819D\u76D6\u4E0D\u8981\u8D85\u8FC7\u811A\u5C16\uFF0C\u4E5F\u522B\u8E72\u592A\u6DF1"
  },
  {
    id: "quad_set",
    name: "\u5750\u59FF\u4F38\u819D\u52FE\u811A",
    forState: "weak",
    muscles: ["quadriceps"],
    regions: ["leg"],
    scenes: ["desk", "bed"],
    gear: "none",
    posture: "sit",
    kind: "activate",
    howto: "\u5750\u76F4\uFF0C\u5C0F\u817F\u6162\u6162\u62AC\u5230\u6C34\u5E73\uFF0C\u811A\u5C16\u7528\u529B\u5F80\u56DE\u52FE\uFF0C\u7EF7\u4F4F\u5927\u817F\u524D\u4FA7\u808C\u8089\uFF0C\u505C 5 \u79D2\u653E\u4E0B\u3002",
    dose: "\u6BCF\u4FA7 10 \u6B21",
    why: "\u5750\u7740\u5C31\u80FD\u7ED9\u80A1\u56DB\u5934\u808C\u4E0A\u5F3A\u5EA6\uFF0C\u5BF9\u4E0A\u4E0B\u697C\u68AF\u6253\u8F6F\u817F\u6700\u5BF9\u75C7\u3002"
  },
  {
    id: "itb_release",
    name: "\u9AC2\u80EB\u675F\u653E\u677E",
    forState: "tight",
    muscles: ["iliotibial_tract", "tensor_fasciae_latae"],
    regions: ["leg"],
    scenes: ["gym", "open", "bed"],
    gear: "foam",
    posture: "lie",
    kind: "release",
    howto: "\u4FA7\u8EBA\uFF0C\u6CE1\u6CAB\u8F74\u57AB\u5728\u5927\u817F\u5916\u4FA7\u4E0B\u65B9\uFF0C\u4ECE\u9ACB\u5230\u819D\u6162\u6162\u6EDA\uFF0C\u627E\u5230\u6700\u9178\u7684\u70B9\u505C\u7559 20 \u79D2\u3002\u6CA1\u6709\u6CE1\u6CAB\u8F74\u5C31\u7528\u624B\u638C\u6A2A\u5411\u6413\u3002",
    dose: "\u6BCF\u4FA7 1\u20132 \u5206\u949F",
    why: "\u9AC2\u80EB\u675F\u662F\u8DD1\u6B65\u4EBA\u7FA4\u6700\u5E38\u89C1\u7684\u819D\u5916\u4FA7\u75DB\u6765\u6E90\uFF0C\u5B83\u672C\u8EAB\u62C9\u4E0D\u52A8\uFF0C\u53EA\u80FD\u677E\u3002",
    caution: "\u76F4\u63A5\u62C9\u5B83\u4E0D\u662F\u4E0D\u884C\uFF0C\u662F\u6548\u679C\u5DEE\uFF1B\u677E\u89E3 + \u7EC3\u81C0\u66F4\u6709\u6548"
  },
  {
    id: "calf_release",
    name: "\u8E2E\u811A + \u9760\u5899\u538B\u5C0F\u817F",
    forState: "both",
    muscles: ["gastrocnemius", "soleus", "fibularis"],
    regions: ["leg"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "wall",
    posture: "stand",
    kind: "activate",
    howto: "\u5148\u8DFA\u2014\u2014\u5750\u7740\u6216\u7AD9\u7740\u53CD\u590D\u62AC\u8D77\u811A\u8DDF\u518D\u653E\u4E0B\uFF0C\u4FC3\u8FDB\u56DE\u6D41\uFF1B\u518D\u62C9\u4F38\u2014\u2014\u9762\u5BF9\u5899\uFF0C\u540E\u817F\u4F38\u76F4\u3001\u811A\u8DDF\u8E29\u5B9E\uFF0C\u8EAB\u4F53\u524D\u503E\u3002\u4E24\u8005\u90FD\u505A\u3002",
    dose: "\u8E2E\u811A 20 \u6B21 + \u62C9\u4F38\u6BCF\u4FA7 30 \u79D2",
    why: '\u5C0F\u817F\u662F"\u7B2C\u4E8C\u5FC3\u810F"\uFF0C\u4E45\u5750\u5B83\u505C\u6446\uFF0C\u8840\u6DB2\u56DE\u6D41\u5C31\u53D8\u5DEE\uFF1B\u52A8\u8D77\u6765\u6BD4\u5355\u7EAF\u62C9\u66F4\u6709\u6548\u3002'
  },
  {
    // 为什么要跟上面那条并存：直腿压小腿拉的是腓肠肌，屈膝才能越过它拉到
    // 下面的比目鱼肌。书 p.359 踝模式里这两块是并列列名的，只给一个动作
    // 会让"比目鱼肌过劳"的诊断在页面上落不了地。
    id: "soleus_stretch",
    name: "\u5C48\u819D\u538B\u5C0F\u817F",
    forState: "tight",
    muscles: ["soleus", "gastrocnemius"],
    regions: ["leg"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "wall",
    posture: "stand",
    kind: "stretch",
    howto: "\u9762\u5BF9\u5899\uFF0C\u540E\u817F\u5C48\u819D\u3001\u811A\u8DDF\u8E29\u5B9E\uFF0C\u8EAB\u4F53\u6162\u6162\u524D\u503E\u3002\u611F\u89C9\u5728\u8DDF\u8171\u4E0A\u65B9\u3001\u5C0F\u817F\u6DF1\u5904\u88AB\u62C9\u5F00\u5C31\u505C\u4F4F\u2014\u2014\u5C48\u819D\u662F\u5173\u952E\u3002",
    dose: "\u6BCF\u4FA7 30 \u79D2 \xD7 2",
    why: "\u6BD4\u76EE\u9C7C\u808C\u85CF\u5728\u8153\u80A0\u808C\u4E0B\u9762\uFF0C\u76F4\u817F\u62C9\u4F38\u7ED5\u4E0D\u8FC7\u53BB\uFF1B\u4E45\u7AD9\u4E45\u5750\u7684\u4EBA\u5E38\u5E38\u662F\u5B83\u5148\u7D27\u3002",
    caution: "\u811A\u8E1D\u6709\u65E7\u4F24\u5C31\u522B\u538B\u5230\u6781\u9650\uFF0C\u9000\u5230\u4E0D\u75DB\u7684\u5E45\u5EA6"
  },
  {
    // 工位/床上版本的腘绳肌拉伸：毛巾拉腿要躺下，这两个场景做不了，
    // 缺了它「膝盖外侧疼」在工位的三个动作里会有两个靠部位兜底。
    id: "ham_seated_stretch",
    name: "\u5750\u59FF\u4F38\u817F\u591F\u811A\u5C16",
    forState: "tight",
    muscles: ["hamstrings", "iliotibial_tract"],
    regions: ["leg"],
    scenes: ["desk", "bed"],
    gear: "none",
    posture: "sit",
    kind: "stretch",
    howto: "\u5750\u76F4\uFF0C\u4E00\u6761\u817F\u5F80\u524D\u4F38\u76F4\u3001\u811A\u5C16\u671D\u4E0A\uFF0C\u80CC\u4FDD\u6301\u4E0D\u5F13\uFF0C\u4ECE\u9ACB\u90E8\u6162\u6162\u5F80\u524D\u503E\u5230\u5927\u817F\u540E\u4FA7\u88AB\u62C9\u5F00\u3002\u60F3\u5E26\u5230\u5916\u4FA7\u5C31\u628A\u811A\u5C16\u7A0D\u5FAE\u5185\u8F6C\u3002",
    dose: "\u6BCF\u4FA7 30 \u79D2 \xD7 2",
    why: "\u4E45\u5750\u8BA9\u5927\u817F\u540E\u4FA7\u7684\u808C\u8089\u4E00\u76F4\u5904\u5728\u7F29\u77ED\u4F4D\u3001\u9ACB\u53C8\u4E0D\u52A8\uFF0C\u819D\u76D6\u5C31\u66FF\u5B83\u4EEC\u625B\u4E86\u538B\u529B\u3002",
    caution: "\u8170\u4E0D\u8212\u670D\u5C31\u628A\u624B\u6491\u5728\u817F\u4E0A\uFF0C\u522B\u5F13\u7740\u80CC\u786C\u591F"
  },
  {
    id: "tibialis_activate",
    name: "勾脚 / 脚跟走路",
    forState: "weak",
    muscles: ["tibialis_anterior"],
    regions: ["leg"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "none",
    posture: "any",
    kind: "activate",
    howto: "\u5750\u7740\u6216\u7AD9\u7740\uFF0C\u811A\u5C16\u7528\u529B\u5F80\u56DE\u52FE\u5230\u6781\u9650\uFF0C\u505C 2 \u79D2\u653E\u677E\uFF1B\u80FD\u7AD9\u8D77\u6765\u5C31\u8E2E\u7740\u811A\u8D70\u8DEF 30 \u79D2\u3002",
    dose: "20 \u6B21 / \u8D70 30 \u79D2",
    why: "\u80EB\u9AA8\u524D\u808C\u5F31\u4E86\u811A\u62AC\u4E0D\u8D77\u6765\uFF0C\u8D70\u8DEF\u5BB9\u6613\u7ECA\u811A\u3001\u5C0F\u817F\u524D\u4FA7\u5BB9\u6613\u9178\u3002"
  },
  {
    id: "adductor_stretch",
    name: "\u5750\u59FF\u86D9\u5F0F /  butterfly",
    forState: "tight",
    muscles: ["hip_adductors", "sartorius"],
    regions: ["leg"],
    scenes: ["gym", "open", "bed"],
    gear: "none",
    posture: "lie",
    kind: "stretch",
    howto: "\u5750\u5728\u5730\u4E0A\u811A\u5FC3\u76F8\u5BF9\uFF0C\u53CC\u624B\u63E1\u4F4F\u811A\uFF0C\u819D\u76D6\u81EA\u7136\u5F80\u4E0B\u6C89\uFF1B\u8EAB\u4F53\u5FAE\u5FAE\u524D\u503E\u52A0\u91CD\u3002",
    dose: "1\u20132 \u5206\u949F",
    why: "\u5185\u6536\u808C\u4E45\u5750\u4F1A\u7F29\u77ED\uFF0C\u7D27\u4E86\u4F1A\u9650\u5236\u9ACB\u7684\u6D3B\u52A8\uFF0C\u4E5F\u4F1A\u8BA9\u9AA8\u76C6\u66F4\u4E0D\u7A33\u3002"
  },
  // ══════════════ 上肢 ══════════════
  {
    id: "wrist_stretch",
    name: "\u524D\u81C2\u62C9\u4F38\uFF08\u4E24\u4E2A\u65B9\u5411\u90FD\u62C9\uFF09",
    forState: "tight",
    muscles: ["forearm_flexors", "brachioradialis"],
    regions: ["arm"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "none",
    posture: "any",
    kind: "stretch",
    howto: "\u624B\u638C\u671D\u4E0B\uFF0C\u53E6\u4E00\u53EA\u624B\u628A\u624B\u6307\u5F80\u4E0B\u538B\u62C9\u524D\u81C2\u5916\u4FA7\uFF1B\u518D\u7FFB\u8FC7\u6765\u638C\u671D\u4E0A\u3001\u624B\u6307\u5F80\u4E0B\u538B\u62C9\u5185\u4FA7\u3002\u4E24\u4E2A\u65B9\u5411\u90FD\u8981\u505A\u3002",
    dose: "\u6BCF\u4FA7\u6BCF\u65B9\u5411 30 \u79D2",
    why: "\u9F20\u6807\u952E\u76D8\u8BA9\u524D\u81C2\u5C48\u808C\u957F\u671F\u7F29\u7740\uFF0C\u53EA\u62C9\u4E00\u4E2A\u65B9\u5411\u6CA1\u7528\u3002"
  },
  {
    id: "wrist_extend",
    name: "腕伸展（轻重量）",
    forState: "weak",
    muscles: ["forearm_extensors"],
    regions: ["arm"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "band",
    posture: "any",
    kind: "activate",
    howto: "\u524D\u81C2\u6401\u5728\u684C\u6CBF\u6216\u5927\u817F\u4E0A\uFF0C\u624B\u60AC\u7A7A\u63E1\u4E2A\u8F7B\u4E1C\u897F\uFF0C\u624B\u8155\u6162\u6162\u5F80\u4E0A\u62AC\u518D\u653E\u4E0B\u3002",
    dose: "15 \u6B21 \xD7 2 \u7EC4",
    why: '\u7F51\u7403\u8098\u4E4B\u7C7B\u7684\u5E38\u89C1\u95EE\u9898\u7684\u65B9\u5411\u662F"\u4F38\u808C\u504F\u5F31"\uFF0C\u4E0D\u662F\u4E00\u5473\u6309\u63C9\u3002',
    caution: "\u91CD\u91CF\u4E00\u5B9A\u8981\u8F7B\uFF0C\u8FD9\u662F\u8010\u529B\u6D3B\u4E0D\u662F\u529B\u91CF\u6D3B"
  },
  {
    id: "arm_plateau",
    name: "\u624B\u8098\u627E\u652F\u6491 + \u5927\u5E45\u6D3B\u52A8",
    forState: "both",
    muscles: ["biceps_brachii", "triceps_brachii"],
    regions: ["arm"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "none",
    posture: "any",
    kind: "mobilize",
    howto: "\u5148\u628A\u624B\u8098\u843D\u5728\u684C\u9762\u6216\u6276\u624B\u4E0A\uFF08\u60AC\u7A7A\u65F6\u5927\u81C2\u8981\u4E00\u76F4\u4F7F\u52B2\uFF09\uFF0C\u518D\u505A\u4E0A\u81C2\u524D\u540E\u7ED5\u5708\u5404 10 \u5708\uFF0C\u6700\u540E\u5B8C\u6574\u4F38\u76F4\u8098\u518D\u5B8C\u5168\u5F2F\u66F2\u51E0\u6B21\u3002",
    dose: "\u5404 10 \u6B21\uFF0C\u968F\u65F6\u505A",
    why: '\u5F88\u591A\u4E0A\u81C2\u9178\u5176\u5B9E\u662F"\u60AC\u7A7A\u592A\u4E45"\uFF0C\u5148\u53BB\u6389\u8D1F\u8377\u518D\u8C08\u62C9\u4F38\u3002'
  },
  {
    id: "subscap_release",
    name: "\u6BDB\u5DFE\u80CC\u624B",
    forState: "tight",
    muscles: ["subscapularis", "pectoralis_major"],
    regions: ["upper_back"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "none",
    posture: "stand",
    kind: "release",
    howto: "\u53CC\u624B\u5728\u80CC\u540E\u6293\u4E00\u6761\u6BDB\u5DFE\uFF0C\u4E0A\u4FA7\u624B\u5728\u4E0A\u3001\u4E0B\u4FA7\u624B\u5728\u4E0B\uFF0C\u7528\u4E0A\u9762\u7684\u624B\u6162\u6162\u628A\u4E0B\u9762\u7684\u624B\u5F80\u4E0A\u62C9\uFF1B\u62C9\u5230\u6781\u9650\u505C\u4F4F\uFF0C\u518D\u6162\u6162\u6362\u8FB9\u3002",
    dose: "\u6BCF\u4FA7 30 \u79D2\uFF0C\u6BCF\u5929 1\u20132 \u6B21",
    why: "\u80A9\u80DB\u4E0B\u808C\u662F\u552F\u4E00\u7684\u5185\u65CB\u808C\uFF0C\u5B83\u4E00\u7F29\u77ED\u5C31\u5361\u4F4F\u62AC\u624B\u548C\u624B\u5F80\u540E\u80CC\u7684\u52A8\u4F5C\uFF0C\u9760\u8FD9\u6761\u6BDB\u5DFE\u80FD\u6E29\u548C\u5730\u62C9\u5F00\u3002",
    caution: "\u80A9\u8180\u524D\u9762\u75BC\u5C31\u522B\u5F80\u4E0A\u9876\uFF0C\u9000\u56DE\u8F7B\u677E\u7684\u5E45\u5EA6"
  },
  {
    id: "arch_towel",
    name: "\u6293\u6BDB\u5DFE\u63D0\u8DB3\u5F13",
    forState: "weak",
    muscles: ["tibialis_posterior"],
    regions: ["leg"],
    scenes: ["desk", "open", "bed"],
    gear: "none",
    posture: "sit",
    kind: "activate",
    howto: "\u5730\u4E0A\u653E\u6761\u6BDB\u5DFE\uFF0C\u811A\u8E29\u5728\u4E0A\u9762\uFF0C\u53EA\u7528\u811A\u8DBE\u53CD\u590D\u628A\u6BDB\u5DFE\u5F80\u56DE\u6293\u3001\u628A\u8DB3\u5F13\u62CE\u8D77\u6765\uFF08\u811A\u8DDF\u548C\u524D\u811A\u638C\u4E0D\u8981\u79BB\u5730\uFF09\u3002\u7AD9\u4E0D\u8D77\u6765\u5C31\u5750\u7740\u505A.",
    dose: "\u6BCF\u4FA7 20 \u6B21\uFF0C\u65E9\u665A\u5404\u4E00\u8F6E",
    why: "\u80EB\u9AA8\u540E\u808C\u4ECE\u5185\u4FA7\u515C\u4F4F\u8DB3\u5F13\uFF0C\u5B83\u4E00\u7D2F\u8DB3\u5F13\u5C31\u584C\uFF0C\u8D70\u591A\u4E86\u811A\u5E95\u5185\u4FA7\u4F1A\u9178\u3002\u8FD9\u4E2A\u52A8\u4F5C\u662F\u7EC3\u5B83\u7684\u6807\u51C6\u505A\u6CD5\u3002",
    caution: "\u662F\u5C0F\u5E45\u5EA6\u7CBE\u7EC6\u52A8\u4F5C\uFF0C\u522B\u7528\u5927\u817F\u548C\u811A\u8DBE\u53BB\u786C\u62FD"
  },
  {
    id: "lying_er",
    name: "\u8EBA\u7740\u7EC3\u80A9\u8896\uFF08\u5916\u65CB\uFF09",
    forState: "weak",
    muscles: ["supraspinatus", "infraspinatus", "teres_minor", "deltoid"],
    regions: ["upper_back"],
    scenes: ["bed", "open", "gym"],
    gear: "none",
    posture: "lie",
    kind: "activate",
    howto: "\u8EBA\u7740\u6216\u534A\u8EBA\uFF0C\u624B\u8098\u65C1\u8FB9\u57AB\u4E2A\u5C0F\u6BDB\u5DFE\u5377\u8BA9\u4E0A\u81C2\u79BB\u5F00\u8EAB\u4F53\u4E00\u70B9\uFF0C\u5C48\u8098 90 \u5EA6\uFF0C\u7528\u5C0F\u81C2\u50CF\u5F00\u95E8\u4E00\u6837\u5411\u5916\u8F6C\uFF0C\u518D\u6162\u6162\u653E\u56DE\u3002\u60F3\u52A0\u8D1F\u8377\u5C31\u624B\u91CC\u63E1\u74F6\u6C34\u3002",
    dose: "\u6BCF\u4FA7 15 \u6B21 \xD7 2 \u7EC4",
    why: '\u80A9\u8896\u662F\u80A9\u5173\u8282\u7684"\u5B89\u5168\u5E26"\uFF0C\u8EBA\u7740\u88C5\u4E5F\u80FD\u7EC3\u2014\u2014\u800C\u4E14\u8EBA\u59FF\u4E0B\u80A9\u8180\u4E0D\u5BB9\u6613\u8038\u8D77\u6765\u4EE3\u507F\uFF0C\u59FF\u52BF\u53CD\u800C\u66F4\u6807\u51C6\u3002',
    caution: "\u5E45\u5EA6\u522B\u8FFD\u6C42\u5927\uFF0C\u6162\u800C\u53EF\u63A7\u624D\u6709\u6548"
  },
  {
    id: "lying_scap",
    name: "\u8EBA\u7740\u627E\u56DE\u80A9\u80DB",
    forState: "both",
    muscles: ["serratus_anterior", "rhomboid", "trapezius_middle", "trapezius_lower"],
    regions: ["upper_back"],
    scenes: ["bed", "open"],
    gear: "none",
    posture: "lie",
    kind: "activate",
    howto: "\u5E73\u8EBA\u5C48\u819D\uFF0C\u53CC\u81C2\u653E\u8EAB\u4F53\u4E24\u4FA7\u3001\u638C\u5FC3\u671D\u4E0A\u3002\u547C\u6C14\u65F6\u8F7B\u8F7B\u628A\u80A9\u80DB\u9AA8\u5F80\u5E8A\u9762\u6C89\u4E0B\u53BB\uFF08\u4E0D\u662F\u5F80\u4E2D\u95F4\u5939\uFF09\uFF0C\u505C 3 \u79D2\u677E\u5F00\uFF0C\u611F\u89C9\u540E\u80CC\u5E73\u94FA\u5728\u88AB\u5B50\u4E0A\u3002",
    dose: "10 \u6B21 \xD7 2 \u7EC4",
    why: "\u62AC\u624B\u65F6\u8038\u80A9\u3001\u80A9\u80DB\u4E71\u8DD1\uFF0C\u6839\u5B50\u5728\u8FD9\u51E0\u5757\u7684\u63A7\u5236\u4E27\u5931\uFF1B\u8FD9\u4E2A\u52A8\u4F5C\u4E0D\u52A0\u8D1F\u8377\uFF0C\u4E13\u95E8\u627E\u611F\u89C9\u3002"
  },
  {
    id: "arm_rest",
    name: "\u628A\u624B\u81C2\u5F7B\u5E95\u644A\u5F00",
    forState: "both",
    muscles: ["biceps_brachii", "triceps_brachii", "brachioradialis", "forearm_flexors"],
    regions: ["arm"],
    scenes: ["bed"],
    gear: "none",
    posture: "lie",
    kind: "relax",
    howto: "\u8EBA\u597D\uFF0C\u624B\u81C2\u81EA\u7136\u644A\u5728\u8EAB\u4F53\u4E24\u4FA7\u3001\u638C\u5FC3\u671D\u4E0A\uFF0C\u4EC0\u4E48\u90FD\u4E0D\u505A\u3002\u524D\u81C2\u8FD8\u7D27\u7684\u8BDD\uFF0C\u7528\u53E6\u4E00\u53EA\u624B\u4ECE\u624B\u8155\u5F80\u624B\u8098\u65B9\u5411\u6162\u6162\u63A8\u6309\u4E00\u5206\u949F\u3002",
    dose: "5\u201310 \u5206\u949F",
    why: "\u624B\u81C2\u6301\u7EED\u53D1\u4E86\u4E00\u5929\u7684\u529B\uFF0C\u5F88\u591A\u65F6\u5019\u6700\u6709\u6548\u7684\u5E72\u9884\u5C31\u662F\u5F7B\u5E95\u505C\u6B62\u7528\u529B\u3002\u8FD9\u6BD4\u518D\u6309\u4E00\u904D\u6709\u7528\u3002"
  },
  {
    id: "bed_wrist",
    name: "\u8EBA\u7740\u624B\u8155\u4F38\u5C55",
    forState: "weak",
    muscles: ["forearm_extensors", "triceps_brachii"],
    regions: ["arm"],
    scenes: ["bed", "desk"],
    gear: "none",
    posture: "lie",
    kind: "activate",
    howto: "\u624B\u81C2\u4F38\u76F4\u653E\u5728\u5E8A\u4E0A\uFF0C\u638C\u5FC3\u671D\u4E0B\u3001\u624B\u60AC\u5728\u5E8A\u6CBF\u5916\uFF0C\u6162\u6162\u628A\u624B\u80CC\u5F80\u56DE\u62AC\u5230\u6700\u5927\u518D\u653E\u4E0B\uFF1B\u7528\u53E6\u4E00\u53EA\u624B\u642D\u7740\u7ED9\u4E00\u70B9\u8F7B\u5FAE\u963B\u529B\u4F1A\u66F4\u6709\u6548\u3002",
    dose: "15 \u6B21 \xD7 2 \u7EC4",
    why: '\u7F51\u7403\u8098\u90A3\u4E00\u7C7B\u95EE\u9898\u7684\u65B9\u5411\u662F"\u4F38\u808C\u504F\u5F31\u9700\u8981\u7EC3"\uFF0C\u4E0D\u662F\u4E00\u5473\u6309\u63C9\uFF1B\u8EBA\u7740\u505A\u6700\u4E0D\u8D39\u529B\u3002'
  },
  {
    id: "sit_core",
    name: "\u5750\u7740\u6536\u6838\u5FC3\uFF08\u522B\u4EBA\u770B\u4E0D\u51FA\u6765\uFF09",
    forState: "weak",
    muscles: ["transversus_abdominis", "rectus_abdominis", "obliquus_internus", "obliquus_externus", "multifidus"],
    regions: ["low_back_hip"],
    scenes: ["desk", "open", "bed"],
    gear: "none",
    posture: "sit",
    kind: "activate",
    howto: "\u5750\u76F4\uFF0C\u624B\u6307\u6309\u5728\u808B\u9AA8\u4E0B\u7F18\u3002\u547C\u6C14\u65F6\u8F7B\u8F7B\u628A\u8170\u5F80\u6905\u80CC\u65B9\u5411\u6536\uFF08\u4E0D\u662F\u618B\u6C14\u731B\u5438\u809A\u5B50\uFF09\uFF0C\u4FDD\u6301\u547C\u5438\u987A\u7545\uFF0C\u505C 10 \u79D2\u653E\u677E\u3002\u5730\u94C1\u4E0A\u7AD9\u7740\u4E5F\u80FD\u505A\u3002",
    dose: "10 \u6B21",
    why: "\u8179\u6A2A\u808C\u662F\u5929\u7136\u8170\u5E26\uFF0C\u5B83\u4E00\u5DE5\u4F5C\u8170\u5C31\u6709\u4EBA\u515C\u7740\uFF1B\u8FD9\u662F\u552F\u4E00\u4E00\u6574\u5929\u90FD\u80FD\u7EC3\u7684\u52A8\u4F5C\u3002",
    caution: "\u809A\u5B50\u9F13\u51FA\u6765\u6216\u8005\u618B\u6C14\u4E86\u5C31\u662F\u505A\u9519"
  },
  {
    id: "sit_glute",
    name: "\u5750\u59FF\u5939\u81C0",
    forState: "weak",
    muscles: ["gluteus_maximus", "piriformis"],
    regions: ["low_back_hip", "leg"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "sit",
    kind: "activate",
    howto: "\u5750\u76F4\uFF0C\u4E00\u6B21\u6536\u7D27\u4E00\u4FA7\u5C41\u80A1\u5230\u6700\u7D27\uFF0C\u505C 5 \u79D2\u653E\u677E\uFF0C\u518D\u6362\u53E6\u4E00\u4FA7\u3002\u6CA1\u6709\u4EBA\u770B\u5F97\u51FA\u6765\u3002\u80FD\u7AD9\u8D77\u6765\u5C31\u8D70\u4E24\u5206\u949F\uFF0C\u6548\u679C\u6BD4\u8FD9\u66F4\u597D\u3002",
    dose: "\u6BCF\u4FA7 10 \u6B21",
    why: '\u5750\u4E00\u6574\u5929\u5C41\u80A1\u4F1A"\u5FD8\u4E86\u600E\u4E48\u7528\u529B"\uFF0C\u8FD9\u4E2A\u52A8\u4F5C\u662F\u628A\u5B83\u91CD\u65B0\u53EB\u9192\uFF0C\u8BA9\u5B83\u5728\u9700\u8981\u7684\u65F6\u5019\u80FD\u9876\u4E0A\u53BB\u3002',
    caution: "\u522B\u4E24\u8FB9\u540C\u65F6\u6536\uFF0C\u90A3\u6837\u7EC3\u4E0D\u5230\u7A7F\u900F\u529B"
  },
  {
    id: "desk_lumbar",
    name: "\u7AD9\u8D77\u540E\u4EF0 + \u8170\u90E8\u6709\u652F\u6491",
    forState: "tight",
    muscles: ["erector_spinae", "quadratus_lumborum"],
    regions: ["low_back_hip"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "stand",
    kind: "release",
    howto: "\u7AD9\u8D77\u6765\uFF0C\u53CC\u624B\u6258\u4F4F\u540E\u8170\uFF0C\u6162\u6162\u5F80\u540E\u4EF0\u5230\u6709\u7275\u62C9\u611F\u505C 3 \u79D2\uFF0C\u505A 5 \u6B21\u3002\u5750\u4E0B\u540E\u628A\u5916\u5957\u6216\u9760\u57AB\u5377\u8D77\u6765\u57AB\u5728\u8170\u540E\uFF0C\u8BA9\u8170\u59CB\u7EC8\u6709\u652F\u6491\u3002",
    dose: "5 \u6B21 + \u4E00\u6B21\u8C03\u6574\u5EA7\u6905",
    why: "\u4E45\u5750\u65F6\u8170\u690E\u4E00\u76F4\u88AB\u538B\u7740\uFF0C\u7AD9\u8D77\u6765\u5F80\u540E\u4EF0\u662F\u7ED9\u5B83\u5378\u538B\u6700\u76F4\u63A5\u7684\u52A8\u4F5C\uFF1B\u5F88\u591A\u4EBA\u5176\u5B9E\u662F\u6905\u5B50\u4E0D\u5BF9\uFF0C\u4E0D\u662F\u8EAB\u4F53\u4E0D\u5BF9\u3002"
  },
  {
    id: "sit_hip_open",
    name: "\u5750\u7740\u5F00\u9ACB",
    forState: "tight",
    muscles: ["iliopsoas", "piriformis", "hip_adductors"],
    regions: ["low_back_hip", "leg"],
    scenes: ["desk"],
    gear: "none",
    posture: "sit",
    kind: "release",
    howto: "\u5750\u7740\u628A\u4E00\u4FA7\u811A\u8E1D\u642D\u5230\u53E6\u4E00\u4FA7\u819D\u76D6\u4E0A\uFF08\u50CF\u7FD8\u4E8C\u90CE\u817F\u4F46\u811A\u8E1D\u642D\u4E0A\u53BB\uFF09\uFF0C\u8EAB\u4F53\u5FAE\u5FAE\u524D\u503E\u76F4\u5230\u8179\u80A1\u6C9F\u6709\u7275\u62C9\u611F\uFF0C\u4E24\u8FB9\u5404\u505A\u4E00\u904D\u3002",
    dose: "\u6BCF\u4FA7 30 \u79D2",
    why: "\u4E45\u5750\u8BA9\u9ACB\u524D\u4FA7\u548C\u6DF1\u5C42\u4E00\u76F4\u7F29\u7740\uFF0C\u8FD9\u662F\u552F\u4E00\u4E00\u4E2A\u7A7F\u7740\u5DE5\u88C5\u4E5F\u80FD\u505A\u7684\u7248\u672C\u3002",
    caution: "\u522B\u7528\u624B\u628A\u819D\u76D6\u5F80\u4E0B\u786C\u538B"
  },
  {
    id: "neck_isometric",
    name: "\u9888\u90E8\u6297\u963B\uFF08\u624B\u638C\u9876\u989D\u5934\uFF09",
    forState: "weak",
    muscles: ["deep_neck_flexor", "splenius_capitis"],
    regions: ["neck_shoulder"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "none",
    posture: "any",
    kind: "activate",
    howto: "\u624B\u638C\u8D34\u5728\u989D\u5934\uFF08\u6216\u540E\u8111\u3001\u4FA7\u5934\uFF09\uFF0C\u5934\u5F80\u90A3\u4E2A\u65B9\u5411\u7528\u529B\uFF0C\u4F46\u624B\u9876\u4F4F\u4E0D\u8BA9\u5934\u771F\u7684\u52A8\uFF0C\u50F5\u6301 5 \u79D2\u653E\u677E\u3002\u524D\u3001\u540E\u3001\u5DE6\u3001\u53F3\u56DB\u4E2A\u65B9\u5411\u5404\u505A\u4E00\u904D\u3002",
    dose: "\u6BCF\u65B9\u5411 5 \u6B21 \xD7 5 \u79D2",
    why: "\u7B49\u957F\u6536\u7F29\u5BF9\u8116\u5B50\u6700\u5B89\u5168\uFF1A\u5934\u51E0\u4E4E\u4E0D\u52A8\uFF0C\u5374\u80FD\u628A\u957F\u671F\u4F4E\u5934\u5E9F\u6389\u7684\u6DF1\u5C42\u9888\u5C48\u808C\u91CD\u65B0\u7EC3\u8D77\u6765\u3002",
    caution: '\u91CD\u70B9\u662F"\u8F83\u52B2"\u4E0D\u662F"\u63A8\u52A8"\uFF0C\u51FA\u73B0\u5934\u6655\u5C31\u505C\u4E0B'
  },
  {
    id: "band_pushdown",
    name: "\u5F39\u529B\u5E26\u4E0B\u538B",
    forState: "weak",
    muscles: ["triceps_brachii"],
    regions: ["arm"],
    scenes: ["gym", "open"],
    gear: "band",
    posture: "stand",
    kind: "activate",
    howto: "\u5F39\u529B\u5E26\u56FA\u5B9A\u5728\u9AD8\u5904\uFF0C\u624B\u8098\u5939\u5728\u8EAB\u4F53\u4E24\u4FA7\uFF0C\u53EA\u628A\u524D\u81C2\u5F80\u4E0B\u538B\u76F4\u5230\u624B\u81C2\u5B8C\u5168\u4F38\u76F4\uFF0C\u518D\u6162\u6162\u653E\u56DE\u3002",
    dose: "15 \u6B21 \xD7 3 \u7EC4",
    why: "\u8098\u4F38\u808C\u5F31\u4E86\u624B\u4F1A\u6491\u4E0D\u4F4F\u3001\u80F3\u818A\u53D1\u4E0D\u4E0A\u52B2\uFF1B\u8FD9\u4E2A\u52A8\u4F5C\u662F\u7EC3\u5B83\u6700\u4E0D\u5BB9\u6613\u505A\u9519\u7684\u65B9\u5F0F\u3002",
    caution: "\u5927\u81C2\u522B\u5F80\u5916\u5F20\uFF0C\u4E5F\u522B\u8038\u80A9\u4EE3\u507F"
  },
  // ══════════════ 当下即做补充：坐姿/原地站姿（排除躺/床场景）══════════════
  {
    id: "subocc_nod_sit",
    name: "坐姿点头松后脑",
    forState: "tight",
    muscles: ["suboccipital"],
    regions: ["neck_shoulder"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "sit",
    kind: "stretch",
    howto: "坐直，双手十指交叉轻轻放在后脑勺上。收住下巴，让头慢慢往前下方点，感觉后脑勺和脖子交界处被轻轻拉长，停住呼吸几次再回正。",
    dose: "30 秒 × 2",
    why: "低头时最先累的就是后脑勺下方这群深层小肌肉，坐姿轻点头的牵拉方向和它平时的发力最接近。",
    caution: "动作要慢，出现头晕就停下来"
  },
  {
    id: "standing_figure4",
    name: "站姿扶桌4字拉伸",
    forState: "tight",
    muscles: ["gluteus_medius", "piriformis"],
    regions: ["low_back_hip"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "stand",
    kind: "stretch",
    howto: "面对桌子或椅背站好，双手扶稳。把一侧脚踝搭到另一条腿的膝盖上方，摆成数字4的形状，身体慢慢往下坐一点，感觉臀部外侧偏上被拉开就停住。",
    dose: "每侧 30 秒 × 2",
    why: "和躺着做的4字是同一个拉伸方向，但扶着桌子就能做，适合随时松一下臀外侧。",
    caution: "扶稳再做，膝盖别往内扣"
  },
  {
    id: "standing_tfl_stretch",
    name: "站姿交叉腿侧伸展",
    forState: "tight",
    muscles: ["tensor_fasciae_latae"],
    regions: ["leg"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "stand",
    kind: "stretch",
    howto: "站直，把要拉的那侧腿交叉到另一条腿的后方。身体慢慢向另一侧弯，同侧手可以向上伸过头顶，感觉髋外侧到大腿外侧一条线被拉开。",
    dose: "每侧 30 秒 × 2",
    why: "阔筋膜张肌连着髂胫束，站姿侧弯顺着这条线一起拉开，不用躺到地上也能做。",
    caution: "侧弯时骨盆别往前顶，身体保持在一个平面上"
  },
  {
    id: "standing_sartorius_stretch",
    name: "站姿后腿内收伸展",
    forState: "tight",
    muscles: ["sartorius"],
    regions: ["leg"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "stand",
    kind: "stretch",
    howto: "手扶椅背站好，一侧腿向后伸直，脚尖朝正前方，腿轻轻往身体中线靠。骨盆保持朝前，慢慢把髋往前送，感觉大腿前上方靠内侧被拉开。",
    dose: "每侧 30 秒 × 2",
    why: "缝匠肌从髋前外侧斜着走到膝盖内侧，只有后伸加内收这个组合才真正拉得到它。",
    caution: "髋往前送的幅度小一点，腰别往前塌"
  },
  {
    id: "rhomboid_stretch_sit",
    name: "坐姿含胸推掌",
    forState: "tight",
    muscles: ["rhomboid"],
    regions: ["upper_back"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "sit",
    kind: "stretch",
    howto: "坐直，双手在身前十指交叉，掌心朝前慢慢推出去，同时含胸、拱背、收下巴，感觉两块肩胛骨之间被拉开，停住呼吸几次。",
    dose: "30 秒 × 2",
    why: "菱形肌夹在两块肩胛骨中间，只有让肩胛骨充分分开才拉得到它，坐姿推掌在办公室就能完成。",
    caution: "是拱背不是弯腰，腰保持中立"
  },
  {
    id: "seated_rotation",
    name: "坐姿扶椅转体",
    forState: "tight",
    muscles: ["multifidus"],
    regions: ["low_back_hip"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "sit",
    kind: "stretch",
    howto: "坐在椅子前缘，双脚踩实。身体慢慢转向一侧，同侧手扶住椅背轻轻加深一点旋转，感觉腰背深层被牵拉，停住呼吸几次再换边。",
    dose: "每侧 30 秒 × 2",
    why: "多裂肌是脊柱两侧负责旋转稳定的深层肌肉，坐姿转体是它最温和的牵拉方式。",
    caution: "转体幅度以舒服为限，不要追求响声"
  },
  // ═══════ docs/13 目录式诊断新增动作（按症状场景补位） ═══════
  {
    id: "sit_pec_er_stretch",
    name: "坐姿肩前侧牵伸",
    forState: "tight",
    muscles: ["pectoralis_major", "subscapularis"],
    regions: ["upper_back"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "sit",
    kind: "stretch",
    howto: "坐稳，双手放在身后椅背或桌面上，吸气挺胸、肩膀向后向下展开，感觉胸口和肩膀前侧被拉开，保持自然呼吸。",
    dose: "20–30 秒 × 2",
    why: "胸肌和肩胛下肌短缩会把肩膀往前拉、把肱骨头往前顶，这个动作在工位上就能把肩前侧打开。",
    caution: "不要挺腰代偿，拉伸感在胸前和肩前即可"
  },
  {
    id: "sit_thoracic_ext",
    name: "坐姿抱头胸椎伸展",
    forState: "weak",
    muscles: ["erector_spinae"],
    regions: ["upper_back", "low_back_hip"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "sit",
    kind: "activate",
    howto: "坐直双脚踩实，双手十指交叉抱在头后。吸气时胸椎向后上方轻轻挺起、双肘向外展开，呼气回到中立，动作只发生在上背，不塌腰。",
    dose: "10 次 × 2 组",
    why: "长期含胸让胸段竖脊肌长期被拉长无力，这个动作帮助胸椎重新学会伸展。",
    caution: "是上背后仰，不是折腰；头晕就减小幅度"
  },
  {
    id: "stand_glute_kick",
    name: "站姿扶椅后踢腿",
    forState: "weak",
    muscles: ["gluteus_maximus"],
    regions: ["low_back_hip"],
    scenes: ["open", "desk"],
    gear: "none",
    posture: "stand",
    kind: "activate",
    howto: "双手扶住椅背站稳，一条腿慢慢向后伸到臀部收紧，在末端夹紧 2 秒，再缓慢收回。骨盆保持朝前不晃。",
    dose: "每侧 12 次 × 2 组",
    why: "久坐会让臀大肌被神经抑制『忘记发力』，后踢腿能孤立唤醒它，把活从腰和大腿后侧手里接回来。",
    caution: "腿不用抬很高，关键是臀部先发力而不是塌腰"
  },
  {
    id: "stand_abd_leg",
    name: "站姿侧抬腿",
    forState: "weak",
    muscles: ["gluteus_medius"],
    regions: ["low_back_hip", "leg"],
    scenes: ["open", "desk"],
    gear: "none",
    posture: "stand",
    kind: "activate",
    howto: "扶椅背站稳，一条腿向侧方缓慢抬起约 30 度，脚尖朝前、骨盆不歪，停 1 秒后缓慢放下。",
    dose: "每侧 12 次 × 2 组",
    why: "臀中肌负责走路单腿站立时稳住骨盆，它无力时腰方肌和膝盖就得代偿，侧抬腿是它最直接的强化动作。",
    caution: "身体不要向对侧倾斜借力"
  },
  {
    id: "sit_ql_sidebend",
    name: "坐姿侧向伸展",
    forState: "tight",
    muscles: ["quadratus_lumborum"],
    regions: ["low_back_hip"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "sit",
    kind: "stretch",
    howto: "坐稳在椅面，双脚踩实分开与髋同宽。一手向上伸直，身体缓慢向对侧侧屈，感觉腰侧被拉开，保持呼吸后换边。",
    dose: "每侧 20–30 秒 × 2",
    why: "跷二郎腿和单侧负重让一侧腰方肌长期短缩，坐姿侧屈能直接拉开它。",
    caution: "侧屈而不是前扑，两侧都要拉，紧的一侧可多停 10 秒"
  },
  {
    id: "sit_calf_towel",
    name: "坐姿毛巾拉小腿",
    forState: "tight",
    muscles: ["gastrocnemius", "soleus"],
    regions: ["leg"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "sit",
    kind: "stretch",
    howto: "坐在地上或椅边，一条腿向前伸，毛巾绕在前脚掌两端，双手把毛巾向身体方向轻拉，脚尖回勾、膝盖尽量伸直，感觉小腿后侧拉开。",
    dose: "每侧 20–30 秒 × 2",
    why: "久坐和穿鞋让小腿后侧肌群适应短缩，脚踝活动度变小，拉松它下蹲时脚跟才能踩实。",
    caution: "腰背保持挺直，从髋关节向前而不是弓背"
  },
  {
    id: "sit_chair_dip",
    name: "椅子撑体",
    forState: "weak",
    muscles: ["triceps_brachii"],
    regions: ["arm"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "sit",
    kind: "activate",
    howto: "双手撑在稳固的椅面两侧边缘，臀部前移离开椅子，屈肘让身体缓慢下沉，再用手臂后侧发力把自己撑起。",
    dose: "8–10 次 × 2 组",
    why: "长期屈肘操作让手臂后侧的肱三头肌无力，撑体可以在工位上直接强化它。",
    caution: "椅子必须稳固不会滑动；肩部不适就停止"
  },
  {
    // docs/13 修订新增：补探颈「站姿·放松」格
    id: "stand_neck_side_stretch",
    name: "站姿颈侧牵伸",
    forState: "tight",
    muscles: ["levator_scapulae", "trapezius_upper", "sternocleidomastoid"],
    regions: ["neck_shoulder"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "stand",
    kind: "stretch",
    howto: "站直，双脚与肩同宽。一手绕过头顶轻放在对侧耳朵上方，把耳朵向同侧肩膀带，下巴微收不要耸肩，对侧肩膀主动下沉，感觉脖子侧面到肩顶一条被拉开。想多带到肩胛提肌，就先低头看向对侧口袋方向再牵。",
    dose: "每侧 20–30 秒 × 2",
    why: "探头姿势下颈侧的肩胛提肌和上斜方肌一直缩短吊着脖子，站着把它拉开，肩颈的紧和坠痛感会松。",
    caution: "手只是轻轻带方向，绝不用力压脖子；出现手麻头晕立刻停"
  },
  {
    // docs/13 修订新增：补肘伸不直「放松」格（坐/站皆可，允许跨板块）
    id: "biceps_wall_stretch",
    name: "墙面伸肘牵上臂",
    forState: "tight",
    muscles: ["biceps_brachii"],
    regions: ["arm"],
    scenes: ["desk", "open"],
    gear: "wall",
    posture: "any",
    kind: "stretch",
    howto: "侧身站在墙边或桌旁，手臂伸直、掌心向上，把手背或前臂后侧轻轻搭在墙面/桌面上，身体缓慢向反方向转开，肘尽量保持伸直，感觉上臂前侧被拉开。坐着时也可以扶桌面做同样的转开。",
    dose: "每侧 20–30 秒 × 2",
    why: "长期屈肘让肱二头肌适应了短缩长度，拉开它肘关节才有空间完全伸直。",
    caution: "肩前侧有刺痛就减小幅度，不要硬压"
  },
  {
    // docs/13 修订新增：补圆背「站姿·强化」格
    id: "stand_thoracic_ext",
    name: "站姿抱头后仰",
    forState: "weak",
    muscles: ["erector_spinae"],
    regions: ["low_back_hip"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "stand",
    kind: "activate",
    howto: "站直，双脚与肩同宽，双手交叉抱在脑后。吸气时手肘向后打开、上背慢慢向后仰，想像把胸口朝天花板顶起，动作只发生在上背而不是塌腰；呼气回正。",
    dose: "10 次 × 2 组",
    why: "圆背的人胸段竖脊肌无力撑不住脊柱，站姿后仰能在工位上把这段深层伸肌唤醒。",
    caution: "在无痛范围内进行，腰本身有刺痛或麻木就停止"
  },
  {
    // docs/13 修订新增：补膝盖打软「站姿·放松」格
    id: "stand_ham_stretch",
    name: "站姿架脚够脚尖",
    forState: "tight",
    muscles: ["hamstrings"],
    regions: ["leg"],
    scenes: ["desk", "open"],
    gear: "none",
    posture: "stand",
    kind: "stretch",
    howto: "把一条腿架在矮台阶或稳固的椅子横杠上，膝盖伸直但不锁死，脚尖回勾。保持腰背挺直，从髋关节向前折，感觉大腿后侧一条拉开，保持呼吸。",
    dose: "每侧 20–30 秒 × 2",
    why: "腘绳肌紧张会拉着膝关节伸不直，膝盖发力时容易打软，站着直接牵伸它最方便。",
    caution: "从髋部折叠不要弓背；架高点必须稳固"
  }
];
var KIND_PRIORITY = {
  tight: ["release", "stretch", "mobilize", "relax", "activate"],
  weak: ["activate", "mobilize", "stretch", "release", "relax"]
};
function pickActions(q, n = 3) {
  const pri = KIND_PRIORITY[q.state];
  const scored = ACTIONS.filter((a) => a.scenes.includes(q.scene)).filter((a) => a.forState === q.state || a.forState === "both").filter((a) => {
    const avoid = q.avoidIds ?? [];
    if (!avoid.length || !a.muscles.length) return true;
    return a.muscles.some((id) => !avoid.includes(id));
  }).map((a) => {
    let score = 0;
    const hitMuscle = a.muscles.filter((id) => q.muscleIds.includes(id)).length;
    const hitRegion = a.regions.filter((r) => q.regions.includes(r)).length;
    score += hitMuscle * 6;
    score += hitRegion * 2;
    score += (pri.length - pri.indexOf(a.kind)) * 0.6;
    return { a, score, hitMuscle, hitRegion };
  }).filter((x) => x.hitMuscle > 0 || x.hitRegion > 0).sort((x, y) => y.score - x.score);
  const out = [];
  const usedKind = /* @__PURE__ */ new Set();
  const take = (list, byKind) => {
    for (const x of list) {
      if (out.length >= n) break;
      if (out.includes(x.a)) continue;
      if (byKind && usedKind.has(x.a.kind)) continue;
      out.push(x.a);
      usedKind.add(x.a.kind);
    }
  };
  const hitList = scored.filter((x) => x.hitMuscle > 0);
  const looseList = scored.filter((x) => x.hitMuscle === 0);
  take(hitList, true);
  take(hitList, false);
  take(looseList, true);
  if (out.length < n) {
    const rest = ACTIONS.filter((a) => a.scenes.includes(q.scene) && !out.includes(a)).filter((a) => a.forState === q.state || a.forState === "both").filter((a) => {
      const avoid = q.avoidIds ?? [];
      if (!avoid.length || !a.muscles.length) return true;
      return a.muscles.some((id) => !avoid.includes(id));
    }).sort((a, b) => pri.indexOf(a.kind) - pri.indexOf(b.kind));
    for (const a of rest) {
      if (out.length >= n) break;
      out.push(a);
    }
  }
  return out.slice(0, n);
}
var REGION_LABEL2 = {
  neck_shoulder: "\u9888\u80A9\u4E00\u7247",
  upper_back: "\u80A9\u80CC\u4E00\u7247",
  low_back_hip: "\u8170\u9ACB\u4E00\u7247",
  leg: "\u817F\u4E0A\u4E00\u7247",
  arm: "\u624B\u81C2\u4E00\u7247"
};
function actionTargetLabel(a, lib, diagIds) {
  const hit = a.muscles.filter((id) => diagIds.includes(id)).map((id) => lib.find((m) => m.id === id)?.name).filter(Boolean);
  if (hit.length) return { text: `\u9488\u5BF9\uFF1A${hit.join("\u3001")}`, exact: true };
  const regions = a.regions.map((r) => REGION_LABEL2[r]).filter(Boolean);
  return { text: `\u76F8\u5173\u90E8\u4F4D\uFF1A${regions.length ? regions.join("\u3001") : "\u6574\u4F53"}`, exact: false };
}
function actionTargetName(a, lib) {
  const hit = a.muscles.map((id) => lib.find((m) => m.id === id)?.name).filter(Boolean);
  return hit.length ? hit.join("\u3001") : a.name;
}
export {
  ACTIONS,
  BODY_SLOTS,
  BOOK_REF,
  DEMO_PATTERN_IDS,
  DIAGNOSIS_DISCLAIMER,
  FRAMEWORKS,
  KIND_LABEL,
  MUSCLES,
  MUSCLE_IDS,
  MUSCLE_MAP,
  MUSCLE_SLOT_MAP,
  PATTERNS,
  RED_FLAGS,
  REGIONS4,
  REGION_CANDIDATES,
  REGION_LABEL,
  REGION_PAINT,
  SCENE_HINT,
  SCENE_LABEL,
  SLOT_RECTS,
  SYMPTOMS,
  SYMPTOM_ACTIONS,
  SYMPTOM_ADVICE,
  SYMPTOM_BY_ID,
  actionPackageFor,
  actionTargetLabel,
  actionTargetName,
  analyzeBySlots,
  analyzeReports,
  buildExplainCard,
  buildExplanation,
  buildSystemPrompt,
  dedupeConflict,
  filterByLibrary,
  getSide,
  hitRedFlag,
  matchPatterns,
  matchPatternsBySense,
  parseLocal,
  pickActions,
  refinePatterns,
  resolveSlot,
  symptomUnion
};
