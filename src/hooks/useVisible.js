import { useEffect, useRef, useState } from 'react'

/** [ref, visible]. Con `unaVez` (por defecto) queda en true la primera vez que entra en
 *  pantalla; sin él, sigue el estado real (útil para pausar videos fuera de vista). */
export function useVisible({ unaVez = true, umbral = 0.15 } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setVisible(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true)
        if (unaVez) io.disconnect()
      } else if (!unaVez) {
        setVisible(false)
      }
    }, { threshold: umbral })
    io.observe(el)
    return () => io.disconnect()
  }, [unaVez, umbral])

  return [ref, visible]
}
