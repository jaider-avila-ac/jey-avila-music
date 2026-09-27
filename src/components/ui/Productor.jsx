import { ArrowUpRight, Disc3 } from 'lucide-react'
import { PRODUCTOR } from '../../data/contenido'
import Revelar from './Revelar'

/** La casa productora con la que graba Jey y los servicios que ofrece. El logo va en blanco y negro. */
export default function Productor() {
  return (
    <section className="relative overflow-hidden bg-blanco text-negro py-24 sm:py-32">
      <div className="relative contenedor grid lg:grid-cols-12 gap-12 items-center">
        <Revelar className="lg:col-span-5 relative order-2 lg:order-1">
          <img src={PRODUCTOR.logo} alt={`Logo de ${PRODUCTOR.nombre}`} width="1000" height="784" loading="lazy"
            className="relative w-full grayscale" />
        </Revelar>
        <Revelar retraso={150} className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
          <p className="inline-flex items-center gap-3 bg-negro px-3 py-1.5 etiqueta text-blanco">
            <Disc3 size={14} className="girar text-rojo" /> Su casa productora
          </p>
          <h2 className="mt-6 text-4xl sm:text-6xl">Guachy <span className="text-rojo">Records</span></h2>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
            Las canciones de Jey Avila se graban y se producen con {PRODUCTOR.nombre}.
          </p>
          <p className="mt-8 font-display text-2xl sm:text-3xl font-extrabold text-rojo">{PRODUCTOR.lema}</p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {PRODUCTOR.servicios.map((sv) => (
              <li key={sv.titulo} className="group flex items-center gap-4 border-2 border-negro/15 px-4 py-3 transition-colors duration-300 hover:border-negro activo:border-negro hover:bg-negro activo:bg-negro hover:text-blanco activo:text-blanco">
                <span className="w-1 self-stretch bg-rojo shrink-0" aria-hidden="true" />
                <span>
                  <span className="block font-display font-bold">{sv.titulo}</span>
                  <span className="block text-sm text-neutral-500 group-hover:text-neutral-300 group-activo:text-neutral-300">{sv.detalle}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg font-semibold">{PRODUCTOR.cierre}</p>
          {PRODUCTOR.contacto && (
            <a href={PRODUCTOR.contacto} target="_blank" rel="noopener noreferrer" className="btn btn-negro mt-6">
              <span className="flex items-center gap-3">Contáctanos hoy <ArrowUpRight size={16} /></span>
            </a>
          )}
        </Revelar>
      </div>
    </section>
  )
}
