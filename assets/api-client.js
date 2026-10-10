// api-client.js — 前端 AI 接口封装（与 MockAI 二选一，失败自动回退 MockAI）
// 用法（新 UI 代码里）：
//   const { locate, recommend, actionImage, scienceWest, scienceTcm } = AIClient;
//   const rec = await recommend(points);  // 失败自动回退 MockAI 并适配为 API 格式
//
// 接线方式（等 UI 协作者合并后，把 ai-flow.js 里的 MockAI.xxx 换成 AIClient.xxx）：
//   MockAI.vlmLocate(payload)    → AIClient.locate(payload)
//   MockAI.llmRecommend(points)  → AIClient.recommend(points)
//   MockAI.vlmHighlight(points)  → AIClient.highlight(points)  (内部调 /science/west)
//   MockAI.llmExplain({muscleId,feel}) → AIClient.muscleExplain({muscleId,feel})
//   MockAI.llmMeridian(points)   → AIClient.meridianSummary(points)
//   MockAI.llmAkuCard({acuId})    → AIClient.acuCard({acuId})
//   MockAI.llmMeridianCard({meridianId}) → AIClient.meridianCard({meridianId})
//
// 收藏结构变更（见 API_CONTRACT.md 第 6 节）：localStorage key 不变，值改为 Action JSON 快照数组。

/* global MockAI, ACTIONS, muscleById, meridianById, acuById, acuPrincipleOf */
/* global MUSCLES, REGIONS4 */

const API_BASE = '/api/ai';
const TIMEOUT_MS = { locate: 30000, recommend: 60000, actionImage: 70000, science: 45000 };

// ---- fetch 封装 ----
async function post(path, body, timeoutMs) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error?.code || `HTTP ${r.status}`);
    }
    return await r.json();
  } finally {
    clearTimeout(timer);
  }
}

