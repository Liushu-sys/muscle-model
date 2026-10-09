// ai-flow.js —— AI 驱动实验流程（VLM 看图定位 + LLM 文案生成）
// 当前为 UI + Mock 阶段：所有 AI 接口由 MockAI 模拟（含网络延迟与 loading 体验）。
// key 到位后，仅需把 MockAI 四个方法内部替换为对阿里云转发接口的 fetch 调用，
// 入参/出参签名保持不变，页面层零改动。
import { ACTIONS, MUSCLES } from './mm-engine.js?v=261';

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
// 左右侧判定：正面 x<100 为人体右侧；背面 x<100 为人体左侧（项目既定规则）
function sideLabelOf(side, vx) {
  if (vx >= 95 && vx <= 105) return '';
  if (side === 'front') return vx < 100 ? '右侧' : '左侧';
  return vx < 100 ? '左侧' : '右侧';
}
function muscleById(id) {
  for (var i = 0; i < MUSCLES.length; i++) if (MUSCLES[i].id === id) return MUSCLES[i];
  return null;
}

var MockAI = {
  // VLM：人体图 + 点击坐标 → 细节部位描述（如"左侧腋下靠近胸大肌的位置"）
  // mock：命中肌肉 → "左侧+肌肉名+附近"；空白区 → 侧别+区域名。
  // 仅处理人体内点击（stage 层已过滤人体外点击）。
  vlmLocate: function (payload) {
    return delay(450).then(function () {
      var label = sideLabelOf(payload.side, payload.vx);
      if (payload.muscleId) {
        var m = muscleById(payload.muscleId);
        if (m) {
          return {
            muscleId: m.id,
            region: m.region,
            description: label + m.name + '附近'
          };
        }
      }
      var z = zoneOfBlank(payload.side, payload.vx, payload.vy);
      return {
        muscleId: null,
        region: z.region,
        description: label + z.name
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

  // VLM：根据采集的部位+感受，在肌肉白名单内判断可能相关的肌肉（不区分过紧/过松）
  // mock：点中肌肉 → 该肌肉 + 同区域关联肌肉；空白区域点 → 该区域代表肌肉
  vlmHighlight: function (points) {
    return delay(600).then(function () {
      var ids = [], seen = {};
      function add(id) { if (id && !seen[id]) { seen[id] = true; ids.push(id); } }
      function sameRegion(region, side, n) {
        if (!region) return [];
        var sameSide = MUSCLES.filter(function (m) { return m.region === region && m.side === side; });
        var anySide = MUSCLES.filter(function (m) { return m.region === region; });
        return sameSide.concat(anySide).slice(0, n);
      }
      points.forEach(function (p) {
        if (p.muscleId) {
          add(p.muscleId);
          sameRegion(p.region, p.side, 3).forEach(function (m) { add(m.id); });
        } else {
          sameRegion(p.region, p.side, 2).forEach(function (m) { add(m.id); });
        }
      });
      return { muscleIds: ids.slice(0, 6) };
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
  }
};

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

    // pointer capture 会把 pointerup 的 e.target 重定向到 svg，
    // 因此松手时用 elementFromPoint 重新做命中检测
    function hitAt(cx, cy) {
      var elHere = document.elementFromPoint(cx, cy);
      if (!elHere || !svg.contains(elHere)) return { dot: null, muscle: null, inside: false };
      return {
        dot: elHere.closest('.ai-dot'),
        muscle: elHere.closest('.ai-m'),
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
      var payload = {
        side: side,
        vx: Math.round(v.x * 10) / 10,
        vy: Math.round(v.y * 10) / 10,
        muscleId: hit.muscle ? hit.muscle.dataset.id : null,
        clientX: e.clientX,
        clientY: e.clientY
      };
      if (view.onPick) view.onPick(payload);
    }

    // 双击空白翻转；双击肌肉/红点不翻
    // 例外：双击时第二下落在第一下刚造出的"无感受"空白点上 → 视为空白双击（撤销该点并翻转）
    svg.addEventListener('dblclick', function (e) {
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
    onDotTap: function (point, e) {
      // 已设感受的点：再点一次直接取消；未设感受：重新打开感受卡
      if (point.feel) {
        flow.points = flow.points.filter(function (x) { return x.id !== point.id; });
        flow.stage1.points[point.side] = flow.stage1.points[point.side].filter(function (x) { return x.id !== point.id; });
        flow.stage1.renderDots(point.side);
        if (feelCard.dataset.pid === point.id) hideFeelCard();
        refreshPickSummary();
        return;
      }
      openFeelFor(point, e.clientX, e.clientY);
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

// 一个动作 = 一整屏：标签 + 针对肌肉 + 双态示意图 + 介绍 + 跟练节奏 + 收藏星星
function actionScreenHtml(item) {
  var a = item.a;
  var tag;
  if (a.forState === 'tight') tag = '<span class="adv-tag adv-tag-relief">放松</span>';
  else if (a.forState === 'weak') tag = '<span class="adv-tag adv-tag-strengthen">强化</span>';
  else tag = '<span class="adv-tag adv-tag-active">活动</span>';
  var h = '<div class="adv-action-screen" data-action-id="' + a.id + '">';
  h += '<div class="adv-screen-tag">' + tag +
    (item.target ? '<span class="avd-target">针对 <b>' + item.target + '</b></span>' : '') +
    '</div>';
  h += '<div class="avd-figure">'
    + '<div class="avd-fig">' + FIG_ICON_SVG + '<span class="avd-fig-label">准备姿势</span></div>'
    + '<div class="avd-fig">' + FIG_ICON_SVG + '<span class="avd-fig-label">完成动作</span></div>'
    + '<button type="button" class="avd-fav-star' + (isFav(a.id) ? ' on' : '') + '" data-action-id="' + a.id + '" aria-label="收藏">' + FAV_STAR_SVG + '</button>'
    + '</div>';
  h += '<div class="avd-info">';
  h += '<h3 class="avd-name">' + a.name + '</h3>';
  if (a.why) h += '<p class="avd-purpose">' + a.why + '</p>';
  h += '<p class="avd-step-label">怎么做</p>';
  h += '<p class="avd-step">' + (a.howto || '') + '</p>';
  if (a.dose) h += '<div class="avd-dose">建议剂量：' + a.dose + '</div>';
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

function renderAiActionGroup(group) {
  aiCurGroup = group;
  stopAllAiRhythms();
  $all('#ai-act-tabs .adv-tab').forEach(function (t) {
    t.classList.toggle('active', t.dataset.pane === group);
  });
  var list = $('#ai-action-list');
  list.innerHTML = '<div class="ai-loading"><div class="ai-spinner"></div><div>AI 正在根据你的情况生成动作…</div></div>';

  function paint(res) {
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
 * 七、页面三：西医科普（AI 白名单内判断相关肌肉 → 统一橘色高亮）
 * ════════════════════════════════════════════════════════════ */
function enterSciencePage() {
  showPage('page-ai-science');
  var bodyEl = $('#ai-science-body');
  bodyEl.innerHTML = '<div class="ai-loading ai-loading-sm"><div class="ai-spinner"></div><div>AI 正在判断相关肌肉…</div></div>';
  $('#ai-science-stage').style.display = 'none';
  MockAI.vlmHighlight(flow.points).then(function (res) {
    $('#ai-science-stage').style.display = '';
    bodyEl.innerHTML = '<div class="ai-science-hint">高亮区域为 AI 判断与你不适位置相关的肌肉，点一下肌肉查看机理解释</div>';
    flow.stage3.resetView();
    flow.stage3.resetPoints();
    flow.stage3.clearHighlight();
    flow.stage3.setHighlight(res.muscleIds);
  });
}

function openExplain(id) {
  var sheet = $('#ai-explain-sheet');
  var mask = $('#ai-explain-mask');
  var content = $('#ai-explain-content');
  content.innerHTML = '<div class="ai-loading ai-loading-sm"><div class="ai-spinner"></div><div>AI 正在生成机理解释…</div></div>';
  sheet.classList.add('show');
  mask.classList.add('show');
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
}
function closeExplain() {
  $('#ai-explain-sheet').classList.remove('show');
  $('#ai-explain-mask').classList.remove('show');
}

function initSciencePage() {
  var stageBox = $('#ai-science-stage');
  flow.stage3 = buildAiStage(stageBox, {
    highlightOnly: true,
    onPick: function () { /* 高亮模式不允许新增点 */ },
    onDotTap: function () {},
    // 点击高亮肌肉 → 底部弹出解释卡
    onMuscleTap: function (id) { openExplain(id); }
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
    flow.stage1.resetView(); flow.stage1.resetPoints();
    flow.stage3.resetView(); flow.stage3.clearHighlight();
    hideFeelCard();
    refreshPickSummary();
    showPage('page-home');
  });
}

/* ════════════════════════════════════════════════════════════
 * 八、启动
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
  window.AIFlow = { start: start };
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
