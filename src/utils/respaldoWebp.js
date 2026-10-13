// Respaldo para navegadores que no muestran WebP (Safari de macOS 10.15 o anterior): si una
// imagen .webp falla al cargar, se cambia una sola vez por su copia .jpg (misma ruta, generada
// junto a cada .webp en public/). Los navegadores modernos nunca pasan por aquí.
// Se escucha en fase de captura porque el evento "error" de una imagen no burbujea.
export function activarRespaldoWebp() {
  document.addEventListener('error', (e) => {
    const img = e.target
    if (img?.tagName !== 'IMG' || img.dataset.respaldoWebp) return
    const src = img.getAttribute('src') || ''
    if (!/\.webp(\?|#|$)/i.test(src)) return
    img.dataset.respaldoWebp = '1'
    img.src = src.replace(/\.webp(?=\?|#|$)/i, '.jpg')
  }, true)
}
