#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修缮 assets/body_paths.json 里的肌肉轮廓：去掉细丝、抚平锯齿。

背景
----
轮廓是从 3D 模型（anatomy.glb）投影 + 描边得来的，少量肌肉在末端会拖出一条
「细丝」——一条只有零点几个单位宽、来回折返的窄带。填充后看不出来，但一旦
描边（stroke），这条细丝就变成一撮歪扭的锯齿毛刺，例如正面髋内收肌在膝部
的那一段。另有部分肌肉边缘顶点过密，放大后呈碎抖状。

做法（方案 B：后处理，不碰 glb、不重跑投影）
--------------------------------------------
  1. 诊断（纯几何）：算每个顶点的「局部厚度」= 到多边形上环向距离足够远的
     其它顶点的最小距离。厚度 < 1 单位 = 细丝，< 2 单位 = 偏薄。
  2. 修复（栅格重建，只针对诊断出问题的肌肉）：
       栅格化(4x 超采样) → 开运算(腐蚀 r 再膨胀 r+1) 削掉细丝
       → 轮廓跟踪 → 统一绕向 → DP 简化 → Chaikin 平滑
     开运算只吃细结构，宽 8~17 单位的正常肌块几乎不受影响；多膨胀 1px 用来
     补偿被削掉的边缘，保证面积不缩水。
  3. 保险：面积变化超过 --max-loss 的肌肉会被跳过并报警，绝不静默改坏形状。

用法（仓库根目录）
------------------
  python3 tools/fix_body_paths.py --report            # 只诊断，打印分级表
  python3 tools/fix_body_paths.py --apply             # 诊断 + 写回（自动备份原件）
  python3 tools/fix_body_paths.py --apply --ids hip_adductors,tensor_fasciae_latae
  python3 tools/fix_body_paths.py --apply --dry       # 演练，不落盘
