# 动作示意图 AI 生图计划（参考图锁定方案）

> 创建：2026-10-10｜更新：2026-10-10 **v2：改为单图方案（每个动作只生成 1 张「完成动作」图，准备姿势图取消）**
> 目标：为 AI 流程推荐的每个动作产出 1 张「完成动作」示意图，人物统一、姿势准确、纯白背景，定稿存为静态图，运行时不再实时生图。
> 分工：前端/UI 由协作者负责，本计划只涉及图片素材生产；图片先全部落盘到 `done/`，等前端版本合并后再对接加载。
> 关联文档：[IMAGE_PROMPT_SPEC.md](./IMAGE_PROMPT_SPEC.md) —— 全 AI 实时方案下，运行时「生图指令撰写 AI」必须遵守的九段指令规范（由 WorkBuddy prompts_v2 + 实测结论沉淀）。

---

## 1. 核心策略

1. **离线一次性批量生成，用户运行时零调用**。动作库是固定的 39 个坐/站/随意无器械动作，同一个动作永远配同一张图。
2. **每个动作只生成 1 张「完成动作」图**（拉伸到位/发力末端那一帧，信息量最大）；准备姿势即中立坐/站姿，靠文字说明即可，不再出图。
3. **人物靠参考图锁定，不靠文字描述长相**。每张图挂对应的正交基准图（同视角、同姿势类别）走图像编辑/参考主体模式。
4. **姿势靠「完整最终姿势描述」控制**：固定段照抄 + 变化段按关节链精确描述（角度/锚点/朝向），再加冻结指令。
5. **批量出图 → 人工逐张挑 → 不合格改词重 roll（每动作上限 5 次）→ 定稿入库**。

## 2. 范围

| 类别 | 数量 | 说明 |
|---|---|---|
| 坐姿 sit | 22 | 挂坐姿基准图 |
| 站姿 stand | 12 | 挂站姿基准图 |
| 随意 any | 5 | 每张卡指定按坐或站处理，挂对应基准图 |
| **合计** | **39 个动作 × 1 张 = 39 张图** | |

**暂不做**：9 个躺姿动作（臀桥/鸟狗/4字拉伸/侧平板等）。AI 推荐流目前只推 sit/stand/any，躺姿永不出现；将来要做需补「仰卧/侧卧/四足跪」基准图。

## 3. 基准图资产

目录：`assets/img/actions/ref/`（已从两张三宫格基准图裁切并去除水印）

| 文件 | 视角 | 姿势 |
|---|---|---|
| `stand_front.png` | 正面 | 自然站立 |
| `stand_side.png` | 侧面（朝左） | 自然站立 |
| `stand_back.png` | 背面 | 自然站立 |
| `sit_front.png` | 正面 | 端坐椅前缘 |
| `sit_side.png` | 侧面（朝左） | 端坐椅前缘 |
| `sit_back.png` | 背面 | 端坐椅前缘 |

规则：
- **侧面只做一张**，对侧动作直接镜像翻转最终图（或换挂镜像 ref）。
- 视角只用**正交四面**（正/侧/背；斜侧面模型必崩）。
- 坐姿参考图裤子偏紫灰是生成漂移；prompt 锁定段一律强制为站姿图的**深麻灰+双白杠**。
- 参考图背景是近白灰，生成时统一要求纯白 `#FFFFFF`。

## 4. 道具白名单（仅这些可出现）

- 一把**简约白色无扶手、低直靠背椅**（与坐姿基准图同款）
- 一张**简约白色方桌**（桌面推掌、手肘找支撑用）
- 一条**白色小毛巾**（背手/拉小腿/抓毛巾用）
- 不允许出现哑铃、弹力带、瑜伽垫等其他器械。

## 5. Prompt 规范（英文，照抄结构）

### 5.1 LOCKED 段（每张图一字不改）

```
The same young East Asian woman as in the reference image: same face, black hair
in a neat low bun at the back, slim athletic build, wearing a white racerback
sports bra, dark heather-grey jogger pants with twin thin white stripes down
the outer seam of each leg, and white athletic sneakers. Full body visible from
head to feet with clear margin around the figure, centered in frame, pure white
seamless studio background (#FFFFFF), soft even frontal light, photorealistic
fitness reference photo, 3:4 vertical composition.
```

### 5.2 BASE 段

- 坐姿：
```
She sits on the front edge of a simple white armless chair with a low straight
backrest, thighs parallel to the floor, feet hip-width and flat, spine tall and
neutral, hands resting naturally on her thighs.
```
- 站姿：
```
She stands naturally, feet hip-width apart, knees soft, spine tall and neutral,
arms relaxed at her sides.
```

