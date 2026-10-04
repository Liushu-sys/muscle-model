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
    alias: ["\u80A1\u76F4\u808C", "\u80A1\u5185\u4FA7\u808C", "\u80A1\u5916\u4FA7\u808C"],
    region: "leg",
    type: "weak",
    side: "front",
    x: 40,
    y: 63,
    desc: "\u5927\u817F\u524D\u9762\uFF0C\u8D1F\u8D23\u4F38\u76F4\u819D\u76D6\uFF0C\u5F31\u4E86\u819D\u76D6\u4F1A\u53D1\u8F6F",
    senses: ["\u819D\u76D6\u53D1\u8F6F", "\u4E0B\u697C\u68AF\u6253\u8F6F\u817F", "\u819D\u76D6\u524D\u9762\u75BC"],
    bookPage: 316
    // 「伸膝肌减弱：股四头肌的四块肌肉」
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
    tight: ["iliopsoas", "quadriceps", "erector_spinae"],
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
    name: "\u52FE\u811A / \u811A\u8DDF\u8D70\u8DEF",
    forState: "weak",
    muscles: ["tibialis_anterior"],
    regions: ["leg"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "none",
    posture: "sit",
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
    name: "\u8155\u4F38\u5C55\uFF08\u8F7B\u91CD\u91CF\uFF09",
    forState: "weak",
    muscles: ["forearm_extensors"],
    regions: ["arm"],
    scenes: ["desk", "gym", "open", "bed"],
    gear: "band",
    posture: "sit",
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
  DEMO_PATTERN_IDS,
  KIND_LABEL,
  MUSCLES,
  MUSCLE_IDS,
  MUSCLE_MAP,
  PATTERNS,
  RED_FLAGS,
  REGION_LABEL,
  SCENE_HINT,
  SCENE_LABEL,
  actionTargetLabel,
  actionTargetName,
  buildExplainCard,
  buildExplanation,
  buildSystemPrompt,
  dedupeConflict,
  filterByLibrary,
  hitRedFlag,
  matchPatterns,
  matchPatternsBySense,
  parseLocal,
  pickActions,
  refinePatterns
};
