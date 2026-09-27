import { ArrowUpRight } from 'lucide-react'
import { COLABORACIONES } from '../../data/contenido'
import { ARTISTA } from '../../data/artista'
import { enlaceSpotify } from '../../data/musica'
import TituloSeccion from './TituloSeccion'
import Revelar from './Revelar'

/** Colaboraciones con otros artistas (música e historia). */
export default function Colaboraciones() {
  return (
    <section className="py-24 sm:py-32">
      <div className="contenedor">
        <TituloSeccion etiqueta="Juntos" titulo="Colaboraciones" texto="Canciones junto a otros artistas." />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLABORACIONES.map((c, i) => (
            <Revelar key={c.cancion} retraso={i * 100}>
              <a
                href={enlaceSpotify(c.spotify)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden border-2 border-blanco/15 p-8 transition-colors duration-500 hover:border-rojo activo:border-rojo"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-rojo transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100 group-activo:scale-y-100" />
                <span className="relative flex items-center justify-between etiqueta text-neutral-400 group-hover:text-blanco group-activo:text-blanco">
                  {ARTISTA.nombre} × {c.artista}
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45 group-activo:rotate-45" />
                </span>
                <span className="relative mt-10 block font-display text-3xl sm:text-4xl font-extrabold">{c.cancion}</span>
              </a>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
