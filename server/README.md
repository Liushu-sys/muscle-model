# ai-relay 部署与联调

BodyCare 的模型转发服务：藏 key、白名单校验、生图缓存。前端只与同源 `/api/ai/*` 通信。

## 目录

```
index.js                 HTTP 服务（零依赖，Node >=18）
lib/dashscope.js         百炼调用：chat JSON / 视觉 / 万相异步任务
lib/validators.js        枚举与白名单校验（肌肉 46、经络 12、穴位 32）
lib/whitelist.json       白名单（前端数据增删后需重新导出）
lib/image.js             基准图选择 / T3 两阶段 / 成图缓存
prompts/                 4 份 system prompt + image_spec（生图规范）
assets/ref/              6 张全身基准图 + 6 张腰以上裁切版
mocks/                   假数据响应（前端本地开发 + AI_MOCK 模式）
cache/actions/           生成图落盘（自动创建，不入库）
```

## 本地开发

无 key 跑假上游（返回 mocks，不访问网络）：
```bash
cd server
npm run dev:mock
# 自测
curl -s -X POST http://127.0.0.1:8790/api/ai/recommend \
  -H 'Content-Type: application/json' \
  -d '{"points":[{"description":"正面右-斜方肌上部","region":"neck","feel":"酸痛"}]}'
```

配真实 key 本地联调：
```bash
cp .env.example .env   # 填入 DASHSCOPE_API_KEY
export $(grep -v '^#' .env | xargs)
npm start
```

## 服务器部署（阿里云 47.82.159.182）

```bash
sudo mkdir -p /var/www/ai-relay
sudo chown -R $USER /var/www/ai-relay
# 上传本目录内容（不含 node_modules/.env）
scp -r server/* root@47.82.159.182:/var/www/ai-relay/   # 路径按实际 SSH 用户调整

# 服务器上：Node 18+（如未装）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 配置 key（不入库）
sudo install -m 600 -o www-data -g www-data .env /var/www/ai-relay/.env

# 起服务
sudo cp ai-relay.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now ai-relay
sudo systemctl status ai-relay
journalctl -u ai-relay -f
```

Caddy：把 `Caddyfile.snippet` 中的两段合入现有站点配置后：
```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

验证：
```bash
curl -s https://<你的域名或IP>/api/ai/science/west -X POST \
  -H 'Content-Type: application/json' -d '{"points":[{"description":"正面右-斜方肌上部","region":"neck"}]}'
```

## 白名单重新导出

当前端 `mm-engine.js`（肌肉）或 `meridian-data.js`（经络穴位）增删数据后：
重新执行导出并更新 `lib/whitelist.json`（肌肉取 MUSCLES 段前 46 个真实肌肉 id，排除 patterns/regions）。

## M4 待确认（拿到 key 后）

1. 万相「参考主体/图像编辑」在售型号名与参数：核对 `lib/dashscope.js` 中 `IMG_MODEL` 与 `parameters`（`input_fidelity`、参考图字段名、返回字段）。
2. 右下角水印：若参数无法关闭，在 `lib/image.js stripWatermark()` 引入 sharp 做右下角白底羽化。
3. 6 张基准图当前背景为浅灰影棚；如需纯白产出，先统一抠白基准图（WorkBuddy 实测：背景由参考图决定）。
