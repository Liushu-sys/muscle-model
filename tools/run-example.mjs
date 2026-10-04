/**
 * 跑 examples/ 下的示例。
 *
 *   node tools/run-example.mjs examples/01-最小诊断.ts
 *   npm run example -- examples/03-按场景给动作.ts
 *
 * 为什么要绕一层：
 *   源码里写的是 `from '../data/muscles'`（不带扩展名），这是打包器（Vite/esbuild）
 *   的解析约定，Node 原生 ESM 不认，会报 ERR_MODULE_NOT_FOUND。
 *   所以先用 esbuild 打成一坨再跑。这样 examples 是真能跑的，不是纸面代码。
 */
import { execFileSync } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const rel = process.argv[2]

if (!rel) {
  console.error('用法：node tools/run-example.mjs examples/01-最小诊断.ts')
  console.error('\n可跑的示例：')
  for (const f of ['01-最小诊断.ts', '02-用户确认位置.ts', '03-按场景给动作.ts']) {
    console.error('  examples/' + f)
  }
  process.exit(1)
}

const entry = path.join(ROOT, rel)
const OUT = path.join(os.tmpdir(), `mm-example-${process.pid}.mjs`)

try {
  execFileSync(
    path.join(ROOT, 'node_modules', '.bin', 'esbuild'),
    ['--bundle', '--format=esm', '--platform=node', entry, `--outfile=${OUT}`, '--log-level=error'],
    { cwd: ROOT, stdio: 'inherit' }
  )
  await import(pathToFileURL(OUT).href)
} finally {
  try {
    const { rmSync } = await import('node:fs')
    rmSync(OUT, { force: true })
  } catch {
    /* 临时文件删不掉无所谓 */
  }
}
