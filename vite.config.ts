import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
// import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    // alias: {
    //   '@': fileURLToPath(new URL('./apps/web', import.meta.url)),
    // },
  },
  build: {
    lib: {
      entry: 'apps/web/main.ts',
      name: 'MyLib',
      fileName: 'my-lib',
    },
    rollupOptions: {
      input: 'apps/web/main.ts',
    },
  },
})
