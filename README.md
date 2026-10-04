# muscle-model

**一套能直接被任何项目调用的肌肉模型**：47 组肌肉矢量图（左右可分别点亮）+ 症状→肌肉诊断引擎 + 场景化动作库。

纯 TypeScript，**零运行时依赖**。不联网、不调 AI 也能跑完"说一句话 → 得出哪些肌肉过劳/过弱 → 给你 3 个现在就能做的动作"。

依据来自《基础肌动学》第 4 版（北京科学技术出版社 2024）各关节「受限的常见模式」章节。

---

## 装着用

```bash
# SSH（私有仓库，走你本机的 ssh key，推荐）
npm i git+ssh://git@github.com/Liushu-sys/muscle-model.git

# 或者 HTTPS + token：在 ~/.npmrc 里加一行
#   //npm.pkg.github.com/:_authToken=YOUR_TOKEN
npm i github:Liushu-sys/muscle-model
```

不想装依赖也可以直接把 `src/` 整个拷进项目——所有内部 import 都是相对路径，不依赖任何 npm 包。

## 最快上手

```ts
import { parseLocal, pickActions } from 'muscle-model'

// 1. 一句话 → 诊断
const r = parseLocal('看电脑两小时，左边肩膀又酸又硬', '')
r.tight.map(x => x.muscle.name)   // ['胸大肌', '胸小肌']         过劳/偏紧
r.weak.map(x => x.muscle.name)    // ['菱形肌', '中斜方肌', '前锯肌'] 过弱/无力

// 2. 诊断 → 此刻能做的 3 个动作
const acts = pickActions({
  scene: 'desk',                                  // desk 工位 | gym 健身房 | open 公园/家里 | bed 床上
  muscleIds: r.tight.map(x => x.muscle.id),
  state: 'tight',
  regions: [...new Set(r.tight.map(x => x.muscle.region))],
}, 3)
acts[0].howto   // '坐直，右手抓住椅背…'
```

完整可跑的示例在 `examples/`：

```bash
npm install
npm run example -- examples/01-最小诊断.ts
npm run example -- examples/02-用户确认位置.ts
npm run example -- examples/03-按场景给动作.ts
```

## 三个出口

| 入口 | 内容 | 需要 React？ |
|---|---|---|
| `muscle-model` | 肌肉库 / 模式库 / 诊断引擎 / 解释卡 / 动作库 | 否 |
| `muscle-model/react` | `BodyMap` 人体图组件 + 配色常量 + 左右换算函数 | 是（peer，可选） |
| `muscle-model/assets/*` | 原始矢量图 JSON（`body_paths.json` / `body_sides.json`） | — |

只做后端诊断或非 React 前端，**别 import `/react`**，能省掉 React 和 100KB 图数据。

## 先肉眼看一眼

在装依赖、读代码之前，直接双击打开：

```
assets/body_preview.html
```

一个自包含的静态页（无外链、无需起服务），正面 / 背面两幅线稿，47 组肌肉**悬停高亮、点击会显示中文名和 id**。想确认某块肌肉在图上的位置、想核对左右口径，用它比读代码快。

`assets/body_look.png` 是同一套图的静态样张（正面/背面并排，演示颈椎模式的过劳/过弱着色），适合直接贴到文档或对外介绍里。

## 目录

```
src/
  data/muscles.ts    47 组肌肉定义（部位、正/背面、默认倾向、书页、依据等级）
  data/patterns.ts   9 条「症状 → 肌肉」模式（书里各关节受限的常见模式）
  data/actions.ts    50 个动作 + 按场景/肌肉/状态挑选
  lib/engine.ts      诊断引擎：解析主诉、红旗拦截、用户确认后重算
  lib/explain.ts     四段式解释卡组装（是什么 / 问题 / 为什么 / 建议方向）
  components/BodyMap.tsx  可左右分别着色点亮的 SVG 人体图
  assets/body_sides.json  左右分离后的矢量路径（组件直接读这个）
assets/
  body_paths.json    未拆左右的矢量原图（组件不读它，是下面两个的上游）
  body_paths.raw.json 轮廓修缮前的原件（对照/回滚用，对比工具会读它）
  body_sides.json    左右分离后（同上，给工具链用）
  body_preview.html  可交互预览页，双击即开，无外链
  body_look.png      静态样张，贴文档用
tools/              生成与自检脚本（下面「改数据后必跑」）
docs/               设计说明 / 映射清单 / 书籍依据
examples/           4 个可运行示例
```

## 改数据后必跑

