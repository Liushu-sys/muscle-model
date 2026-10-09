// ai-flow.js —— AI 驱动实验流程（VLM 看图定位 + LLM 文案生成）
// 当前为 UI + Mock 阶段：所有 AI 接口由 MockAI 模拟（含网络延迟与 loading 体验）。
// key 到位后，仅需把 MockAI 四个方法内部替换为对阿里云转发接口的 fetch 调用，
// 入参/出参签名保持不变，页面层零改动。
import { ACTIONS, MUSCLES } from './mm-engine.js?v=261';
import { MERIDIANS, REGION_MERIDIAN, REGION_ACUPOINT, acuPrincipleOf, buildMeridianLayers, meridianById, acuById } from './meridian-data.js?v=2';

/* ════════════════════════════════════════════════════════════
 * 一、MockAI —— 未来真实接口的替身
 * 计划接入（阿里云转发，key 不落前端）：
 *   POST /api/body/vlm  通义千问 qwen-vl-max：人体图+归一化坐标 → 细节部位描述
 *   POST /api/body/llm  通义千问 qwen-plus ：部位+感受 → 动作/解释文案
 * ════════════════════════════════════════════════════════════ */
var REGION_CN = {
  neck_shoulder: '肩颈',
  arm: '肩臂',
  upper_back: '肩背',
  low_back_hip: '腰腹',
  leg: '臀腿'
};
// 人体内未命中肌肉 path 的区域，按 y 坐标粗判（头/手/脚等无肌肉区也覆盖）
function zoneOfBlank(side, vx, vy) {
  if (vy < 55) return { region: 'neck_shoulder', name: '头部' };
  if (vy < 95) return { region: 'neck_shoulder', name: '颈部' };
  // 手臂带：手在躯干更外侧
  if (vy < 240) {
    if (vx < 40 || vx > 160) return { region: 'arm', name: '手部' };
    if (vx < 55 || vx > 145) return { region: 'arm', name: '手臂部' };
    return { region: 'upper_back', name: '胸背部' };
  }
  if (vy < 320) return { region: 'low_back_hip', name: '腰腹部' };
  if (vy < 440) return { region: 'leg', name: '小腿部' };
  return { region: 'leg', name: '足部' };
}

function delay(ms) {
  return new Promise(function (r) { setTimeout(r, ms); });
}
// 左右侧判定（镜像/观察者视角）：正面屏幕右半判为人体左侧、左半为右侧；
// 背面沿用 x<100 人体左侧。仅影响描述文案，不影响任何着色与数据逻辑。
function sideLabelOf(side, vx) {
  if (vx >= 95 && vx <= 105) return '';
  return vx < 100 ? '左侧' : '右侧';
}
function muscleById(id) {
  for (var i = 0; i < MUSCLES.length; i++) if (MUSCLES[i].id === id) return MUSCLES[i];
  return null;
}