"""
import argparse
import json
import math
import os
import re
import shutil
import sys

from PIL import Image, ImageChops, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "body_paths.json")
BAK = os.path.join(ROOT, "assets", "body_paths.raw.json")   # 修缮前的原件，留作对照

SS = 4          # 栅格超采样倍数（1 单位 = SS 像素）
THIN_RED = 1.0  # 局部厚度 < 1.0 → 红档，必须修
THIN_YEL = 2.0  # 局部厚度 < 2.0 → 黄档，顺手修

NUM = re.compile(r"-?\d+\.?\d*")


# ---------------------------------------------------------------- 基础解析
def subpaths(dstr):
    """d 字符串 → [[(x,y), ...], ...]（本项目只有 M/L/Z，没有曲线）"""
    out = []
    for seg in dstr.split("M"):
        nums = [float(x) for x in NUM.findall(seg)]
        pts = list(zip(nums[0::2], nums[1::2]))
        if len(pts) >= 3:
            out.append(pts)
    return out


def to_d(subs):
    return "".join(
        "M" + "L".join("%s,%s" % (round(x, 1), round(y, 1)) for x, y in pts) + "Z"
        for pts in subs
    )


def area(pts):
    s = 0.0
    n = len(pts)
    for i in range(n):
        x0, y0 = pts[i]
        x1, y1 = pts[(i + 1) % n]
        s += x0 * y1 - x1 * y0
    return abs(s) / 2.0


def _bbox(pts):
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    return min(xs), min(ys), max(xs), max(ys)


# ---------------------------------------------------------------- 诊断
def thickness_profile(pts, arc=3.0):
    """
    每个顶点的局部厚度 = 到「沿路径弧长 >= arc 单位之外」的最近顶点的距离。

    为什么按弧长而不是按顶点序号：细丝是高频折返的一条窄带，走两三个顶点就
    折到对面去了。若按序号排除邻居（比如排除前后 9 个顶点），细丝的「对面」
    恰好落在被排除的范围内，厚度会被算成到肌肉主体的距离，于是漏判——髋内收
    肌膝部那条就是这么被漏掉的。按弧长（3 单位）排除，折返点仍在候选里，
    厚度才量得准。

    加速：点按 1 单位网格分桶，只在半径 3 单位的桶里找（我们只关心细不细）。
    """
    n = len(pts)
    cum = [0.0]
    for i in range(n):
        cum.append(cum[-1] + math.dist(pts[i], pts[(i + 1) % n]))
    total = cum[-1] or 1e-9

    cell = {}
    for i, (x, y) in enumerate(pts):
        cell.setdefault((int(x // 1), int(y // 1)), []).append(i)

    prof = []
    for i in range(n):
        xi, yi = pts[i]
        cx, cy = int(xi // 1), int(yi // 1)
        best = 1e9
        for gx in range(cx - 3, cx + 4):
            for gy in range(cy - 3, cy + 4):
                for j in cell.get((gx, gy), ()):
                    d = abs(cum[i] - cum[j])
                    if min(d, total - d) < arc:
                        continue
                    dx, dy = xi - pts[j][0], yi - pts[j][1]
                    dd = dx * dx + dy * dy
                    if dd < best:
                        best = dd
        prof.append(math.sqrt(best) if best < 1e9 else 999.0)
    return prof


def thin_runs(pts, thr=1.5):
    """
    最长「连续细段」的弧长。

    为什么看弧长而不是看最细值：肌肉末端本来就会收窄成尖角，那只有三五个点，
    是正常的；真正碍眼的细丝是「又细又长」的一条——几十个点连续贴在一起，
    描边后就是一撮锯齿。弧长把这两种情况分开。
    """
    n = len(pts)
    prof = thickness_profile(pts)
    step = [math.dist(pts[i], pts[(i + 1) % n]) for i in range(n)]
    thin = [p < thr for p in prof]
    if not any(thin) or all(thin):
        return 0.0, 0.0
    # 环形最长连续 True 段
    best = cur = 0.0
    for i in range(2 * n):
        if thin[i % n]:
            cur += step[i % n]
            best = max(best, cur)
        else:
            cur = 0.0
    return best, min(prof)


def diagnose(subs):
    """诊断一组子路径。"""
    min_t, thin_frac, dense_frac, n_pts = 999.0, 0.0, 0.0, 0
    run = 0.0
    for pts in subs:
        n = len(pts)
        n_pts += n
        prof = thickness_profile(pts)
        min_t = min(min_t, min(prof))
        thin_frac += sum(1 for p in prof if p < THIN_YEL) / n
        r, _ = thin_runs(pts)
        run = max(run, r)
        # 顶点过密：相邻两点间距 < 0.5 单位（正常轮廓 1~4 单位一个点）
        dense = 0
        for i in range(n):
            x0, y0 = pts[i]
            x1, y1 = pts[(i + 1) % n]
            if (x1 - x0) ** 2 + (y1 - y0) ** 2 < 0.25:
                dense += 1
        dense_frac += dense / n
    nsub = len(subs)
    return {
        "min": min_t,
        "thin": thin_frac / nsub,
        "dense": dense_frac / nsub,
        "run": run,
        "pts": n_pts,
        "subs": nsub,
    }


def grade(diag):
    """红 = 真细丝（又细又长）；黄 = 锯齿/局部偏薄，顺手抚平；绿 = 不动。"""
    if diag["run"] >= 6.0 or diag["min"] < 0.8:
        return "red"
    if diag["run"] >= 3.0 or diag["dense"] > 0.15:
        return "yellow"
    return "green"


# ---------------------------------------------------------------- 栅格形态学
def _disk(r):
    out = []
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            if dx * dx + dy * dy <= r * r:
                out.append((dx, dy))
    return out


def _shift(img, dx, dy, fill):
    out = Image.new("L", img.size, fill)
    out.paste(img, (dx, dy))
    return out


def _erode(img, r):
    acc = Image.new("L", img.size, 255)
    for dx, dy in _disk(r):
        acc = ImageChops.darker(acc, _shift(img, dx, dy, 255))
    return acc


def _dilate(img, r):
    acc = Image.new("L", img.size, 0)
    for dx, dy in _disk(r):
        acc = ImageChops.lighter(acc, _shift(img, dx, dy, 0))
    return acc


# ---------------------------------------------------------------- 轮廓跟踪
_N8 = [(-1, 0), (-1, -1), (0, -1), (1, -1), (1, 0), (1, 1), (0, 1), (-1, 1)]  # 顺时针


def _trace(px, W, H, start):
    """Moore 邻域跟踪，返回一条闭合轮廓的像素坐标列表。"""
    sx, sy = start
    contour = [(sx, sy)]
    bx, by = sx - 1, sy          # 起点左侧必为背景
    cx, cy = sx, sy
    for _ in range(W * H):
        try:
            i0 = _N8.index((bx - cx, by - cy))
        except ValueError:
            break
        nxt = None
        # 从回溯点的下一个方向开始搜：回溯点自己也是前景，若从 k=0 起搜会
        # 立刻退回去，走两步就掉头。
        for k in range(1, 9):
            dx, dy = _N8[(i0 + k) % 8]
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < W and 0 <= ny < H and px[nx, ny]:
                nxt = (nx, ny)
                break
        if nxt is None:
            break
        bx, by = cx, cy
        cx, cy = nxt
        if (cx, cy) == start:
            break
        contour.append((cx, cy))
    return contour


def contours_of(mask):
    """二值图 → 所有闭合轮廓（像素坐标）。"""
    W, H = mask.size
    px = mask.load()
    done = bytearray(W * H)
    out = []
    for y in range(H):
        for x in range(W):
            i = y * W + x
            if not px[x, y] or done[i]:
                continue
            if x > 0 and px[x - 1, y]:
                continue          # 不是该连通域的最左像素，跳过
            c = _trace(px, W, H, (x, y))
            for (cx, cy) in c:
                done[cy * W + cx] = 1
            if len(c) >= 4:
                out.append(c)
    return out


# ---------------------------------------------------------------- 平滑
def _dp(pts, eps):
    """Douglas-Peucker 简化（闭合环，固定首尾）。"""
    if len(pts) < 4:
        return pts[:]

    def rec(a, b):
        x0, y0 = pts[a]
        x1, y1 = pts[b]
        dx, dy = x1 - x0, y1 - y0
        L = math.hypot(dx, dy) or 1e-9
        far, idx = -1.0, -1
        for i in range(a + 1, b):
            x, y = pts[i]
            d = abs(dy * x - dx * y + x1 * y0 - y1 * x0) / L
            if d > far:
                far, idx = d, i
        if far > eps and idx > 0:
            return rec(a, idx)[:-1] + rec(idx, b)
        return [pts[a], pts[b]]

    return rec(0, len(pts) - 1)


def _chaikin(pts, rounds):
    for _ in range(rounds):
        n = len(pts)
        out = []
        for i in range(n):
            x0, y0 = pts[i]
            x1, y1 = pts[(i + 1) % n]
            out.append((0.75 * x0 + 0.25 * x1, 0.75 * y0 + 0.25 * y1))
            out.append((0.25 * x0 + 0.75 * x1, 0.25 * y0 + 0.75 * y1))
        pts = out
    return pts


def _refine(c, ss, r):
    """像素轮廓 → 平滑后的 viewBox 坐标轮廓。"""
    pts = [(x / ss, y / ss) for x, y in c]
    pts = _dp(pts, 0.30)                      # 先去掉栅格台阶
    pts = _chaikin(pts, 2 if r >= 3 else 1)   # 磨圆
    pts = _dp(pts, 0.22)                      # 再收一次点数
    # 统一绕向（顺时针），nonzero 填充下多块轮廓才不会被互相挖空
    s = 0.0
    for i in range(len(pts)):
        x0, y0 = pts[i]
        x1, y1 = pts[(i + 1) % len(pts)]
        s += x0 * y1 - x1 * y0
    if s > 0:
        pts.reverse()
    return pts


# ------------------------------------------------- 人体轮廓（body）专用修缮
#
# 肌肉那套（栅格开运算）不能用在 body 上：body 是整条人体外形线，含手指、脚趾
# 这类细节，开运算会把它们一起削掉。
#
# body 的问题是另一种：腿部这类「上下走向的长边缘」上，轮廓会来回摆（例如正面
# 膝内侧：15 单位高度里 x 摆了三次，幅度 3~4 单位），看着就是曲里拐弯。它既不是
# 高频抖动（中值/高斯滤不掉），也不能整体简化（弦高简化只会把摆动压成硬折角）。
#
# 所以按「局部特征」定点处理，只动满足两个条件的点：
#   ① 跨弦摆动：窗口内轮廓跑到端点连线的两侧（直线段不会）
#   ② 竖直长边：窗口内 |Δy| / 弧长 ≥ 0.65
# ② 是关键——手指缝、耳后这类地方也满足 ①，但它们的方向杂乱（实测 |Δy|/弧长
# 只有 0.01~0.38），加上 ② 就能只命中腿部这种"长直边被采样成锯齿"的情形，
# 手指、脚趾一根都不碰。
BODY_L = 10.0        # 检测窗口（弧长）
BODY_CROSS = 0.6     # 跨弦幅度阈值
BODY_VERT = 0.65     # 竖直度阈值
BODY_SIGMA = 7.0     # 平滑尺度
BODY_GROW = 3        # 命中点前后各扩展几个点一起平滑


def _arc_steps(pts):
    n = len(pts)
    return [math.dist(pts[i], pts[(i + 1) % n]) for i in range(n)]


def _win(st, n, i, L):
    """以 i 为中心、弧长 ±L 的环形窗口索引（按沿路径顺序）。"""
    idx = [i]
    s, k = 0.0, i
    while True:
        nx = (k + 1) % n
        if nx == i or s + st[k] > L:
            break
        s += st[k]
        idx.append(nx)
        k = nx
    s, k = 0.0, i
    while True:
        pv = (k - 1) % n
        if pv == i or pv in idx or s + st[pv] > L:
            break
        s += st[pv]
        idx.insert(0, pv)
        k = pv
    return idx


def body_wobble_flags(pts, L=BODY_L, cross=BODY_CROSS, vert=BODY_VERT):
    """标出「竖直长边上来回摆」的点。"""
    n = len(pts)
    st = _arc_steps(pts)
    flags = [False] * n
    for i in range(n):
        idx = _win(st, n, i, L)
        if len(idx) < 6:
            continue
        a, b = pts[idx[0]], pts[idx[-1]]
        dx, dy = b[0] - a[0], b[1] - a[1]
        chord = math.hypot(dx, dy)
        if chord < 1e-9:
            continue
        ds = [(dx * (pts[k][1] - a[1]) - dy * (pts[k][0] - a[0])) / chord for k in idx]
        if not (min(ds) < -cross and max(ds) > cross):
            continue                      # 只在一侧 → 正常凸起，不动
        arc = sum(st[k] for k in idx[:-1]) or 1e-9
        if abs(dy) / arc >= vert:         # 竖直长边 → 是腿/臂那种锯齿
            flags[i] = True
    return flags


def smooth_body(pts, rounds=3, sigma=BODY_SIGMA, grow=BODY_GROW):
    """只对摆动段做定向平滑，其余点原样不动。返回 (新点列, 处理过的点号集合)。"""
    p = [tuple(q) for q in pts]
    n = len(p)
    touched = set()
    for _ in range(rounds):
        flags = body_wobble_flags(p)
        if not any(flags):
            break
        sel = set()
        for i in range(n):
            if flags[i]:
                for k in range(-grow, grow + 1):
                    sel.add((i + k) % n)
        touched |= sel
        st = _arc_steps(p)
        cum = [0.0]
        for i in range(n):
            cum.append(cum[-1] + st[i])
        total = cum[-1]
        new = list(p)
        for i in sel:
            idx = _win(st, n, i, 2.5 * sigma)
            wsum = sx = sy = 0.0
            for k in idx:
                d = abs(cum[i] - cum[k])
                d = min(d, total - d)
                w = math.exp(-d * d / (2 * sigma * sigma))
                sx += w * p[k][0]
                sy += w * p[k][1]
                wsum += w
            new[i] = (sx / wsum, sy / wsum)
        p = new
    return p, touched


# ---------------------------------------------------------------- 修复主流程
def rebuild(subs, vbox, r):
    """栅格重建一组子路径。返回 (新的 subs, 面积变化率)。"""
    W, H = vbox
    w, h = int(W * SS), int(H * SS)
    img = Image.new("L", (w, h), 0)
    dr = ImageDraw.Draw(img)
    for pts in subs:
        dr.polygon([(x * SS, y * SS) for x, y in pts], fill=255)

    before = sum(1 for p in img.getdata() if p)
    opened = _dilate(_erode(img, r), r)          # 开运算：腐蚀 r 再膨胀 r，等量还原
    after = sum(1 for p in opened.getdata() if p)

    out = []
    for c in contours_of(opened):
        p = _refine(c, SS, r)
        if len(p) >= 3:
            out.append(p)
    # 大块在前，视觉顺序更稳
    out.sort(key=lambda p: -area(p))
    # 丢碎屑：开运算会把细丝末端残留的一点膨大切成独立小块（前臂屈肌群就切出
    # 了 9 个面积不到主体 1% 的碎点）。面积低于主体 2% 的一律不要，低于 3 平方
    # 单位的也不要。胫骨前肌那种占主体 16% 的下段是真结构，会保留下来。
    if out:
        cut = max(3.0, area(out[0]) * 0.02)
        out = [p for p in out if area(p) >= cut]
    # 正 = 变大，负 = 变小
    loss = 0.0 if before == 0 else (after - before) / before
    return out, loss


# ---------------------------------------------------------------- 入口
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--report", action="store_true", help="只诊断，不改文件")
    ap.add_argument("--apply", action="store_true", help="写回 assets/body_paths.json")
    ap.add_argument("--dry", action="store_true", help="演练：算完不落盘")
    ap.add_argument("--ids", default="", help="只处理这些肌肉 id（逗号分隔）")
    ap.add_argument("--force", default="", help="强制处理这些 id（即使诊断是绿档）")
    ap.add_argument("--max-loss", type=float, default=0.20, help="面积损失上限，超过则跳过")
    ap.add_argument("--what", choices=["muscles", "body", "both"], default="muscles",
                    help="修肌肉轮廓（默认）/ 人体外形线 body / 两者")
    args = ap.parse_args()

    if not (args.report or args.apply):
        ap.print_help()
        sys.exit(1)

    # ---- 人体外形线（body）：先诊断，--apply 时再动手 ----
    def body_report():
        print("\n人体外形线（body）—— 竖直长边上的来回摆：")
        for view in ("front", "back"):
            pts = subpaths(data[view]["body"]["d"])[0]
            flags = body_wobble_flags(pts)
            n = sum(flags)
            spots = []
            cur = None
            for i in range(len(pts)):
                if flags[i]:
                    if cur is None:
                        cur = [i, i]
                    else:
                        cur[1] = i
                elif cur:
                    spots.append(cur)
                    cur = None
            if cur:
                spots.append(cur)
            pos = "、".join("(%d,%d)~(%d,%d)" % (pts[a][0], pts[a][1], pts[b][0], pts[b][1])
                            for a, b in spots[:6])
            print("  %-5s %d 点 / 命中 %d 点 / %d 段  %s"
                  % (view, len(pts), n, len(spots), pos if spots else "—"))
        print()

    data = json.load(open(SRC, encoding="utf-8"))
    vbox = data["viewBox"]
    only = {s for s in args.ids.split(",") if s}
    force = {s for s in args.force.split(",") if s}

    rows, touched, skipped = [], 0, []
    for view in ("front", "back"):
        for gid, node in data[view].items():
            if gid in ("body", "guides"):
                continue
            subs = subpaths(node["d"])
            diag = diagnose(subs)
            g = grade(diag)
            if force and gid in force:
                g = "red"
            rows.append((view, gid, g, diag))

    rows.sort(key=lambda r: ({"red": 0, "yellow": 1, "green": 2}[r[2]], -r[3]["run"]))
    print("%-6s %-26s %-6s %7s %7s %7s %7s %6s"
          % ("视图", "肌肉 id", "档位", "最细", "细丝长", "细段%", "密点%", "顶点"))
    print("-" * 82)
    for view, gid, g, d in rows:
        print("%-6s %-26s %-6s %7.2f %7.1f %7.1f %7.1f %6d"
              % (view, gid, g, d["min"], d["run"], d["thin"] * 100,
                 d["dense"] * 100, d["pts"]))
    n = {"red": 0, "yellow": 0, "green": 0}
    for _, _, g, _ in rows:
        n[g] += 1
    print("-" * 74)
    print("红 %d / 黄 %d / 绿 %d （共 %d 组）" % (n["red"], n["yellow"], n["green"], len(rows)))

    if args.report:
        if args.what in ("body", "both"):
            body_report()
        return

    n_body = 0

    if args.what in ("muscles", "both"):
        for view, gid, g, d in rows:
            if g == "green":
                continue
            if only and gid not in only:
                continue
            node = data[view][gid]
            subs = subpaths(node["d"])
            r = 3 if g == "red" else 2
            new, loss = rebuild(subs, vbox, r)
            if not new:
                skipped.append("%s/%s 重建后为空" % (view, gid))
                continue
            if abs(loss) > args.max_loss:
                skipped.append("%s/%s 面积变化 %+.0f%% 超上限" % (view, gid, loss * 100))
                continue
            a0 = sum(area(p) for p in subs)
            a1 = sum(area(p) for p in new)
            # 复检：细丝是不是真没了
            nd = diagnose(new)
            print("  · %-6s %-22s r=%d  面积 %7.1f→%7.1f (%+5.1f%%)  顶点 %3d→%3d  "
                  "细丝 %.1f→%.1f  最细 %.2f→%.2f"
                  % (view, gid, r, a0, a1, loss * 100, d["pts"],
                     sum(len(p) for p in new), d["run"], nd["run"], d["min"], nd["min"]))
            node["d"] = to_d(new)
            touched += 1
    else:
        touched = 0

    if args.what in ("body", "both"):
        for view in ("front", "back"):
            node = data[view]["body"]
            pts = subpaths(node["d"])[0]
            before = list(pts)
            new, sel = smooth_body(pts)
            if not sel:
                print("  · %-5s body  未发现竖直长边摆动，保持原样" % view)
                continue
            move = max(math.dist(before[i], new[i]) for i in sel)
            if move > 8.0:
                skipped.append("%s/body 最大位移 %.1f 单位，超安全阈值" % (view, move))
                continue
            b0, b1 = _bbox(before), _bbox(new)
            print("  · %-5s body  移动 %3d/%d 点  最大位移 %.2f 单位  "
                  "包围盒 y %.0f~%.0f → %.0f~%.0f"
                  % (view, len(sel), len(pts), move, b0[1], b0[3], b1[1], b1[3]))
            node["d"] = to_d([new])
            n_body += 1

    for s in skipped:
        print("  ! 跳过：%s" % s)
    print("\n共修缮：肌肉 %d 组，人体外形线 %d 条" % (touched, n_body))

    if args.dry or (touched + n_body) == 0:
        print("（--dry，未写入）" if args.dry else "（无改动）")
        return

    if not os.path.exists(BAK):
        shutil.copy2(SRC, BAK)
        print("已备份原件 → assets/body_paths.raw.json")
    with open(SRC, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    print("已写入 %s" % SRC)


if __name__ == "__main__":
    main()
