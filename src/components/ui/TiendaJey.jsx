import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import { PRODUCTOS_TIENDA, TIENDA_URL } from '../../data/tienda'
import Revelar from './Revelar'

const precio = (valor) => `$${valor.toLocaleString('es-CO')}`
const enlace = { target: '_blank', rel: 'noopener noreferrer' }

/** Últimos productos de la tienda oficial (máximo 5, datos fijos en data/tienda.js), sin título:
 *  una fila de tarjetas que abren la página de cada producto en la tienda y, al final, una
 *  tarjeta roja para ir a la tienda. Va dentro de un bloque blanco (ver CancionesDestacadas). */
export default function TiendaJey({ className = '' }) {
  const productos = PRODUCTOS_TIENDA.slice(0, 5)
  if (productos.length === 0) return null

  return (
    <ul className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {productos.map((p, i) => (
        <Revelar as="li" key={p.enlace} retraso={i * 100}>
          <a href={p.enlace} {...enlace}
            className="group flex h-full items-stretch bg-negro text-blanco border-2 border-negro transition-colors duration-300 hover:border-rojo activo:border-rojo">
            <span className="w-28 sm:w-32 shrink-0 overflow-hidden bg-blanco">
              <img src={p.imagen} alt={p.nombre} width="700" height="700" loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-activo:scale-105" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col justify-center p-4">
              <span className="font-display text-sm font-bold uppercase leading-snug">{p.nombre}</span>
              <span className="mt-1 text-xs text-neutral-400">{p.detalle}</span>
              <span className="mt-2 flex items-center justify-between gap-3">
                <span className="font-display text-lg font-black">{precio(p.precio)} <span className="text-[10px] font-semibold text-neutral-400">COP</span></span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-rojo transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-activo:-translate-y-0.5 group-activo:translate-x-0.5" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </span>
            </span>
          </a>
        </Revelar>
      ))}
      <Revelar as="li" retraso={productos.length * 100}>
        <a href={TIENDA_URL} {...enlace}
          className="group flex h-full min-h-[4.5rem] sm:min-h-[7rem] items-center justify-between gap-4 bg-rojo px-6 text-blanco transition-colors duration-300 hover:bg-negro activo:bg-negro">
          <span className="flex items-center gap-3 font-display text-base font-black uppercase">
            <ShoppingBag size={20} /> Ver la tienda
          </span>
          <ArrowUpRight size={22} className="transition-transform duration-300 group-hover:rotate-45 group-activo:rotate-45" />
        </a>
      </Revelar>
    </ul>
  )
}