### 5.3 CHANGE 段
每动作独有，见第 7 节规格卡（关节链：头颈→肩胛→上臂→肘→腕→躯干→骨盆→髋→膝→足；写角度/锚点/朝向）。

### 5.4 FREEZE 段（每张照抄）

```
Everything except the described pose change must stay identical to the reference
image: face, hairstyle, body, outfit, shoes, the white chair, camera angle,
framing, lighting and pure white background. Do not mirror the figure.
```

### 5.5 NEGATIVE

```
extra fingers, fused or missing fingers, malformed hands, twisted or broken
wrists, distorted limbs, extra limbs, changed face, changed hairstyle, changed
clothes, nudity, text, letters, watermark, logo, subtitles, additional props,
different background, cropped head, cropped feet, cartoon, illustration,
painting, motion blur
```

### 5.6 参数

| 项 | 值 |
|---|---|
| 模式 | 图像编辑 / 参考主体（image-to-image with subject reference） |
| 参考强度 | 高（脸/身体/服装 0.8 左右，按平台调） |
| 画幅 | 3:4 竖图（如 1024×1365） |
| seed | **prep 与 done 相同**；同动作换侧重 roll 可换 seed |
| 生成数量 | 每词先出 2-4 张选 1 |
| 重 roll 上限 | 每状态 5 次；仍不合格则回来改 CHANGE 描述 |

## 6. 命名与入库

- **存放目录**：`assets/img/actions/done/`
- **命名规则**：`{动作id}.jpg`，例如 `scalene_stretch.jpg`、`stand_neck_side_stretch.jpg`（id 清单见第 7 节表格第一列）
- 每个动作 1 张，即完成动作图；不要 prep 图
- 从元宝/万相下载的原图直接放进该目录即可，**扩展名是 png/jpeg/webp 都没关系，保留 `{动作id}` 作为文件名**，最后由我统一转码压缩成 jpg
- 请下载**原始大图**，不要用截图（截图会压缩、可能带界面元素）
- 双侧都可能出现的动作先只做文档指定的那一侧，镜像版由我统一处理，您不用生成两次
- 前端对接（本地优先加载、路径、单图布局）等协作者版本合并后再做，本阶段只管把 39 张图存齐

## 7. 动作规格卡（39 张）

字段：视角（挂哪张 ref）｜ 完成动作 CHANGE 描述（英文）。单图方案下 **prep 列已废弃，仅保留作动作起始姿态的理解参考，不要生成 prep 图**。

### 7.1 坐姿（22）

