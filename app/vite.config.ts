import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      // 直接复用仓库里的 muscle-model 引擎与人体图组件
      { find: '@model', replacement: fileURLToPath(new URL('../src', import.meta.url)) },
      // muscle-model 把 react 声明为可选 peer dep，Vite 8 会给上层文件里的
      // react 导入套空壳，这里强制指向 app 自己安装的 react
      {
        find: /^react(\/.*)?$/,
        replacement: fileURLToPath(new URL('./node_modules/react', import.meta.url)) + '$1',
      },
    ],
    dedupe: ['react', 'react-dom'],
  },
  server: {
    host: '127.0.0.1',
    port: 5180,
    fs: {
      // 允许读取上层的 muscle-model/src（引擎 + body_sides.json）
      allow: [fileURLToPath(new URL('..', import.meta.url))],
    },
  },
})
