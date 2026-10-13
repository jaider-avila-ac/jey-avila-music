import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { COLORES } from './tema.js'

// theme-color con el negro de tema.js. Los íconos del sitio (silueta de Jey) son PNG en public/
// y se declaran en index.html: Safari no usa favicons SVG, y apple-touch-icon es el ícono que
// sale en iPhone/iPad al agregar el sitio a la pantalla de inicio.
function tema() {
  return {
    name: 'tema',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%COLOR_NEGRO%', COLORES.negro),
    },
  }
}

export default defineConfig({
  plugins: [react(), tema()],
  // En desarrollo la API la atiende Spring Boot (backend/) en el puerto 8080
  server: {
    // Todas las direcciones (IPv4 e IPv6): "localhost" puede resolverse a 127.0.0.1 o a ::1
    // según el navegador, y Vite por defecto solo escucha en una de ellas.
    host: true,
    proxy: {
      '/api': 'http://localhost:8080',
      '/uploads': 'http://localhost:8080',
    },
  },
})
