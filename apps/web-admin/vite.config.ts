import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
// import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({}) => {
  return {
    plugins: [vue(), vueJsx(), vueDevTools()],
    server: {
      proxy: {
        // 使用 proxy 实例
        '/api': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        // '@nona/mock': fileURLToPath(new URL('./apps/mock', import.meta.url)),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  }
})
