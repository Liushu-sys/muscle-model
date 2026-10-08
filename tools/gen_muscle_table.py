#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BodyMap 肌肉清单表生成 —— 把三张表并排比一次，产出可交付的对照文档。

用途：muscles.ts（AI 白名单）× body_paths.json（矢量图）× patterns.ts（本地模式）
      任意一侧改过之后跑一次，立刻看出哪块肌肉「AI 说得出但图上没得亮」。

用法（仓库根目录）：
    python3 tools/gen_muscle_table.py
输出：
    docs/08-BodyMap-47组肌肉对齐清单.md
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MUS = os.path.join(ROOT, "src", "data", "muscles.ts")
PAT = os.path.join(ROOT, "src", "data", "patterns.ts")
PATHS = os.path.join(ROOT, "assets", "body_paths.json")
OUT = os.path.join(ROOT, "docs", "02-47组肌肉映射清单.md")

REGION = {
    "neck_shoulder": "颈肩", "upper_back": "胸背",
    "low_back_hip": "腰骨盆", "leg": "下肢", "arm": "上肢",
}
NOTE = {"book": "书列名", "infer": "同群推断", "clinic": "常识判断"}


def main():
    ts = open(MUS, encoding="utf-8").read()
    pat = open(PAT, encoding="utf-8").read()
    D = json.load(open(PATHS, encoding="utf-8"))

    blocks = re.findall(r"\{\s*id: '([a-z_]+)',\s*name: '([^']+)',(.*?)\n  \}", ts, re.S)

    def field(body, key):
        m = re.search(rf"{key}: '([^']*)'", body)
        return m.group(1) if m else None

    # 本地 9 条模式里出现过的 id（tight / weak / inferredTight / inferredWeak 四张数组）
    pools = re.findall(r"(?:inferredTight|inferredWeak|tight|weak): \[(.*?)\]", pat, re.S)
    referenced = set(re.findall(r"'([a-z_]+)'", "\n".join(pools)))

    rows = []
    for mid, name, body in blocks:
        pg = re.search(r"bookPage: (\d+)", body)
        pm = re.search(r"paintAs: '([a-z_]+)'", body)
        rows.append({
            "id": mid, "name": name,
            "side": field(body, "side"),
            "type": field(body, "type"),
            "region": REGION.get(field(body, "region"), ""),
            "page": pg.group(1) if pg else "—",
            "note": NOTE.get(field(body, "bookNote"), "—"),
            "paintAs": pm.group(1) if pm else None,
            "front": "有" if mid in D["front"] else "—",
            "back": "有" if mid in D["back"] else "—",
            "local": "✅" if mid in referenced else "⚪",
        })

    # 一致性断言：无路径肌肉必须声明 paintAs 映射；未声明又缺路径才报错
    ts_ids = {r["id"] for r in rows}
    path_ids = set(D["groups"].keys())
    mapped = {r["id"]: r["paintAs"] for r in rows if r["paintAs"]}
    bad_mapping = [f"{k}→{v}" for k, v in mapped.items() if v not in path_ids]
    only_ts = sorted(i for i in (ts_ids - path_ids) if i not in mapped)
    only_path = sorted(path_ids - ts_ids)
    if bad_mapping:
        print("❌ paintAs 指向了不存在的路径分组:", bad_mapping)
        return 1
    if only_ts or only_path:
        print("❌ 三张表没有对齐：")
        print("   只在 muscles.ts 且未声明 paintAs（图上不会亮）:", only_ts or "无")
        print("   只在 body_paths.json（AI 说不出）:", only_path or "无")
        return 1

    dup = len(rows) != len(ts_ids)
    if dup:
        print("❌ muscles.ts 里有重复 id")
        return 1

    lines = [
        "# 02 · 肌肉映射清单（48 组）",
        "",
        "> 本文件由 `tools/gen_muscle_table.py` 自动生成，不要手改。  ",
        "> 用途：现场一旦出现「AI 说这块肌紧，但图上这块不亮」，对着这张表从上往下查。  ",
        "> id 必须能在图上落色：有独立路径，或声明 paintAs 映射到已有色块。",
        "",
        "| id | 中文名 | 面 | 默认倾向 | 部位 | 书页 | 依据 | 正面路径 | 背面路径 | 本地9模式 |",
        "|---|---|---|---|---|---|---|---|---|---|",
    ]
    for r in rows:
        tp = "T 偏紧" if r["type"] == "tight" else "W 偏弱"
        front = f"→{r['paintAs']}" if r["paintAs"] else r["front"]
        back = f"→{r['paintAs']}" if r["paintAs"] else r["back"]
        lines.append(
            f"| `{r['id']}` | {r['name']} | {r['side']} | {tp} | {r['region']} "
            f"| {r['page']} | {r['note']} | {front} | {back} | {r['local']} |"
        )

    n_local = sum(1 for r in rows if r["local"] == "✅")
    n_mapped = len(mapped)
    lines += [
        "",
        f"合计 **{len(rows)}** 组；其中 **{len(path_ids)}** 组有独立 SVG 路径，"
        f"**{n_mapped}** 组无独立路径、通过 paintAs 映射上色块（{', '.join(f'{k}→{v}' for k, v in mapped.items())}）。",
        f"其中 **{n_local}** 组会被本地 9 条模式点亮，其余 **{len(rows) - n_local}** 组只有 AI 引擎能点亮。",
        "",
        "## 字段怎么读",
        "",
        "- **面**：`front` 正面 / `back` 背面 / `both` 正背两面都有路径，两张图都要点亮",
        "- **默认倾向**：初始值。真正判断先看属于哪种关节模式——书里同一块肌肉在不同模式下角色可能相反"
        "（如腘绳肌：膝模式=偏紧，髋模式=偏弱）",
        "- **依据**：",
        "  - `书列名` = 《基础肌动学》第4版白纸黑字点名了这块肌肉属于紧张侧还是减弱侧，现场可以直接引页码",
        "  - `同群推断` = 书里点名的是它所在的肌群，这条是我们推的，**不要**说成「书上讲」",
        "  - `常识判断` = 书里没提，按解剖和常见体态定，同样别说成引用",
        "- **本地9模式**：✅ 本地引擎的 9 条模式会产出它；⚪ 只有 AI 引擎能点亮（白名单允许，不是废数据）",
        "",
        "## 现场排查三步",
        "",
        "1. AI 输出的 id 不在本表 → 前端 `filterByLibrary` 会静默丢掉 → 提示词白名单写漏了",
        "2. id 在表里但某一列是「—」→ 那张图本来就没有这块肌肉的路径，不是 bug，换个面看",
        "3. id 和路径都有但仍不亮 → 检查 `App.tsx` 的 `activeMuscles` 有没有把该倾向类型合并进去",
        "",
        "## 改完之后重新生成",
        "",
        "```bash",
        "cd ~/Desktop/bodymap-app",
        "python3 tools/gen_muscle_table.py           # 本表",
        "python3 tools/check_data.py                # 低级错误自检",
        "cd app && ./node_modules/.bin/tsc --noEmit  # 类型检查",
        "```",
        "",
    ]
    open(OUT, "w", encoding="utf-8").write("\n".join(lines))

    print(f"✅ 已生成 {os.path.relpath(OUT, ROOT)} —— {len(rows)} 组")
    print(f"   本地9模式覆盖 {n_local}，仅 AI 可点亮 {len(rows) - n_local}")
    print(f"   双面(both): {[r['id'] for r in rows if r['side'] == 'both'] or '无'}")
    stats = {k: sum(1 for r in rows if r["note"] == k) for k in ("书列名", "同群推断", "常识判断", "—")}
    print(f"   依据来源: {stats}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
