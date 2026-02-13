const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

module.exports = defineConfig({
  plugins: [vue()],
  base: '/valentine/', // ⬅️ WAJIB isi nama repo kamu
  server: {
    host: true,
    port: 3000
  }
})