var MockAI = {
  // VLM：人体图 + 点击坐标 → 精准部位描述，格式统一为：
  //   「正面左-斜角肌下部」「背面右-斜方肌右部」「正面中-腹部」
  //   = 面(正面/背面) + 侧(左/右/中) + 部位名 + 细分部(上/下/左/右部，可无)
  // ★ 真实接入时把此格式写进 system prompt，要求 VLM 输出同结构定位串。
  // mock：命中肌肉 → 面-侧-肌肉名+细分部；空白区 → 面-侧-区域名。
  // 仅处理人体内点击（stage 层已过滤人体外点击）。
  vlmLocate: function (payload) {
    return delay(450).then(function () {
      var face = payload.side === 'front' ? '正面' : '背面';
      var sd = sideLabelOf(payload.side, payload.vx);
      var head = face + (sd ? sd.replace('侧', '') : '中') + '-';
      if (payload.muscleId) {
        var m = muscleById(payload.muscleId);
        if (m) {
          return {
            muscleId: m.id,
            region: m.region,
            description: head + m.name + (payload.sub || '')
          };
        }
      }
      var z = zoneOfBlank(payload.side, payload.vx, payload.vy);
      return {
        muscleId: null,
        region: z.region,
        description: head + z.name
      };
    });
  },

  // LLM：部位+感受 → 动作推荐（坐姿组 + 站姿组，每组若干个）
  // mock：按 肌肉命中>区域命中>状态契合 给现有动作库打分排序
  llmRecommend: function (points) {
    return delay(800).then(function () {
      var mIds = {}, regs = {}, feels = {};
      points.forEach(function (p) {
        if (p.muscleId) mIds[p.muscleId] = true;
        if (p.region) regs[p.region] = true;
        if (p.feel === '酸痛' || p.feel === '僵硬') feels.tight = true;
        if (p.feel === '无力') feels.weak = true;
      });
      function score(a) {
        var s = 0;
        a.muscles.forEach(function (id) { if (mIds[id]) s += 3; });
        (a.regions || []).forEach(function (r) { if (regs[r]) s += 2; });
        if (a.forState === 'tight' && feels.tight) s += 1;
        if (a.forState === 'weak' && feels.weak) s += 1;
        return s;
      }
      // 推荐理由里的"针对"文案：命中的肌肉名，退而求其次是区域名
      function targetFor(a) {
        var names = [];
        a.muscles.forEach(function (id) {
          if (mIds[id]) { var m = muscleById(id); if (m) names.push(m.name); }
        });
        if (names.length) return names.slice(0, 2).join('、');
        var r = (a.regions || []).find(function (r) { return regs[r]; }) || (a.regions || [])[0];
        return (REGION_CN[r] || '') + '一带';
      }
      function pick(postures) {
        return ACTIONS.filter(function (a) {
          return postures.indexOf(a.posture) >= 0 && a.gear === 'none';
        }).map(function (a) { return { a: a, s: score(a) }; })
          .sort(function (x, y) { return y.s - x.s; })
          .slice(0, 3)
          .map(function (x) { return { a: x.a, target: targetFor(x.a) }; });
      }
      return { sit: pick(['sit', 'any']), stand: pick(['stand', 'any']) };
    });
  },

  // VLM：根据采集的部位+感受，判断最相关的肌肉（统一橘色高亮，不区分过紧/过松）
  // ★ 真实接入时的死命令（必须写进 system prompt）：
  //   相关肌肉不超过 3 块（左右对称两半算同一块），只输出最相关的；
  //   输出 summary 总述（整合给底部总体解释卡）。
  // mock：点中肌肉 → 该块（含左右对称）+ 同区域代表块，上限 3 块
  vlmHighlight: function (points) {
    return delay(600).then(function () {
      var mIds = [], added = {}, blockNames = [];
      var regs = {};
      function blockOf(m) {
        // 一块 = 该肌肉 + 同名对侧（左右两半算同一块）
        var ids = [m.id];
        MUSCLES.forEach(function (o) {
          if (o.id !== m.id && o.name === m.name && o.side === m.side && ids.indexOf(o.id) < 0) ids.push(o.id);
        });
        return ids;
      }
      function addBlock(ids, name) {
        ids.forEach(function (id) { if (!added[id]) { added[id] = true; mIds.push(id); } });
        if (name && blockNames.indexOf(name) < 0) blockNames.push(name);
      }
      points.forEach(function (p) {
        if (p.muscleId) {
          var m = muscleById(p.muscleId);
          if (!m) return;
          regs[m.region] = true;
          addBlock(blockOf(m), m.name);
        } else if (p.region) {
          regs[p.region] = true;
        }
      });
      // 不足 3 块时补同区域代表肌肉（跳过已加入的）
      Object.keys(regs).forEach(function (r) {
        if (blockNames.length >= 3) return;
        var rep = MUSCLES.find(function (m) { return m.region === r && !added[m.id]; });
        if (rep) addBlock(blockOf(rep), rep.name);
      });
      // 总述：整合最相关的肌肉形成底部总体解释（引用采集到的精准定位串）
      var regCn = { neck_shoulder: '肩颈', arm: '肩臂', upper_back: '肩背', low_back_hip: '腰腹', leg: '臀腿' };
      var regList = Object.keys(regs).map(function (r) { return regCn[r] || r; }).join('、') || '相关区域';
      var feelList = points.map(function (p) { return p.feel; }).filter(Boolean).join('、') || '不适';
      var locs = points.map(function (p) { return p.description; }).filter(Boolean).join('、');
      var quote = (locs ? locs : regList) + ' · ' + feelList;
      var nameTxt = blockNames.slice(0, 3).join('、');
      var summary = '结合你反馈的「' + quote + '」，AI 判断最相关的肌肉是' + nameTxt +
        '。它们共同参与这个区域的姿势维持与动作发力，长时间负担偏重时，容易出现酸胀、发紧或使不上力的感受。';
      return { muscleIds: mIds, summary: summary };
    });
  },

  // LLM：肌肉 + 感受 → 西医机理解释（不区分过紧/过松）
  llmExplain: function (payload) {
    return delay(550).then(function () {
      var m = muscleById(payload.muscleId);
      var feel = payload.feel;
      var cause;
      if (feel === '酸痛') {
        cause = '这块肌肉长时间处于低强度持续收缩状态，局部血液循环变慢、代谢产物堆积，就会产生酸胀感；久坐或固定姿势维持越久，酸胀越明显，活动后通常会暂时减轻。';
      } else if (feel === '僵硬') {
        cause = '它持续紧张缩住、筋膜之间的滑动变差，肌肉长度逐渐适应性变短，于是活动到某个角度时会觉得发紧、卡住，早上刚起身或久坐后站起时尤其明显。';
      } else if (feel === '无力') {
        cause = '它在本该发力的动作里使不上劲，身体会让周围其他肌肉代偿完成动作；代偿肌肉负担加重，人更容易累，动作模式也会慢慢走形。';
      } else {
        cause = '长时间固定姿势让它持续工作、得不到轮换休息，是办公和学习场景下这个位置出现不适的常见机制；每个人的具体情况会有差异，可以结合动作里的感受来判断。';
      }
      return {
        name: m.name,
        func: m.desc,
        cause: cause,
        note: '以上为一般性肌肉学科普内容，不构成医学诊断；若出现持续疼痛、麻木或活动受限，建议就医评估。'
      };
    });
  },

  // ── 中医 ──
  // LLM：部位+感受 → 相关经脉/穴位判断 + 总述
  // ★ 真实接入时的死命令（必须写进 system prompt）：
  //   相关经脉不超过 2 条、穴位不超过 3 个，只输出最相关的，并整合成 summary 总述。
  // mock：区域映射表按优先级取前 2 条经脉、前 3 个穴位
  llmMeridian: function (points) {
    return delay(800).then(function () {
      var regs = {}, feels = {};
      points.forEach(function (p) {
        if (p.region) regs[p.region] = true;
        if (p.muscleId) { var m = muscleById(p.muscleId); if (m) regs[m.region] = true; }
        if (p.feel === '酸痛' || p.feel === '僵硬') feels.stagnant = true;
        if (p.feel === '无力') feels.xu = true;
      });
      var mIds = [], mAids = [], seenM = {}, seenA = {};
      function pushRegion(r) {
        (REGION_MERIDIAN[r] || []).forEach(function (id) {
          if (!seenM[id]) { seenM[id] = true; mIds.push(id); }
        });
        (REGION_ACUPOINT[r] || []).forEach(function (id) {
          if (acuById(id) && !seenA[id]) { seenA[id] = true; mAids.push(id); }
        });
      }
      Object.keys(regs).forEach(pushRegion);
      // 死命令：经脉 ≤2 条、穴位 ≤3 个（映射表已按相关度排序，直接截断）
      mIds = mIds.slice(0, 2);
      mAids = mAids.slice(0, 3);
      // 总述
      var regCn = { neck_shoulder: '肩颈', arm: '肩臂', upper_back: '肩背', low_back_hip: '腰腹', leg: '臀腿' };
      var regList = Object.keys(regs).map(function (r) { return regCn[r] || r; }).join('、') || '身体';
      var feelList = points.map(function (p) { return p.feel; }).filter(Boolean).join('、') || '不适';
      var locs = points.map(function (p) { return p.description; }).filter(Boolean).join('、');
      var quote = (locs ? locs : regList) + ' · ' + feelList;
      var mNames = mIds.map(function (id) { return meridianById(id).short; }).join('、');
      var summary;
      if (feels.stagnant) {
        summary = '结合你反馈的「' + quote + '」。中医认为"不通则痛"，这类感受多与经脉气血运行不畅有关。最相关的经脉是' + mNames + '，都经过你反馈的区域，可能与气血瘀滞相关。';
      } else if (feels.xu) {
        summary = '结合你反馈的「' + quote + '」。中医认为"不荣则痛"、力从气生，这类感受多提示相关经脉气血不足或运化不足。最相关的经脉是' + mNames + '，与该区域关系密切。';
      } else {
        summary = '结合你反馈的「' + quote + '」。中医讲究"经脉所过，主治所及"，最相关的经脉是' + mNames + '，都经过该区域，可以循经取穴来理解和调理。';
      }
      return {
        meridianIds: mIds,
        acuIds: mAids,
        summary: summary,
        note: '以上为一般性中医经络科普内容，不构成诊疗建议；若不适持续或加重，建议就医评估。'
      };
    });
  },

  // LLM：穴位 → 中医机理卡
  llmAkuCard: function (payload) {
    return delay(550).then(function () {
      var a = acuById(payload.acuId);
      return {
        name: a.name,
        meridian: a.meridian,
        location: a.location,
        effects: a.effects,
        principle: acuPrincipleOf(a),
        note: '以上为一般性穴位科普内容，不构成诊疗建议；孕妇及特殊人群按摩穴位前请咨询专业医师。'
      };
    });
  },

  // LLM：经脉 → 循行/主治卡
  llmMeridianCard: function (payload) {
    return delay(550).then(function () {
      var m = meridianById(payload.meridianId);
      return {
        name: m.name,
        group: m.group + ' · 第' + m.num + '条 · ' + m.dir,
        runs: m.runs,
        principle: '中医认为"经脉所过，主治所及"：这条经脉的循行覆盖范围与其主治倾向直接相关。经脉气血通畅时，循行部位得到濡养；若长期姿势不良、受寒或劳累，气血在经气郁滞处运行不畅，循行部位就容易出现酸、僵、痛等感受。按揉该经的常用穴位，有助于帮助气血恢复流通。',
        note: '以上为一般性经络科普内容，不构成诊疗建议；若不适持续或加重，建议就医评估。'
      };
    });
  }
};

/* ════════════════════════════════════════════════════════════
 * 一·B、动作示意图生图服务
 * 链路：AI 补全动作文字(准备/完成) → 组「固定人设+姿势」prompt → 生图接口 → 双图
 * Mock 通道：pollinations（免鉴权免费）；真实接入后换阿里云万相转发（key 在服务器），
 *           只需替换 genImgUrl 内部实现（改为 POST 自己的 /api/genimg 换回 URL），调用方不变。
 * 人物一致性：所有图共用同一份人物设定 + 固定 seed；真实接入后用万相参考图锁脸。
 * ════════════════════════════════════════════════════════════ */
var IMG_SHEET = 'young asian woman, black hair tied in a neat low bun, white sports bra top, loose gray sweatpants with white side stripe, white sneakers, slim healthy body, full body shot, front view, isolated on pure seamless white background, bright even studio lighting, realistic fitness photography';
var IMG_SCENE = {
  sit: 'sitting upright on a light gray office chair',
  stand: 'standing upright, facing camera',
  lie: 'lying on a yoga mat'
};
var IMG_KIND = { '拉伸': 'slow stretching pose', '按压': 'self pressing massage pose', '激活': 'muscle activation exercise', '强化': 'muscle strengthening exercise' };
var IMG_CACHE_KEY = 'ai_actimg_v1';

