import { Link } from 'react-router-dom'
import { IMAGENES } from '../../data/contenido'
import Ecualizador from './Ecualizador'

/** Cierre de página: invitación a llevar a Jey a un evento. */
export default function CtaContratar() {
  return (
    <section className="relative overflow-hidden">
      <div className="foto absolute inset-0" aria-hidden="true">
        <img src={IMAGENES.tarimaPublico} alt="" className="w-full h-full object-cover object-[50%_40%] respirar" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-negro via-negro/85 to-negro/40" />
      <div className="relative contenedor py-24 sm:py-32">
        <p className="etiqueta flex items-center gap-3 text-blanco"><Ecualizador barras={4} className="h-3" grosor="w-[2px]" color="bg-blanco" /> Contrataciones</p>
        <h2 className="mt-4 max-w-3xl text-4xl sm:text-6xl">Lleva a Jey Avila a tu evento</h2>
        <p className="mt-6 max-w-lg text-lg text-blanco/90">Conciertos, festivales, campamentos, congresos juveniles y eventos privados. Cuéntanos de tu evento y coordinamos la presentación del ministerio musical.</p>
        <Link to="/contrataciones" className="btn btn-rojo mt-10"><span>Contrataciones</span></Link>
      </div>
    </section>
  )
}
