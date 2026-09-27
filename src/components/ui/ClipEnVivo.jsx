import { useEffect, useRef } from 'react'
import { useVisible } from '../../hooks/useVisible'

/** Clip vertical de concierto: se reproduce en silencio solo mientras está en pantalla. */
export default function ClipEnVivo({ video, poster, titulo }) {
  const [caja, visible] = useVisible({ unaVez: false, umbral: 0.3 })
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (visible) v.play().catch(() => {})
    else v.pause()
  }, [visible])

  return (
    <figure ref={caja} className="group relative aspect-[9/16] overflow-hidden bg-negro">
      <video
        ref={videoRef}
        src={video}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-activo:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-negro via-transparent to-transparent" />
      <figcaption className="absolute left-4 right-4 bottom-4 flex items-center gap-2">
        <span className="latido w-2 h-2 rounded-full bg-rojo text-rojo" />
        <span className="etiqueta text-blanco">{titulo || 'En vivo'}</span>
      </figcaption>
    </figure>
  )
}