function imgCacheGet(aid) {
  try { return JSON.parse(localStorage.getItem(IMG_CACHE_KEY) || '{}')[aid] || null; } catch (e) { return null; }
}
function imgCachePut(aid, urls) {
  try {
    var all = JSON.parse(localStorage.getItem(IMG_CACHE_KEY) || '{}');
    all[aid] = urls;
    localStorage.setItem(IMG_CACHE_KEY, JSON.stringify(all));
  } catch (e) { /* 存储满/隐私模式忽略 */ }
}
// LLM：动作 → 准备/完成两段文字（★真实接入时由 LLM 按动作名+要点补全细节；mock 从 howto 拆句）
MockAI.llmActionDesc = function (a) {
  return delay(150).then(function () {
    var sents = (a.howto || '').split('。').map(function (s) { return s.trim(); }).filter(Boolean);
    var prep = sents[0] || a.name;
    var complete = sents.length > 1 ? sents[sents.length - 1] : prep;
    return { prep: prep, complete: complete };
  });
};
function seedOf(str) {
  var h = 0;
  for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 100000;
}
function buildActionPrompt(a, poseTxt) {
  var bits = [IMG_SHEET];
  bits.push(IMG_SCENE[a.posture === 'stand' ? 'stand' : (a.posture === 'lie' ? 'lie' : 'sit')]);
  if (IMG_KIND[a.kind]) bits.push(IMG_KIND[a.kind]);
  bits.push(poseTxt);
  return bits.join(', ');
}
function genImgUrl(prompt, seed) {
  return 'https://image.pollinations.ai/prompt/' + encodeURIComponent(prompt) + '?width=768&height=1024&nologo=true&seed=' + seed;
}
// 取动作双图 URL：缓存优先，未命中先补文字再组 prompt 出 URL
function actionImgUrls(a, cb) {
  var hit = imgCacheGet(a.id);
  if (hit) { cb(hit); return; }
  MockAI.llmActionDesc(a).then(function (d) {
    var urls = {
      prep: genImgUrl(buildActionPrompt(a, d.prep), seedOf(a.id + '-prep')),
      complete: genImgUrl(buildActionPrompt(a, d.complete), seedOf(a.id + '-done'))
    };
    imgCachePut(a.id, urls);
    cb(urls);
  });
}
// 渲染后填充双图：加载中 shimmer，生成失败回退火柴人图标
// 免费生图通道有并发限流：限制同时 2 个请求，单图最多重试 3 次
function fillActionImages(root) {
  var imgs = $all('.avd-fig-img', root);
  var active = 0, idx = 0;
  function pump() {
    while (active < 2 && idx < imgs.length) {
      load(imgs[idx++]);
    }
  }
  function load(img) {
    active++;
    var scr = img.closest('.adv-action-screen');
    var a = scr && ACTIONS.find(function (x) { return x.id === scr.dataset.actionId; });
    if (!a) { active--; pump(); return; }
    actionImgUrls(a, function (urls) {
      var tries = 0;
      function tryLoad() {
        tries++;
        img.onload = function () { img.classList.add('loaded'); done(); };
        img.onerror = function () {
          if (tries < 5) setTimeout(tryLoad, 2000 * tries);
          else {
            var box = img.parentNode;
            if (box) {
              img.remove();
              box.insertAdjacentHTML('afterbegin', FIG_ICON_SVG);
            }
            done();
          }
        };
        img.src = (img.dataset.part === 'prep' ? urls.prep : urls.complete) + '&r=' + tries;
      }
      function done() { active--; pump(); }
      tryLoad();
    });
  }
  pump();
}

/* ════════════════════════════════════════════════════════════
 * 二、工具函数
 * ════════════════════════════════════════════════════════════ */
function $(sel, root) { return (root || document).querySelector(sel); }
function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
function el(tag, cls, html) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
function clientToSvg(svg, cx, cy) {
  var pt = svg.createSVGPoint();
  pt.x = cx; pt.y = cy;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}
var SVG_NS = 'http://www.w3.org/2000/svg';

/* ════════════════════════════════════════════════════════════
 * 三、AI 肌肉图（克隆现有 SVG，独立交互：人体内点击 + 翻转 + 缩放）
 * ════════════════════════════════════════════════════════════ */
