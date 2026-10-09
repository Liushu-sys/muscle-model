// meridian-data.js —— 十二经脉（正面简化示意线）+ 常用穴位数据
// 坐标体系与 body_preview.html 主 SVG 一致：viewBox 0 0 200 460，正中线 x=100。
// 数据按右侧半身标定，渲染时通过 transform="translate(200,0) scale(-1,1)" 镜像到左侧。
// 说明：经脉线为简化示意（走向正确，不逐穴位精确）；穴位坐标为视觉近似。

/* ════════ 一、十二经脉（正面） ════════ */
// group: 手三阴（胸→手）/ 手三阳（手→头）/ 足三阳（头→足）/ 足三阴（足→腹）
export var MERIDIANS = [
  {
    id: 'lu', num: 1, name: '手太阴肺经', short: '肺经',
    group: '手三阴', dir: '胸 → 手', color: '#6FA860',
    runs: '起于中府（锁骨下外侧），沿上臂内侧前缘、前臂内侧下行，经寸口止于拇指桡侧端。',
    regions: ['neck_shoulder', 'arm'],
    d: 'M108,88 C118,94 128,98 133,104 C137,116 137,128 138,140 C139,150 139,160 139,168 C139,182 141,196 143,206 C142,216 139,222 138,228 C139,236 141,244 143,250'
  },
  {
    id: 'li', num: 2, name: '手阳明大肠经', short: '大肠经',
    group: '手三阳', dir: '手 → 头', color: '#E09A3C',
    runs: '起于食指桡侧端，沿前臂外侧、上臂外侧前缘上行，经肩、锁骨上窝入胸腔；一支上颈、贯颊，止于鼻翼两旁。',
    regions: ['neck_shoulder', 'arm'],
    d: 'M146,252 C147,244 148,235 148,228 C152,214 156,204 158,194 C158,184 154,172 150,164 C146,146 144,128 142,112 C140,98 136,88 130,82 C122,76 114,74 110,72 C109,62 108,50 106,40 C105,37 104,36 104,36'
  },
  {
    id: 'st', num: 3, name: '足阳明胃经', short: '胃经',
    group: '足三阳', dir: '头 → 足', color: '#D9B93C',
    runs: '起于鼻旁，下行经颈、锁骨中点，沿乳中线过胸腹正中旁，经腹股沟沿大腿前侧、小腿外侧下行，止于第二趾外侧。',
    regions: ['neck_shoulder', 'low_back_hip', 'leg'],
    d: 'M107,27 C107,36 107,44 107,52 C107,58 107,62 106,66 C105,72 104,76 104,80 C107,92 112,100 116,108 C118,122 118,140 117,158 C116,180 114,200 112,216 C112,232 114,248 115,262 C116,290 115,314 114,336 C115,356 116,376 116,392 C114,408 112,424 111,438 C111,444 111,448 110,451'
  },
  {
    id: 'sp', num: 4, name: '足太阴脾经', short: '脾经',
    group: '足三阴', dir: '足 → 腹', color: '#9A6FB0',
    runs: '起于大趾内侧，沿内踝前、小腿内侧、大腿内侧上行，入腹股沟，再沿腹部旁开上行，止于腋下大包。',
    regions: ['low_back_hip', 'leg'],
    d: 'M105,449 C106,443 107,437 108,432 C110,418 110,404 110,390 C110,372 111,352 111,336 C110,318 109,300 108,284 C107,264 106,244 105,226 C105,212 106,198 108,188 C110,172 112,154 113,140 C114,124 113,110 112,100'
  },
  {
    id: 'ht', num: 5, name: '手少阴心经', short: '心经',
    group: '手三阴', dir: '胸 → 手', color: '#D9728E',
    runs: '起于心中，出属心系，从腋下极泉沿上臂内侧后缘、前臂内侧尺侧下行，止于小指桡侧端。',
    regions: ['arm'],
    d: 'M127,112 C130,120 132,130 133,140 C133,150 133,160 134,166 C134,180 135,194 136,204 C135,214 133,222 131,228 C132,238 133,246 134,252'
  },
  {
    id: 'si', num: 6, name: '手太阳小肠经', short: '小肠经',
    group: '手三阳', dir: '手 → 头', color: '#CE5B50',
    runs: '起于小指尺侧端，沿前臂尺侧、上臂外侧后缘上行，绕肩胛、过肩上，入缺盆；一支上颊，止于颧骨。',
    regions: ['neck_shoulder', 'arm'],
    d: 'M135,254 C141,244 148,238 154,231 C158,222 159,210 158,200 C157,188 156,172 155,160 C153,142 150,126 146,112 C142,98 137,88 131,84 C123,78 115,72 111,64 C112,56 113,44 113,34'
  },
  {
    id: 'bl', num: 7, name: '足太阳膀胱经', short: '膀胱经',
    group: '足三阳', dir: '头 → 足', color: '#5585C2',
    runs: '起于内眼角，上头顶、下后项，沿脊柱两侧下行过腰臀；下肢段沿大腿后侧、腘窝、小腿后侧下行，止于小趾外侧。正面示意：背部段走背面视图，此处画下肢与头部段。',
    regions: ['neck_shoulder', 'upper_back', 'leg'],
    d: 'M101,10 C105,15 109,20 112,26 C113,36 114,48 113,58 C114,74 116,96 116,120 C117,146 117,170 117,192 C118,210 118,220 116,230 C116,252 115,274 114,292 C114,310 114,326 113,340 C113,360 113,378 112,394 C111,412 108,428 105,440 C104,444 104,447 104,449'
  },
  {
    id: 'ki', num: 8, name: '足少阴肾经', short: '肾经',
    group: '足三阴', dir: '足 → 腹', color: '#466BB0',
    runs: '起于足心涌泉，沿内踝后、小腿内侧后缘、大腿内侧后缘上行，入腹股沟，沿腹部正中旁上行，止于锁骨下俞府。',
    regions: ['low_back_hip', 'leg'],
    d: 'M101,441 C102,436 103,431 103,426 C104,412 104,398 104,386 C104,368 104,350 103,334 C103,314 103,294 102,276 C102,258 101,240 100,224 C99,212 98,200 97,190 C96,168 95,144 94,122 C94,108 95,96 96,88'
  },
  {
    id: 'pc', num: 9, name: '手厥阴心包经', short: '心包经',
    group: '手三阴', dir: '胸 → 手', color: '#C25A85',
    runs: '起于胸中，出属心包络，从乳旁天池沿上臂内侧中线、前臂内侧两筋之间下行，入掌中，止于中指尖。',
    regions: ['arm'],
    d: 'M114,108 C120,114 127,120 132,128 C135,138 136,150 136,162 C136,172 137,184 138,196 C137,206 135,216 133,224 C134,234 136,242 138,250 C139,254 140,257 140,258'
  },
  {
    id: 'sj', num: 10, name: '手少阳三焦经', short: '三焦经',
    group: '手三阳', dir: '手 → 头', color: '#4FA0A0',
    runs: '起于无名指尺侧端，沿前臂外侧两骨之间、上臂外侧中线上行，过肩上，入缺盆；一支上颈，止于眉梢凹陷处。',
    regions: ['neck_shoulder', 'arm'],
    d: 'M142,257 C147,248 153,240 158,232 C162,222 163,210 162,198 C161,186 159,170 157,158 C154,142 150,128 146,116 C142,102 138,90 133,84 C126,78 118,72 114,64 C113,54 112,44 110,36 C110,34 109,32 109,32'
  },
  {
    id: 'gb', num: 11, name: '足少阳胆经', short: '胆经',
    group: '足三阳', dir: '头 → 足', color: '#8FBE55',
    runs: '起于外眼角，上头角、绕耳后，下行颈侧、肩上，沿体侧过胁肋、髋部，沿大腿外侧、小腿外侧下行，止于第四趾外侧。',
    regions: ['neck_shoulder', 'upper_back', 'leg'],
    d: 'M118,26 C120,20 121,16 121,14 C120,22 118,32 117,42 C117,50 117,56 116,62 C118,70 121,76 124,80 C126,96 126,114 125,132 C124,152 124,172 125,192 C126,208 127,220 127,228 C127,248 127,268 127,286 C126,304 124,320 122,336 C121,354 121,372 120,388 C119,404 118,420 117,430 C116,436 116,442 116,446'
  },
  {
    id: 'lr', num: 12, name: '足厥阴肝经', short: '肝经',
    group: '足三阴', dir: '足 → 腹', color: '#5E9C50',
    runs: '起于大趾背上毫毛处，沿内踝前、胫骨内侧面、膝内侧上行，绕阴部抵胁肋，止于期门（乳头直下第六肋间）。',
    regions: ['low_back_hip', 'leg'],
    d: 'M103,447 C104,442 105,436 106,430 C107,416 107,402 107,388 C108,370 108,352 107,334 C107,316 106,296 106,278 C105,262 104,244 103,230 C104,214 106,196 108,180 C110,168 111,154 111,142'
  }
];

