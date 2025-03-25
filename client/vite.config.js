import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),],

  server: {
      port: 5214,
    },
    proxy: {
      '/api': {
        target: 'https://localhost:5213', // Backend port
        changeOrigin: true,
        secure: false, // If you're using HTTPS locally and it causes issues, set this to false
      },
    },
})