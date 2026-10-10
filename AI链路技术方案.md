# AI 链路技术方案（全 AI 动作推荐版）

> 版本：v2 / 2026-10-10
> 状态：已确认 provider 切换为 AI Ping（OpenAI 兼容），百炼保留为 fallback
> 关联：`assets/img/actions/IMAGE_PROMPT_SPEC.md`（生图指令撰写规范）、`assets/ai-flow.js`（当前 MockAI 实现）
> 范围：把现有本地规则引擎（MockAI）替换为真实模型调用；前端 UI 改造由协作者并行进行，双方只通过本文档的数据契约耦合。

---

## 1. 目标与原则

1. 三个模型能力全部接入：**视觉定位（看图）、文本推理（推荐/解释/写生图指令）、参考主体生图**。
2. 模型只负责「判断与生成」，**框架、安全、白名单、降级由代码保证**。
3. **API key 只存在服务器环境变量**，前端永不接触。
4. 现有 MockAI 规则引擎保留为离线/故障降级方案，任何 AI 端点失败都不允许白屏。
5. 接口契约先冻结：前端（含 UI 协作者）只认本文档第 5 节 JSON 结构，不关心后端实现。

## 2. 系统架构

```
┌──────────────────────────┐
│ 手机浏览器 PWA（静态文件） │  body_preview.html + ai-flow.js + api-client.js(新)
│  本地：几何命中/红旗筛查    │
└────────────┬─────────────┘
             │ HTTPS 同源 /api/ai/*
┌────────────▼─────────────┐
│ 阿里云 47.82.159.182       │
│  Caddy (443/80)           │  静态站 /var/www/3x3
│   └─ 反代 /api/* ─────────┼─► ai-relay 服务 (127.0.0.1:8790, systemd 常驻)
└───────────────────────────┘        │
                                     │ 服务端持有 API_KEY（AI Ping key）
                          ┌──────────▼───────────┐
                          │ AI Ping（一站式聚合）  │
                          │ https://aiping.cn/api/v1 │
                          │ 文本: qwen-plus / GLM-4.7 │
                          │ 视觉: qwen-vl-max      │
                          │ 生图: Wan 图像编辑      │
                          │ (600+模型，一个key全搞定) │
                          └──────────────────────┘
```

要点：
- 前端仍为纯静态，部署路径不变（`/var/www/3x3/`）。
- 新增一个**轻量 Node 转发服务 ai-relay**（Node 18+，仅一个进程，零外部依赖或仅 express），key 从环境变量读取。
- Caddy 增加一段反代：`/api/* → 127.0.0.1:8790`，对外仍是同一个源，无跨域问题。
- 生图结果由 ai-relay 落盘缓存（同一生图请求永不重复计费）。

## 3. 全链路与模型调用时序

| # | 环节 | 位置 | 模型 | 同步/异步 |
|---|---|---|---|---|
| 0 | 点击几何命中、红旗词筛查 | 前端本地 | 无 | 同步 |
| 1 | 红点坐标 → 精准部位描述 | ai-relay | qwen-vl-max | 同步（批量） |
| 2 | 部位+感受 → 坐/站动作推荐 | ai-relay | qwen-plus | 同步 |
| 3 | 每个动作 → 九段式生图指令 | 与 #2 同一次调用产出 | qwen-plus | — |
| 4 | 生图指令+基准图 → 动作图 | ai-relay | 万相图像编辑（T3 两阶段两次调用） | 服务端内部轮询，前端一次请求等待 |
| 5 | 西医肌肉判断+解释（一次出齐） | ai-relay | qwen-plus | 同步 |
| 6 | 中医经脉穴位判断+解释（一次出齐） | ai-relay | qwen-plus | 同步 |

一次完整诊断的模型调用次数：视觉 1 + 推荐 1 + 生图 ≤6（T3 各 ×2）+ 西医 1 + 中医 1 ≈ **最多 15 次**。

## 4. HTTP 接口契约（冻结后不可单方变更）

基址：同源 `/api/ai`。全部 POST，`Content-Type: application/json`（定位接口含图片字段时用 JSON 内嵌 dataURL）。
统一错误体：`{"error":{"code":"UPSTREAM_TIMEOUT"|"BAD_JSON"|"BLOCKED"|"RATE_LIMITED", "message":"..."}}`，HTTP 状态 4xx/5xx。
前端约定：任何非 200 或超时（见各接口时限）→ 走 MockAI 降级。

