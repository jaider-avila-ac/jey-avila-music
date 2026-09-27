import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ARTISTA } from '../../../data/artista'
import { fechasDelAnio, formatoTelefono } from '../fechasAgenda'

const LETRA_MIN = 7 // px
const LETRA_MAX = 22 // px

/** Afiche vertical para celular con todas las fechas del año: foto arriba y abajo mes, día y
 *  lugar. Ocupa exactamente una pantalla (debajo del menú) para que se pueda capturar y
 *  compartir en redes. Las fechas ya pasadas salen tachadas.
 *
 *  El tamaño de la letra de las fechas se calcula solo: la más grande que quepa en el espacio
 *  libre. Así siempre se ven todas, sean muchas o pocas, y con pocas no queda espacio vacío. */
export default function AficheMovil({ agenda }) {
  const { anio, fechas } = fechasDelAnio(agenda.fechas)
  const telefono = formatoTelefono(ARTISTA.contacto.whatsapp)

  // Pocas fechas: una columna; muchas: tres
  const numColumnas = fechas.length <= 4 ? 1 : fechas.length <= 30 ? 2 : 3
  const porColumna = Math.ceil(fechas.length / numColumnas)
  const columnas = Array.from({ length: numColumnas }, (_, c) => fechas.slice(c * porColumna, (c + 1) * porColumna))

  const zonaRef = useRef(null)
  const contenidoRef = useRef(null)
  const listaRef = useRef(null)

  useLayoutEffect(() => {
    const zona = zonaRef.current, contenido = contenidoRef.current, lista = listaRef.current
    if (!zona || !contenido || !lista) return

    // Búsqueda binaria del tamaño de letra más grande con el que todo cabe en la zona
    const ajustar = () => {
      const alto = zona.clientHeight
      let min = LETRA_MIN, max = LETRA_MAX
      while (max - min > 0.25) {
        const medio = (min + max) / 2
        lista.style.fontSize = `${medio}px`
        if (contenido.offsetHeight <= alto) min = medio
        else max = medio
      }
      lista.style.fontSize = `${min}px`
    }

    ajustar()
    const ro = new ResizeObserver(ajustar)
    ro.observe(zona)
    document.fonts?.ready.then(ajustar) // al cargar la fuente cambian los anchos
    return () => ro.disconnect()
  }, [fechas.length])

  return (
    <>
      <div className="relative left-1/2 w-screen -translate-x-1/2 h-[calc(100svh-var(--header-h))] min-h-[520px] overflow-hidden bg-negro flex flex-col">
        {/* Foto de fondo en blanco y negro */}
        <img src={agenda.imagen} alt="" className="absolute inset-0 w-full h-full object-cover object-top grayscale contrast-125 respirar" />
        <div className="absolute inset-0 bg-gradient-to-b from-negro/70 via-negro/10 to-negro" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-negro via-negro/90 to-transparent" />

        {/* Título */}
        <div className="relative shrink-0 pt-6 text-center">
          <p className="etiqueta text-blanco/80">{ARTISTA.nombre}</p>
          <h2 className="mt-1 text-[15vw] min-[430px]:text-6xl font-black leading-[0.9]">
            {agenda.titulo}<br /><span className="text-rojo">{anio}</span>
          </h2>
        </div>

        {/* Espacio mínimo para que se vea la foto */}
        <div className="shrink-0 h-[12%]" />

        {/* Zona de fechas: ocupa el resto de la pantalla; el contenido va abajo */}
        <div ref={zonaRef} className="relative flex-1 min-h-0 flex flex-col justify-end px-4 pb-4">
          <div ref={contenidoRef}>
            <p className="text-center font-display text-lg font-black uppercase tracking-tight">{agenda.subtitulo}</p>
            {fechas.length > 0 ? (
              <div ref={listaRef} className={`mt-[0.6em] grid gap-x-3 ${numColumnas === 1 ? 'grid-cols-1 text-center' : numColumnas === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {columnas.map((col, c) => (
                  <ul key={c} className="space-y-[0.35em]">
                    {col.map((f) => (
                      <li key={f.id}
                        className={`font-semibold uppercase leading-tight ${f.pasada ? 'text-blanco/45 line-through decoration-rojo decoration-2' : 'text-blanco'}`}>
                        {f.mes} {f.dia} · {f.municipio}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ) : (
              <p ref={listaRef} className="mt-3 text-center text-neutral-300">Nuevas fechas muy pronto.</p>
            )}
            {telefono && (
              <p className="mt-4 bg-rojo py-2 text-center font-display text-sm font-extrabold uppercase">Contacto: {telefono}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-neutral-400">¿Quieres a Jey en tu evento? Aparta tu fecha.</p>
        <Link to="/contrataciones" className="btn btn-rojo mt-5"><span>Solicitar una fecha</span></Link>
      </div>
    </>
  )
}