/* ════════ 二、常用穴位（正面 33 个） ════════ */
// side: 'mid' 中线单点；'both' 左右对称（按右侧 x 镜像）
// meridian: 所属经络（中文）；effects: 参考图标注的功效
export var ACUPOINTS = [
  { id: 'baihui',  name: '百会穴',   x: 100, y: 9,   side: 'mid',  meridian: '督脉',       location: '头顶正中线，两耳尖连线中点', effects: '慢性头痛、提神、脱发' },
  { id: 'touwei',  name: '头维穴',   x: 112, y: 14,  side: 'both', meridian: '足阳明胃经', location: '额角发际直上入发际五分',     effects: '慢性头痛' },
  { id: 'zanzhu',  name: '攒竹穴',   x: 106, y: 22,  side: 'both', meridian: '足太阳膀胱经', location: '眉头内侧凹陷处',           effects: '头痛、目眩、目赤肿痛' },
  { id: 'taiyang', name: '太阳穴',   x: 114, y: 27,  side: 'both', meridian: '经外奇穴',   location: '眉梢与外眼角之间向后一寸凹陷', effects: '眼睛疲劳、色斑、肤色暗沉、浮肿' },
  { id: 'sibai',   name: '四白穴',   x: 107, y: 30,  side: 'both', meridian: '足阳明胃经', location: '瞳孔直下，眶下孔凹陷处',     effects: '衰老、色斑、肤色暗沉' },
  { id: 'shuigou', name: '水沟穴',   x: 100, y: 34,  side: 'mid',  meridian: '督脉',       location: '人中沟上三分之一处',         effects: '困倦、急救要穴' },
  { id: 'yingxiang', name: '迎香穴', x: 105, y: 37,  side: 'both', meridian: '手阳明大肠经', location: '鼻翼外缘中点旁开，鼻唇沟中', effects: '疏通面部经络、花粉过敏、改善法令纹、衰老' },
  { id: 'toufu',   name: '扶突穴',   x: 110, y: 62,  side: 'both', meridian: '手阳明大肠经', location: '喉结旁开三寸，胸锁乳突肌之间', effects: '咳嗽气喘、咽喉肿痛' },
  { id: 'tiantu',  name: '天突穴',   x: 100, y: 76,  side: 'mid',  meridian: '任脉',       location: '胸骨上窝正中',               effects: '喉咙痛、咳嗽' },
  { id: 'zhongfu', name: '中府穴',   x: 109, y: 89,  side: 'both', meridian: '手太阴肺经', location: '锁骨下窝外侧，前正中线旁开六寸', effects: '感冒、咳嗽' },
  { id: 'tanzhong', name: '膻中穴',  x: 100, y: 103, side: 'mid',  meridian: '任脉',       location: '两乳头连线中点',             effects: '压力过大、宽胸理气' },
  { id: 'jiuwei',  name: '鸠尾穴',   x: 100, y: 130, side: 'mid',  meridian: '任脉',       location: '脐上七寸，剑胸结合部下',     effects: '失眠、心烦' },
  { id: 'qimen',   name: '期门穴',   x: 111, y: 141, side: 'both', meridian: '足厥阴肝经', location: '乳头直下，第六肋间隙',       effects: '宿醉、疏肝理气' },
  { id: 'burong',  name: '不容穴',   x: 110, y: 152, side: 'both', meridian: '足阳明胃经', location: '脐上六寸，旁开二寸',         effects: '胃胀' },
  { id: 'zhangmen', name: '章门穴',  x: 116, y: 154, side: 'both', meridian: '足厥阴肝经', location: '侧腹部，第十一肋游离端下方', effects: '胸闷、腹胀、嗳气' },
  { id: 'zhongwan', name: '中脘穴',  x: 100, y: 162, side: 'mid',  meridian: '任脉',       location: '脐上四寸',                   effects: '口腔溃疡、夏倦、胃胀、食欲不振、胃痛' },
  { id: 'tianshu', name: '天枢穴',   x: 110, y: 178, side: 'both', meridian: '足阳明胃经', location: '脐中旁开二寸',               effects: '腹泻' },
  { id: 'shenque', name: '神阙穴',   x: 100, y: 184, side: 'mid',  meridian: '任脉',       location: '脐窝正中',                   effects: '腹泻、腹痛便秘、痛经' },
  { id: 'qihai',   name: '气海穴',   x: 100, y: 197, side: 'mid',  meridian: '任脉',       location: '脐下一寸半',                 effects: '肾、减肥' },
  { id: 'guanyuan', name: '关元穴',  x: 100, y: 207, side: 'mid',  meridian: '任脉',       location: '脐下三寸',                   effects: '夏倦、便秘、腹泻、不孕不育' },
  { id: 'zhongji', name: '中极穴',   x: 100, y: 216, side: 'mid',  meridian: '任脉',       location: '脐下四寸',                   effects: '痛经' },
  { id: 'neiguan', name: '内关穴',   x: 136, y: 203, side: 'both', meridian: '手厥阴心包经', location: '腕横纹上二寸，两筋之间',   effects: '宿醉、嗳气' },
  { id: 'shenmen', name: '神门穴',   x: 131, y: 229, side: 'both', meridian: '手少阴心经', location: '腕横纹尺侧端凹陷处',         effects: '心、肺' },
  { id: 'laogong', name: '劳宫穴',   x: 139, y: 245, side: 'both', meridian: '手厥阴心包经', location: '掌心，第二三掌骨之间',     effects: '疲劳、口腔溃疡、压力过大' },
  { id: 'quchi',   name: '曲池穴',   x: 150, y: 163, side: 'both', meridian: '手阳明大肠经', location: '肘横纹外侧端，屈肘凹陷处', effects: '痘痘' },
  { id: 'xuehai',  name: '血海穴',   x: 108, y: 296, side: 'both', meridian: '足太阴脾经', location: '髌骨内上缘上二寸',           effects: '肩颈酸痛、健忘、记忆力下降、痛经、皮肤干燥' },
  { id: 'yinlingquan', name: '阴陵泉穴', x: 110, y: 330, side: 'both', meridian: '足太阴脾经', location: '胫骨内侧髁下缘凹陷处',   effects: '皮肤干燥、痘痘' },
  { id: 'zusanli', name: '足三里穴', x: 116, y: 348, side: 'both', meridian: '足阳明胃经', location: '膝下三寸，胫骨外一横指',     effects: '夏倦胃胀、食欲不振、胃痛、宿醉、嗳气、腹泻、痘痘、减肥' },
  { id: 'fenglong', name: '丰隆穴',  x: 118, y: 378, side: 'both', meridian: '足阳明胃经', location: '外踝尖上八寸，胫骨前缘外二横指', effects: '健忘、记忆力下降、减肥' },
  { id: 'sanyinjiao', name: '三阴交穴', x: 110, y: 408, side: 'both', meridian: '足太阴脾经', location: '内踝尖上三寸，胫骨内侧后缘', effects: '便秘、体寒、浮肿、不孕不育、痛经、痘痘、减肥、脱发、白头发' },
  { id: 'taichong', name: '太冲穴',  x: 106, y: 442, side: 'both', meridian: '足厥阴肝经', location: '足背第一二跖骨间凹陷处',     effects: '肩颈酸痛、失眠、便秘、肝、身体发热、压力过大' },
  { id: 'zulinqi', name: '足临泣穴', x: 118, y: 440, side: 'both', meridian: '足少阳胆经', location: '足背外侧，第四五跖骨底结合部前方', effects: '慢性头痛' }
];

