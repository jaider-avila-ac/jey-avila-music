import { LOGROS, IMAGENES } from '../../data/contenido'
import Revelar from './Revelar'
import Ecualizador from './Ecualizador'
import Cifra from './Cifra'

/** Franja blanca de logros (inicio e historia); al pasar el mouse la tarjeta se vuelve negra
 *  y sus textos blancos. */
export default function Logros() {
  return (
    <section className="relative overflow-hidden bg-blanco text-negro">
      <div className="relative contenedor py-20 sm:py-24">
        <p className="etiqueta flex items-center gap-3 text-neutral-500"><Ecualizador barras={4} className="h-3" grosor="w-[2px]" color="bg-negro" /> Logros</p>
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-stretch">
        <Revelar className="lg:col-span-4 group foto relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-full">
          <img src={IMAGENES.premioPraise} alt="Jey Avila con su premio en los Praise Music Awards" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top respirar" />
        </Revelar>
        <div className="lg:col-span-8 grid sm:grid-cols-2 border-t border-l border-negro/15">
          {LOGROS.map((l, i) => (
            <Revelar key={l.detalle} retraso={i * 100} className="group border-r border-b border-negro/15 p-7 transition-colors duration-500 hover:bg-negro activo:bg-negro">
              <Cifra valor={l.cifra} className="font-display text-6xl font-black leading-none text-negro transition-colors duration-500 group-hover:text-blanco group-activo:text-blanco" />
              <p className="mt-5 font-display text-lg font-bold leading-snug transition-colors duration-500 group-hover:text-blanco group-activo:text-blanco">{l.titulo}</p>
              <p className="mt-2 text-sm text-neutral-600 transition-colors duration-500 group-hover:text-neutral-300 group-activo:text-neutral-300">{l.detalle}</p>
            </Revelar>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
