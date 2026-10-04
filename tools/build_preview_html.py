#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
用最新的 assets/body_paths.json 刷新 assets/body_preview.html 里的矢量路径。

为什么不重新生成整个 HTML：预览页的样式、交互脚本、文案都在 HTML 里，
那些不该由这个脚本操心。这里只做一件事——把每个 <path class="m"> 的 d
换成 body_paths.json 里的当前值（按 data-id 对应，并区分正面/背面两个 SVG）。

这样修完轮廓（tools/fix_body_paths.py）之后，预览页也能跟着更新，而不用去
依赖那个需要 25MB anatomy.glb 的投影脚本。

用法（仓库根目录）：python3 tools/build_preview_html.py
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "body_paths.json")
HTML = os.path.join(ROOT, "assets", "body_preview.html")

PATH_RE = re.compile(r'<path class="m" data-id="([^"]+)"([^>]*?)d="[^"]*"')
H3_RE = re.compile(r"<h3>([^<]*)</h3>")
# 每个 SVG 里紧跟 <svg> 的第一个 <path>（无 class）就是人体外形线
BODY_RE = re.compile(r'(<svg[^>]*>\s*<path )d="[^"]*"')


def view_of(html, pos):
    """看紧挨在这个 <svg> 前面的那个 <h3>（如「背面 · 27 组」）判断正/背面。

    不能拿整段 HTML 里搜「背面」——页面标题和说明文字里就有「正面/背面」，
    那样会把正面那个 SVG 也判成背面。
    """
    heads = H3_RE.findall(html[:pos])
    return "back" if heads and "背面" in heads[-1] else "front"


def main():
    data = json.load(open(SRC, encoding="utf-8"))
    html = open(HTML, encoding="utf-8").read()

    starts = [m.start() for m in re.finditer(r"<svg", html)]
    ends = [html.find("</svg>", s) for s in starts]

    out, prev = [], 0
    stat, missing = {"front": 0, "back": 0}, []

    for s, e in zip(starts, ends):
        view = view_of(html, s)
        seg = html[s:e]

        def rep(m, view=view):
            gid = m.group(1)
            node = data[view].get(gid)
            if not node:
                missing.append("%s/%s" % (view, gid))
                return m.group(0)
            stat[view] += 1
            return '<path class="m" data-id="%s"%sd="%s"' % (gid, m.group(2), node["d"])

        out.append(html[prev:s])
        seg = PATH_RE.sub(rep, seg)
        nb = [0]

        def rep_body(m):
            nb[0] += 1
            return '%sd="%s"' % (m.group(1), data[view]["body"]["d"])

        seg = BODY_RE.sub(rep_body, seg)
        stat["body"] = stat.get("body", 0) + nb[0]
        out.append(seg)
        prev = e
    out.append(html[prev:])

    open(HTML, "w", encoding="utf-8").write("".join(out))
    print("已刷新 %s：肌肉 正面 %d 条 / 背面 %d 条，人体外形线 %d 条"
          % (os.path.relpath(HTML, ROOT), stat["front"], stat["back"], stat.get("body", 0)))
    if missing:
        print("！未在 JSON 中找到：%s" % ", ".join(missing))


if __name__ == "__main__":
    main()
