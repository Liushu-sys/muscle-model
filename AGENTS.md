# AGENTS.md — 协作改动守则

> 本文件供 AI 编程工具（Trae / Cursor / Claude Code 等）与人类协作者共同遵守。
> 目的：在扩展前端功能的同时，保证已有诊断逻辑、数据和交互不被破坏。
> 违反本文件的 PR 将被拒绝合并。

---

## 一、项目结构速览

- `assets/body_preview.html` — 主应用（单文件 PWA：内联 CSS/JS + 三个诊断页 + 首页/记录/收藏/我的）
- `assets/mm-engine.js` — 诊断引擎（肌肉库 MUSCLES、五区 REGIONS4、症状卡 SYMPTOMS、模式 PATTERNS、动作库 ACTIONS、区域映射、涂色链路）
- `assets/body_paths_v3.json` — 肌肉 SVG path 数据（正/背面）
- `assets/body_preview_original.html` — **原始备份，禁止任何修改**
- `docs/` — 施工图纸与修订记录，禁止修改

## 二、禁改文件（绝对禁区）

| 文件 | 原因 |
|---|---|
| `assets/body_preview_original.html` | 原始备份，永不改动 |
| `docs/` 下所有图纸 | 设计决策记录，只读 |
| `assets/body_paths_v3.json` | 肌肉 path 坐标，改动会破坏所有视图 |

## 三、禁碰逻辑（不重构、不"优化"、不挪位置）

以下逻辑已按解剖学与循证依据定稿，**只能读，不能改**：

1. **五区架构**：REGIONS4（肩颈 neck / 肩臂 arm / 肩背 upperback / 腰腹 back / 臀腿 leg）。背面无腰腹热区与标签，正面四区、背面四区标签。
2. **REGION_PAINT 分区归属**：三角肌同时属于肩颈/肩臂/肩背；中斜方属背面肩颈——是刻意设计，不要"去重"。
3. **症状卡数据**（SYMPTOMS）：17 张卡的 tight/weak 分组、subFeel/subPosture 双行结构、manifest「先姿态后感受」表述、evidenceNote 文献引用——全部有书籍/文献依据，不许增删改字段。
4. **涂色链路**：simple 感觉标签（酸痛/僵硬/无力）只是线索，**只有** freeText 精确匹配模式 senses 才触发状态变更；推断层（inferredTight/inferredWeak）已整体退役——数据保留但不涂色不显示，**不要恢复它**。
5. **深层稳定肌保护**：relation:'stabilizer' 的肌肉（如 deep_neck_flexor）只降级为 candidate，不标紫。
6. **红旗筛查**：18 词表匹配命中即阻断进入分析页，此安全逻辑不许放宽。
7. **FEEL_KEYWORDS**：全部 ≥2 字关键词，不许退回单字匹配。
8. **证据等级**：L1/L2 涂色、L3 不着色（candidate）、L0 unknown——不许把 L3 升级涂色。
9. **透视层级**：MUSCLE_LAYERS 三层结构、`.m.layer-1{opacity:.45}` `.m.layer-2{opacity:.3}`、结果页自动透视 applyResultAutoPerspective——数值是调过的，不要改回去。
10. **诊断数据链路**：diagnosisResult 是单一事实源；第三页只读 muscleStates，不重新推断。
11. **左右侧判定**：正面 x<100 为人体右侧，背面 x<100 为人体左侧，x 95–105 为 midline。

## 四、必须遵守的工程约定

### 4.1 缓存版本号（最常踩的坑）
修改 `mm-engine.js` 后，**必须**同步 bump `body_preview.html` 里的 import 版本号：
```js
import('./mm-engine.js?v=261')  // ← 改引擎后 261 → 262
```
不 bump 会导致手机端拿到旧引擎，表现为"改了没生效"。

### 4.2 SVG 交互铁律
- 网格虚线 `<line>` 必须设 `pointer-events:none`，否则拦截肌肉点选
- 头部装饰、覆盖层元素必须 `pointer-events="none"`
- 双击翻转：肌肉和红点上的双击不触发翻转，仅空白处触发；提示文字也要 `pointer-events:none`
- 人形轮廓底色 `#F6F0E9` 不带 `.m` 类（不参与交互）；肌肉描边 `#E3D5C8`

### 4.3 样式约束
- 只用现有 CSS variables 与主题色（主色 `#4198AC`、底色 `#F6F0E9` 系），**禁止自创新配色/品牌色**
- 阴影挂在外层 `.zoom-wrap` 容器上，不要直接加在 SVG 元素（会被边界裁切）
- 中文正文用较粗字重（600+），整体视觉保持：简洁、现代、健康科技、克制、柔和、大留白
- 不把页面改成传统医疗 App 或健身 App 风格
- 避免"诊断/确诊/治愈"等确定性医学术语，统一用"可能 / 可以尝试 / 较可能 / 当前状态"

### 4.4 数据与存储
- 收藏状态走 localStorage key `bodymap_fav_actions`（JSON 数组存动作 id）
- 第三页反馈数据用 localStorage 持久化，刷新保留
- 不接后端、不接真实数据库、不接用户系统（当前阶段）

### 4.5 Git 流程（硬性）
- **禁止直接推 main**——main 有分支保护，必须走 PR + 至少 1 人批准
- 工作分支命名 `feat/xxx` 或 `fix/xxx`
- 一个 PR 只做一件事；PR 描述写清：改了哪些文件、为什么、如何验证
- 提 PR 前先在本地浏览器完整跑一遍相关流程（选症状 → 诊断 → 建议 → 收藏）
- 每次改动前建 git 检查点（commit），方便回滚

## 五、允许改动的范围

- 新增独立页面/组件（不侵入现有诊断流程）
- 现有页面的样式微调（遵守 4.3）
- 明确指派的 UI 调整任务
- 新增动作/症状数据时：**先在 PR 里列出数据草稿等确认，再合入**——数据字段结构必须与现有 SYMPTOMS/ACTIONS 完全一致

## 六、拿不准就问

任何"我觉得这样更好"的重构冲动——先开 Issue 或在 PR 里说明动机，等仓库管理员确认后再动手。
**宁可少改，不可乱改。**
