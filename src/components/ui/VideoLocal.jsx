import { useState } from 'react'
import { Play } from 'lucide-react'

/** Video propio (con sonido): muestra la portada y solo carga el video al tocarlo. */
export default function VideoLocal({ video, poster, titulo, detalle, className = '' }) {
  const [activo, setActivo] = useState(false)
  return (
    <figure className={`group ${className}`}>
      <div className="relative aspect-video overflow-hidden bg-negro">
        {activo ? (
          <video src={video} poster={poster} controls autoPlay playsInline className="absolute inset-0 w-full h-full object-contain bg-negro" />
        ) : (
          <button type="button" onClick={() => setActivo(true)} className="absolute inset-0 w-full h-full" aria-label={`Reproducir ${titulo}`}>
            <img src={poster} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-activo:scale-105" />
            <span className="absolute inset-0 bg-negro/30 transition-colors duration-500 group-hover:bg-negro/10 group-activo:bg-negro/10" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <span className="absolute w-16 h-16"><span className="block w-full h-full border-2 border-rojo animate-ping opacity-60" /></span>
              <span className="relative w-14 h-14 bg-rojo flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-activo:scale-110">
                <Play size={20} className="fill-blanco text-blanco translate-x-0.5" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4">
        <p className="font-display text-lg font-bold">{titulo}</p>
        {detalle && <p className="mt-1 text-sm text-neutral-400">{detalle}</p>}
      </figcaption>
    </figure>
  )
}