function buildAiStage(container, opts) {
  var view = {
    side: 'front', scale: 1, tx: 0, ty: 0,
    points: { front: [], back: [] },
    onPick: opts.onPick || null,
    onDotTap: opts.onDotTap || null,
    onMuscleTap: opts.onMuscleTap || null,
    onPointsRemoved: opts.onPointsRemoved || null,
    highlightOnly: !!opts.highlightOnly,
    hlIds: {}
  };
  view.onMeridianTap = opts.onMeridianTap || null;
  view.onAcuTap = opts.onAcuTap || null;
  view.tcn = false;

  // 经络层（仅 front 注入；默认隐藏，由 enterTcnMode 显示）
  var meridianG = null;
  if (opts.meridianLayer) {
    meridianG = buildMeridianLayers(SVG_NS);
  }

  ['front', 'back'].forEach(function (side) {
    var srcSel = side === 'front' ? '#card-front svg' : '#card-back svg';
    var src = $(srcSel);
    var svg = src.cloneNode(true);
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.classList.add('ai-svg');
    $all('.m', svg).forEach(function (p) {
      p.classList.remove('m');
      p.classList.add('ai-m');
    });
    // 非肌肉 path（人体底色/轮廓/头部装饰）打标：科普页半透明模式用
    $all('path', svg).forEach(function (p) {
      if (!p.classList.contains('ai-m')) p.classList.add('ai-sil');
    });
    // 人体轮廓填充 path（无 .m 类、有 fill）：用于判断点击是否落在人体内
    var silhouettes = $all('path', svg).filter(function (p) {
      if (p.classList.contains('ai-m')) return false;
      var f = (p.getAttribute('fill') || '').toLowerCase();
      return f && f !== 'none' && f !== 'transparent';
    });
    var zoom = el('div', 'ai-zoom');
    zoom.appendChild(svg);
    var card = el('div', 'ai-card ' + (side === 'front' ? 'front' : 'back'));
    if (side === 'back') card.style.display = 'none';
    card.appendChild(zoom);
    container.appendChild(card);
    view[side] = { card: card, zoom: zoom, svg: svg, silhouettes: silhouettes };

    var dotsG = document.createElementNS(SVG_NS, 'g');
    dotsG.setAttribute('class', 'ai-dots');
    svg.appendChild(dotsG);
    view[side].dotsG = dotsG;
  });

  // 经络层注入 front svg（需在循环之后，拿到 view.front.svg）
  if (meridianG) {
    view.front.svg.appendChild(meridianG.hot);
    view.front.svg.appendChild(meridianG.line);
    view.front.svg.appendChild(meridianG.acu);
    ['line', 'hot', 'acu'].forEach(function (k) { meridianG[k].style.display = 'none'; });
  }

  function cur() { return view[view.side]; }

  function applyTransform() {
    ['front', 'back'].forEach(function (s) {
      view[s].zoom.style.transform =
        'translate(' + view.tx + 'px,' + view.ty + 'px) scale(' + view.scale + ')';
    });
  }
  function flip() {
    var oldC = cur();
    oldC.card.style.transformOrigin = 'center';
    oldC.card.style.transition = 'transform .16s ease-in';
    oldC.card.style.transform = 'scaleX(0)';
    setTimeout(function () {
      oldC.card.style.display = 'none';
      view.side = view.side === 'front' ? 'back' : 'front';
      var newC = cur();
      newC.card.style.display = '';
      newC.card.style.transformOrigin = 'center';
      newC.card.style.transform = 'scaleX(0)';
      newC.card.style.transition = 'none';
      void newC.card.offsetWidth;
      newC.card.style.transition = 'transform .16s ease-out';
      newC.card.style.transform = 'scaleX(1)';
      applyTransform();
    }, 160);
  }
  view.flip = flip;

  function renderDots(side) {
    var slot = view[side];
    slot.dotsG.innerHTML = '';
    view.points[side].forEach(function (p) {
      var g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('class', 'ai-dot' + (p.feel ? ' is-set' : ''));
      g.dataset.pid = p.id;
      var c = document.createElementNS(SVG_NS, 'circle');
      c.setAttribute('cx', p.vx); c.setAttribute('cy', p.vy);
      c.setAttribute('r', 4.2);
      g.appendChild(c);
      var ring = document.createElementNS(SVG_NS, 'circle');
      ring.setAttribute('cx', p.vx); ring.setAttribute('cy', p.vy);
      ring.setAttribute('r', 7.5);
      ring.setAttribute('class', 'ai-dot-ring');
      g.appendChild(ring);
      slot.dotsG.appendChild(g);
    });
  }
  view.renderDots = renderDots;

  function setHighlight(ids) {
    view.hlIds = {};
    ids.forEach(function (id) { view.hlIds[id] = true; });
    ['front', 'back'].forEach(function (s) {
      $all('.ai-m', view[s].svg).forEach(function (p) {
        p.classList.toggle('ai-hl', !!view.hlIds[p.dataset.id]);
      });
    });
  }
  view.setHighlight = setHighlight;
  function clearHighlight() { setHighlight([]); }
  view.clearHighlight = clearHighlight;

  /* ── 中医经络模式 ── */
  // 显示经络层，淡化肌肉层
  view.enterTcnMode = function () {
    view.tcn = true;
    if (!meridianG) return;
    ['line', 'hot', 'acu'].forEach(function (k) { meridianG[k].style.display = ''; });
    view.front.svg.classList.add('tcn-mode');
    clearHighlight();
  };
  view.exitTcnMode = function () {
    view.tcn = false;
    if (!meridianG) return;
    ['line', 'hot', 'acu'].forEach(function (k) { meridianG[k].style.display = 'none'; });
    view.front.svg.classList.remove('tcn-mode');
    clearMeridianHl();
  };
  function clearMeridianHl() {
    if (!meridianG) return;
    $all('.ai-meridian', meridianG.line).forEach(function (p) { p.classList.remove('hl'); });
    $all('.ai-acu', meridianG.acu).forEach(function (g) { g.classList.remove('hl'); });
  }
  // AI 判断结果：只显示相关经脉 + 穴位（无关的不渲染出来）
  view.setMeridianHl = function (meridianIds, acuIds) {
    if (!meridianG) return;
    clearMeridianHl();
    var mSet = {}, aSet = {};
    (meridianIds || []).forEach(function (id) { mSet[id] = true; });
    (acuIds || []).forEach(function (id) { aSet[id] = true; });
    $all('.ai-meridian', meridianG.line).forEach(function (p) {
      p.classList.toggle('hl', !!mSet[p.dataset.mid]);
    });
    $all('.ai-meridian-hot', meridianG.hot).forEach(function (p) {
      p.classList.toggle('hl', !!mSet[p.dataset.mid]);
    });
    $all('.ai-acu', meridianG.acu).forEach(function (g) {
      g.classList.toggle('hl', !!aSet[g.dataset.aid]);
    });
  };

  function resetView() {
    view.scale = 1; view.tx = 0; view.ty = 0;
    view.side = 'front';
    view.back.card.style.display = 'none';
    view.front.card.style.display = '';
    view.front.card.style.transform = '';
    applyTransform();
  }
  view.resetView = resetView;
  function resetPoints() {
    view.points = { front: [], back: [] };
    renderDots('front'); renderDots('back');
  }
  view.resetPoints = resetPoints;

  function removePoint(p, side) {
    view.points[side] = view.points[side].filter(function (x) { return x.id !== p.id; });
    renderDots(side);
    if (view.onPointsRemoved) view.onPointsRemoved([p.id]);
  }

  // ── 交互：点击/拖动/双击翻转/双指缩放 ──
  ['front', 'back'].forEach(function (side) {
    var svg = view[side].svg;
    var pointers = {};
    var pinchStart = null;
    var drag = null;

    svg.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      try { svg.setPointerCapture(e.pointerId); } catch (err) { /* 某些环境无活动指针，忽略 */ }
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      if (Object.keys(pointers).length === 2) {
        var ks = Object.keys(pointers);
        var p1 = pointers[ks[0]], p2 = pointers[ks[1]];
        pinchStart = {
          dist: Math.hypot(p1.x - p2.x, p1.y - p2.y),
          scale: view.scale
        };
        drag = null;
        return;
      }
      drag = { x: e.clientX, y: e.clientY, moved: false, tx: view.tx, ty: view.ty };
    });

    svg.addEventListener('pointermove', function (e) {
      if (!pointers[e.pointerId]) return;
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      if (Object.keys(pointers).length === 2 && pinchStart) {
        var ks = Object.keys(pointers);
        var p1 = pointers[ks[0]], p2 = pointers[ks[1]];
        var d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        view.scale = Math.min(2.6, Math.max(1, pinchStart.scale * d / pinchStart.dist));
        if (view.scale === 1) { view.tx = 0; view.ty = 0; }
        applyTransform();
        return;
      }
      if (drag && view.scale > 1) {
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
        if (drag.moved) {
          view.tx = drag.tx + dx;
          view.ty = drag.ty + dy;
          applyTransform();
        }
      } else if (drag) {
        if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 8) drag.moved = true;
      }
    });

    function endPointer(e) {
      delete pointers[e.pointerId];
      if (Object.keys(pointers).length < 2) pinchStart = null;
      if (drag && !drag.moved && Object.keys(pointers).length === 0) {
        handleTap(e);
      }
      drag = null;
    }
    svg.addEventListener('pointerup', endPointer);
    svg.addEventListener('pointercancel', function () { pointers = {}; drag = null; pinchStart = null; });

    // 触控板捏合 / Ctrl(⌘)+滚轮缩放（参数与主工程 zoom-scroller 一致）
    svg.addEventListener('wheel', function (e) {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      view.scale = Math.min(2.6, Math.max(1, view.scale * (e.deltaY > 0 ? 0.92 : 1.09)));
      if (view.scale === 1) { view.tx = 0; view.ty = 0; }
      applyTransform();
    }, { passive: false });

    // pointer capture 会把 pointerup 的 e.target 重定向到 svg，
    // 因此松手时用 elementFromPoint 重新做命中检测
    function hitAt(cx, cy) {
      var elHere = document.elementFromPoint(cx, cy);
      if (!elHere || !svg.contains(elHere)) return { dot: null, muscle: null, inside: false };
      return {
        dot: elHere.closest('.ai-dot'),
        muscle: elHere.closest('.ai-m'),
        acu: elHere.closest('.ai-acu-hot'),
        meridian: elHere.closest('.ai-meridian-hot'),
        inside: !!elHere.closest('.ai-m')
      };
    }
    // 命中检测未直接触到肌肉时，再判断是否落在人体轮廓填充内（含头/手/脚）
    function insideBodyAt(vx, vy) {
      var dp = new DOMPoint(vx, vy);
      return view[side].silhouettes.some(function (p) {
        try { return p.isPointInFill(dp); } catch (err) { return false; }
      });
    }

    function handleTap(e) {
      if (view.side !== side) return;
      var hit = hitAt(e.clientX, e.clientY);
      var v = clientToSvg(svg, e.clientX, e.clientY);

      if (view.highlightOnly) {
        // 中医模式：穴位 > 经脉 > 肌肉
        if (view.tcn) {
          if (hit.acu && view.onAcuTap) { view.onAcuTap(hit.acu.dataset.aid); return; }
          if (hit.meridian && view.onMeridianTap) { view.onMeridianTap(hit.meridian.dataset.mid); return; }
          return;
        }
        if (hit.muscle && hit.muscle.classList.contains('ai-hl') && view.onMuscleTap) {
          view.onMuscleTap(hit.muscle.dataset.id);
        }
        return;
      }

      if (hit.dot) {
        var p = view.points[side].find(function (x) { return x.id === hit.dot.dataset.pid; });
        if (p && view.onDotTap) view.onDotTap(p, e);
        return;
      }
      // 只允许人体内选点：命中肌肉，或落在人体轮廓填充内
      var inside = hit.inside || insideBodyAt(v.x, v.y);
      if (!inside) return;
      // 细分部：点击点相对命中肌肉包围盒的方位（上部/下部/左部/右部），供 AI 精准定位
      var sub = '';
      if (hit.muscle) {
        try {
          var bb = hit.muscle.getBBox();
          if (bb.width > 0 && bb.height > 0) {
            var fx = (v.x - bb.x) / bb.width, fy = (v.y - bb.y) / bb.height;
            if (fy <= 0.38) sub = '上部';
            else if (fy >= 0.62) sub = '下部';
            else if (fx <= 0.38) sub = '左部';
            else if (fx >= 0.62) sub = '右部';
          }
        } catch (err) { /* getBBox 不可用时忽略细分 */ }
      }
      var payload = {
        side: side,
        vx: Math.round(v.x * 10) / 10,
        vy: Math.round(v.y * 10) / 10,
        muscleId: hit.muscle ? hit.muscle.dataset.id : null,
        sub: sub,
        clientX: e.clientX,
        clientY: e.clientY
      };
      if (view.onPick) view.onPick(payload);
    }

    // 双击空白翻转；双击肌肉/红点不翻
    // 例外：双击时第二下落在第一下刚造出的"无感受"空白点上 → 视为空白双击（撤销该点并翻转）
    svg.addEventListener('dblclick', function (e) {
      if (view.tcn) return; // 经络只在正面，中医模式禁止翻转
      var hit = hitAt(e.clientX, e.clientY);
      if (hit.muscle) return;
      if (hit.dot) {
        var dp = view.points[side].find(function (x) { return x.id === hit.dot.dataset.pid; });
        if (!dp || dp.feel || dp.muscleId || Date.now() - (dp._t || 0) > 800) return;
        removePoint(dp, side);
      }
      flip();
    });
  });

  return view;
}

