import { Link } from 'react-router-dom'
import { ARTISTA } from '../../../data/artista'
import { fechasDelAnio, formatoTelefono } from '../fechasAgenda'
import Revelar from '../../../components/ui/Revelar'
import Ecualizador from '../../../components/ui/Ecualizador'
import Paralaje from '../../../components/ui/Paralaje'

/** Agenda en escritorio: la misma información del afiche de celular (todas las fechas del año
 *  con mes, día y lugar; las pasadas tachadas y el contacto), con diseño propio. */
export default function AgendaEscritorio({ agenda }) {
  const { anio, fechas } = fechasDelAnio(agenda.fechas)
  const telefono = formatoTelefono(ARTISTA.contacto.whatsapp)

  return (
    <div className="grid lg:grid-cols-12 gap-12 items-start">
      <Revelar className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
        <div className="relative aspect-[16/9] lg:aspect-[4/5] overflow-hidden bg-negro">
          <Paralaje factor={-0.08} className="absolute inset-x-0 -top-[8%] h-[116%]">
            <img src={agenda.imagen} alt={ARTISTA.nombre} className="w-full h-full object-cover object-top grayscale contrast-125 respirar" />
          </Paralaje>
          <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/20 to-negro/50" />
          <div className="absolute inset-x-0 top-0 p-8">
            <p className="etiqueta text-blanco/80">{ARTISTA.nombre}</p>
            <h2 className="mt-2 text-7xl font-black leading-[0.9]">{agenda.titulo}<br /><span className="text-rojo">{anio}</span></h2>
          </div>
          <p className="absolute inset-x-0 bottom-0 p-8 font-display text-2xl font-black uppercase">{agenda.subtitulo}</p>
        </div>
      </Revelar>

      <div className="lg:col-span-7">
        <p className="etiqueta flex items-center gap-3 text-rojo">
          <Ecualizador barras={4} className="h-3" grosor="w-[2px]" /> {fechas.length} {fechas.length === 1 ? 'presentación' : 'presentaciones'} en {anio}
        </p>

        {fechas.length > 0 ? (
          <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 border-t-2 border-blanco/10">
            {fechas.map((f, i) => (
              <Revelar as="li" key={f.id} retraso={(i % 8) * 50}
                className={`group flex items-center gap-5 border-b-2 border-blanco/10 py-4 ${f.pasada ? 'text-blanco/40' : ''}`}>
                <span className={`w-14 shrink-0 text-center ${f.pasada ? '' : 'text-rojo'}`}>
                  <span className={`block font-display text-4xl font-black leading-none ${f.pasada ? 'line-through decoration-rojo decoration-2' : ''}`}>{f.dia}</span>
                  <span className="block etiqueta mt-1">{f.mes.slice(0, 3)}</span>
                </span>
                <span className={`min-w-0 font-display text-lg font-bold uppercase leading-tight ${f.pasada ? 'line-through decoration-rojo decoration-2' : 'transition-transform duration-300 group-hover:translate-x-1 group-activo:translate-x-1'}`}>
                  {f.municipio}
                </span>
              </Revelar>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-lg text-neutral-400">Nuevas fechas muy pronto.</p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 bg-rojo p-6 sm:p-8">
          <div>
            <p className="etiqueta text-blanco/85">¿Quieres a Jey en tu evento?</p>
            {telefono && <p className="mt-2 font-display text-2xl sm:text-3xl font-extrabold">Contacto: {telefono}</p>}
          </div>
          <Link to="/contrataciones" className="btn btn-negro hover:text-negro before:!bg-blanco"><span>Solicitar una fecha</span></Link>
        </div>
      </div>
    </div>
  )
}
