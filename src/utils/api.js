// Cliente de la API del mismo sitio (Spring Boot). En desarrollo, Vite reenvía /api y /uploads
// al backend (ver vite.config.js).

// Token CSRF que el backend deja en la cookie JEY-XSRF; se reenvía en cada cambio
const tokenCsrf = () => document.cookie.split('; ').find((c) => c.startsWith('JEY-XSRF='))?.split('=')[1]

/** Llama a la API y devuelve el JSON. Si falla, lanza un Error con el mensaje del backend. */
export async function api(ruta, { metodo = 'GET', datos, archivo } = {}) {
  const opciones = { method: metodo, credentials: 'same-origin', headers: { Accept: 'application/json' } }
  if (metodo !== 'GET') {
    const token = tokenCsrf()
    if (token) opciones.headers['X-JEY-XSRF'] = decodeURIComponent(token)
  }
  if (archivo) {
    const form = new FormData()
    form.append(archivo.campo, archivo.blob, archivo.nombre)
    opciones.body = form
  } else if (datos !== undefined) {
    opciones.headers['Content-Type'] = 'application/json'
    opciones.body = JSON.stringify(datos)
  }

  let respuesta
  try {
    respuesta = await fetch(ruta, opciones)
  } catch {
    throw new Error('Sin conexión con el servidor. Revisa tu internet.')
  }
  if (respuesta.status === 204) return null
  const cuerpo = await respuesta.json().catch(() => null)
  if (!respuesta.ok) {
    const error = new Error(cuerpo?.mensaje || 'Ocurrió un error. Intenta de nuevo.')
    error.estado = respuesta.status
    throw error
  }
  return cuerpo
}