/* ════════════════════════════════════════════════════════════
 * 四、流程状态
 * ════════════════════════════════════════════════════════════ */
var FEELS = ['酸痛', '僵硬', '无力', '其他'];
var flow = {
  points: [],
  pidSeq: 0,
  stage1: null,
  stage3: null
};

var pickPage, actionPage, sciencePage;
var feelCard, feelOtherBox;
var aiRecCache = null;      // llmRecommend 结果缓存（同一次采集内复用）
var aiRhythms = [];         // 页面二跟练节奏状态

function allPoints() { return flow.points; }

/* ════════════════════════════════════════════════════════════
 * 五、页面一：点选采集（纯红点，AI 翻译细节部位）
 * ════════════════════════════════════════════════════════════ */
function showPage(id) {
  $all('.page').forEach(function (p) { p.style.display = 'none'; });
  var pg = document.getElementById(id);
  pg.style.display = 'flex';
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', '#FFFFFF');
}

function buildFeelCard() {
  feelCard = el('div', 'ai-feel-card');
  feelCard.innerHTML =
    '<div class="ai-feel-title">这里是什么感觉？</div>' +
    '<div class="ai-feel-btns">' +
      FEELS.map(function (f) { return '<button type="button" data-feel="' + f + '">' + f + '</button>'; }).join('') +
    '</div>';
  feelOtherBox = el('div', 'ai-feel-other');
  feelOtherBox.innerHTML =
    '<input type="text" maxlength="20" placeholder="用自己的话描述，如：发麻、发紧" />' +
    '<button type="button" class="ai-feel-ok">确定</button>';
  feelOtherBox.style.display = 'none';
  feelCard.appendChild(feelOtherBox);
  feelCard.style.display = 'none';
  document.body.appendChild(feelCard);
}

function positionFeelCard(clientX, clientY) {
  feelCard.style.display = 'block';
  var rect = feelCard.getBoundingClientRect();
  var x = clientX - rect.width / 2;
  x = Math.max(8, Math.min(window.innerWidth - rect.width - 8, x));
  var y = clientY - rect.height - 14;
  if (y < 8) y = clientY + 18;
  feelCard.style.left = x + 'px';
  feelCard.style.top = y + 'px';
}
function hideFeelCard() {
  feelCard.style.display = 'none';
  feelOtherBox.style.display = 'none';
  feelOtherBox.querySelector('input').value = '';
}

function refreshPickSummary() {
  var sum = $('#ai-pick-summary');
  var next = $('#ai-pick-next');
  var set = flow.points.filter(function (p) { return p.feel; });
  if (set.length === 0) {
    sum.innerHTML = '<span class="ai-sum-empty">点一下不舒服的位置，告诉它你的感觉</span>';
    next.classList.add('ai-btn-disabled');
  } else {
    sum.innerHTML = set.map(function (p) {
      var feelTxt = p.feel === '其他' ? ('其他·' + p.freeText) : p.feel;
      return '<span class="ai-sum-tag">' + p.description + ' · ' + feelTxt + '</span>';
    }).join('');
    next.classList.remove('ai-btn-disabled');
  }
}

function initPickPage() {
  pickPage = document.getElementById('page-ai-pick');
  var stageBox = $('#ai-stage1');
  flow.stage1 = buildAiStage(stageBox, {
    onPick: function (payload) {
      hideFeelCard();
      var pid = 'p' + (++flow.pidSeq);
      var point = {
        id: pid, side: payload.side, vx: payload.vx, vy: payload.vy,
        muscleId: payload.muscleId,
        region: null, description: '',
        feel: null, freeText: '',
        _cx: payload.clientX, _cy: payload.clientY,
        _t: Date.now()
      };
      flow.points.push(point);
      flow.stage1.points[payload.side].push(point);
      flow.stage1.renderDots(payload.side);
      refreshPickSummary();
      MockAI.vlmLocate(payload).then(function (loc) {
        // 等待期间该点可能已被"双击翻转"撤销
        if (flow.points.indexOf(point) < 0) return;
        point.muscleId = loc.muscleId;
        point.region = loc.region;
        point.description = loc.description;
        refreshPickSummary();
        openFeelFor(point, payload.clientX, payload.clientY);
      });
    },
    onDotTap: function (point) {
      // 再点一下小红点 = 取消选择（无论是否已选感受）
      flow.points = flow.points.filter(function (x) { return x.id !== point.id; });
      flow.stage1.points[point.side] = flow.stage1.points[point.side].filter(function (x) { return x.id !== point.id; });
      flow.stage1.renderDots(point.side);
      if (feelCard.dataset.pid === point.id) hideFeelCard();
      refreshPickSummary();
    },
    onPointsRemoved: function (ids) {
      var map = {};
      ids.forEach(function (id) { map[id] = true; });
      var orphan = flow.points.find(function (p) { return map[p.id]; });
      flow.points = flow.points.filter(function (p) { return !map[p.id]; });
      if (orphan && feelCard.dataset.pid === orphan.id) hideFeelCard();
      refreshPickSummary();
    }
  });

  function openFeelFor(point, cx, cy) {
    feelCard.dataset.pid = point.id;
    positionFeelCard(cx, cy);
    feelOtherBox.style.display = point.feel === '其他' ? 'block' : 'none';
    $all('.ai-feel-btns button', feelCard).forEach(function (b) {
      b.classList.toggle('active', b.dataset.feel === point.feel);
    });
  }

  buildFeelCard();
  $all('.ai-feel-btns button', feelCard).forEach(function (b) {
    b.addEventListener('click', function () {
      var point = flow.points.find(function (p) { return p.id === feelCard.dataset.pid; });
      if (!point) { hideFeelCard(); return; }
      var feel = b.dataset.feel;
      if (feel === '其他') {
        point.feel = '其他';
        feelOtherBox.style.display = 'block';
        feelOtherBox.querySelector('input').focus();
        return;
      }
      point.feel = feel;
      point.freeText = '';
      afterFeelSet(point);
    });
  });
  feelOtherBox.querySelector('.ai-feel-ok').addEventListener('click', function () {
    var point = flow.points.find(function (p) { return p.id === feelCard.dataset.pid; });
    var val = feelOtherBox.querySelector('input').value.trim();
    if (!point || !val) return;
    point.freeText = val;
    afterFeelSet(point);
  });
  feelOtherBox.querySelector('input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') feelOtherBox.querySelector('.ai-feel-ok').click();
  });
  // 点卡片外关闭（未选感觉的点保留，等待重开）
  document.addEventListener('pointerdown', function (e) {
    if (feelCard.style.display !== 'none' &&
        !feelCard.contains(e.target) &&
        !e.target.closest('.ai-dot')) {
      hideFeelCard();
    }
  }, true);

  function afterFeelSet(point) {
    flow.stage1.renderDots(point.side);
    hideFeelCard();
    refreshPickSummary();
  }

  $('#ai-pick-back').addEventListener('click', function () {
    hideFeelCard();
    showPage('page-home');
  });
  $('#ai-pick-next').addEventListener('click', function () {
    var set = flow.points.filter(function (p) { return p.feel; });
    if (!set.length) return;
    hideFeelCard();
    aiRecCache = null;
    enterActionPage();
  });
}