### 4.1 POST /locate —— 视觉定位

请求：
```json
{
  "side": "front",
  "image": "data:image/png;base64,...",
  "points": [
    {"index": 0, "x": 142, "y": 96, "muscleId": "deltoid", "region": "neck_shoulder"}
  ]
}
```
- `image`：前端把当前人体 SVG（**含红色标记点**）导出的 PNG dataURL；点直接画在图上，避免模型对裸坐标理解偏差。
- `x/y`：viewBox 坐标（200×460 体系），同时提供是为了服务端校验。
- `muscleId/region`：前端几何命中的候选，可为空（空白点击）。

响应（30s 超时）：
```json
{
  "results": [
    {"index": 0, "description": "正面右-三角肌右部", "region": "neck_shoulder", "sideLabel": "右"}
  ]
}
```
约束：描述必须形如「正面/背面 + 左/右/中 + 部位名 + 上/下/左/右部」；不得输出诊断词汇。

### 4.2 POST /recommend —— 动作推荐（含生图指令）

请求：
```json
{
  "points": [
    {"description": "正面右-三角肌右部", "muscleId": "deltoid",
     "region": "neck_shoulder", "feel": "酸痛", "freeText": ""}
  ]
}
```

响应（60s 超时）：
```json
{
  "sit": [Action, Action],
  "stand": [Action]
}
```
Action 结构（前端渲染与收藏的唯一契约）：
```json
{
  "slug": "sit-side-neck-lateral-stretch-a3f9",
  "name": "颈部侧向拉伸",
  "kind": "stretch",
  "targetMuscle": "斜角肌、上斜方肌",
  "howto": ["坐稳在椅面前缘", "一手绕过头顶轻放对侧耳上", "头向同侧轻侧倾，对侧肩下沉"],
  "dose": "每侧保持 20–30 秒，做 2 次",
  "why": "帮助放松颈侧紧张的肌群。",
  "caution": "手臂只轻搭不用力压头，出现手麻立即停止。",
  "rhythm": {"mode": "hold", "holdSec": 30},
  "imageSpec": {
    "view": "side", "basePosture": "sit", "tier": "T2", "fidelity": "medium",
    "twoStage": false, "cropRef": "full", "props": ["chair"], "bareFoot": false
  },
  "imagePrompt": "GOAL: ...（九段式完整英文指令）"
}
```
- `kind` 枚举：`stretch | activate | mobilize | release`
- `rhythm.mode`：`reps` 时形如 `{"mode":"reps","count":10}`（节奏固定 2 秒做/1 秒回）；`hold` 时形如 `{"mode":"hold","holdSec":30}`
- 每组 1~3 个；相关度不足允许只给 1 个；两组都为空时前端显示现有空状态卡。
- `slug`：服务端对动作内容生成的稳定短哈希，用于图片缓存 key 与收藏去重。

### 4.3 POST /action-image —— 参考主体生图

请求（70s 超时；服务端内部完成万相任务提交+轮询）：
```json
{
  "slug": "sit-side-neck-lateral-stretch-a3f9",
  "imageSpec": {"view": "side", "basePosture": "sit", "tier": "T2", "fidelity": "medium",
                "twoStage": false, "cropRef": "full", "props": ["chair"], "bareFoot": false},
  "prompt": "GOAL: ..."
}
```
响应：`{"url": "/api/img/actions/gen/<slug>.jpg"}`
- 服务端行为：按 `basePosture_view` 选预置基准图（`cropRef=upper_body` 选预置裁切版）→ 调万相（T3 两阶段）→ 去右下角水印 → 以 `<slug>.jpg` 落盘缓存 → 返回同源 URL。
- 同 slug+spec+prompt 命中缓存直接返回，**不重复调用模型**。
- 失败返回 502，前端用现有火柴人占位（不再走 Pollinations）。

### 4.4 POST /science/west —— 西医肌肉判断与解释