/* ════════ 三、区域 → 经脉/穴位 映射（MockAI 判断依据） ════════ */
// region 与 mm-engine MUSCLES.region 一致
export var REGION_MERIDIAN = {
  neck_shoulder: ['li', 'sj', 'si', 'gb', 'bl', 'st'],
  arm:           ['lu', 'pc', 'ht', 'li', 'sj', 'si'],
  upper_back:    ['bl', 'gb', 'si', 'sj'],
  low_back_hip:  ['sp', 'lr', 'ki', 'st'],
  leg:           ['st', 'gb', 'bl', 'sp', 'lr', 'ki']
};
export var REGION_ACUPOINT = {
  neck_shoulder: ['fengchi_like', 'toufu', 'jianjing_like', 'tanzhong'],
  arm:           ['quchi', 'neiguan', 'shenmen', 'laogong', 'zhongfu'],
  upper_back:    ['baihui', 'zanzhu'],
  low_back_hip:  ['zhongwan', 'tianshu', 'shenque', 'qihai', 'guanyuan', 'zhongji', 'zhangmen', 'qimen'],
  leg:           ['xuehai', 'yinlingquan', 'zusanli', 'fenglong', 'sanyinjiao', 'taichong', 'zulinqi']
};

/* ════════ 四、穴位机理模板（mock 解释用） ════════ */
export var ACU_PRINCIPLE = {
  head: '头面部穴位以"局部取穴"为主：穴区下密布神经血管，刺激能改善局部气血循环、放松浅表肌肉，对头面五官类不适起效较快；同时多数头穴连于某条正经，兼具疏通整条经脉的作用。',
  torso: '胸腹部穴位以"近端调理脏腑"为主：穴区对应深部脏腑投影，刺激通过肋间神经与内脏神经反射，帮助平复相关脏腑功能紊乱，是胸腹胀闷、消化类不适的常用思路。',
  limb: '四肢穴位以"远端循经取穴"为主：四肢是经脉的"干线"所在，刺激远端穴位能沿经脉调理头面躯干的相应部位，且四肢肌肉丰厚，按揉安全、容易出感。'
};
export function acuPrincipleOf(acu) {
  var y = acu.y;
  if (y < 70) return ACU_PRINCIPLE.head;
  if (y < 232) return ACU_PRINCIPLE.torso;
  return ACU_PRINCIPLE.limb;
}

