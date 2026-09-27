import { Tv } from 'lucide-react'
import { EN_TV, IMAGENES } from '../../data/contenido'
import VideoYouTube from './VideoYouTube'
import TituloSeccion from './TituloSeccion'
import Revelar from './Revelar'
import Paralaje from './Paralaje'

/** Su presentación en Telecaribe. */
export default function EnTelevision() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Paralaje factor={-0.15} className="duotono absolute inset-x-0 -top-[15%] h-[130%] opacity-25" aria-hidden="true">
        <img src={IMAGENES.escenario} alt="" className="w-full h-full object-cover respirar" />
      </Paralaje>
      <div className="absolute inset-0 bg-gradient-to-b from-negro via-negro/70 to-negro" />
      <div className="relative contenedor grid lg:grid-cols-12 gap-12 items-center">
        <Revelar className="lg:col-span-4">
          <TituloSeccion etiqueta="En los medios" titulo="En Telecaribe" texto={EN_TV.detalle} />
          <p className="mt-8 inline-flex items-center gap-3 border border-white/20 px-4 py-2 text-sm text-neutral-300">
            <Tv size={16} className="text-rojo" /> Televisión regional
          </p>
        </Revelar>
        <Revelar retraso={150} className="lg:col-span-8 relative">
          <VideoYouTube id={EN_TV.id} titulo={EN_TV.titulo} className="relative" />
        </Revelar>
      </div>
    </section>
  )
}