```bash
npm run check          # 引擎冒烟 + 动作覆盖 + 类型检查，一条命令全跑
npm run check:data     # 三张表 id 一致性（python3）
npm run check:paths    # 矢量轮廓诊断：哪些肌肉有细丝/锯齿（只读，不改文件）
npm run gen:sides      # 改了矢量图后重建左右分离数据
npm run gen:table      # 重建 docs/02-47组肌肉映射清单.md
```

### 轮廓有毛刺 / 细丝 / 曲里拐弯（不用碰 3D 模型）

`body_paths.json` 是从 3D 模型投影提取的，有两类提取噪声，**都不需要重新投影**，
跑后处理就行：

- **肌肉末端细丝**：零点几单位宽、来回折返的窄带。填充看不出来，一描边就是一撮
  歪扭的锯齿（正面髋内收肌靠膝那段）。
- **人体外形线的摆动**：腿部这种「上下走向的长边缘」被采样成来回摆（膝内侧 15 单位
  高度里摆了三次）。这个不能靠加大平滑解决——手指、脚趾和它的尺度太接近，一刀切会
  把手指标磨没。

```bash
npm run check:paths        # 1. 先诊断（肌肉分级 + 外形线摆动段位置；只读）
npm run fix:paths          # 2. 修肌肉轮廓（红/黄档），自动备份原件
npm run fix:body           #    修人体外形线（只动竖直长边上的摆动段）
npm run gen:sides          # 3. 刷下游：左右分离数据（含 outline）
npm run gen:preview-html   #    刷下游：预览页里的矢量路径（肌肉 + 外形线）
npm run gen:look-png       #    刷下游：静态样张
npm run fix:compare        # 4. 出前后对比图，肉眼验收（左=修缮前，右=修缮后）
```

只修某一块：`python3 tools/fix_body_paths.py --apply --ids hip_adductors`。
看局部放大：`python3 tools/build_fix_compare.py --ids body --bbox 55,290,145,455`。
原理、判据、参数选择和逐条结果见 `docs/06-轮廓修缮说明.md`。

只有**改了 3D 源模型**才需要往下走这条链（平时不用碰）：

```bash
cp ../Bodymap-App/assets/anatomy.glb assets/   # 25MB，太大没入库，手动拷
python3 tools/extract_body_svg.py    # glb → body_paths.json + body_preview.html（会覆盖！需 numpy+PIL）
python3 tools/gen_body_sides.py      # body_paths.json → body_sides.json（自动同步到 src/assets/）
python3 tools/check_data.py
```

⚠️ `extract_body_svg.py` 会**覆盖** `body_paths.json` 和 `body_preview.html`，且跳过后续两步会让左右分离数据和新图对不上。

## ⚠️ 复用前必读的五条

**1. 三张表的 id 必须完全一致**
`muscles.ts` × `body_paths.json` × `patterns.ts`。任一处不一致就会出现「诊断说这块肌紧、图上这块不亮」。改完跑 `npm run check:data`。

（`body_preview.html` 和 `src/assets/body_sides.json` 是生成产物，id 跟着 `body_paths.json` 走，不用单独维护——但改完图要记得重跑生成脚本，否则它会是旧数据。）

**2. 正面图上的左右是反的**
正面图：屏幕左边 = 身体的**右**侧。背面图：屏幕左边 = 身体的**左**侧。
用 `screenToBody(view, side)` 换算，**别自己再翻一次**。

**3. 依据等级不能说错**
书里按「模式」列名肌肉，同一个 id 在不同模式下依据等级不同。
`pattern.tight/weak` 是书原句；`pattern.inferredTight/Weak` 是同群推断。
解释卡里"书上讲"只准用在前者身上——把推断说成引用是这个产品最不能犯的错。

**4. 红旗必须最先判**
`hitRedFlag(text)` 命中（手麻、头晕、夜间痛醒、外伤…）就停止给任何动作建议，直接引导就医。别把它放在诊断之后。

**5. 场景表只有一份**
4 档：`desk` / `gym` / `open` / `bed`，唯一来源是 `SCENE_LABEL`。
（打包时发现旧代码里还留了一份 5 档的 `SCENES`，对不上且无人引用，已删除。）

## 边界

这是**体态与劳损的自查辅助**，不是医疗器械，也不构成诊断意见。
47 组里目前只有 33 组能被本地 9 条模式点亮，剩下 14 组是备位（需要时接 AI 引擎或补模式）。
`docs/02-47组肌肉映射清单.md` 逐条列了每块肌肉的面、默认倾向、书页和路径情况。
至于"这次判定到底是书原句还是同群推断"——那要看它落在 `pattern.tight` 还是
`pattern.inferredTight`，不能按肌肉全局判断，原因见 `docs/01-设计说明.md` 第 4 节。
