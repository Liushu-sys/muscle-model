#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从 anatomy.glb 提取「正面 / 背面」人体线稿底图 + 42 组肌肉轮廓矢量路径。

做法（不用建模软件、不用 3D 渲染）：
  1. 解析 glTF，把每块肌肉的三角面变换到世界坐标
  2. 正交投影到 XY 平面（Blender Z-up -> Y-up 后）
  3. 身体底图：全部顶点投影成点云 -> 形态学闭运算 -> 填洞 -> 平滑轮廓
     （这样头 / 手 / 脚也是完整外形，不需要单独画）
  4. 每块肌肉：三角面光栅化 -> 连通域 -> Moore 邻域追踪 -> Chaikin 平滑 -> RDP 简化
  5. 背面视图做一次镜像（左右对调），才是「从背后看」的正确朝向

产物（两个都会**覆盖**已有文件）：
  assets/body_paths.json    {viewBox, front:{body,guides,<id>}, back:{...}}
  assets/body_preview.html  可直接双击打开的预览（悬停高亮 / 点击高亮）

用法：
  python3 tools/extract_body_svg.py

⚠️ 前置：需要 assets/anatomy.glb（约 25MB，原始 3D 模型）。它体积太大没有入库，
   跑本脚本前先从 Bodymap-App 仓库的 assets/ 手动拷过来，否则会 FileNotFoundError。

⚠️ 重跑之后必须跟着跑一次下游，否则左右分离的数据会跟新图对不上：
    python3 tools/gen_body_sides.py      # 重新生成 body_sides.json（会自动同步到 src/assets/）
    python3 tools/check_data.py          # 校验 id 三方一致
