import { usePageMeta } from '../../../utils/seo'
import { ARTISTA } from '../../../data/artista'
import { VIDEOS, IMAGENES, EN_VIVO_YOUTUBE, DE_CERCA } from '../../../data/contenido'
import Encabezado from '../../../components/ui/Encabezado'
import TituloSeccion from '../../../components/ui/TituloSeccion'
import VideoYouTube from '../../../components/ui/VideoYouTube'
import VideoLocal from '../../../components/ui/VideoLocal'
import Revelar from '../../../components/ui/Revelar'
import Lanzamientos from '../../../components/ui/Lanzamientos'
import Merengue from '../../../components/ui/Merengue'
import EnTelevision from '../../../components/ui/EnTelevision'
import EnVivo from '../../../components/ui/EnVivo'
import CtaContratar from '../../../components/ui/CtaContratar'

export default function VideosPage() {
  usePageMeta('Videos', 'Videos oficiales, lanzamientos, presentaciones en vivo y a capela de Jey Avila.')
  return (
    <>
      <Encabezado etiqueta="YouTube" titulo="Videos" bajada="Videos oficiales, lanzamientos, presentaciones en vivo y a capela." imagen={IMAGENES.tarimaChaqueta} />

      <Lanzamientos />

      {/* Videos oficiales */}
      <section className="pb-20 sm:pb-28">
        <div className="contenedor">
          <TituloSeccion etiqueta="Oficiales" titulo="Videos oficiales" />
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {VIDEOS.map((v, i) => (
              <Revelar key={v.id} retraso={(i % 2) * 120}>
                <p className="etiqueta text-rojo mb-3">{v.tipo}</p>
                <VideoYouTube id={v.id} titulo={v.titulo} />
              </Revelar>
            ))}
          </div>
          <a href={ARTISTA.redes.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-rojo mt-10"><span>Ver el canal de YouTube</span></a>
        </div>
      </section>

      <Merengue />

      {/* En vivo en YouTube */}
      <section className="pt-24 sm:pt-32">
        <div className="contenedor">
          <TituloSeccion etiqueta="En vivo" titulo="Cantando en vivo" />
          <Revelar className="mt-12">
            <VideoYouTube id={EN_VIVO_YOUTUBE.id} titulo={EN_VIVO_YOUTUBE.titulo} />
          </Revelar>
        </div>
      </section>
      <EnVivo />

      <EnTelevision />

      {/* De cerca: a capela y cómo escribió una canción */}
      <section className="py-24 sm:py-32">
        <div className="contenedor">
          <TituloSeccion etiqueta="Sin pista" titulo="Jey de cerca" texto={'Cantando un vallenato a capela y contando cómo escribió "Lo Mío Llegará".'} />
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {DE_CERCA.map((e, i) => (
              <Revelar key={e.video} retraso={i * 120}>
                <VideoLocal video={e.video} poster={e.poster} titulo={e.titulo} detalle={e.detalle} />
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <CtaContratar />
    </>
  )
}
