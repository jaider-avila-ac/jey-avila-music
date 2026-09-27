import { LANZAMIENTOS } from '../../data/contenido'
import VideoYouTube from './VideoYouTube'
import TituloSeccion from './TituloSeccion'
import Revelar from './Revelar'

/** Últimos lanzamientos: el más reciente en grande, con su año. */
export default function Lanzamientos() {
  return (
    <section className="py-24 sm:py-32">
      <div className="contenedor">
        <TituloSeccion etiqueta="Lo nuevo" titulo="Últimos lanzamientos" />
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {LANZAMIENTOS.map((v, i) => (
            <Revelar key={v.id} retraso={i * 150}>
              <div className="relative">
                <span className={`absolute -top-4 left-4 z-10 px-3 py-1.5 etiqueta ${i === 0 ? 'bg-rojo text-blanco pulso' : 'bg-blanco text-negro'}`}>
                  {i === 0 ? `Nuevo · ${v.anio}` : v.anio}
                </span>
                <VideoYouTube id={v.id} titulo={v.titulo} />
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
