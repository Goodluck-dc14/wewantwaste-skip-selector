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
    allowedHosts: ['localhost', '.csb.app', '.codesandbox.io'],
    hmr: {
      port: 443,
      clientPort: 443,
      overlay: false, // Disable error overlay that can cause loops
    },
    // Disable file watching that can cause infinite loops in CodeSandbox
    watch: {
      usePolling: false,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
  },
  // Optimize dependencies to prevent reload loops
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'clsx'],
  },
})
