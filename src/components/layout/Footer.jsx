import { Link } from 'react-router-dom'
import { Youtube, Music2, Instagram, Facebook } from 'lucide-react'
import { ARTISTA, NAV, CREDITO } from '../../data/artista'
import Onda from '../ui/Onda'
import Ecualizador from '../ui/Ecualizador'
import Logo from './Logo'

const ICONOS = { youtube: Youtube, spotify: Music2, instagram: Instagram, facebook: Facebook, tiktok: Music2 }
const NOMBRES = { youtube: 'YouTube', spotify: 'Spotify', instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok' }

export default function Footer() {
  const redes = Object.entries(ARTISTA.redes).filter(([, url]) => url)
  return (
    <footer className="relative bg-negro overflow-hidden">
      {/* Onda de sonido en movimiento sobre el borde */}
      <div className="relative border-t border-blanco/15">
        <Onda className="h-14 text-neutral-500" />
      </div>

      <div className="contenedor grid gap-12 py-14 md:grid-cols-3">
        <div>
          <p className="flex items-end gap-4"><Logo className="h-16 w-auto" /> <Ecualizador barras={5} className="h-6 mb-2" grosor="w-[4px]" /></p>
          <p className="mt-3 text-neutral-400 font-semibold">{ARTISTA.genero} · {ARTISTA.origen}</p>
          <div className="mt-6 flex gap-2">
            {redes.map(([red, url]) => {
              const Icono = ICONOS[red]
              return (
                <a key={red} href={url} target="_blank" rel="noopener noreferrer" aria-label={NOMBRES[red]}
                  className="w-12 h-12 flex items-center justify-center border-2 border-blanco/20 transition-all duration-300 hover:bg-blanco activo:bg-blanco hover:text-negro activo:text-negro hover:border-blanco activo:border-blanco hover:-translate-y-1 activo:-translate-y-1">
                  <Icono size={20} />
                </a>
              )
            })}
          </div>
        </div>
        <nav>
          <p className="etiqueta text-neutral-500">Secciones</p>
          <ul className="mt-4 grid grid-cols-2 gap-y-2.5">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-neutral-300 hover:text-blanco activo:text-blanco transition-colors">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="etiqueta text-neutral-500">Escúchalo en</p>
          <ul className="mt-4 space-y-2.5">
            {redes.map(([red, url]) => (
              <li key={red}><a href={url} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-blanco activo:text-blanco transition-colors">{NOMBRES[red]}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blanco text-negro">
        <div className="contenedor flex flex-col sm:flex-row gap-3 justify-between py-6 text-xs text-negro/70">
          <p>© {new Date().getFullYear()} {ARTISTA.nombre}. Todos los derechos reservados.</p>
          <p>Sitio creado por <a href={CREDITO.enlace} target="_blank" rel="noopener noreferrer" className="font-bold text-negro underline-offset-4 hover:underline activo:underline">{CREDITO.nombre}</a></p>
        </div>
      </div>
    </footer>
  )
}