/* ════════════════════════════════════════════════════════════
 * 六、页面二：动作推荐（沿用旧版一屏一动作布局，坐姿/站姿切换）
 * ════════════════════════════════════════════════════════════ */
// 内置节奏：保持型（拉伸/按压或剂量含秒）→ 倒计时；次数型 → N 次 ×（2 秒做 + 1 秒回位）
function buildRhythm(a) {
  var dose = a.dose || '';
  var isHold = /秒|分钟/.test(dose) || a.kind === 'release' || a.kind === 'stretch';
  if (isHold) {
    var secs = 30;
    var m = dose.match(/(\d+(?:\.\d+)?)\s*(秒|分钟)/);
    if (m) {
      secs = parseFloat(m[1]);
      if (m[2] === '分钟') secs *= 60;
    }
    return { mode: 'hold', total: Math.max(5, Math.min(60, Math.round(secs))) };
  }
  var reps = 10;
  var rm = dose.match(/(\d+)\s*次/);
  if (rm) reps = Math.max(3, Math.min(20, parseInt(rm[1], 10)));
  return { mode: 'reps', total: reps, active: 2, rest: 1 };
}

function stopAllAiRhythms() {
  aiRhythms.forEach(function (st) { if (st.timer) { clearTimeout(st.timer); st.timer = null; } });
}
function resetAiRhythm(st) {
  if (st.timer) { clearTimeout(st.timer); st.timer = null; }
  st.running = false; st.finished = false;
  st.cur = 0; st.left = st.r.total;
  st.countEl.classList.remove('done');
  st.countEl.textContent = st.r.mode === 'reps' ? '共 ' + st.r.total + ' 次' : '共 ' + st.r.total + ' 秒';
  st.phaseEl.textContent = '';
  st.doneEl.classList.remove('show');
  st.btnEl.textContent = '开始跟练';
  st.btnEl.classList.remove('ghost');
  if (st.r.mode === 'reps') st.dots.forEach(function (d) { d.classList.remove('on'); });
  else st.bar.style.width = '0%';
}
function bindAiRhythm(root, r) {
  var st = {
    root: root, r: r, timer: null, running: false, finished: false, cur: 0, left: r.total,
    countEl: root.querySelector('.avd-rhythm-count'),
    phaseEl: root.querySelector('.avd-phase'),
    vizEl: root.querySelector('.avd-rhythm-viz'),
    btnEl: root.querySelector('.avd-start'),
    doneEl: root.querySelector('.avd-done-tip'),
    dots: [], bar: null
  };
  if (r.mode === 'reps') {
    var dotsHtml = '';
    for (var i = 0; i < r.total; i++) dotsHtml += '<span class="avd-dot"></span>';
    st.vizEl.innerHTML = '<div class="avd-track">' + dotsHtml + '</div>';
    st.dots = Array.prototype.slice.call(st.vizEl.querySelectorAll('.avd-dot'));
  } else {
    st.vizEl.innerHTML = '<div class="avd-bar"><div class="avd-bar-fill"></div></div>';
    st.bar = st.vizEl.querySelector('.avd-bar-fill');
  }
  function finish() {
    st.running = false; st.finished = true;
    if (st.timer) { clearTimeout(st.timer); st.timer = null; }
    st.phaseEl.textContent = '';
    st.countEl.classList.add('done');
    st.countEl.textContent = '完成';
    st.doneEl.classList.add('show');
    st.btnEl.textContent = '再做一次';
    st.btnEl.classList.remove('ghost');
  }
  function repLoop() {
    st.cur += 1;
    if (st.cur > r.total) { finish(); return; }
    st.dots[st.cur - 1].classList.add('on');
    st.countEl.textContent = st.cur + ' / ' + r.total;
    st.phaseEl.textContent = '缓慢发力，保持 ' + r.active + ' 秒';
    st.timer = setTimeout(function () {
      if (st.cur < r.total) st.phaseEl.textContent = '回位放松';
      st.timer = setTimeout(repLoop, r.rest * 1000);
    }, r.active * 1000);
  }
  function holdTick() {
    st.left -= 1;
    if (st.left < 0) { finish(); return; }
    st.bar.style.width = Math.round((r.total - st.left) / r.total * 100) + '%';
    st.countEl.textContent = '还剩 ' + st.left + ' 秒';
    st.phaseEl.textContent = st.left <= 3 ? '最后坚持一下' : '保持住，自然呼吸';
    st.timer = setTimeout(holdTick, 1000);
  }
  function start() {
    aiRhythms.forEach(function (o) { if (o !== st && o.running) resetAiRhythm(o); });
    st.running = true; st.finished = false;
    st.cur = 0; st.left = r.total;
    st.countEl.classList.remove('done');
    st.doneEl.classList.remove('show');
    st.btnEl.textContent = '结束';
    st.btnEl.classList.add('ghost');
    if (r.mode === 'reps') repLoop();
    else { st.bar.style.width = '0%'; st.countEl.textContent = '还剩 ' + st.left + ' 秒'; st.phaseEl.textContent = '保持住，自然呼吸'; st.timer = setTimeout(holdTick, 1000); }
  }
  st.btnEl.addEventListener('click', function () {
    if (!st.running && !st.finished) start();
    else if (st.running) resetAiRhythm(st);
    else { resetAiRhythm(st); start(); }
  });
  resetAiRhythm(st);
  aiRhythms.push(st);
}

// 收藏（与旧版共用 localStorage key：bodymap_fav_actions，JSON 数组存动作 id）
function favList() {
  try { return JSON.parse(localStorage.getItem('bodymap_fav_actions') || '[]'); }
  catch (e) { return []; }
}
function isFav(id) { return favList().indexOf(id) >= 0; }
function toggleFav(id) {
  var l = favList();
  var i = l.indexOf(id);
  if (i >= 0) l.splice(i, 1); else l.push(id);
  localStorage.setItem('bodymap_fav_actions', JSON.stringify(l));
}

var FAV_STAR_SVG = '<svg viewBox="0 0 24 24"><path d="M12 2.5l3.09 6.26L22 9.77l-5 4.87 1.18 6.88L12 18.27l-6.18 3.25L7 14.64 2 9.77l6.91-1.01z"/></svg>';
var FIG_ICON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5.2" r="2.4"/><path d="M12 8.4v6.2M12 11l-4 2.4M12 11l4 2.4M12 14.6l-3.2 5.6M12 14.6l3.2 5.6"/></svg>';

