import { usePageMeta } from '../../../utils/seo'
import { ARTISTA, BIOGRAFIA, LINEA_TIEMPO, INSTRUMENTOS, SUENO } from '../../../data/artista'
import { IMAGENES } from '../../../data/contenido'
import Encabezado from '../../../components/ui/Encabezado'
import TituloSeccion from '../../../components/ui/TituloSeccion'
import Revelar from '../../../components/ui/Revelar'
import Logros from '../../../components/ui/Logros'
import Productor from '../../../components/ui/Productor'
import Colaboraciones from '../../../components/ui/Colaboraciones'
import CtaContratar from '../../../components/ui/CtaContratar'
import Paralaje from '../../../components/ui/Paralaje'

export default function HistoriaPage() {
  usePageMeta('Historia', 'La historia de Jey Avila: cantante y compositor de champeta de Córdoba, Colombia.')
  return (
    <>
      <Encabezado etiqueta={ARTISTA.nombreCompleto} titulo="Historia" bajada="Desde Córdoba, un mensaje de esperanza al ritmo de la champeta." imagen={IMAGENES.retratoRojo} />

      {/* Biografía */}
      <section className="py-20 sm:py-28">
        <div className="contenedor grid lg:grid-cols-12 gap-12">
          <Revelar className="lg:col-span-5 group">
            <div className="relative">
              <div className="duotono relative aspect-[3/4]">
                <img src={IMAGENES.destacada} alt={ARTISTA.nombre} className="w-full h-full object-cover" />
              </div>
            </div>
          </Revelar>
          <div className="lg:col-span-6 lg:col-start-7">
            <TituloSeccion etiqueta="Quién es" titulo="Un propósito desde niño" />
            {BIOGRAFIA.map((p, i) => (
              <Revelar key={i} retraso={i * 100}>
                <p className="mt-6 text-lg leading-relaxed text-neutral-300">{p}</p>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      {/* Instrumentos que toca: etiquetas fijas (sin cintas en movimiento) */}
      <section className="bg-blanco text-negro py-16 sm:py-20">
        <div className="contenedor grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4">
            <p className="etiqueta text-rojo">Desde los 5 años</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Los instrumentos que toca</h2>
          </div>
          <ul className="lg:col-span-8 flex flex-wrap gap-3">
            {INSTRUMENTOS.map((ins, i) => (
              <Revelar as="li" key={ins} retraso={i * 60}
                className="group flex items-center gap-3 border-2 border-negro/15 px-5 py-3 font-display text-base sm:text-lg font-bold transition-colors duration-300 hover:border-rojo activo:border-rojo hover:bg-rojo activo:bg-rojo hover:text-blanco activo:text-blanco">
                <span className="w-2 h-2 bg-rojo transition-colors group-hover:bg-blanco group-activo:bg-blanco" aria-hidden="true" /> {ins}
              </Revelar>
            ))}
          </ul>
        </div>
      </section>

      {/* Línea de tiempo */}
      <section className="py-24 sm:py-32">
        <div className="contenedor">
          <TituloSeccion etiqueta="Trayectoria" titulo="Paso a paso" />
          <ol className="mt-16 relative">
            <span className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-blanco/15" aria-hidden="true" />
            {LINEA_TIEMPO.map((h, i) => {
              const derecha = i % 2 === 1
              return (
                <Revelar as="li" key={h.anio} retraso={60} className={`group relative pl-12 md:pl-0 pb-12 md:w-1/2 ${derecha ? 'md:ml-auto md:pl-14' : 'md:pr-14 md:text-right'}`}>
                  <span className={`absolute top-2 left-[8px] md:top-3 w-4 h-4 bg-rojo transition-transform duration-300 group-hover:scale-150 group-activo:scale-150 ${derecha ? 'md:-left-2' : 'md:left-auto md:-right-2'}`} />
                  <p className="font-display text-5xl sm:text-6xl font-black leading-none text-rojo transition-colors duration-500 group-hover:text-blanco group-activo:text-blanco">{h.anio}</p>
                  <h3 className="mt-2 text-2xl">{h.titulo}</h3>
                  <p className="mt-2 text-neutral-400">{h.texto}</p>
                </Revelar>
              )
            })}
          </ol>
        </div>
      </section>

      <Logros />
      <Colaboraciones />
      <Productor />

      {/* Su sueño */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <Paralaje factor={-0.15} className="duotono absolute inset-x-0 -top-[15%] h-[130%] opacity-40" aria-hidden="true">
          <img src={IMAGENES.orando} alt="" className="w-full h-full object-cover respirar" />
        </Paralaje>
        <div className="absolute inset-0 bg-negro/70" />
        <Revelar className="relative contenedor max-w-4xl text-center">
          <p className="etiqueta text-rojo">Su sueño</p>
          <p className="mt-6 font-display text-2xl sm:text-4xl font-bold leading-snug">{SUENO}</p>
        </Revelar>
      </section>

      <CtaContratar />
    </>
  )
}
