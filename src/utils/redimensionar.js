const LADO_MAXIMO = 1600

/** Reduce la foto elegida en el panel antes de subirla (lado mayor 1600 px, JPG), para que el
 *  sitio cargue rápido aunque la foto venga pesada del celular. Siempre JPG (no WebP): se ve en
 *  cualquier navegador, incluido Safari de macOS 10.15 o anterior. */
export async function redimensionarImagen(archivo) {
  const url = URL.createObjectURL(archivo)
  try {
    const img = await new Promise((resolver, rechazar) => {
      const i = new Image()
      i.onload = () => resolver(i)
      i.onerror = () => rechazar(new Error('No se pudo abrir la imagen. Prueba con una foto JPG o PNG.'))
      i.src = url
    })
    const escala = Math.min(1, LADO_MAXIMO / Math.max(img.naturalWidth, img.naturalHeight))
    const lienzo = document.createElement('canvas')
    lienzo.width = Math.round(img.naturalWidth * escala)
    lienzo.height = Math.round(img.naturalHeight * escala)
    lienzo.getContext('2d').drawImage(img, 0, 0, lienzo.width, lienzo.height)

    const blob = await new Promise((r) => lienzo.toBlob(r, 'image/jpeg', 0.85))
    if (!blob) throw new Error('No se pudo procesar la imagen')
    return { blob, nombre: 'agenda.jpg' }
  } finally {
    URL.revokeObjectURL(url)
  }
}