// 一个动作 = 一整屏：双态示意图 + 标题 + 怎么做 + 跟练节奏 + 收藏星星
function actionScreenHtml(item) {
  var a = item.a;
  var h = '<div class="adv-action-screen" data-action-id="' + a.id + '">';
  h += '<div class="avd-figure avd-figure-v">'
    + '<div class="avd-fig"><img class="avd-fig-img" data-part="prep" alt="" aria-label="准备姿势"><span class="avd-fig-label">准备姿势</span></div>'
    + '<div class="avd-fig"><img class="avd-fig-img" data-part="complete" alt="" aria-label="完成动作"><span class="avd-fig-label">完成动作</span></div>'
    + '<button type="button" class="avd-fav-star' + (isFav(a.id) ? ' on' : '') + '" data-action-id="' + a.id + '" aria-label="收藏">' + FAV_STAR_SVG + '</button>'
    + '</div>';
  h += '<div class="avd-info">';
  h += '<h3 class="avd-name">' + a.name + '</h3>';
  h += '<p class="avd-step"><b class="avd-step-inline">怎么做：</b>' + (a.howto || '') + '</p>';
  h += '</div>';
  h += '<div class="avd-rhythm">';
  h += '<div class="avd-rhythm-head">';
  h += '<div class="avd-rhythm-title">' + (buildRhythm(a).mode === 'reps' ? '跟着节奏，一次一下' : '跟着节奏保持住') + '</div>';
  h += '<div class="avd-rhythm-count"></div>';
  h += '</div>';
  h += '<div class="avd-phase"></div>';
  h += '<div class="avd-rhythm-viz"></div>';
  h += '<button type="button" class="avd-start">开始跟练</button>';
  h += '<div class="avd-done-tip"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>完成，做得好</div>';
  h += '</div>';
  h += '</div>';
  return h;
}

function emptyActionScreenHtml(group) {
  return '<div class="adv-action-screen adv-action-empty">'
    + '<div><div class="adv-empty-emoji">🧘</div>'
    + '<p>这个姿势下暂时没有匹配的轻动作</p>'
    + '<p class="adv-empty-sub">点上方切换条，看看' + (group === 'sit' ? '站姿' : '坐姿') + '动作</p></div>'
    + '</div>';
}

var aiCurGroup = 'sit';
var aiRecSeq = 0;  // 渲染序号：快速切换坐/站时丢弃过期回调

function renderAiActionGroup(group) {
  var seq = ++aiRecSeq;
  aiCurGroup = group;
  stopAllAiRhythms();
  $all('#ai-act-tabs .adv-tab').forEach(function (t) {
    t.classList.toggle('active', t.dataset.pane === group);
  });
  var list = $('#ai-action-list');
  list.innerHTML = '<div class="ai-loading"><div class="ai-spinner"></div><div>AI 正在根据你的情况生成动作…</div></div>';

  function paint(res) {
    if (seq !== aiRecSeq) return;
    var items = group === 'sit' ? res.sit : res.stand;
    var screens = items.length
      ? items.map(actionScreenHtml).join('')
      : emptyActionScreenHtml(group);
    var dots = '';
    if (items.length > 1) {
      dots = '<div class="adv-vdots">';
      for (var i = 0; i < items.length; i++) dots += '<i' + (i === 0 ? ' class="on"' : '') + '></i>';
      dots += '</div>';
    }
    list.innerHTML = '<section class="adv-pane adv-pane-actions">' + screens + '</section>' + dots;
    fillActionImages(list);

    // 绑定跟练节奏
    $all('.adv-action-screen[data-action-id]', list).forEach(function (scr) {
      var a = ACTIONS.find(function (x) { return x.id === scr.dataset.actionId; });
      if (a) bindAiRhythm(scr, buildRhythm(a));
    });
    // 纵滑指示点同步
    var sec = $('.adv-pane-actions', list);
    var vdots = $all('.adv-vdots i', list);
    if (sec && vdots.length) {
      sec.addEventListener('scroll', function () {
        var idx = Math.round(sec.scrollTop / Math.max(1, sec.clientHeight));
        vdots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
      }, { passive: true });
    }
  }

  if (aiRecCache) { paint(aiRecCache); return; }
  MockAI.llmRecommend(flow.points.filter(function (p) { return p.feel; })).then(function (res) {
    aiRecCache = res;
    paint(res);
  });
}

function enterActionPage() {
  showPage('page-ai-action');
  renderAiActionGroup('sit');
}

function initActionPage() {
  actionPage = document.getElementById('page-ai-action');
  $('#ai-action-back').addEventListener('click', function () {
    stopAllAiRhythms();
    showPage('page-ai-pick');
  });
  $('#ai-act-tabs').addEventListener('click', function (e) {
    var b = e.target.closest('.adv-tab');
    if (!b || b.dataset.pane === aiCurGroup) return;
    renderAiActionGroup(b.dataset.pane);
  });
  // 收藏星星（事件委托）
  $('#ai-action-list').addEventListener('click', function (e) {
    var star = e.target.closest('.avd-fav-star');
    if (!star) return;
    var id = star.dataset.actionId;
    toggleFav(id);
    star.classList.toggle('on', isFav(id));
  });
  $('#ai-action-why').addEventListener('click', function () {
    stopAllAiRhythms();
    enterSciencePage();
  });
}

/* ════════════════════════════════════════════════════════════
 * 七、页面三：科普页（双 Tab：西医 · 肌肉 / 中医 · 经络）
 * ════════════════════════════════════════════════════════════ */
var sciCache = { west: null, tcn: null };  // 两种模式的 AI 结果缓存
var sciMode = 'west';
var sciRenderSeq = 0;  // 渲染序号：快速切换 Tab 时丢弃过期回调

function renderWestPane() {
  var seq = ++sciRenderSeq;
  sciMode = 'west';
  $all('#ai-sc-tabs .adv-tab').forEach(function (t) {
    t.classList.toggle('active', t.dataset.pane === 'west');
  });
  var fh = $('#ai-science-stage .flip-hint');
  if (fh) fh.style.display = '';
  flow.stage3.exitTcnMode();
  var bodyEl = $('#ai-science-body');
  bodyEl.innerHTML = '<div class="ai-loading ai-loading-sm"><div class="ai-spinner"></div><div>AI 正在判断相关肌肉…</div></div>';
  $('#ai-science-stage').style.display = 'none';
  function paint(res) {
    if (seq !== sciRenderSeq) return;
    $('#ai-science-stage').style.display = '';
    // 上图下卡：总体介绍卡整合提示行（左对齐）
    bodyEl.innerHTML =
      '<div class="ai-sum-card"><div class="ai-sum-title">AI 肌肉判断</div>' +
        '<p>' + res.summary + '</p>' +
        '<p class="ai-sum-tip">图中高亮肌肉为 AI 判断结果，点一下肌肉查看机理解释。</p>' +
      '</div>';
    flow.stage3.resetView();
    flow.stage3.resetPoints();
    flow.stage3.clearHighlight();
    flow.stage3.setHighlight(res.muscleIds);
  }
  if (sciCache.west) { paint(sciCache.west); return; }
  MockAI.vlmHighlight(flow.points).then(function (res) {
    sciCache.west = res;
    paint(res);
  });
}

function renderTcnPane() {
  var seq = ++sciRenderSeq;
  sciMode = 'tcn';
  $all('#ai-sc-tabs .adv-tab').forEach(function (t) {
    t.classList.toggle('active', t.dataset.pane === 'tcn');
  });
  flow.stage3.resetView();
  flow.stage3.resetPoints();
  var fh = $('#ai-science-stage .flip-hint');
  if (fh) fh.style.display = 'none'; // 经络只在正面，不提示翻转
  var bodyEl = $('#ai-science-body');
  bodyEl.innerHTML = '<div class="ai-loading ai-loading-sm"><div class="ai-spinner"></div><div>AI 正在循经判断相关经络…</div></div>';
  $('#ai-science-stage').style.display = 'none';
  function paint(res) {
    if (seq !== sciRenderSeq) return;
    $('#ai-science-stage').style.display = '';
    // 上图下卡：总体介绍卡整合提示行（左对齐）
    bodyEl.innerHTML =
      '<div class="ai-sum-card"><div class="ai-sum-title">AI 循经判断</div>' +
        '<p>' + res.summary + '</p>' +
        '<p class="ai-sum-tip">图中高亮经脉与穴位为 AI 判断结果，点一下经脉线或穴位查看中医解释。</p>' +
      '</div>';
    flow.stage3.enterTcnMode();
    flow.stage3.setMeridianHl(res.meridianIds, res.acuIds);
  }
  if (sciCache.tcn) { paint(sciCache.tcn); return; }
  MockAI.llmMeridian(flow.points).then(function (res) {
    sciCache.tcn = res;
    paint(res);
  });
}

