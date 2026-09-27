import { ArrowUpRight } from 'lucide-react'
import { CANCIONES, enlaceSpotify, formatoDuracion } from '../../data/musica'
import Ecualizador from './Ecualizador'

/** Lista de canciones con enlace a Spotify. Al pasar el mouse la fila se pinta de rojo,
 *  el número se vuelve un ecualizador y el título se desplaza. */
export default function ListaCanciones({ limite }) {
  const lista = limite ? CANCIONES.slice(0, limite) : CANCIONES
  return (
    <ol className="border-t-2 border-blanco/10">
      {lista.map((c, i) => (
        <li key={c.spotify}>
          <a
            href={enlaceSpotify(c.spotify)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 overflow-hidden border-b-2 border-blanco/10 py-4 px-2 sm:px-4"
          >
            <span className="absolute inset-0 -translate-x-full bg-rojo transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:translate-x-0 group-activo:translate-x-0" />
            <span className="relative font-display text-lg font-bold text-rojo group-hover:hidden group-activo:hidden">{String(i + 1).padStart(2, '0')}</span>
            <span className="relative hidden group-hover:flex group-activo:flex"><Ecualizador barras={4} className="h-6" grosor="w-[4px]" color="bg-blanco" /></span>
            <span className="relative min-w-0">
              <span className="block truncate font-display text-lg sm:text-xl font-bold transition-transform duration-500 group-hover:translate-x-2 group-activo:translate-x-2">{c.titulo}</span>
              {c.con && <span className="block text-xs uppercase tracking-[0.2em] text-neutral-500 group-hover:text-blanco/80 group-activo:text-blanco/80">con {c.con}</span>}
            </span>
            <span className="relative flex items-center gap-4 text-sm text-neutral-400 group-hover:text-blanco group-activo:text-blanco">
              {formatoDuracion(c.duracion)}
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45 group-activo:rotate-45" />
            </span>
          </a>
        </li>
      ))}
    </ol>
  )
}
