import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    allowedHosts: [
      'localhost',
      '.csb.app',
      '.codesandbox.io',
      '7zwslh-5173.csb.app',
    ],
    hmr: {
      port: 443,
      clientPort: 443,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
  },
})
