#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把修缮前 / 修缮后的同一组肌肉并排画出来，用来肉眼验收。

按实际渲染方式画（填充 + 描边），因为细丝的问题正是「填充时看不出来、一描边
就变成一撮锯齿」，所以对比图必须带描边才看得出差别。

用法（仓库根目录）
------------------
  python3 tools/build_fix_compare.py                      # 全部修缮过的肌肉
  python3 tools/build_fix_compare.py --ids hip_adductors  # 只看某一组
  python3 tools/build_fix_compare.py --out /tmp/a.png --zoom 2
"""
import argparse
import json
import os
import re

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BEFORE = os.path.join(ROOT, "assets", "body_paths.raw.json")
AFTER = os.path.join(ROOT, "assets", "body_paths.json")

FILL = (246, 240, 233)
STROKE = (120, 96, 78)
BG = (255, 255, 255)
LABEL = (90, 78, 68)
GRID = (232, 226, 218)

NUM = re.compile(r"-?\d+\.?\d*")


def subpaths(dstr):
    out = []
    for seg in dstr.split("M"):
        nums = [float(x) for x in NUM.findall(seg)]
        pts = list(zip(nums[0::2], nums[1::2]))
        if len(pts) >= 3:
            out.append(pts)
    return out


def bbox(subs, pad=2.0):
    xs = [x for p in subs for x, _ in p]
    ys = [y for p in subs for _, y in p]
    return min(xs) - pad, min(ys) - pad, max(xs) + pad, max(ys) + pad


def draw_cell(subs, box, size, sw):
    """把一组子路径画进 size×size 的格子里，按比例缩放居中。"""
    x0, y0, x1, y1 = box
    k = min(size / max(x1 - x0, 1e-6), size / max(y1 - y0, 1e-6))
    ox = (size - (x1 - x0) * k) / 2
    oy = (size - (y1 - y0) * k) / 2
    im = Image.new("RGB", (size, size), BG)
    dr = ImageDraw.Draw(im)
    for pts in subs:
        q = [(ox + (x - x0) * k, oy + (y - y0) * k) for x, y in pts]
        dr.polygon(q, fill=FILL)
        dr.line(q + [q[0]], fill=STROKE, width=int(round(sw)), joint="curve")
    return im


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="/tmp/bodymap-fix-compare.png")
    ap.add_argument("--ids", default="", help="只画这些 id（逗号分隔）")
    ap.add_argument("--cell", type=int, default=190, help="每格边长 px")
    ap.add_argument("--stroke", type=float, default=2.0, help="描边像素宽")
    ap.add_argument("--bbox", default="", help="手动取景 x0,y0,x1,y1（只对单组有意义）")
    args = ap.parse_args()

    fixed = None
    if args.bbox:
        fixed = tuple(float(v) for v in args.bbox.split(","))

    a = json.load(open(BEFORE, encoding="utf-8"))
    b = json.load(open(AFTER, encoding="utf-8"))
    only = {s for s in args.ids.split(",") if s}

    rows = []
    for view in ("front", "back"):
        for gid, node in b[view].items():
            if gid == "guides":
                continue          # body 也算进来：人体外形线也做修缮
            if only and gid not in only:
                continue
            if a[view][gid]["d"] == b[view][gid]["d"]:
                continue          # 没改过的不画
            rows.append((view, gid, subpaths(a[view][gid]["d"]),
                         subpaths(b[view][gid]["d"])))

    if not rows:
        print("没有差异可画")
        return

    cell = args.cell
    lab = 150
    pad = 10
    W = lab + (cell + pad) * 2 + pad * 2
    H = (cell + pad) * len(rows) + pad * 2 + 26
    img = Image.new("RGB", (W, H), BG)
    dr = ImageDraw.Draw(img)
    dr.text((pad, 6), "左 = 修缮前（细丝/锯齿）    右 = 修缮后", fill=LABEL)

    for i, (view, gid, sa, sb) in enumerate(rows):
        y = 26 + pad + i * (cell + pad)
        # 两侧用同一个框，比例一致才可比
        box = fixed or bbox(sa + sb)
        dr.text((pad, y + cell / 2 - 6), "%s\n%s" % (gid, view), fill=LABEL)
        img.paste(draw_cell(sa, box, cell, args.stroke), (lab + pad, y))
        img.paste(draw_cell(sb, box, cell, args.stroke), (lab + pad + cell + pad, y))

    img.save(args.out)
    print("已写出 %s  (%dx%d, %d 组)" % (args.out, W, H, len(rows)))


if __name__ == "__main__":
    main()
