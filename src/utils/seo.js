import { useEffect } from 'react'

const SITIO = 'https://jeyavilamusic.com'
const DESCRIPCION = 'Jey Avila (Jesús Daniel Avila Sierra), cantante, compositor y director artístico de champeta cristiana de Córdoba, Colombia. Música cristiana para tu evento, campamento o iglesia — escucha sus canciones, mira sus videos y contrátalo o pídele que componga tu canción.'
const IMAGEN = `${SITIO}/img/retrato-azul.jpg`

function setMeta(attr, name, content) {
  document.querySelector(`meta[${attr}="${name}"]`)?.setAttribute('content', content)
}

/** Título, descripción, canonical y Open Graph por página — ruta opcional (si no se pasa, usa
 *  la actual). Sin ruta en la home ("/") no hace falta pasarla. */
export function usePageMeta(titulo, descripcion, ruta = '') {
  useEffect(() => {
    const tituloCompleto = titulo ? `${titulo} | Jey Avila` : 'Jey Avila | Cantante de Champeta Cristiana'
    const desc = descripcion || DESCRIPCION
    const url = `${SITIO}${ruta}`

    document.title = tituloCompleto
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', tituloCompleto)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', tituloCompleto)
    setMeta('name', 'twitter:description', desc)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [titulo, descripcion, ruta])
}

export { SITIO, DESCRIPCION, IMAGEN }
