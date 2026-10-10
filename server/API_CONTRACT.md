# API 数据契约（前后端冻结版）

> 版本：v1 / 2026-10-10
> 给前端：你的页面只依赖本文档的 JSON 形状，不依赖数据来源。本地开发直接用 `mocks/` 里的假数据，不需要服务器、不需要 key。
> 契约变更必须改本文件版本号，禁止口头变更。

## 0. 通用约定

- 基址：同源 `/api/ai`；全部 `POST`，`Content-Type: application/json`。
- 前端只使用 fetch，不引入任何第三方 SDK，不接触任何 API key。
- 统一错误体（HTTP 4xx/5xx）：
```json
{ "error": { "code": "UPSTREAM_TIMEOUT", "message": "..." } }
```
错误码枚举：`UPSTREAM_TIMEOUT | BAD_JSON | BLOCKED | RATE_LIMITED | BAD_REQUEST`
- **降级铁律**：任何接口非 200、超时、或 JSON 解析失败 → 前端切回本地 MockAI 数据，不允许白屏/卡死。
- 各接口超时见下；超时即降级（动作图接口除外：图失败只显示占位图，不降级整个动作流）。

## 1. POST /locate —— 红点视觉定位

超时 30s。

请求：
```json
{
  "side": "front",
  "image": "data:image/png;base66,....",
  "points": [
    { "index": 0, "x": 142, "y": 96, "muscleId": "trapezius_upper", "region": "neck" }
  ]
}
```
| 字段 | 类型 | 说明 |
|---|---|---|
| side | `"front" \| "back"` | 当前人体面 |
| image | string | 含红色标记点的人体图 PNG dataURL（前端 SVG 导出） |
| points[].index | number | 点序号，响应原样带回 |
| points[].x / y | number | viewBox 坐标（200×460 体系） |
| points[].muscleId | string? | 几何命中候选 id，空白点击可缺省 |
| points[].region | string? | 区域 id，可缺省 |

响应：
```json
{
  "results": [
    { "index": 0, "description": "正面右-斜方肌上部", "region": "neck", "sideLabel": "右" }
  ]
}
```
- `description` 形如「正面/背面 + 左/右/中 + 部位名 + 可选上/下部」，直接用于页面文案与后续接口入参。
- `sideLabel`：`"左" | "右" | "中"`。
- results 顺序、数量与请求 points 一致，index 对应。

## 2. POST /recommend —— 动作推荐（动作 + 跟练节奏 + 生图规格一次返回）

超时 60s。

请求：
```json
{
  "points": [
    { "description": "正面右-斜方肌上部", "muscleId": "trapezius_upper",
      "region": "neck", "feel": "酸痛", "freeText": "" }
  ]
}
```
| 字段 | 类型 | 说明 |
|---|---|---|
| points[].description | string | /locate 返回的精准描述（没有定位结果时可用粗描述） |
| points[].muscleId / region | string? | 本地命中信息 |
| points[].feel | string? | 感受标签（酸痛/僵硬/无力） |
| points[].freeText | string? | 用户补充文本（已过红旗筛查） |

响应：
```json
{ "sit": [Action], "stand": [Action] }
```
- 每组 0~3 个；允许一组为空；两组都空时前端显示现有的空状态卡。
- 坐/站切换 tab 始终展示（空组显示「暂无适合的坐姿/站姿动作」）。

### Action 对象（前端渲染、跟练、收藏的唯一数据结构）

```json
{
  "slug": "sit-side-neck-lateral-stretch-a3f9",
  "name": "颈部侧向拉伸",
  "kind": "stretch",
  "targetMuscle": "斜角肌、上斜方肌",
  "howto": [
    "坐稳在椅面前缘，脊柱向上延展",
    "一手绕过头顶轻放对侧耳上",
    "头向同侧轻侧倾，对侧肩主动下沉"
  ],
  "dose": "每侧保持 20–30 秒，做 2 次",
  "why": "帮助放松颈侧紧张的肌群，减轻牵拉感。",
  "caution": "手臂只轻搭不用力压头；出现手麻、头晕立即停止。",
  "rhythm": { "mode": "hold", "holdSec": 30 },
  "imageSpec": {
    "view": "side",
    "basePosture": "sit",
    "tier": "T2",
    "fidelity": "medium",
    "twoStage": false,
    "cropRef": "full",
    "props": ["chair"],
    "bareFoot": false
  },
  "imagePrompt": "GOAL: ...(九段式英文指令，前端不渲染、只随 /action-image 透传)"
}
```

| 字段 | 类型 | 说明 |
|---|---|---|
| slug | string | 动作内容的稳定标识；图片缓存 key、收藏去重用 |
| name | string | 动作中文名 |
| kind | `"stretch"\|"activate"\|"mobilize"\|"release"` | 拉伸/激活/松动/自我按压，可用于小标签配色 |
| targetMuscle | string | 中文肌肉名（可能多个，顿号分隔） |
| howto | string[] | 中文分步，**每步一个数组元素**，前端按有序列表渲染 |
| dose | string | 剂量完整中文句（详情展示） |
| why | string | 一句话作用（克制的科普口吻） |
| caution | string | 安全提示，必有 |
| rhythm | object | 跟练卡驱动，见下 |
| imageSpec | object | 生图所需，随 /action-image 请求原样回传 |
| imagePrompt | string | 生图英文指令，前端不展示 |

