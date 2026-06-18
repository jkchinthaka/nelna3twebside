import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

function manualChunks(id) {
  if (!id.includes('node_modules')) {
    return undefined
  }

  if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
    return 'vendor-react'
  }

  if (id.includes('/react-router/') || id.includes('/react-router-dom/')) {
    return 'vendor-router'
  }

  if (id.includes('/framer-motion/')) {
    return 'vendor-motion'
  }

  if (id.includes('/firebase/')) {
    return 'vendor-firebase'
  }

  if (
    id.includes('/i18next/') ||
    id.includes('/react-i18next/') ||
    id.includes('/i18next-browser-languagedetector/') ||
    id.includes('/i18next-resources-to-backend/')
  ) {
    return 'vendor-i18n'
  }

  if (id.includes('/lucide-react/')) {
    return 'vendor-icons'
  }

  if (id.includes('/swiper/')) {
    return 'vendor-swiper'
  }

  return 'vendor-misc'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imagetools()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
})
