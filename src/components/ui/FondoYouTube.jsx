/** Video de YouTube de fondo: silenciado, en bucle y sin controles, cubriendo todo su
 *  contenedor. Mientras carga (o si no hay internet) se ve la miniatura del video. */
export default function FondoYouTube({ id, className = '' }) {
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3`
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover" />
      {/* 16:9 que siempre cubre el contenedor (como object-fit: cover) */}
      <iframe
        src={src}
        title=""
        tabIndex={-1}
        allow="autoplay; encrypted-media"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
        // Agrandado un 35 % para que el título y los controles de YouTube queden fuera del recuadro
        style={{ width: 'max(135%, 240vh)', height: 'max(135%, 76vw)' }}
      />
    </div>
  )
}