function enterSciencePage() {
  showPage('page-ai-science');
  sciCache = { west: null, tcn: null };
  renderWestPane();
}

// 解释卡：type = muscle / acu / meridian
// 点开的元素加 .picked 变实心（科普页半透明模式下突出当前查看项），关闭后恢复半透明
function markPicked(query) {
  var v3 = flow.stage3;
  if (!v3) return;
  ['front', 'back'].forEach(function (s) {
    if (!v3[s]) return;
    $all('.ai-m.picked, .ai-meridian.picked, .ai-acu.picked', v3[s].svg).forEach(function (n) {
      n.classList.remove('picked');
    });
    if (query) $all(query, v3[s].svg).forEach(function (n) { n.classList.add('picked'); });
  });
}
function openExplain(type, id) {
  var sheet = $('#ai-explain-sheet');
  var mask = $('#ai-explain-mask');
  var content = $('#ai-explain-content');
  if (type === 'muscle') markPicked('.ai-m[data-id="' + id + '"]');
  else if (type === 'acu') markPicked('.ai-acu[data-aid="' + id + '"]');
  else markPicked('.ai-meridian[data-mid="' + id + '"]');
  content.innerHTML = '<div class="ai-loading ai-loading-sm"><div class="ai-spinner"></div><div>AI 正在生成解释…</div></div>';
  sheet.classList.add('show');
  mask.classList.add('show');
  if (type === 'muscle') {
    var point = flow.points.find(function (p) { return p.muscleId === id; }) || flow.points[0];
    MockAI.llmExplain({ muscleId: id, feel: point ? point.feel : null }).then(function (r) {
      content.innerHTML =
        '<div class="ai-explain-name">' + r.name + '</div>' +
        '<div class="ai-explain-row"><div class="ai-explain-label">生理功能</div>' +
          '<div class="ai-explain-txt">' + r.func + '</div></div>' +
        '<div class="ai-explain-row"><div class="ai-explain-label">常见原因</div>' +
          '<div class="ai-explain-txt">' + r.cause + '</div></div>' +
        '<div class="ai-explain-note">' + r.note + '</div>';
    });
  } else if (type === 'acu') {
    MockAI.llmAkuCard({ acuId: id }).then(function (r) {
      content.innerHTML =
        '<div class="ai-explain-name">' + r.name + '</div>' +
        '<div class="ai-explain-sub">' + r.meridian + ' · ' + r.location + '</div>' +
        '<div class="ai-explain-row"><div class="ai-explain-label">常用调理</div>' +
          '<div class="ai-explain-txt">' + r.effects + '</div></div>' +
        '<div class="ai-explain-row"><div class="ai-explain-label">取穴机理</div>' +
          '<div class="ai-explain-txt">' + r.principle + '</div></div>' +
        '<div class="ai-explain-note">' + r.note + '</div>';
    });
  } else {
    MockAI.llmMeridianCard({ meridianId: id }).then(function (r) {
      content.innerHTML =
        '<div class="ai-explain-name">' + r.name + '</div>' +
        '<div class="ai-explain-sub">' + r.group + '</div>' +
        '<div class="ai-explain-row"><div class="ai-explain-label">循行路线</div>' +
          '<div class="ai-explain-txt">' + r.runs + '</div></div>' +
        '<div class="ai-explain-row"><div class="ai-explain-label">中医机理</div>' +
          '<div class="ai-explain-txt">' + r.principle + '</div></div>' +
        '<div class="ai-explain-note">' + r.note + '</div>';
    });
  }
}
function closeExplain() {
  markPicked(null);
  $('#ai-explain-sheet').classList.remove('show');
  $('#ai-explain-mask').classList.remove('show');
}

function initSciencePage() {
  var stageBox = $('#ai-science-stage');
  flow.stage3 = buildAiStage(stageBox, {
    highlightOnly: true,
    meridianLayer: true,
    onPick: function () { /* 高亮模式不允许新增点 */ },
    onDotTap: function () {},
    // 西医：点高亮肌肉；中医：点高亮经脉/穴位
    onMuscleTap: function (id) { openExplain('muscle', id); },
    onMeridianTap: function (id) { openExplain('meridian', id); },
    onAcuTap: function (id) { openExplain('acu', id); }
  });
  // 科普页半透明模式：人体/肌肉微透，选中项点开解释卡时变实心
  $all('.ai-svg', stageBox).forEach(function (s) { s.classList.add('soft'); });

  // 双 Tab 切换
  $('#ai-sc-tabs').addEventListener('click', function (e) {
    var b = e.target.closest('.adv-tab');
    if (!b || b.dataset.pane === sciMode) return;
    closeExplain();
    if (b.dataset.pane === 'west') renderWestPane();
    else renderTcnPane();
  });

  $('#ai-explain-mask').addEventListener('click', closeExplain);

  $('#ai-science-back').addEventListener('click', function () {
    closeExplain();
    showPage('page-ai-action');
  });
  $('#ai-science-home').addEventListener('click', function () {
    closeExplain();
    flow.points = [];
    aiRecCache = null;
    sciCache = { west: null, tcn: null };
    flow.stage1.resetView(); flow.stage1.resetPoints();
    flow.stage3.resetView(); flow.stage3.clearHighlight();
    flow.stage3.exitTcnMode();
    hideFeelCard();
    refreshPickSummary();
    showPage('page-home');
  });
}

/* ════════════════════════════════════════════════════════════
 * 八、收藏页详情（复刻动作推荐屏：上图下文 + 跟练卡）
 * ════════════════════════════════════════════════════════════ */
function renderFavDetail(container, actionId) {
  var a = ACTIONS.find(function (x) { return x.id === actionId; });
  if (!a || !container) return false;
  stopAllAiRhythms();
  container.innerHTML = '<section class="adv-pane adv-pane-actions">' + actionScreenHtml({ a: a }) + '</section>';
  fillActionImages(container);
  var scr = $('.adv-action-screen', container);
  if (scr) {
    bindAiRhythm(scr, buildRhythm(a));
    var star = $('.avd-fav-star', scr);
    if (star) star.addEventListener('click', function () {
      toggleFav(a.id);
      star.classList.toggle('on', isFav(a.id));
    });
  }
  return true;
}

function closeFavDetail(container) {
  stopAllAiRhythms();
  if (container) container.innerHTML = '';
}

/* ════════════════════════════════════════════════════════════
 * 九、启动
 * ════════════════════════════════════════════════════════════ */
function start() {
  flow.points = [];
  aiRecCache = null;
  stopAllAiRhythms();
  closeExplain();
  flow.stage1.resetView();
  flow.stage1.resetPoints();
  hideFeelCard();
  refreshPickSummary();
  showPage('page-ai-pick');
}

window.addEventListener('DOMContentLoaded', function () {
  initPickPage();
  initActionPage();
  initSciencePage();
  window.AIFlow = { start: start, renderFavDetail: renderFavDetail, closeFavDetail: closeFavDetail };
  // 首页「开始诊断」按钮改向到 AI 流程
  var btn = document.getElementById('start-diagnosis');
  if (btn) {
    var cloned = btn.cloneNode(true);
    btn.parentNode.replaceChild(cloned, btn);
    cloned.addEventListener('click', function () {
      var hk = document.getElementById('home-know');
      if (hk) hk.classList.remove('show');
      start();
    });
  }
});
