import { usePageMeta } from '../../../utils/seo'
import { IMAGENES } from '../../../data/contenido'
import { useAgenda } from '../../../hooks/useAgenda'
import Encabezado from '../../../components/ui/Encabezado'
import Ecualizador from '../../../components/ui/Ecualizador'
import AgendaEscritorio from '../components/AgendaEscritorio'
import AficheMovil from '../components/AficheMovil'

export default function AgendaPage() {
  usePageMeta('Agenda', 'Próximos conciertos y presentaciones de Jey Avila.')
  const { estado, agenda } = useAgenda()

  return (
    <>
      <Encabezado etiqueta="Conciertos" titulo="Agenda" bajada="Próximas presentaciones en tarimas, festivales y eventos." imagen={IMAGENES.conciertoLuces} />

      <section className="pt-6 pb-20 md:py-28">
        <div className="contenedor">
          {estado === 'cargando' && (
            <p className="flex items-center justify-center gap-3 py-24 etiqueta text-neutral-400">
              <Ecualizador barras={5} className="h-4" /> Cargando fechas
            </p>
          )}
          {estado === 'error' && (
            <p className="py-24 text-center text-lg text-neutral-400">No se pudo cargar la agenda. Recarga la página en un momento.</p>
          )}
          {estado === 'listo' && (
            <>
              {/* Celular: afiche vertical del año, pensado para capturar y compartir */}
              <div className="md:hidden">
                <AficheMovil agenda={agenda} />
              </div>

              {/* Desde tablet: las mismas fechas con diseño de escritorio */}
              <div className="hidden md:block">
                <AgendaEscritorio agenda={agenda} />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
