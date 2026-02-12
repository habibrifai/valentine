const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

module.exports = defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 3000
  }
})
