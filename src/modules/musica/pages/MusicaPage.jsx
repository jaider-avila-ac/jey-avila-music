import { Quote } from 'lucide-react'
import { usePageMeta } from '../../../utils/seo'
import { ARTISTA } from '../../../data/artista'
import { DETRAS_DE_LA_CANCION } from '../../../data/musica'
import { IMAGENES, COLABORACIONES } from '../../../data/contenido'
import Encabezado from '../../../components/ui/Encabezado'
import TituloSeccion from '../../../components/ui/TituloSeccion'
import ListaCanciones from '../../../components/ui/ListaCanciones'
import ReproductorSpotify from '../../../components/ui/ReproductorSpotify'
import Revelar from '../../../components/ui/Revelar'
import Vinilo from '../../../components/ui/Vinilo'
import Colaboraciones from '../../../components/ui/Colaboraciones'
import CtaContratar from '../../../components/ui/CtaContratar'
import Merengue from '../../../components/ui/Merengue'

export default function MusicaPage() {
  usePageMeta('Música', 'Escucha las canciones de Jey Avila: Hijo de Mi Vida, Vuelvo a Creer, Lo Mío Llegará y más.')
  const d = DETRAS_DE_LA_CANCION
  return (
    <>
      <Encabezado etiqueta="Discografía" titulo="Música" bajada="Champeta para cantar, bailar y creer. Estas son sus canciones más escuchadas." imagen={IMAGENES.retratoGafas} />

      <section className="py-20 sm:py-28">
        <div className="contenedor grid lg:grid-cols-12 gap-12">
          <Revelar className="lg:col-span-7">
            <TituloSeccion etiqueta="Top en Spotify" titulo="Canciones" />
            <div className="mt-10"><ListaCanciones /></div>
          </Revelar>
          <Revelar retraso={150} className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <ReproductorSpotify alto={560} />
            <a href={ARTISTA.redes.spotify} target="_blank" rel="noopener noreferrer" className="btn btn-rojo w-full mt-4"><span>Seguir en Spotify</span></a>
          </Revelar>
        </div>
      </section>

      {/* Detrás de la canción */}
      <section className="relative overflow-hidden bg-blanco text-negro py-24 sm:py-32">
        <div className="contenedor grid lg:grid-cols-12 gap-12 items-center">
          <Revelar className="lg:col-span-5 flex justify-center">
            <Vinilo imagen={IMAGENES.retratoMicrofono} className="w-72 h-72 sm:w-96 sm:h-96" lento />
          </Revelar>
          <Revelar retraso={150} className="lg:col-span-7">
            <TituloSeccion claro={false} etiqueta="Detrás de la canción" titulo={d.titulo} />
            <p className="mt-8 text-xl leading-relaxed text-neutral-700">
              <Quote size={28} className="inline -mt-2 mr-2 text-rojo" />{d.relato}
            </p>
            <blockquote className="mt-8 border-l-4 border-rojo pl-6">
              <p className="font-display text-xl sm:text-2xl font-bold leading-snug">{d.versiculo}</p>
              <cite className="mt-3 block etiqueta not-italic text-rojo">{d.cita}</cite>
            </blockquote>
          </Revelar>
        </div>
      </section>

      <Merengue />
      {COLABORACIONES.length > 0 && <Colaboraciones />}
      <CtaContratar />
    </>
  )
}