"""
import json
import os
import struct
import sys
from collections import deque

import numpy as np
from PIL import Image, ImageDraw

sys.setrecursionlimit(200000)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GLB = os.path.join(ROOT, "assets", "anatomy.glb")
OUT_JSON = os.path.join(ROOT, "assets", "body_paths.json")
OUT_HTML = os.path.join(ROOT, "assets", "body_preview.html")

VW, VH = 200, 460          # 目标坐标系
S = 3                      # 超采样倍数
W, H = VW * S, VH * S

# ---------------------------------------------------------------- 分组定义
# (组 id, 中文名, [匹配关键词...])   顺序 = 绘制顺序：深层在前，浅层盖在上面
SPEC = [
    ('suboccipital',        '枕下肌群',   ['rectus capitis posterior', 'obliquus capitis']),
    ('deep_neck_flexor',    '深层颈屈肌', ['longus colli', 'longus capitis', 'rectus capitis anterior']),
    ('splenius_capitis',    '头夹肌',     ['splenius']),
    ('transversus_abdominis', '腹横肌',   ['transversus abdominis', 'transverse abdominal']),
    ('iliopsoas',           '髂腰肌',     ['psoas', 'iliacus']),
    ('quadratus_lumborum',  '腰方肌',     ['quadratus lumborum']),
    ('piriformis',          '梨状肌',     ['piriformis', 'gemellus', 'obturator',
                                           'quadratus femoris']),
    ('gluteus_medius',      '臀中肌',     ['gluteus medius', 'gluteus minimus']),
    ('teres_minor',         '小圆肌',     ['teres minor']),
    ('rhomboid',            '菱形肌',     ['rhomboid']),
    ('subscapularis',       '肩胛下肌',   ['subscapularis']),
    ('supraspinatus',       '冈上肌',     ['supraspinatus']),
    ('infraspinatus',       '冈下肌',     ['infraspinatus']),
    ('erector_spinae',      '竖脊肌',     ['iliocostalis', 'longissimus', 'spinalis']),
    ('multifidus',          '多裂肌',     ['multifidus']),
    ('serratus_anterior',   '前锯肌',     ['serratus anterior']),
    ('pectoralis_minor',    '胸小肌',     ['pectoralis minor', 'subclavius']),
    ('levator_scapulae',    '肩胛提肌',   ['levator scapulae']),
    ('scalenes',            '斜角肌',     ['scalenus']),
    ('trapezius_middle',    '中斜方肌',   []),
    ('trapezius_lower',     '下斜方肌',   []),
    ('trapezius_upper',     '上斜方肌',   []),
    ('latissimus_dorsi',    '背阔肌',     ['latissimus']),
    ('obliquus_externus',   '腹外斜肌',   ['obliquus externus', 'external oblique']),
    ('obliquus_internus',   '腹内斜肌',   ['internal oblique']),
    ('rectus_abdominis',    '腹直肌',     ['rectus abdominis', 'pyramidalis']),
    ('pectoralis_major',    '胸大肌',     ['pectoralis major']),
    ('teres_major',         '大圆肌',     ['teres major']),
    ('sartorius',           '缝匠肌',     ['sartorius']),
    ('tensor_fasciae_latae', '阔筋膜张肌', ['tensor fasciae']),
    ('hip_adductors',       '髋内收肌群', ['adductor', 'pectineus', 'gracilis']),
    ('quadriceps',          '股四头肌',   ['vastus', 'rectus femoris', 'articularis genus']),
    ('biceps_brachii',      '肱二头肌',   ['biceps brachii', 'brachialis', 'coracobrachialis']),
    ('brachioradialis',     '肱桡肌',     ['brachioradialis']),
    ('triceps_brachii',     '肱三头肌',   ['triceps brachii', 'anconeus']),
    ('forearm_flexors',     '前臂屈肌群', ['flexor carpi', 'flexor digitorum superficialis',
                                           'flexor digitorum profundus', 'palmaris', 'pronator',
                                           'flexor pollicis longus']),
    ('forearm_extensors',   '前臂伸肌群', ['extensor carpi', 'extensor digitorum', 'extensor pollicis',
                                           'supinator', 'abductor pollicis longus', 'extensor indicis']),
    ('sternocleidomastoid', '胸锁乳突肌', ['sternocleidomastoid', 'sternocleido']),
    ('deltoid',             '三角肌',     ['deltoid']),
    ('hamstrings',          '腘绳肌',     ['biceps femoris', 'semitendinosus', 'semimembranosus']),
    ('gluteus_maximus',     '臀大肌',     ['gluteus maximus']),
    ('soleus',              '比目鱼肌',   ['soleus', 'plantaris']),
    ('gastrocnemius',       '腓肠肌',     ['gastrocnemius']),
    ('fibularis',           '腓骨肌群',   ['fibularis', 'peroneus']),
    ('tibialis_posterior',  '胫骨后肌',   ['tibialis posterior']),
    ('iliotibial_tract',    '髂胫束',     ['iliotibial tract']),
    ('tibialis_anterior',   '胫骨前肌',   ['tibialis anterior', 'extensor digitorum longus']),
]

ORDER = [g for g, _, _ in SPEC]
CN = {g: cn for g, cn, _ in SPEC}
RULES = {g: kw for g, _, kw in SPEC}

# 正 / 背面各显示哪些（三角肌两面都有）
FRONT_IDS = ['sternocleidomastoid', 'scalenes', 'deep_neck_flexor', 'pectoralis_minor',
             'pectoralis_major', 'subscapularis', 'serratus_anterior', 'biceps_brachii',
             'brachioradialis', 'forearm_flexors', 'transversus_abdominis',
             'obliquus_externus', 'obliquus_internus', 'rectus_abdominis',
             'iliopsoas', 'sartorius', 'tensor_fasciae_latae', 'hip_adductors', 'quadriceps',
             'iliotibial_tract', 'tibialis_anterior', 'deltoid']
BACK_IDS = ['suboccipital', 'splenius_capitis', 'trapezius_upper', 'levator_scapulae',
            'supraspinatus', 'rhomboid', 'infraspinatus', 'teres_minor', 'teres_major',
            'trapezius_middle', 'latissimus_dorsi', 'trapezius_lower', 'erector_spinae',
            'multifidus', 'quadratus_lumborum', 'gluteus_medius', 'piriformis', 'gluteus_maximus',
            'triceps_brachii', 'forearm_extensors', 'iliotibial_tract', 'hamstrings',
            'gastrocnemius', 'soleus', 'tibialis_posterior', 'fibularis', 'deltoid']

HAND_FOOT_NOISE = ['lumbrical', 'interosseous', 'opponens', 'hallucis', 'digiti minimi',
                   'flexor digiti', 'abductor digiti', 'quadratus plantae']


def classify(name):
    n = (name or '').lower()
    if not n:
        return None
    # ① 手部拇收肌（adductor pollicis）不属于髋内收肌群，否则会误配
    if 'adductor pollicis' in n:
        return None
    # ② 小腿的趾长伸肌（extensor digitorum longus）名字里含
    #    "extensor digitorum"，会被前臂伸肌群抢先收走。先判给小腿前群。
    if 'extensor digitorum longus' in n:
        return 'tibialis_anterior'
    for bad in HAND_FOOT_NOISE:
        if bad in n:
            return None
    if 'trapezius' in n:
        if 'descending' in n:
            return 'trapezius_upper'
        if 'ascending' in n:
            return 'trapezius_lower'
        return 'trapezius_middle'
    for gid in ORDER:
        for k in RULES[gid]:
            if k in n:
                return gid
    return None


# ---------------------------------------------------------------- glTF 解析
CT = {5120: 'b', 5121: 'B', 5122: 'h', 5123: 'H', 5125: 'I', 5126: 'f'}
CT_SZ = {5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4}
NC = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}


def load_glb(path):
    data = open(path, 'rb').read()
    off, js, bin_ch = 12, None, None
    while off < len(data):
        ln, ty = struct.unpack('<I4s', data[off:off + 8])
        body = data[off + 8:off + 8 + ln]
        if ty == b'JSON':
            js = json.loads(body.decode('utf-8'))
        elif ty == b'BIN\x00':
            bin_ch = body
        off += 8 + ln
    return js, bin_ch


def read_accessor(js, bin_ch, idx):
    acc = js['accessors'][idx]
    n = NC[acc['type']]
    ct = acc['componentType']
    sz = CT_SZ[ct]
    if 'bufferView' not in acc:
        return np.zeros((acc['count'], n), dtype=np.float32)
    bv = js['bufferViews'][acc['bufferView']]
    base = bv.get('byteOffset', 0) + acc.get('byteOffset', 0)
    stride = bv.get('byteStride') or sz * n
    count = acc['count']
    raw = np.frombuffer(bin_ch, dtype=np.uint8, count=count * stride, offset=base)
    if stride == sz * n:
        return np.frombuffer(raw.tobytes(), dtype=np.dtype(CT[ct]),
                             count=count * n).reshape(count, n)
    raw = raw.reshape(count, stride)
    return np.ascontiguousarray(raw[:, :sz * n]).view(np.dtype(CT[ct])).reshape(count, n)


def quat_mat(q):
    x, y, z, w = q
    return np.array([
        [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w), 0],
        [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w), 0],
        [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y), 0],
        [0, 0, 0, 1]], dtype=float)


def node_mats(js):
    nodes = js['nodes']
    parent = {}
    for i, n in enumerate(nodes):
        for c in n.get('children', []):
            parent[c] = i
    mats = [None] * len(nodes)

    def walk(i, P):
        n = nodes[i]
        if 'matrix' in n:
            M = np.array(n['matrix'], dtype=float).reshape(4, 4)
        else:
            t = n.get('translation', [0, 0, 0])
            r = n.get('rotation', [0, 0, 0, 1])
            s = n.get('scale', [1, 1, 1])
            M = np.eye(4)
            M[:3, :3] = quat_mat(r)[:3, :3] * np.array(s, dtype=float)
            M[:3, 3] = t
        Wm = P @ M
        mats[i] = Wm
        for c in n.get('children', []):
            walk(c, Wm)

    for i in range(len(nodes)):
        if i not in parent:
            walk(i, np.eye(4))
    return mats


# ---------------------------------------------------------------- 形态学
def dilate(mask, r):
    out = mask
    for _ in range(r):
        a = out.copy()
        a[1:, :] |= out[:-1, :]
        a[:-1, :] |= out[1:, :]
        a[:, 1:] |= out[:, :-1]
        a[:, :-1] |= out[:, 1:]
        out = a
    return out


def erode(mask, r):
    return ~dilate(~mask, r)


def fill_holes(mask):
    """把身体内部的空洞（手指缝、腋下等）填实"""
    try:
        from scipy import ndimage
        return ndimage.binary_fill_holes(mask)
    except Exception:
        pass
    inv = ~mask
    seen = np.zeros_like(inv)
    dq = deque()
    for x in range(W):
        for y in (0, H - 1):
            if inv[y, x] and not seen[y, x]:
                seen[y, x] = True
                dq.append((y, x))
    for y in range(H):
        for x in (0, W - 1):
            if inv[y, x] and not seen[y, x]:
                seen[y, x] = True
                dq.append((y, x))
    while dq:
        y, x = dq.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < H and 0 <= nx < W and inv[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True
                dq.append((ny, nx))
    return mask | (inv & ~seen)


def blur_mask(mask, radius, thr=127):
    """高斯模糊后重取阈值：把剪影的凹凸噪音抹平，得到平滑外形"""
    from PIL import ImageFilter
    img = Image.fromarray((mask * 255).astype(np.uint8))
    img = img.filter(ImageFilter.GaussianBlur(radius=radius))
    return np.array(img) > thr


def convex_hull(points):
    """Andrew monotone chain，points = [(x, y), ...]"""
    pts = sorted(set(points))
    if len(pts) < 3:
        return pts

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    lower = []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    upper = []
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]


def smooth_head(mask):
    """头部只有面部肌肉，剪影是「云朵」且头顶缺一块（没有颅骨网格）。
    换成该区域的内切椭圆：就是参考图里那种光洁的蛋形头。"""
    rows = np.where(mask.any(axis=1))[0]
    top, bot = int(rows[0]), int(rows[-1])
    hh = bot - top
    left = np.argmax(mask, axis=1)
    right = W - 1 - np.argmax(mask[:, ::-1], axis=1)
    width = np.where(mask.any(axis=1), right - left + 1, 0)
    # 脖子 = 头下方最窄的一行
    y0 = int(top + hh * 0.10)
    y1 = int(top + hh * 0.22)
    band = width[y0:y1]
    if len(band) == 0:
        return mask
    neck_y = y0 + int(np.argmin(band))
    pts = np.argwhere(mask[:neck_y])
    if len(pts) < 50:
        return mask
    hy0, hy1 = int(pts[:, 0].min()), int(pts[:, 0].max())
    hx0, hx1 = int(pts[:, 1].min()), int(pts[:, 1].max())
    eimg = Image.new('L', (W, H), 0)
    ImageDraw.Draw(eimg).ellipse([hx0, hy0, hx1, hy1], fill=255)
    hmask = np.array(eimg) > 0
    out = mask.copy()
    out[:neck_y] = hmask[:neck_y]
    return out


# ---------------------------------------------------------------- 轮廓提取
DIRS = [(0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1)]
DIR_IDX = {d: i for i, d in enumerate(DIRS)}


def components(mask, min_size):
    h, w = mask.shape
    lab = np.full((h, w), -1, dtype=np.int32)
    out = []
    for py, px in np.argwhere(mask):
        if lab[py, px] >= 0:
            continue
        cid = len(out)
        pts = []
        st = [(int(py), int(px))]
        lab[py, px] = cid
        while st:
            y, x = st.pop()
            pts.append((y, x))
            for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and lab[ny, nx] < 0:
                    lab[ny, nx] = cid
                    st.append((ny, nx))
        if len(pts) >= min_size:
            out.append(pts)
        else:
            lab[lab == cid] = -2
    return out


def trace_component(pts):
    Sset = set(pts)
    sy, sx = min(pts)
    b = (sy, sx)
    p = (sy, sx - 1)
    out = []
    while True:
        out.append(b)
        sd = DIR_IDX.get((p[0] - b[0], p[1] - b[1]), 0)
        found = None
        for k in range(1, 9):
            d = DIRS[(sd + k) % 8]
            cand = (b[0] + d[0], b[1] + d[1])
            if cand in Sset:
                found = cand
                break
        if found is None:
            break
        p, b = b, found
        if b == (sy, sx):
            break
        if len(out) > 400000:
            break
    return out


def chaikin(pts, iters=2):
    for _ in range(iters):
        n = len(pts)
        if n < 3:
            break
        nxt = []
        for i in range(n):
            ax, ay = pts[i]
            bx, by = pts[(i + 1) % n]
            nxt.append((0.75 * ax + 0.25 * bx, 0.75 * ay + 0.25 * by))
            nxt.append((0.25 * ax + 0.75 * bx, 0.25 * ay + 0.75 * by))
        pts = nxt
    return pts


def rdp(pts, eps):
    if len(pts) < 3:
        return pts
    ax, ay = pts[0]
    bx, by = pts[-1]
    dx, dy = bx - ax, by - ay
    L = dx * dx + dy * dy
    md, idx = -1.0, 0
    for i in range(1, len(pts) - 1):
        px, py = pts[i]
        if L == 0:
            d = ((px - ax) ** 2 + (py - ay) ** 2) ** 0.5
        else:
            t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / L))
            d = ((px - ax - t * dx) ** 2 + (py - ay - t * dy) ** 2) ** 0.5
        if d > md:
            md, idx = d, i
    if md > eps:
        return rdp(pts[:idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [pts[0], pts[-1]]


def simplify_closed(pts, eps):
    n = len(pts)
    if n < 6:
        return pts
    p0 = pts[0]
    far = max(range(n), key=lambda i: (pts[i][0] - p0[0]) ** 2 + (pts[i][1] - p0[1]) ** 2)
    a = rdp(pts[:far + 1], eps)[:-1]
    b = rdp(pts[far:] + [pts[0]], eps)[:-1]
    return a + b


def mask_to_path(mask, min_size, pre_eps, eps):
    subs = []
    cxs = cys = cn = 0
    for comp in components(mask, min_size):
        raw = trace_component(comp)
        if len(raw) < 12:
            continue
        poly = [(x, y) for (y, x) in raw]
        for x, y in poly:
            cxs += x
            cys += y
            cn += 1
        rough = simplify_closed(poly, pre_eps)
        smooth = chaikin(rough, 2)
        simp = simplify_closed(smooth, eps)
        if len(simp) < 4:
            continue
        d = ''.join(('M' if i == 0 else 'L') + '%.1f,%.1f' % (x / S, y / S)
                    for i, (x, y) in enumerate(simp)) + 'Z'
        subs.append(d)
    if not subs:
        return None
    return {'d': ' '.join(subs), 'cx': round(cxs / cn / S, 1), 'cy': round(cys / cn / S, 1),
            'parts': len(subs)}


# ---------------------------------------------------------------- 参考线
def center_run(mask, y):
    row = mask[y]
    if not row.any():
        return None
    c = W // 2
    if not row[c]:
        idx = np.where(row)[0]
        c = int(idx[np.argmin(np.abs(idx - c))])
    l = c
    while l - 1 >= 0 and row[l - 1]:
        l -= 1
    r = c
    while r + 1 < W and row[r + 1]:
        r += 1
    return l, r


def leg_runs(mask, y):
    """膝盖这一行，找出左右腿各自的横向区间"""
    row = mask[y]
    idx = np.where(row)[0]
    if len(idx) == 0:
        return []
    runs = []
    st = idx[0]
    prev = idx[0]
    for x in idx[1:]:
        if x - prev > 3:
            runs.append((st, prev))
            st = x
        prev = x
    runs.append((st, prev))
    return [r for r in runs if r[1] - r[0] > 8][:2]


def build_guides(mask):
    rows = np.where(mask.any(axis=1))[0]
    top, bot = int(rows[0]), int(rows[-1])
    hh = bot - top
    left = np.argmax(mask, axis=1)
    right = W - 1 - np.argmax(mask[:, ::-1], axis=1)
    width = np.where(mask.any(axis=1), right - left + 1, 0)

    def band(frac0, frac1):
        y0 = int(top + hh * frac0)
        y1 = int(top + hh * frac1)
        mid = (y0 + y1) // 2
        seg_l = np.where(mask[mid])[0]
        torso = (int(seg_l[0]), int(seg_l[-1])) if len(seg_l) else (0, W - 1)
        return mid, torso

    def dash(p0, p1):
        return {'a': [round(p0[0] / S, 1), round(p0[1] / S, 1)],
                'b': [round(p1[0] / S, 1), round(p1[1] / S, 1)]}

    g = []
    # 锁骨横线 / 腰线 / 髋线
    for f in (0.175, 0.395, 0.495):
        y, (l, r) = band(f, f)
        g.append(dash((l, y), (r, y)))
    # 中轴竖线（颈根 -> 髋）
    y0 = int(top + hh * 0.135)
    y1 = int(top + hh * 0.495)
    run = center_run(mask, int(top + hh * 0.30))
    cx = (run[0] + run[1]) // 2 if run else W // 2
    g.append(dash((cx, y0), (cx, y1)))
    # 膝盖刻度
    yk = int(top + hh * 0.72)
    for (l, r) in leg_runs(mask, yk):
        g.append(dash((l, yk), (r, yk)))
    # 肘部刻度
    ye = int(top + hh * 0.375)
    for (l, r) in leg_runs(mask, ye)[:2]:
        g.append(dash((l, ye), (l + (r - l) // 3, ye)))
        g.append(dash((r - (r - l) // 3, ye), (r, ye)))
    return g


# ---------------------------------------------------------------- 主流程
def main():
    print('解析 glTF …')
    js, bin_ch = load_glb(GLB)
    mats = node_mats(js)
    R = np.array([[1, 0, 0], [0, 0, 1], [0, -1, 0]], dtype=float)  # Blender Z-up -> Y-up

    tris_by_group = {}
    verts_all = []

    for i, n in enumerate(js['nodes']):
        if 'mesh' not in n:
            continue
        gid = classify(n.get('name') or '')
        M = mats[i]
        for prim in js['meshes'][n['mesh']].get('primitives', []):
            if 'POSITION' not in prim.get('attributes', {}):
                continue
            pos = read_accessor(js, bin_ch, prim['attributes']['POSITION']).astype(np.float64)
            v = pos @ M[:3, :3].T + M[:3, 3]
            v = v @ R.T
            verts_all.append(v[::4] if len(v) > 400 else v)
            if gid is None:
                continue
            if 'indices' in prim:
                idx = read_accessor(js, bin_ch, prim['indices']).reshape(-1)
                tris_by_group.setdefault(gid, []).append(v[idx])
            else:
                tris_by_group.setdefault(gid, []).append(v)

    allp = np.vstack(verts_all)
    minx, miny = allp[:, 0].min(), allp[:, 1].min()
    maxx, maxy = allp[:, 0].max(), allp[:, 1].max()
    bw, bh = maxx - minx, maxy - miny
    sc = min(W / bw, H / bh) * 0.98
    ox = W / 2 - (minx + maxx) / 2 * sc
    oy = H / 2 + (miny + maxy) / 2 * sc
    print('包围盒 %.0f x %.0f，缩放 %.2f' % (bw, bh, sc))

    def project(v, mirror=False):
        x = v[:, 0] * sc + ox
        if mirror:
            x = W - x
        return np.stack([x, -v[:, 1] * sc + oy], axis=1)

    def rasterize_gid(gid, mirror):
        img = Image.new('L', (W, H), 0)
        dr = ImageDraw.Draw(img)
        for chunk in tris_by_group.get(gid, []):
            p = project(chunk, mirror).reshape(-1, 3, 2)
            for t in p:
                xs, ys = t[:, 0], t[:, 1]
                if xs.max() < 0 or ys.max() < 0 or xs.min() > W or ys.min() > H:
                    continue
                dr.polygon([(float(t[0, 0]), float(t[0, 1])),
                            (float(t[1, 0]), float(t[1, 1])),
                            (float(t[2, 0]), float(t[2, 1]))], fill=1)
        return np.array(img) > 0

    # ---- 身体底图：全部顶点 -> 闭运算 -> 填洞（头/手/脚因此是完整外形）
    bodies = {}
    for view, mirror in (('front', False), ('back', True)):
        xy = project(allp, mirror)
        m = np.zeros((H, W), dtype=bool)
        xs = np.rint(xy[:, 0]).astype(np.int64)
        ys = np.rint(xy[:, 1]).astype(np.int64)
        ok = (xs >= 0) & (xs < W) & (ys >= 0) & (ys < H)
        m[ys[ok], xs[ok]] = True
        m = dilate(m, 2)
        m = erode(dilate(m, 4), 4)
        m = fill_holes(m)
        m = blur_mask(m, 3)          # 抹平手臂/腿的凹凸噪音
        m = smooth_head(m)           # 头部换成平滑蛋形（面部肌肉拼出来的形状太乱）
        m = fill_holes(m)
        bodies[view] = m
        print('%s 底图：%d 像素' % (view, int(m.sum())))

    out = {'viewBox': [VW, VH], 'groups': CN, 'views': {'front': FRONT_IDS, 'back': BACK_IDS}}
    for view in ('front', 'back'):
        m = bodies[view]
        body = mask_to_path(m, 2000, 1.7, 0.5)
        out[view] = {'body': body, 'guides': build_guides(m)}
        print('%s 底图轮廓 %d 段' % (view, body['parts'] if body else 0))

    for view, ids in (('front', FRONT_IDS), ('back', BACK_IDS)):
        mirror = (view == 'back')
        # 腹外斜肌 / 腹横肌的网格里带了腹白线腱膜，直接投影会糊住整个腹部，
        # 看着像「一大块」。挖掉腹直肌投影区，只留两侧能摸到的肌性部分。
        rectus_m = (rasterize_gid('rectus_abdominis', mirror)
                    if 'rectus_abdominis' in tris_by_group else None)
        if rectus_m is not None:
            rectus_m = dilate(rectus_m, 1)
        for gid in ids:
            if gid not in tris_by_group:
                print('  ⚠ 模型中没有：%s' % gid)
                continue
            m = rasterize_gid(gid, mirror)
            if gid in ('obliquus_externus', 'obliquus_internus',
                       'transversus_abdominis') and rectus_m is not None:
                m = m & ~rectus_m
            p = mask_to_path(m, 150, 1.0, 0.32)
            if p:
                out[view][gid] = p
                print('  %-22s %s  %d 块' % (gid, CN[gid], p['parts']))
            else:
                print('  ⚠ 轮廓为空：%s' % gid)

    with open(OUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, separators=(',', ':'))
    print('已写出 %s  (%.0f KB)' % (OUT_JSON, os.path.getsize(OUT_JSON) / 1024))
    build_preview(out)


def build_preview(out):
    def panel(view):
        data = out[view]
        ids = [i for i in ORDER if i in data]
        vb = out['viewBox']
        s = ['<svg viewBox="0 0 %d %d" width="288" height="662">' % (vb[0], vb[1])]
        s.append('<path d="%s" fill="#FFFFFF" stroke="#A6907F" stroke-width="0.95" '
                 'stroke-linejoin="round"/>' % data['body']['d'])
        for g in data.get('guides', []):
            s.append('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="#E0D2C4" '
                     'stroke-width="0.5" stroke-dasharray="2.6 2.4"/>'
                     % (g['a'][0], g['a'][1], g['b'][0], g['b'][1]))
        for gid in ids:
            s.append('<path class="m" data-id="%s" data-cn="%s" d="%s"/>'
                     % (gid, CN.get(gid, gid), data[gid]['d']))
        s.append('</svg>')
        return ''.join(s), len(ids)

    f_svg, f_n = panel('front')
    b_svg, b_n = panel('back')
    html = """<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BodyMap · 肌肉分区线稿（正面/背面）</title><style>
