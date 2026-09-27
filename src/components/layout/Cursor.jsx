import { useEffect, useRef, useState } from 'react'

/** Cursor propio (solo con mouse). Mismo comportamiento que el sitio de Jaider Avila Studio
 *  (su firma): un cuadro que sigue al puntero con retraso suave y sobre los enlaces crece y
 *  gira como rombo. Aquí con los colores del artista: rojo, y en contorno sobre enlaces. */
export default function Cursor() {
  const ref = useRef(null)
  const [activo, setActivo] = useState(false)
  const [sobreEnlace, setSobreEnlace] = useState(false)

  useEffect(() => {
    const conMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!conMouse || sinMovimiento) return
    setActivo(true)

    let x = -100, y = -100, cx = -100, cy = -100, raf
    const mover = (e) => {
      x = e.clientX; y = e.clientY
      setSobreEnlace(!!e.target.closest('a, button, input, textarea, select, iframe'))
    }
    const bucle = () => {
      cx += (x - cx) * 0.18
      cy += (y - cy) * 0.18
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(bucle)
    }
    window.addEventListener('mousemove', mover, { passive: true })
    raf = requestAnimationFrame(bucle)
    return () => { window.removeEventListener('mousemove', mover); cancelAnimationFrame(raf) }
  }, [])

  if (!activo) return null
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]">
      <div
        className={`transition-all duration-300 ease-out ${
          sobreEnlace ? 'w-14 h-14 rotate-45 border-2 border-rojo bg-rojo/15' : 'w-3.5 h-3.5 rotate-0 bg-rojo outline outline-1 outline-white/70'
        }`}
      />
    </div>
  )
}
