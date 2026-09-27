import { Link } from 'react-router-dom'
import { IMAGENES } from '../../data/contenido'
import Ecualizador from './Ecualizador'

/** Cierre de página: invitación a llevar a Jey a un evento. */
export default function CtaContratar() {
  return (
    <section className="relative overflow-hidden">
      <div className="duotono absolute inset-0" aria-hidden="true">
        <img src={IMAGENES.multitud} alt="" className="w-full h-full object-cover respirar" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-rojo via-rojo/85 to-rojo/40" />
      <div className="relative contenedor py-24 sm:py-32">
        <p className="etiqueta flex items-center gap-3 text-blanco"><Ecualizador barras={4} className="h-3" grosor="w-[2px]" color="bg-blanco" /> Contrataciones</p>
        <h2 className="mt-4 max-w-3xl text-4xl sm:text-6xl">Lleva a Jey Avila a tu evento</h2>
        <p className="mt-6 max-w-lg text-lg text-blanco/90">Conciertos, festivales, campamentos, congresos juveniles y eventos privados. Cuéntanos de tu evento y coordinamos la presentación del ministerio musical.</p>
        <Link to="/contrataciones" className="btn btn-negro mt-10 hover:text-negro before:!bg-blanco"><span>Contrataciones</span></Link>
      </div>
    </section>
  )
}