| id | 名称 | 视角 | prep | 完成动作（CHANGE） |
|---|---|---|---|---|
| chin_tuck | 收下巴 | side | base | seated upright, eyes looking straight ahead, chin pulled horizontally straight back creating a subtle double chin, back of the neck lengthened, crown lifted, hands resting on thighs |
| csm_release | 按胸锁乳突肌 | side | base | seated upright, head turned about 30 degrees away from camera and tilted slightly upward, camera-side hand raised with two fingertips gently pressing the thin vertical muscle band from behind the ear down to the collarbone, elbow relaxed |
| scalene_stretch | 斜角肌拉伸 | side | base | seated upright, head laterally flexed about 30 degrees toward the near shoulder with chin slightly tucked, near shoulder anchored down, the opposite arm raised overhead with forearm draped over the top of the head and hand resting lightly on the opposite ear and temple |
| levator_release | 肩胛提肌放松 | front | base | seated upright, head rotated about 45 degrees to one side with chin tucked down toward that-side armpit, same-side elbow pointing up, that hand reaching behind to rest on the top-inner corner of the same-side shoulder blade, opposite hand relaxed on lap |
| chair_pec_open | 扶椅背扩胸 | side | base | seated on the front edge, one hand gripping the top of the chair back at shoulder height, torso rotated open away from the gripping arm, chest lifted and expanded, gaze following the rotation, opposite arm relaxed |
| desk_scap_set | 贴椅背收肩胛 | back | base | seated tall with the whole back gently against the chair back, elbows bent about 90 degrees and held close to the ribs, shoulder blades pulled firmly together and downward, backs of the wrists facing outward |
| serratus_desk_push | 桌面推掌 | side | custom（桌前） | seated facing a simple white table, heels of both hands pressing down onto the table edge with arms nearly straight, shoulders pushed forward, shoulder blades spread wide around the ribcage, upper back gently rounded |
| scap_squeeze | 夹背 | back | base | seated tall, elbows bent pointing down-and-back, forearms roughly vertical, shoulder blades squeezed tightly together in the mid-back, chest open, chin level |
| quad_set | 坐姿伸膝勾脚 | side | base | seated tall with thighs supported, one leg extending until the knee is nearly straight and the lower leg horizontal, ankle fully dorsiflexed with toes pulled toward the shin, other foot flat |
| ham_seated_stretch | 坐姿伸腿够脚尖 | side | custom（一腿前伸） | seated on the chair edge, one leg extended straight forward with ankle dorsiflexed, other knee bent foot flat, torso hinged forward from the hips with a long straight back, both hands reaching toward the extended ankle |
| arch_towel | 抓毛巾提足弓 | side | custom（赤脚+毛巾） | seated with sneaker and sock removed on one side, bare foot resting on a small white towel spread on the floor, toes curled gripping the towel with the foot arch visibly lifted, other foot flat on floor |
| sit_core | 坐着收核心 | side | base | seated tall, one hand resting lightly on the lower abdomen below the navel, belly gently drawn inward under the ribs, waist narrowing slightly, shoulders relaxed, posture upright |
| sit_glute | 坐姿夹臀 | side | base | seated tall on the chair edge, feet flat, one hand resting lightly on the buttock of the same side indicating a firm contraction, hips level and shoulders relaxed, torso otherwise neutral |
| sit_hip_open | 坐着开髋 | front | base | seated tall, right ankle crossed and resting on the left thigh just above the knee in a figure-4 position, right knee opened gently outward, back straight, hands resting on the shins |
| subocc_nod_sit | 坐姿点头松后脑 | side | base | seated tall, fingers interlaced resting lightly on the back of the head, chin gently tucked, head nodding slightly forward and down through a small range as if gently saying yes, elbows hanging forward relaxed |
| rhomboid_stretch_sit | 坐姿含胸推掌 | back | base | both arms extended forward at shoulder height with hands clasped and palms facing forward, upper back gently rounded so the shoulder blades spread apart, chin tucked, head relaxed slightly forward |
| seated_rotation | 坐姿扶椅转体 | back | base | seated on the chair edge with feet flat and hips facing forward, torso rotated to one side, same-side hand gripping the chair back to deepen the twist, opposite hand resting on the outer thigh |
| sit_pec_er_stretch | 坐姿肩前侧牵伸 | side | base | seated tall, both hands placed behind the body gripping the seat edge with arms nearly straight and shoulders extended, chest lifted forward and up, shoulders rolled back and down |
| sit_thoracic_ext | 坐姿抱头胸椎伸展 | side | base | seated with feet flat, fingers interlaced behind the head, elbows pointing out, thoracic upper back gently extended up and backward, chest lifted, elbows opened wide, lower back neutral |
| sit_ql_sidebend | 坐姿侧向伸展 | front | base | seated with feet flat hip-width, one arm reaching straight up alongside the ear, torso laterally flexing toward the opposite side, other hand sliding down the chair edge, hips anchored evenly |
| sit_calf_towel | 坐姿毛巾拉小腿 | side | custom（毛巾+伸腿） | seated on the chair edge, one leg extended forward with knee nearly straight, a white towel looped around the forefoot, both hands gently pulling the towel toward the body, ankle dorsiflexed, back upright |
| sit_chair_dip | 椅子撑体 | side | custom（手撑椅面） | hands gripping the front edges of the seat beside the hips with elbows pointing back, hips shifted forward off the chair, elbows bent to about 90 degrees lowering the body, chest lifted, knees bent with feet flat |

### 7.2 站姿（12）