### rhythm 跟练节奏（二选一）

```json
{ "mode": "reps", "count": 10 }
```
- reps：按次数跟练，节拍固定 2 秒做 / 1 秒回，前端显示进度 n/count。
```json
{ "mode": "hold", "holdSec": 30 }
```
- hold：倒计时保持，前端显示剩余秒数。

### imageSpec 字段（前端只存储/透传，不需要解读）

| 字段 | 枚举 |
|---|---|
| view | `front \| side \| back` |
| basePosture | `sit \| stand` |
| tier | `T1 \| T2 \| T3` |
| fidelity | `medium \| low` |
| twoStage | boolean |
| cropRef | `full \| upper_body`（UI 可据此预留不同比例，均为 3:4） |
| props | `("chair"\|"table"\|"towel")[]` |
| bareFoot | boolean |

## 3. POST /action-image —— 动作示意图

超时 70s。前端行为：**整屏 loading 等待**；失败只显示火柴人占位图，不影响动作文字。

请求（slug / imageSpec / imagePrompt 均从 Action 原样取）：
```json
{ "slug": "sit-side-neck-lateral-stretch-a3f9", "imageSpec": { }, "imagePrompt": "GOAL: ..." }
```
响应：
```json
{ "url": "/api/img/actions/gen/sit-side-neck-lateral-stretch-a3f9.jpg" }
```
- 每个动作只有 **1 张完成动作图**（无准备姿势图），3:4 竖图，同源 URL，可直接 `<img src>`。
- 同 slug 命中缓存秒回；前端可用 localStorage 记 slug→url 进一步免请求。

## 4. POST /science/west —— 西医肌肉判断 + 解释（一次返回）

超时 45s。

请求：`{ "points": [ /* 同 /recommend 的 points */ ] }`

响应：
```json
{
  "summary": "结合你反馈的「正面右-三角肌右部 · 酸痛」，当前最相关的是三角肌……",
  "muscles": [
    {
      "id": "deltoid",
      "name": "三角肌",
      "func": "覆盖肩关节，参与手臂各方向抬起。",
      "cause": "长时间抬臂或固定姿势后容易疲劳酸胀。",
      "note": "以上为健康科普，不能替代医生面诊；持续加重请就医。"
    }
  ]
}
```
- muscles 长度 0~3；`id` 为肌肉库 id（左右对称共用一个 id，前端高亮全部对称路径）。
- summary 为总述段，可含用户原描述；语气用「可能/较可能」。
- 第三页进入时一次拿全，解释卡直接读字段，不再逐块请求。

## 5. POST /science/tcm —— 中医经络判断 + 解释（一次返回）

超时 45s。

请求：`{ "points": [ /* 同上 */ ] }`

响应：
```json
{
  "summary": "酸胀僵硬多属局部经气运行不畅，「不通则痛」……",
  "meridians": [
    {
      "id": "sj",
      "name": "手少阳三焦经",
      "route": "起于无名指末端，沿上肢外侧中线上行，过头侧至眉梢。",
      "mechanism": "经气不畅时肩外侧、头颈侧面容易酸胀。"
    }
  ],
  "acupoints": [
    {
      "id": "quchi",
      "name": "曲池穴",
      "meridian": "手阳明大肠经",
      "location": "肘横纹外侧端，屈肘凹陷处。",
      "benefit": "常用于肩臂酸胀不适。",
      "mechanism": "行气活血，缓解肩臂部经气郁滞。"
    }
  ]
}
```
- meridians 长度 0~2，acupoints 长度 0~3；id 均在 `meridian-data.js` 白名单内，前端据 id 涂线/点穴。
- 点击半透明元素变实心后，底部解释卡读对应对象字段。

## 6. 前端存储约定（收藏结构变更，需要 UI 配合）

- 旧：localStorage key `bodymap_fav_actions` = 动作 id 字符串数组。
- 新（AI 动作没有固定库 id，必须改）：同一 key，值改为 **Action 对象数组（JSON 快照）**：
```json
[ { "slug": "...", "name": "...", "howto": [], "dose": "...", "caution": "...", "rhythm": {}, "imageUrl": "/api/img/...jpg", "savedAt": 1760000000000 } ]
```
- 收藏详情页直接渲染快照字段，不回任何库查询；图 URL 同源长期有效。
- 上限 100 条，超出删最旧。
- 建议版本位：另存 `bodymap_fav_v2` 切换，旧数据保留不迁移（开发期可直接清）。

## 7. 本地开发（无服务器）

`mocks/` 目录提供 5 个响应样例：
`locate.json` / `recommend.json` / `action-image.json` / `science_west.json` / `science_tcm.json`。

任选其一：
1. 直接 import JSON 渲染静态页面；
2. 或在 api-client 里加一行开关：`const USE_MOCK = true` 时 `await fetch('./mocks/xxx.json')`，路径按实际部署调整。

接口齐活后把开关关掉即可，页面代码无需改。

## 8. 不在本契约内的事项

- 模型型号、API key、重试/缓存/两阶段生图——服务端内部实现，前端无感。
- 红旗词筛查、几何命中、五区架构、涂色链路——全部维持现有前端本地逻辑，本契约不涉及。
