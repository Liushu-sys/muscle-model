#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
用 assets/body_paths.json 生成静态样张 PNG（线稿风 + 暖陶土配色）。

  assets/body_look.png   正面 / 背面并排，演示一组「颈椎模式」的过劳 / 过弱着色

配色来自「暖陶土」色板（整体暖调，只有「过弱」用一格沉稳蓝做必要的语义对比）：
  #E0703F #F2A87C  暖橙红 -> 过劳（偏紧）
  #5578A8 #93B0C4  沉稳蓝 -> 过弱（偏弱）
  #F6F0E9 #E3D5C8  暖米   -> 未命中肌块
  #FFFFFF #A6907F  暖白底 + 暖褐线稿

用法：python3 tools/build_body_preview.py
"""
import json
import os
import re

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "body_paths.json")
OUT_PNG = os.path.join(ROOT, "assets", "body_look.png")

SS = 4          # 超采样倍数（画完再降采样，得到平滑边缘）
SCALE = 2       # 最终每单位 viewBox 的像素数

# ---- 暖陶土色板 ----
TIGHT, TIGHT_ST = (224, 112, 63), (191, 82, 40)       # #E0703F 过劳（偏紧）
TIGHT2, TIGHT2_ST = (242, 168, 124), (214, 134, 86)   # #F2A87C 过劳(轻)
WEAK, WEAK_ST = (85, 120, 168), (61, 94, 136)         # #5578A8 过弱（偏弱）
WEAK2, WEAK2_ST = (147, 176, 196), (118, 148, 172)    # #93B0C4 过弱(轻)
NEUTRAL, NEUTRAL_ST = (246, 240, 233), (227, 213, 200)  # #F6F0E9 未命中
BODY_STROKE = (166, 144, 127)                          # #A6907F 身体线稿
GUIDE = (224, 210, 196)                                # #E0D2C4 参考线
BG = (250, 246, 241)                                   # #FAF6F1 画布底

# 演示：颈椎模式（教科书里的上交叉模式）
DEMO = {
    'front': {'sternocleidomastoid': 'tight', 'deep_neck_flexor': 'weak',
              'pectoralis_minor': 'tight', 'pectoralis_major': 'tight'},
    'back': {'trapezius_upper': 'tight', 'levator_scapulae': 'tight',
             'rhomboid': 'weak'},
}


def subs(pstr):
    out = []
    for seg in pstr.split('Z'):
        seg = seg.strip()
        if not seg:
            continue
        pts = [tuple(map(float, m.split(',')))
               for m in re.findall(r'[ML]([-\d.]+,[-\d.]+)', seg)]
        if len(pts) >= 3:
            out.append(pts)
    return out


def dashed(dr, a, b, color, width, k):
    """画虚线（k = 超采样倍数）"""
    x0, y0 = a[0] * k, a[1] * k
    x1, y1 = b[0] * k, b[1] * k
    ln = ((x1 - x0) ** 2 + (y1 - y0) ** 2) ** 0.5
    if ln <= 0:
        return
    ux, uy = (x1 - x0) / ln, (y1 - y0) / ln
    dash, gap = 2.6 * k, 2.4 * k
    t = 0.0
    while t < ln:
        e = min(t + dash, ln)
        dr.line([(x0 + ux * t, y0 + uy * t), (x0 + ux * e, y0 + uy * e)],
                fill=color, width=max(1, int(round(width))))
        t = e + gap


def draw_view(d, view, k):
    data = d[view]
    vbw, vbh = d['viewBox']
    W, H = int(vbw * k), int(vbh * k)
    lay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    dr = ImageDraw.Draw(lay)

    def fill(ps, col, st, sw, alpha=255):
        pts = [(x * k, y * k) for x, y in ps]
        dr.polygon(pts, fill=col + (alpha,))
        dr.line(pts + [pts[0]], fill=st + (alpha,), width=max(1, int(round(sw * k))),
                joint='curve')

    # 1) 身体线稿底：白底 + 细线
    body_ps = subs(data['body']['d'])
    for ps in body_ps:
        pts = [(x * k, y * k) for x, y in ps]
        dr.polygon(pts, fill=(255, 255, 255, 255))
    for ps in body_ps:
        pts = [(x * k, y * k) for x, y in ps]
        dr.line(pts + [pts[0]], fill=BODY_STROKE + (255,), width=max(1, int(round(0.85 * k))),
                joint='curve')

    # 2) 参考线
    for g in data.get('guides', []):
        dashed(dr, g['a'], g['b'], GUIDE + (255,), 0.5 * k, k)

    # 3) 肌肉：分两层画 —— 先全部未命中，再画被判定的。
    #    理由：深层肌肉（菱形肌、肩胛下肌）在解剖上被表层肌肉盖住，
    #    若按原始顺序绘制，被判定的深层肌肉永远看不见。判定层置顶即可。
    for layer in ('neutral', 'hit'):
        for gid in d['views'][view]:
            if gid not in data:
                continue
            st = DEMO[view].get(gid)
            if layer == 'hit':
                if st == 'tight':
                    col, stroke, sw = TIGHT, TIGHT_ST, 0.62
                elif st == 'weak':
                    col, stroke, sw = WEAK, WEAK_ST, 0.62
                else:
                    continue
            else:
                if st:
                    continue
                col, stroke, sw = NEUTRAL, NEUTRAL_ST, 0.42
            for ps in subs(data[gid]['d']):
                fill(ps, col, stroke, sw)

    return lay.resize((int(vbw * SCALE), int(vbh * SCALE)), Image.LANCZOS)


def main():
    d = json.load(open(SRC, encoding='utf-8'))
    k = SS
    front = draw_view(d, 'front', k)
    back = draw_view(d, 'back', k)

    pad, gap = 40, 34
    fw, fh = front.size
    img = Image.new('RGB', (fw * 2 + gap + pad * 2, fh + pad * 2), BG)
    img.paste(front, (pad, pad), front)
    img.paste(back, (pad + fw + gap, pad), back)
    img.save(OUT_PNG, quality=96)
    print('已写出 %s  %s' % (OUT_PNG, img.size))


if __name__ == '__main__':
    main()