| id | 名称 | 视角 | prep | 完成动作（CHANGE） |
|---|---|---|---|---|
| lat_stretch | 背阔肌拉伸 | front | base | standing beside the chair, one hand gripping the top of the chair back at head height, feet stepped slightly back, hips shifted to the opposite side, torso leaning laterally away showing a long extended flank, other arm relaxed |
| iliopsoas_stretch | 弓步髂腰肌拉伸 | side | custom（半跪姿） | half-kneeling lunge: front knee bent 90 degrees with foot flat, back knee resting on the floor with shin extended back, pelvis tucked under and gently pressed forward and down, torso upright, hands resting on the front thigh |
| subscap_release | 毛巾背手 | front | custom（毛巾在背） | standing upright holding a white towel vertically behind the back, one hand gripping the top end overhead with elbow up, the other hand gripping the bottom end at the low back, shoulders relaxed and square |
| desk_lumbar | 站起后伸 | side | base | standing, palms placed on the low back and pelvis for support, knees slightly bent, torso gently extended backward, chest open, chin level |
| standing_figure4 | 站姿扶桌4字拉伸 | front | custom（扶椅） | standing holding the chair back with both hands, one ankle crossed over the opposite thigh just above the knee in a figure-4, hips shifted back and slightly lowered, chest tall |
| standing_tfl_stretch | 站姿交叉腿侧伸展 | front | base | standing, one leg crossed behind the other, torso laterally flexed toward the front-leg side, the same-side arm reaching overhead curving over to that side, the other hand resting on the hip |
| standing_sartorius_stretch | 站姿后腿内收伸展 | side | custom（扶椅） | standing with one hand on the chair back, opposite leg extended straight backward with the ball of the foot on the floor and toes pointing forward, pelvis square and gently pressed forward, standing knee slightly bent |
| stand_glute_kick | 站姿扶椅后踢腿 | side | custom（扶椅） | standing holding the chair back with both hands, one leg extending slowly straight backward, gluteal muscles visibly tightened, torso upright and pelvis level without rotating |
| stand_abd_leg | 站姿侧抬腿 | front | custom（扶椅） | standing holding the chair back, one leg abducted straight out to the side about 30 degrees, toes pointing forward, pelvis level, standing leg straight but soft |
| stand_neck_side_stretch | 站姿颈侧牵伸 | side | base | standing upright, one arm draped over the top of the head with hand resting on the opposite ear, head laterally flexed toward the raised-arm-side shoulder about 30 degrees, chin slightly tucked, opposite shoulder actively lowered |
| stand_thoracic_ext | 站姿抱头后仰 | side | base | standing with feet shoulder-width, fingers interlaced behind the head, elbows open, upper back gently extending backward as if lifting the chest toward the ceiling, hips stable, lower back neutral |
| stand_ham_stretch | 站姿架脚够脚尖 | side | custom（脚架椅杠） | standing with one heel placed on the low horizontal rung of the white chair, raised knee straight but soft, ankle dorsiflexed, torso hinged forward from the hips with a flat back, both hands reaching toward the raised ankle |

### 7.3 随意（5，按指定姿势处理）

| id | 名称 | 视角 | prep | 完成动作（CHANGE） |
|---|---|---|---|---|
| trap_release | 耸肩再沉肩 | side | base（站） | standing, both shoulders forcefully shrugged up toward the ears as high as possible, arms straight and relaxed, neck slightly shortened, holding the shrug |
| tibialis_activate | 勾脚 | side | base（坐） | seated with one heel resting on the floor, ankle dorsiflexed to the maximum with toes pulled up toward the shin, the front muscles of the lower leg visibly tensed |
| wrist_stretch | 前臂拉伸 | front | base（站） | standing, one arm extended straight forward at shoulder height with palm facing down and wrist bent so fingers point toward the floor, the other hand gently pressing the back of the hand further down |
| arm_plateau | 手肘找支撑+大幅晃动 | side | custom（桌边） | seated at a simple white table, one elbow resting on the tabletop with upper arm vertical and forearm hanging loosely over the edge, hand and wrist completely relaxed and dangling |
| neck_isometric | 颈部抗阻 | front | base（坐） | seated upright, one palm placed on the side of the head just above the ear, head pushing laterally into the hand while the hand resists with equal force, no visible movement, neck muscles gently tensed |

## 8. 质检清单（每张定稿前逐项过）

1. 脸/发型/服装/鞋/身材与基准图是同一个人
2. 裤子是深麻灰双白杠，没有变回紫灰色
3. 视角是纯正交（没有变斜侧），头顶和双脚完整不裁切
4. 动作关键关节角度与 CHANGE 描述一致（逐关节核对）
5. 手指数目正常、手腕无扭曲、无多肢
6. 纯白背景，无文字水印，无多余道具
7. prep/done 成对看：唯一差异应是动作本身
8. 双侧动作：两侧各镜像一版（需要时）

## 9. 执行顺序

1. 先用 **scalene_stretch + stand_neck_side_stretch**（side 视角，同构动作）各出 2-4 张试产，校准 LOCKED 措辞与参考强度。
2. 试产合格后批量生成 39 张 done（及 custom prep）。
3. base prep 由脚本从 `ref/` 自动裁切落盘，不占生成额度。
4. 逐张质检 → 重 roll/改词 → 定稿存 `prep/`、`done/`。
5. 前端接入本地优先加载逻辑。
6. 全流程浏览器验证动作页/收藏详情页配图。

## 10. 风险与备选

- 若参考图模式对关节姿势执行力仍不足：加第二张「姿势参考」（火柴人骨架图），升级到骨架约束方案。
- 若平台不支持参考主体：退而求其次用 LOCKED 强文字描述 + 同 seed，但人物一致性会下降。
- 毛巾/椅子类道具若被模型乱画：改为后期合成或从真实照片抠图。
