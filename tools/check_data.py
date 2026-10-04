#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BodyMap 数据自检 —— 明早开工前跑一次，5 秒排掉所有低级错误。

用法（在仓库根目录执行）：
    python3 tools/check_data.py

会检查：
  1. patterns.ts 里引用的每个肌肉 id，是否都能在 muscles.ts 里找到（找不到 = 页面崩溃）
  2. 是否有肌肉从未被任何模式引用（= 写了但永远不会被点亮的白占数据）
  3. 同一模式下是否有肌肉既在 tight 又在 weak（= 一个点既红又绿，UI 矛盾）
  4. 是否有肌肉的体感词里混入了红旗词（= 跟护栏自相矛盾）
  5. x / y 坐标是否落在 0-100 范围内
"""
import re
import sys
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MUS = os.path.join(ROOT, "src", "data", "muscles.ts")
PAT = os.path.join(ROOT, "src", "data", "patterns.ts")

RED_FLAGS = ["手麻", "手臂发麻", "腿麻", "放射性", "头晕", "恶心",
             "视力模糊", "夜间痛醒", "外伤", "发烧", "走路不稳",
             "大小便异常", "体重骤降"]

errors, warnings = [], []


def main():
    for f in (MUS, PAT):
        if not os.path.exists(f):
            print(f"❌ 找不到文件：{f}")
            sys.exit(1)

    mus_src = open(MUS, encoding="utf-8").read()
    pat_src = open(PAT, encoding="utf-8").read()

    # ---- 解析肌肉库 ----
    mblocks = re.findall(r"\{\s*\n\s+id: '([a-z_]+)',(.*?)\n  \}", mus_src, re.S)
    muscles = {}
    for mid, body in mblocks:
        def g(key, default=""):
            m = re.search(rf"{key}: '([^']*)'", body)
            return m.group(1) if m else default
        muscles[mid] = {
            "name": g("name"),
            "x": float(re.search(r"x: ([\d.]+)", body).group(1)),
            "y": float(re.search(r"y: ([\d.]+)", body).group(1)),
            "senses": re.findall(r"'([^']+)'", re.search(r"senses: \[([^\]]*)\]", body).group(1)) if re.search(r"senses: \[([^\]]*)\]", body) else [],
            "page": re.search(r"bookPage: (\d+)", body).group(1) if re.search(r"bookPage: (\d+)", body) else None,
        }
    print(f"肌肉库：{len(muscles)} 块")

    # ---- 解析模式库 ----
    pblocks = re.findall(
        r"id: '([a-z_]+)',\n\s+joint: '([^']+)',(.*?)treatment: '([^']*)'", pat_src, re.S)
    patterns = {}
    for pid, joint, body, treatment in pblocks:
        def arr(key):
            m = re.search(rf"{key}: \[([^\]]*)\]", body)
            return re.findall(r"'([a-z_]+)'", m.group(1)) if m else []
        patterns[pid] = {
            "joint": joint,
            "tight": arr("tight") + arr("inferredTight"),
            "weak": arr("weak") + arr("inferredWeak"),
            "treatment": treatment,
        }
    print(f"模式库：{len(patterns)} 条\n")

    used = set()

    # ---- 检查 1/3 ----
    for pid, p in patterns.items():
        allm = p["tight"] + p["weak"]
        used |= set(allm)
        missing = [x for x in allm if x not in muscles]
        if missing:
            errors.append(f"模式 {pid} 引用了不存在的肌肉 id：{missing}")

        dup = set(p["tight"]) & set(p["weak"])
        if dup:
            names = [muscles[d]["name"] for d in dup if d in muscles]
            warnings.append(f"模式 {pid} 中 {names} 同时是「紧张」和「减弱」，UI 上一个点不能两种颜色，需去重")

    # ---- 检查 2 ----
    orphan = set(muscles) - used
    if orphan:
        names = [muscles[o]["name"] for o in sorted(orphan)]
        warnings.append(f"{len(orphan)} 块肌肉从未被任何模式引用，永远不会被点亮（备位）：{names}")

    # ---- 检查 4 ----
    for mid, m in muscles.items():
        for s in m["senses"]:
            for rf in RED_FLAGS:
                if rf in s:
                    warnings.append(f"肌肉「{m['name']}」的体感词「{s}」含红旗词「{rf}」，"
                                    f"会被护栏拦截，等于这条永远不会生效")

    # ---- 检查 5 ----
    for mid, m in muscles.items():
        if not (0 <= m["x"] <= 100 and 0 <= m["y"] <= 100):
            errors.append(f"肌肉「{m['name']}」坐标越界：x={m['x']} y={m['y']}（应为 0-100）")

    # ---- 输出 ----
    if errors:
        print("❌ 必须修（会导致崩溃）：")
        for e in errors:
            print("   -", e)
    else:
        print("✅ 无致命问题：所有 id 均有定义，坐标合法")

    if warnings:
        print(f"\n⚠️  提醒（{len(warnings)} 条，不影响跑起来）：")
        for w in warnings:
            print("   -", w)
    else:
        print("\n✅ 无提醒项")

    print(f"\n{'='*46}")
    print(f"结论：{'通过 ✅' if not errors else '有致命问题 ❌'}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