请求：`{"points":[...]}`（同 4.2 的 points）
响应（45s 超时）：
```json
{
  "summary": "结合你反馈的「正面右-三角肌右部 · 酸痛」，AI 判断最相关的肌肉是三角肌……",
  "muscles": [
    {"id": "deltoid", "name": "三角肌",
     "func": "参与肩关节各方向活动……",
     "cause": "长时间抬臂或固定姿势后……",
     "note": "以上为健康科普，不能替代医生面诊，持续加重请就医。"}
  ]
}
```
- `muscles` ≤ 3 块，`id` 必须在肌肉白名单（55 块目录）内；左右对称算一块，前端用 id 高亮全部对称路径。
- id 越界的条目服务端直接丢弃并重试一次。

### 4.5 POST /science/tcm —— 中医经络判断与解释

请求：`{"points":[...]}`
响应（45s 超时）：
```json
{
  "summary": "……酸胀僵硬多属「不通则痛」……",
  "meridians": [
    {"id": "triple_burner", "name": "手少阳三焦经",
     "route": "起于无名指末端，沿上肢外侧上行……",
     "mechanism": "经气不畅时肩外侧易酸胀……"}
  ],
  "acupoints": [
    {"id": "sj5", "name": "外关", "meridian": "手少阳三焦经",
     "location": "腕背横纹上 2 寸，两骨之间。",
     "benefit": "常用于肩臂不适。",
     "mechanism": "通络止痛，调畅少阳经气。"}
  ]
}
```
- 经脉 ≤2、穴位 ≤3；id 必须在 `meridian-data.js` 白名单内。

## 5. 后端改动清单（新增，不动现有静态文件）

新建 `server/` 目录（随仓库走，部署时上传）：

| 文件 | 职责 |
|---|---|
| `server/index.js` | HTTP 服务入口，5 个路由、JSON 校验、超时、统一错误体 |
| `server/lib/dashscope.js` | 百炼调用封装（chat JSON mode、vlm、万相任务提交/轮询），重试 2 次 |
| `server/lib/validators.js` | 枚举/数量/白名单校验（posture、gear、kind、肌肉 id、经络 id、rhythm 结构） |
| `server/lib/image.js` | 基准图选择、万相两阶段串联、水印裁切、落盘缓存 |
| `server/prompts/recommend.md` | 动作推荐 system prompt（第 7 节要点全文） |
| `server/prompts/locate.md` | 视觉定位 system prompt |
| `server/prompts/science_west.md` / `science_tcm.md` | 两页科普 prompt |
| `server/prompts/image_spec.md` | 即 `IMAGE_PROMPT_SPEC.md` 的部署副本（②调用时内嵌） |
| `server/assets/ref/*.png` | 6 张全身基准图 + 6 张预置腰以上裁切版（开发期生成，免运行时图像处理依赖） |
| `server/.env.example` | `DASHSCOPE_API_KEY=`、端口、缓存目录示例 |
| `server/ai-relay.service` | systemd 单元模板 |
| `server/Caddyfile.snippet` | 反代配置片段 |
| `server/README.md` | 部署步骤（装 Node18、npm i、起服务、改 Caddy、重载） |

服务端硬规则：
1. 推荐层安全审查：非 sit/stand、含禁行动作、JSON 非法 → 重试 2 次 → 返回 502 让前端降级。
2. 生图缓存目录按 slug 去重；简单限流（同 IP 每分钟请求上限）。
3. key 只从 `process.env.DASHSCOPE_API_KEY` 读，禁止写进任何入库文件；`.env` 加进 `.gitignore`。
4. 所有写往模型的 prompt 不原样回显用户 freeText 之外的内容；freeText 截断长度（防 prompt 注入）。

## 6. 前端改动清单（ai-flow.js 为主，UI 层几乎不动）

