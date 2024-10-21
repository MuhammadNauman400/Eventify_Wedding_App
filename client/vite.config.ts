import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      pages: '/src/pages',
      assets: '/src/assets',
      helpers: '/src/helpers',
      theme: '/src/theme',
      store: '/src/store',
      constants: '/src/constants',
      api: '/src/api',
      utils: '/src/utils'
    }
  }
})