// ---- SVG → PNG dataURL（给 /locate 用）----
function svgToPngDataUrl(svgEl) {
  return new Promise((resolve, reject) => {
    const xml = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([xml], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = svgEl.viewBox?.baseVal?.width || svgEl.clientWidth || 200;
      c.height = svgEl.viewBox?.baseVal?.height || svgEl.clientHeight || 460;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/png'));
    };
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}

// ===================== AIClient =====================
const AIClient = {
  USE_REAL: true, // false 时纯走 MockAI（调试用）

  // ---- /locate ----
  async locate(payload) {
    if (!this.USE_REAL) return this._mockLocate(payload);
    try {
      const image = await svgToPngDataUrl(payload.svgEl);
      const data = await post('/locate', {
        side: payload.side,
        image,
        points: [{
          index: 0,
          x: Math.round(payload.vx),
          y: Math.round(payload.vy),
          muscleId: payload.muscleId || undefined,
          region: payload.region || undefined,
        }],
      }, TIMEOUT_MS.locate);
      const r = data.results[0];
      return {
        muscleId: payload.muscleId || null,
        region: r.region || payload.region,
        description: r.description,
        sideLabel: r.sideLabel,
      };
    } catch (e) {
      console.warn('[AIClient] locate failed, fallback to MockAI:', e.message);
      return this._mockLocate(payload);
    }
  },

  // ---- /recommend ----
  async recommend(points) {
    if (!this.USE_REAL) return this._mockRecommend(points);
    try {
      const data = await post('/recommend', { points }, TIMEOUT_MS.recommend);
      // API 返回 Action 对象数组；前端渲染时直接用 Action 字段
      // 适配旧 UI 代码（如果还需要 {a, target} 格式，在 _adaptAction 里转）
      return {
        sit: data.sit || [],
        stand: data.stand || [],
        _isAI: true, // 标记：新格式（Action 对象），不是旧 {a, target} 格式
      };
    } catch (e) {
      console.warn('[AIClient] recommend failed, fallback to MockAI:', e.message);
      return this._mockRecommend(points);
    }
  },

  // ---- /action-image ----
  async actionImage(action) {
    if (!this.USE_REAL) return { url: '' };
    try {
      const data = await post('/action-image', {
        slug: action.slug,
        imageSpec: action.imageSpec,
        prompt: action.imagePrompt,
      }, TIMEOUT_MS.actionImage);
      return data; // { url }
    } catch (e) {
      console.warn('[AIClient] actionImage failed:', e.message);
      return { url: '', error: e.message };
    }
  },

  // ---- /science/west（替代 vlmHighlight + llmExplain）----
  async scienceWest(points) {
    if (!this.USE_REAL) return this._mockScienceWest(points);
    try {
      const data = await post('/science/west', { points }, TIMEOUT_MS.science);
      return data; // { summary, muscles: [{id, name, func, cause, note}] }
    } catch (e) {
      console.warn('[AIClient] scienceWest failed, fallback to MockAI:', e.message);
      return this._mockScienceWest(points);
    }
  },

  // ---- /science/tcm（替代 llmMeridian + llmAkuCard + llmMeridianCard）----
  async scienceTcm(points) {
    if (!this.USE_REAL) return this._mockScienceTcm(points);
    try {
      const data = await post('/science/tcm', { points }, TIMEOUT_MS.science);
      return data; // { summary, meridians: [...], acupoints: [...] }
    } catch (e) {
      console.warn('[AIClient] scienceTcm failed, fallback to MockAI:', e.message);
      return this._mockScienceTcm(points);
    }
  },

  // ===================== MockAI 降级适配 =====================
  // 把 MockAI 的旧格式输出适配成 API 新格式，让新 UI 代码无感降级

  _mockLocate(payload) {
    return MockAI.vlmLocate(payload);
  },

  _mockRecommend(points) {
    // MockAI 返回 {sit: [{a, target}, ...], stand: [...]}
    // 适配为 Action 对象格式（与 API_CONTRACT.md 一致）
    return MockAI.llmRecommend(points).then((res) => {
      const adapt = (group) => (group || []).map((item) => {
        const a = item.a;
        return {
          slug: `${a.posture}-${a.id}`,
          name: a.name,
          kind: a.kind || 'stretch',
          targetMuscle: item.target || '',
          howto: Array.isArray(a.howto) ? a.howto : (a.howto ? a.howto.split(/[；;\n]/).filter(Boolean) : []),
          dose: a.dose || '',
          why: a.why || '',
          caution: a.caution || '',
          rhythm: a.rhythm || { mode: 'reps', count: 10 },
          imageSpec: null, // MockAI 没有 imageSpec，不生图
          imagePrompt: '',
          _isMock: true,
        };
      });
      return { sit: adapt(res.sit), stand: adapt(res.stand), _isMock: true };
    });
  },

  _mockScienceWest(points) {
    // MockAI 分两步：vlmHighlight（拿 muscleIds + summary）+ llmExplain（逐块解释）
    return MockAI.vlmHighlight(points).then((hi) => {
      const muscles = (hi.muscleIds || []).slice(0, 3).map((id) => {
        const m = muscleById(id);
        if (!m) return null;
        // 找该肌肉对应的点感受
        const pt = points.find((p) => p.muscleId === id);
        return MockAI.llmExplain({ muscleId: id, feel: pt ? pt.feel : null }).then((r) => ({
          id, name: m.name, func: r.func, cause: r.cause, note: r.note,
        }));
      }).filter(Boolean);
      return Promise.all(muscles).then((ms) => ({
        summary: hi.summary,
        muscles: ms,
        _isMock: true,
      }));
    });
  },

  _mockScienceTcm(points) {
    return MockAI.llmMeridian(points).then((m) => {
      const meridians = (m.meridianIds || []).slice(0, 2).map((id) => {
        const md = meridianById(id);
        if (!md) return null;
        return MockAI.llmMeridianCard({ meridianId: id }).then((c) => ({
          id, name: md.name, route: c.runs, mechanism: c.principle,
        }));
      }).filter(Boolean);
      const acupoints = (m.acuIds || []).slice(0, 3).map((id) => {
        const a = acuById(id);
        if (!a) return null;
        return MockAI.llmAkuCard({ acuId: id }).then((c) => ({
          id, name: c.name, meridian: c.meridian, location: c.location,
          benefit: c.effects, mechanism: c.principle,
        }));
      }).filter(Boolean);
      return Promise.all([...meridians, ...acupoints]).then((cards) => ({
        summary: m.summary,
        meridians: cards.slice(0, 2),
        acupoints: cards.slice(2, 5),
        note: m.note,
        _isMock: true,
      }));
    });
  },

  // ===================== 收藏快照 =====================
  // AI 推荐的动作没有固定库 id，收藏时存完整 JSON 快照
  favSave(action, imageUrl) {
    const KEY = 'bodymap_fav_actions';
    let list = [];
    try { list = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { list = []; }
    // 去重：同 slug 只留最新
    list = list.filter((x) => x.slug !== action.slug);
    list.unshift({
      slug: action.slug,
      name: action.name,
      kind: action.kind,
      targetMuscle: action.targetMuscle,
      howto: action.howto,
      dose: action.dose,
      why: action.why,
      caution: action.caution,
      rhythm: action.rhythm,
      imageUrl: imageUrl || '',
      savedAt: Date.now(),
    });
    if (list.length > 100) list = list.slice(0, 100);
    localStorage.setItem(KEY, JSON.stringify(list));
    return true;
  },

  favList() {
    try { return JSON.parse(localStorage.getItem('bodymap_fav_actions') || '[]'); }
    catch { return []; }
  },

  favRemove(slug) {
    const KEY = 'bodymap_fav_actions';
    let list = [];
    try { list = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return; }
    list = list.filter((x) => x.slug !== slug);
    localStorage.setItem(KEY, JSON.stringify(list));
  },

  favHas(slug) {
    try { return JSON.parse(localStorage.getItem('bodymap_fav_actions') || '[]').some((x) => x.slug === slug); }
    catch { return false; }
  },
};

// 导出给全局（body_preview.html 直接引入，不打包）
if (typeof window !== 'undefined') {
  window.AIClient = AIClient;
}
