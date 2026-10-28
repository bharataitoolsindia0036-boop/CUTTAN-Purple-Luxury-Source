import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/CUTTAN-Purple-Luxury-Source/",
  server: { host: '0.0.0.0', port: 5173 },
  preview: { host: '0.0.0.0', port: 5173 },
  assetsInclude: ['**/*.wasm'],
})
