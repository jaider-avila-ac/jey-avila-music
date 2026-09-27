import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { COLORES } from './tema.js'

// Ícono de la pestaña y theme-color generados con los colores de tema.js
function tema() {
  const icono = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="${COLORES.rojo}"/><text x="16" y="24" font-family="Arial Black, Arial, sans-serif" font-weight="700" font-size="22" fill="${COLORES.blanco}" text-anchor="middle">J</text><rect x="4" y="27" width="24" height="2" fill="${COLORES.negro}"/></svg>`
  return {
    name: 'tema',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => ({
        html: html.replace('%COLOR_NEGRO%', COLORES.negro),
        tags: [{ tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: `data:image/svg+xml,${encodeURIComponent(icono)}` }, injectTo: 'head' }],
      }),
    },
  }
}

export default defineConfig({
  plugins: [react(), tema()],
  // En desarrollo la API la atiende Spring Boot (backend/) en el puerto 8080
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
      '/uploads': 'http://localhost:8080',
    },
  },
})
