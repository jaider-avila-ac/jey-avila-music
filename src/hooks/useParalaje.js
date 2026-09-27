import { useEffect, useRef } from 'react'

/** Desplaza el elemento en vertical más lento o más rápido que el scroll (paralaje). Funciona
 *  igual en celular, donde no hay hover. Usa la propiedad `translate` para no pisar otros
 *  `transform` (animaciones, rotaciones). factor > 0 sube al bajar; factor < 0, al revés. */
export function useParalaje(factor = 0.1) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0, visible = false, actual = 0

    const actualizar = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      // Se descuenta el desplazamiento ya aplicado para medir la posición real
      const centro = r.top - actual + r.height / 2 - window.innerHeight / 2
      actual = -centro * factor
      el.style.translate = `0 ${actual.toFixed(1)}px`
    }
    const pedir = () => { if (visible && !raf) raf = requestAnimationFrame(actualizar) }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; pedir() }, { rootMargin: '20% 0px' })
    io.observe(el)
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir)
    return () => {
      io.disconnect(); cancelAnimationFrame(raf)
      window.removeEventListener('scroll', pedir); window.removeEventListener('resize', pedir)
    }
  }, [factor])

  return ref
}
