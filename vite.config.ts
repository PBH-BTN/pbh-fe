import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import { promisify } from 'node:util'
import { exec as execCallBack } from 'node:child_process'

const exec = promisify(execCallBack)

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    vue(),
    // viteMockServe({}),
    VueDevTools(),
    vitePluginForArco({
      style: 'css'
    })
  ],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __APP_HASH__: JSON.stringify(
      (await exec('git rev-parse HEAD').catch(() => null))?.stdout.toString()
    )
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          libs: ['pinia', 'vue-request', 'vue-i18n', 'vue-router', 'vue', '@vueuse/core'],
          arcoDesign: ['@arco-design/web-vue']
        }
      }
    }
  }
})
