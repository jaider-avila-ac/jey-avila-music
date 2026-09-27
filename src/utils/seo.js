import { useEffect } from 'react'

const DESCRIPCION = 'Jey Avila, cantante y compositor de champeta cristiana de Córdoba, Colombia. Escucha su música, mira sus videos, conoce su historia y llévalo a tu evento.'

/** Título y descripción por página. */
export function usePageMeta(titulo, descripcion) {
  useEffect(() => {
    document.title = titulo ? `${titulo} | Jey Avila` : 'Jey Avila | Cantante y compositor'
    document.querySelector('meta[name="description"]')?.setAttribute('content', descripcion || DESCRIPCION)
  }, [titulo, descripcion])
}