*{box-sizing:border-box}
body{margin:0;background:#FAF6F1;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif}
header{padding:20px 26px 2px}
h1{font-size:18px;margin:0;color:#2A211C}
p.sub{margin:7px 0 0;font-size:13px;color:#7A6B60;line-height:1.65}
.bar{display:flex;gap:8px;flex-wrap:wrap;padding:14px 26px 2px}
button{font:inherit;font-size:13px;padding:7px 13px;border-radius:9px;border:1px solid #E0D2C4;
  background:#fff;color:#2A211C;cursor:pointer}
button:hover{border-color:#BFA992}
.wrap{display:flex;gap:22px;justify-content:center;padding:16px 26px 6px;flex-wrap:wrap}
.card{background:#fff;border-radius:16px;padding:10px 10px 4px;box-shadow:0 2px 12px rgba(120,80,50,.08)}
.card h3{margin:2px 0 4px;font-size:12.5px;color:#5C4C41;text-align:center;font-weight:600}
#lbl{padding:8px 26px 30px;font-size:13px;color:#6B5B50;min-height:22px}
.sw{display:inline-block;width:10px;height:10px;border-radius:3px;vertical-align:middle;margin:0 4px 0 12px}
.m{fill:#F6F0E9;stroke:#E3D5C8;stroke-width:.46;cursor:pointer;transition:fill .12s}
.m:hover{fill:#EADFD2}
.m.tight{fill:#E0703F;stroke:#BF5228;stroke-width:.55}
.m.weak{fill:#5578A8;stroke:#3D5E88;stroke-width:.55}
</style></head><body>
<header>
  <h1>肌肉分区 · 线稿版</h1>
  <p class="sub">轮廓由 <b>anatomy.glb</b> 正交投影自动提取：<b>%d 组</b>肌肉各是一条独立矢量路径，头/手/脚由点云闭运算补成完整外形。
  <span class="sw" style="background:#E0703F"></span>过劳（偏紧）<span class="sw" style="background:#5578A8"></span>过弱（偏弱）
  <span class="sw" style="background:#F6F0E9;border:1px solid #E3D5C8"></span>未命中</p>
</header>
<div class="bar">
  <button onclick="demo()">演示：颈椎模式（上斜方+肩胛提肌紧 / 深层颈屈肌弱）</button>
  <button onclick="clr()">清除</button>
  <button onclick="allOn()">全部肌肉显影：开</button>
</div>
<div class="wrap">
  <div class="card"><h3>正面 · %d 组</h3>%s</div>
  <div class="card"><h3>背面 · %d 组</h3>%s</div>
</div>
<div id="lbl">悬停看名称，点一下即上色（默认按“过劳”着色）。</div>
<script>
function all(){ return document.querySelectorAll('.m'); }
// 被判定的肌肉一律置顶：深层肌肉（菱形肌等）在解剖上被表层盖住，
// 不置顶的话标了色也看不见。
function raise(e){ e.parentNode.appendChild(e); }
function clr(){ all().forEach(function(e){ e.classList.remove('tight','weak'); });
  document.getElementById('lbl').textContent='已清除'; }
function demo(){ clr();
  ['trapezius_upper','levator_scapulae','pectoralis_minor'].forEach(function(id){
    document.querySelectorAll('[data-id="'+id+'"]').forEach(function(e){e.classList.add('tight');raise(e);});});
  ['deep_neck_flexor','rhomboid'].forEach(function(id){
    document.querySelectorAll('[data-id="'+id+'"]').forEach(function(e){e.classList.add('weak');raise(e);});});
  document.getElementById('lbl').textContent='演示：颈椎模式 —— 过劳：上斜方肌 / 肩胛提肌 / 胸小肌；过弱：深层颈屈肌 / 菱形肌'; }
var on = true;
function allOn(){ on=!on; document.querySelectorAll('.m').forEach(function(e){
  e.style.opacity = on ? '' : '0'; }); }
all().forEach(function(e){
  e.addEventListener('click', function(){
    var t = e.classList.contains('tight');
    clr(); if(!t){ e.classList.add('tight'); raise(e); }
    document.getElementById('lbl').textContent = '选中：' + e.dataset.cn + '（' + e.dataset.id + '）';
  });
});
</script>
</body></html>""" % (len(set(FRONT_IDS) | set(BACK_IDS)), f_n, f_svg, b_n, b_svg)
    with open(OUT_HTML, 'w', encoding='utf-8') as f:
        f.write(html)
    print('已写出 %s' % OUT_HTML)


if __name__ == '__main__':
    main()
