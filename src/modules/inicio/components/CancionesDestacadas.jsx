import { DESTACADAS } from '../../../data/contenido'
import VideoYouTube from '../../../components/ui/VideoYouTube'
import TituloSeccion from '../../../components/ui/TituloSeccion'
import Revelar from '../../../components/ui/Revelar'

/** Tres canciones destacadas sobre fondo blanco: la primera en grande y dos a su lado. */
export default function CancionesDestacadas() {
  const [principal, ...resto] = DESTACADAS
  return (
    <section className="relative overflow-hidden bg-blanco text-negro py-24 sm:py-32">
      <div className="contenedor">
        <TituloSeccion claro={false} etiqueta="Canciones destacadas" titulo="Para escuchar una y otra vez" />
        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          <Revelar className="lg:col-span-8 relative">
            <VideoYouTube id={principal.id} titulo={principal.titulo} className="relative" />
          </Revelar>
          <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-1 gap-6 content-start">
            {resto.map((v, i) => (
              <Revelar key={v.id} retraso={150 + i * 120}>
                <p className="etiqueta text-rojo mb-2">{v.tipo}</p>
                <VideoYouTube id={v.id} titulo={v.titulo} />
              </Revelar>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
