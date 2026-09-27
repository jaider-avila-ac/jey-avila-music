import { useEffect, useState } from 'react'
import { useVisible } from '../../hooks/useVisible'

/** Cifra que cuenta hasta su valor al entrar en pantalla. Los años cuentan desde 20 antes;
 *  un valor que no es número (ej. "1er") se muestra tal cual. */
export default function Cifra({ valor, className = '' }) {
  const [ref, visible] = useVisible({ umbral: 0.5 })
  const numero = /^\d+$/.test(valor) ? Number(valor) : null
  const desde = numero === null ? 0 : numero > 1900 ? numero - 20 : 0
  const [actual, setActual] = useState(desde)

  useEffect(() => {
    if (!visible || numero === null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setActual(numero); return }
    const inicio = performance.now(), dur = 1400
    let raf
    const paso = (t) => {
      const p = Math.min(1, (t - inicio) / dur)
      setActual(Math.round(desde + (numero - desde) * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(paso)
    }
    raf = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf)
  }, [visible, numero, desde])

  return <p ref={ref} className={className} aria-label={valor}>{numero === null ? valor : actual}</p>
}
