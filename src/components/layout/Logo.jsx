import { IMAGENES } from '../../data/contenido'
import { ARTISTA } from '../../data/artista'

/** Logotipo de Jey Avila (su firma): blanco para fondos oscuros, negro para fondos claros.
 *  Es PNG (no WebP) para que se vea en cualquier Safari. */
export default function Logo({ color = 'blanco', className = 'h-10 w-auto' }) {
  return (
    <img
      src={color === 'negro' ? IMAGENES.logoNegro : IMAGENES.logoBlanco}
      alt={ARTISTA.nombre}
      width="800"
      height="334"
      draggable="false"
      className={`block select-none ${className}`}
    />
  )
}