/* ════════ 五、渲染辅助 ════════ */
// 生成经脉层 + 穴位层（<g>，默认隐藏，由 stage 控制 display）
// 每条经脉：可见线 ×2（右 + 镜像）+ 透明热区 ×2；穴位同理（mid 单点）
export function buildMeridianLayers(SVG_NS) {
  var gLine = document.createElementNS(SVG_NS, 'g');
  gLine.setAttribute('class', 'ai-meridian-layer');
  gLine.setAttribute('pointer-events', 'none');
  var gHot = document.createElementNS(SVG_NS, 'g');
  gHot.setAttribute('class', 'ai-meridian-hot-layer');
  var gAcu = document.createElementNS(SVG_NS, 'g');
  gAcu.setAttribute('class', 'ai-acu-layer');

  MERIDIANS.forEach(function (m) {
    ['', 'MIRROR'].forEach(function (mode) {
      var p = document.createElementNS(SVG_NS, 'path');
      p.setAttribute('d', m.d);
      p.setAttribute('class', 'ai-meridian');
      p.dataset.mid = m.id;
      p.style.stroke = m.color;
      if (mode === 'MIRROR') p.setAttribute('transform', 'translate(200,0) scale(-1,1)');
      gLine.appendChild(p);

      var hot = document.createElementNS(SVG_NS, 'path');
      hot.setAttribute('d', m.d);
      hot.setAttribute('class', 'ai-meridian-hot');
      hot.dataset.mid = m.id;
      if (mode === 'MIRROR') hot.setAttribute('transform', 'translate(200,0) scale(-1,1)');
      gHot.appendChild(hot);
    });
  });

  ACUPOINTS.forEach(function (a) {
    var sides = a.side === 'mid' ? ['RIGHT'] : ['RIGHT', 'MIRROR'];
    sides.forEach(function (mode) {
      var g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('class', 'ai-acu');
      g.dataset.aid = a.id;
      if (mode === 'MIRROR') g.setAttribute('transform', 'translate(200,0) scale(-1,1)');
      var hot = document.createElementNS(SVG_NS, 'circle');
      hot.setAttribute('cx', a.x); hot.setAttribute('cy', a.y);
      hot.setAttribute('r', 3.6);
      hot.setAttribute('class', 'ai-acu-hot');
      hot.dataset.aid = a.id;
      g.appendChild(hot);
      var halo = document.createElementNS(SVG_NS, 'circle');
      halo.setAttribute('cx', a.x); halo.setAttribute('cy', a.y);
      halo.setAttribute('r', 2.2);
      halo.setAttribute('class', 'ai-acu-halo');
      g.appendChild(halo);
      var dot = document.createElementNS(SVG_NS, 'circle');
      dot.setAttribute('cx', a.x); dot.setAttribute('cy', a.y);
      dot.setAttribute('r', 1.4);
      dot.setAttribute('class', 'ai-acu-dot');
      g.appendChild(dot);
      gAcu.appendChild(g);
    });
  });

  return { line: gLine, hot: gHot, acu: gAcu };
}

export function meridianById(id) {
  for (var i = 0; i < MERIDIANS.length; i++) if (MERIDIANS[i].id === id) return MERIDIANS[i];
  return null;
}
export function acuById(id) {
  for (var i = 0; i < ACUPOINTS.length; i++) if (ACUPOINTS[i].id === id) return ACUPOINTS[i];
  return null;
}
