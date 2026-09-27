import { MERENGUE, IMAGENES } from '../../data/contenido'
import VideoYouTube from './VideoYouTube'
import Revelar from './Revelar'
import Ecualizador from './Ecualizador'
import Paralaje from './Paralaje'

/** "Llegó la Hora", su merengue urbano, con una leyenda que lo presenta. */
export default function Merengue() {
  return (
    <section className="relative overflow-hidden bg-blanco text-negro py-24 sm:py-32">
      <div className="relative contenedor grid lg:grid-cols-12 gap-12 items-center">
        <Revelar className="lg:col-span-5">
          <p className="inline-flex items-center gap-3 bg-rojo px-3 py-1.5 etiqueta text-blanco">
            <Ecualizador barras={4} className="h-3" grosor="w-[2px]" /> {MERENGUE.genero}
          </p>
          <h2 className="mt-6 text-4xl sm:text-6xl text-rojo">{MERENGUE.titulo}</h2>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed">{MERENGUE.leyenda}</p>
        </Revelar>
        <Revelar retraso={150} className="lg:col-span-7 relative">
          <Paralaje factor={0.18} className="duotono absolute -right-3 -top-10 sm:-right-6 w-24 h-24 sm:w-40 sm:h-40" aria-hidden="true">
            <img src={IMAGENES.retratoAzul} alt="" className="w-full h-full object-cover respirar" />
          </Paralaje>
          <VideoYouTube id={MERENGUE.id} titulo={MERENGUE.titulo} className="relative shadow-2xl shadow-black/30" />
        </Revelar>
      </div>
    </section>
  )
}
