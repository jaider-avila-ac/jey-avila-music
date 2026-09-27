import plugin from 'tailwindcss/plugin'
import { COLORES } from './tema.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Paleta del artista: rojo, negro y blanco (y grises neutros de Tailwind)
      colors: COLORES, // se definen en tema.js
      fontFamily: {
        display: ['Unbounded', 'sans-serif'], // títulos (distinta a la de Jaider Avila Studio)
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [
    // En pantallas táctiles no hay hover: "activo" es el mismo efecto, pero se enciende cuando el
    // elemento pasa por el centro de la pantalla al hacer scroll (ver hooks/useFocoTactil.js).
    plugin(({ addVariant }) => {
      addVariant('activo', '&[data-activo]')
      addVariant('group-activo', ':merge(.group)[data-activo] &')
    }),
  ],
}
