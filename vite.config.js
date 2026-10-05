import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// The fleet serves this app at its own hostname and passes it in as FLEET_APP_HOST.
// Vite answers any other Host with "Blocked request. This host is not allowed", so
// trust exactly that one; with no fleet hostname (another host, a cluster ingress)
// there is no way to know it up front, so accept any.
const allowedHosts = process.env.FLEET_APP_HOST ? [process.env.FLEET_APP_HOST] : true

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: { allowedHosts },
  preview: { allowedHosts },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
