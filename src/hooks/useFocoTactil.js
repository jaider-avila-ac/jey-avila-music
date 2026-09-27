import { useEffect } from 'react'

const SELECTOR = '.group, [class*="hover:"]'

/** En pantallas táctiles no existe el hover, así que los efectos de "pasar el mouse" se pierden.
 *  Este hook marca con data-activo el elemento que cruza la franja central de la pantalla al
 *  hacer scroll; las variantes activo: y group-activo: de Tailwind aplican ahí el mismo efecto. */
export function useFocoTactil() {
  useEffect(() => {
    const tactil = window.matchMedia('(hover: none)').matches
    if (!tactil || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) e.target.toggleAttribute('data-activo', e.isIntersecting)
    }, { rootMargin: '-47% 0px -47% 0px' })

    const vistos = new WeakSet()
    const registrar = (raiz) => {
      const lista = raiz.matches?.(SELECTOR) ? [raiz, ...raiz.querySelectorAll(SELECTOR)] : raiz.querySelectorAll?.(SELECTOR) || []
      for (const el of lista) if (!vistos.has(el)) { vistos.add(el); io.observe(el) }
    }
    registrar(document.body)

    // Las páginas se montan al navegar: observar también lo que se agregue después
    const mo = new MutationObserver((cambios) => {
      for (const c of cambios) for (const n of c.addedNodes) if (n.nodeType === 1) registrar(n)
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])
}