| 位置 | 现状 | 改为 |
|---|---|---|
| MockAI 四方法 | 本地规则 + setTimeout | 新增 `assets/api-client.js`，五个方法对应五个接口；**MockAI 保留**，api-client 失败时自动回退 MockAI |
| `vlmLocate` 入参 | 只传坐标 | 改为先把 SVG 叠红点导出 PNG dataURL，连同坐标/候选传 `/locate` |
| 推荐结果消费 | 读 ACTIONS 实体（`item.a.id` 等） | 改为读 4.2 的 Action JSON；`actionScreenHtml` 字段映射：`a.id→slug`、`a.howto(字符串)→howto(数组)`、剂量取 `dose`、跟练卡绑定 `rhythm` |
| `buildRhythm(a)` | 从 dose 中文解析次数/秒数 | 优先读 `action.rhythm`（结构化），解析失败再走旧中文解析兜底 |
| `fillActionImages` | Pollinations 实时双图 | 单图：调 `/action-image` 拿 URL；失败显示火柴人占位；无本地实时双图 |
| 西医高亮/解释 | MockAI 映射表 | `/science/west` 一次返回，解释卡直接读 muscles[]，不再逐一点击才请求 |
| 中医高亮/解释 | MockAI 映射表 | `/science/tcm` 同上 |
| 收藏 | localStorage 存动作 id | **改存 Action JSON 快照**（AI 推荐的动作不在固定库里，没有永久 id）：key 仍用 `bodymap_fav_actions`，值改为对象数组；收藏详情页直接渲染快照 + 快照内的图 URL |
| 红旗筛查 | 前端本地 | 不动（进入任何 AI 调用前的硬门槛） |
| 超时/重试 UI | 无 | 各页 loading 保留；超 60s 提示「网络较慢，已切换到离线简版」并降级 |
| body_preview.html | 双图竖排 DOM | 单图 DOM、引入 api-client.js、`?v=` 版本号递增；其余 UI 结构由协作者版本为准 |

前端不需要知道模型名、不需要任何 key、不引第三方 SDK，只做 fetch。

## 7. 动作推荐 system prompt 要点（recommend.md 目录）

1. 你是动作康复科普助手，只依据用户反馈给轻动作建议，不做诊断。
2. 硬约束：每个动作 posture ∈ {sit,stand}、gear=none；kind ∈ {stretch,activate,mobilize,release}；原地、无跳跃、无地面/跪/躺、无倒立、无颈部猛烈环转、无弹震拉伸、无需他人辅助。
3. 每组 1~3 个；只给与反馈确实相关的，宁可少给不许凑数；每个动作必须给 caution。
4. 必须输出 howto 中文分步（每步一个数组元素）、dose、结构化 rhythm。
5. 同时为每个动作按 IMAGE_PROMPT_SPEC 产出 imageSpec + 英文九段式 imagePrompt。
6. 仅输出约定 JSON，不输出多余文字。

## 8. 与前端 UI 协作者的并行策略

**契约 = 第 4 节 JSON**，建议立即执行：

1. 我把第 4 节单独摘成 `server/API_CONTRACT.md` 发给他；他的所有渲染只依赖 Action / science 两个 JSON 形状，不依赖数据来源。
2. 我提供一个 **mock 响应样例文件**（`server/mocks/*.json`），他在本地直接用静态 JSON 开发，不等后端。
3. 合并策略：他完成 UI 后先合入 main；后端与前端接线在独立分支 `feat/ai-relay` 做，基于他的新版 DOM 适配 `actionScreenHtml`，避免现在抢改同一文件冲突。
4. 接口如需变更，双方改 `API_CONTRACT.md` 版本号，不口头改。

## 9. 里程碑

| 阶段 | 内容 | 依赖 key？ |
|---|---|---|
| M1 | ✅ API_CONTRACT + mock JSON 交付前端伙伴；`server/` 骨架与全部 prompt 写完；白名单校验器；12 张基准图；mock 模式自测通过 | 否 |
| M2 | ✅ provider 切换 AI Ping（OpenAI 兼容）；`assets/api-client.js` 前端封装写完（MockAI fallback）；部署到服务器（systemd + Caddy 反代）；假 key 验证 502→降级 | 否 |
| M3 | 用户提供 AI Ping key：SSH 写入服务器 .env，联调文本/视觉（定位、推荐、科普） | 是 |
| M4 | 联调图像编辑（确认 AI Ping 中 Wan/即梦的确切模型 id 和 images/edits 参数）、两阶段与水印验证 | 是 |
| M5 | 前端接线 + 全流程真机回归 + 降级演练（断网/错 key/超时）+ 上架 AI Ping Agent Store | 是 |

## 10. 待确认项

1. AI Ping 账号注册完成、38 元算力金领取（用户已确认模型齐全）。
2. AI Ping 中图像编辑模型的确切 id 和 `/images/edits` 端点参数（M4 联调时确认，隔离在 `lib/dashscope.js editImageAiping()` 内）。
3. 收藏存 JSON 快照的方案（用户已确认「可以」）。
4. 生图等待最长 ~70 秒，整屏 loading（用户已确认「这样就行」）。
5. 上架 AI Ping Agent Store 参评算力金（M5 部署完成后提交）。
