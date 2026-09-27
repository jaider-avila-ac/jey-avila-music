import { useState } from 'react'
import { Play } from 'lucide-react'

/** Video de YouTube "liviano": muestra la miniatura y solo carga el reproductor al tocarlo
 *  (así la página no descarga YouTube hasta que alguien quiere ver el video). */
export default function VideoYouTube({ id, titulo, className = '' }) {
  const [activo, setActivo] = useState(false)
  return (
    <div className={`group relative aspect-video overflow-hidden bg-negro ${className}`}>
      {activo ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button type="button" onClick={() => setActivo(true)} className="absolute inset-0 w-full h-full" aria-label={`Reproducir ${titulo}`}>
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-activo:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/10 to-transparent" />
          {/* Botón de play con anillo que late */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            {/* El giro va en el contenedor: animate-ping reescribe transform y perdería el rombo */}
            <span className="absolute w-20 h-20"><span className="block w-full h-full border-2 border-rojo animate-ping opacity-60" /></span>
            <span className="relative w-16 h-16 bg-rojo flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-activo:scale-110">
              <Play size={24} className="fill-blanco text-blanco translate-x-0.5" />
            </span>
          </span>
          <span className="absolute left-4 bottom-4 font-display text-xl sm:text-2xl font-extrabold text-left">{titulo}</span>
        </button>
      )}
    </div>
  )
}
