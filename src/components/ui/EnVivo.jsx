import { CLIPS } from '../../data/contenido'
import ClipEnVivo from './ClipEnVivo'
import TituloSeccion from './TituloSeccion'
import Revelar from './Revelar'

/** Clips verticales de conciertos (inicio y videos), sobre fondo blanco. */
export default function EnVivo() {
  return (
    <section className="relative overflow-hidden bg-blanco text-negro py-24 sm:py-32">
      <div className="relative contenedor">
        <TituloSeccion claro={false} etiqueta="En vivo" titulo="Así se vive" texto="Tarimas, campamentos y eventos llenos de jóvenes cantando." />
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4">
          {CLIPS.map((c, i) => (
            <Revelar key={c.video} retraso={i * 120} className={i === 1 ? 'md:mt-16' : ''}>
              <ClipEnVivo {...c} />
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
