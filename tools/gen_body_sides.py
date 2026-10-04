#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把 assets/body_paths.json 拆成左右两侧，供第 2 页「分别显示左侧 / 右侧」使用。

为什么单独产出一份：
  第 2 页要按"左侧斜方肌""右侧胸锁乳突肌"这样的粒度点亮，而 body_paths.json 里
  每组是一条含 N 个子路径的大字符串，左右信息藏在里面。

两种形状：
  - 天然分离（40 组）：每个子路径完全落在中线一侧 → 直接拆出来，得到干净的左/右路径
  - 跨中线（9 组，全在背面）：只有一条横跨脊柱的路径（斜方肌、背阔肌、竖脊肌…）
    → 左右两份都放完整路径并标 needsClip=true，由前端用 SVG clipPath 裁开。
      这样一套渲染逻辑覆盖全部 47 组，数据不用动。

用法（仓库根目录）：
    python3 tools/gen_body_sides.py
输出：
    assets/body_sides.json
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "body_paths.json")
OUT = os.path.join(ROOT, "assets", "body_sides.json")

NUM = re.compile(r"-?\d+\.?\d*")


def points(path: str):
    """从 'M1,2L3,4…' 里取出所有坐标点。本项目生成的都是 M/L/Z，不含曲线。"""
    nums = [float(x) for x in NUM.findall(path)]
    return list(zip(nums[0::2], nums[1::2]))


def subpaths(dstr: str):
    return ["M" + s for s in dstr.split("M") if s.strip()]


def centroid(pts):
    return round(sum(x for x, _ in pts) / len(pts), 1), round(sum(y for _, y in pts) / len(pts), 1)


def main():
    raw = json.load(open(SRC, encoding="utf-8"))
    W, H = raw["viewBox"]
    mid = W / 2

    out = {
        "_note": "左右分离的肌肉路径。left/right 里的 d 可直接渲染；needsClip=true 表示该域"
                 "横跨中线，d 是完整路径，前端必须用 SVG clipPath 裁到 x<mid / x>mid。"
                 "注意：正面图屏幕左=身体右侧，背面图屏幕左=身体左侧。",
        "viewBox": [W, H],
        "midline": mid,
        "front": {},
        "back": {},
    }

    stat = {"天然分离": 0, "跨中线": 0}
    for view in ("front", "back"):
        for gid, g in raw[view].items():
            if gid in ("body", "guides"):
                continue
            d = g["d"]
            subs = subpaths(d)

            # 情况 A：有多条子路径，且各自完全落在一侧 → 天然分离
            if len(subs) > 1:
                left_paths, right_paths = [], []
                for sp in subs:
                    xs = [x for x, _ in points(sp)]
                    if max(xs) <= mid + 0.5:
                        left_paths.append(sp)
                    elif min(xs) >= mid - 0.5:
                        right_paths.append(sp)
                if left_paths and right_paths:
                    stat["天然分离"] += 1
                    lpts = [p for sp in left_paths for p in points(sp)]
                    rpts = [p for sp in right_paths for p in points(sp)]
                    out[view][gid] = {
                        "needsClip": False,
                        "left": {"d": "".join(left_paths), "cx": centroid(lpts)[0], "cy": centroid(lpts)[1]},
                        "right": {"d": "".join(right_paths), "cx": centroid(rpts)[0], "cy": centroid(rpts)[1]},
                    }
                    continue

            # 情况 B：一条路径横跨中线 → 按 x 把点分成两组，各自给质心；渲染时 clip
            allpts = points(d)
            lpts = [p for p in allpts if p[0] <= mid]
            rpts = [p for p in allpts if p[0] > mid]
            stat["跨中线"] += 1
            out[view][gid] = {
                "needsClip": True,
                "left": {"d": d, "cx": centroid(lpts)[0], "cy": centroid(lpts)[1]},
                "right": {"d": d, "cx": centroid(rpts)[0], "cy": centroid(rpts)[1]},
            }

    # 身体轮廓底图也放进来——前端只需要加载这一个文件
    out["outline"] = {
        "front": raw["front"]["body"]["d"],
        "back": raw["back"]["body"]["d"],
    }

    json.dump(out, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    # 前端组件读的是 src/assets 下那一份（要能被打包器 import），
    # 这里顺手同步过去，免得改了矢量图却忘了拷，页面上还是旧的。
    src_copy = os.path.join(ROOT, "src", "assets", "body_sides.json")
    os.makedirs(os.path.dirname(src_copy), exist_ok=True)
    json.dump(out, open(src_copy, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    total = sum(len(out[v]) for v in ("front", "back"))
    print(f"✅ 已生成 assets/body_sides.json，并同步到 src/assets/body_sides.json")
    print(f"   形态统计: {stat}  （天然分离的无需 clip，直接渲染即可）")
    print(f"   front {len(out['front'])} 组 / back {len(out['back'])} 组，接口共 {total} 个 view×肌肉")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
