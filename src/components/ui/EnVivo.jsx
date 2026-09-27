import { CLIPS } from '../../data/contenido'
import ClipEnVivo from './ClipEnVivo'
import TituloSeccion from './TituloSeccion'
import Revelar from './Revelar'
import Paralaje from './Paralaje'

/** Clips verticales de conciertos (inicio y videos), sobre fondo rojo. */
export default function EnVivo() {
  return (
    <section className="relative overflow-hidden bg-rojo py-24 sm:py-32">
      <Paralaje factor={-0.1} className="absolute -inset-y-16 inset-x-0 rayas-negras opacity-10 [mask-image:linear-gradient(to_right,black,transparent_70%)]" aria-hidden="true" />
      <div className="relative contenedor">
        <TituloSeccion sobreRojo etiqueta="En vivo" titulo="Así se vive" texto="Tarimas, campamentos y eventos llenos de jóvenes cantando." />
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
