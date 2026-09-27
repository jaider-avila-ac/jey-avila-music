import { LOGROS, IMAGENES } from '../../data/contenido'
import Revelar from './Revelar'
import Ecualizador from './Ecualizador'
import Paralaje from './Paralaje'
import Cifra from './Cifra'

/** Franja roja de logros (inicio e historia). Textos en blanco para buen contraste sobre el rojo;
 *  al pasar el mouse la tarjeta se vuelve negra y la cifra roja. */
export default function Logros() {
  return (
    <section className="relative overflow-hidden bg-rojo">
      <Paralaje factor={-0.1} className="absolute -inset-y-10 right-0 w-1/2 md:w-1/3 rayas opacity-10" aria-hidden="true" />
      <div className="relative contenedor py-20 sm:py-24">
        <p className="etiqueta flex items-center gap-3 text-blanco"><Ecualizador barras={4} className="h-3" grosor="w-[2px]" color="bg-blanco" /> Logros</p>
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-stretch">
        <Revelar className="lg:col-span-4 group duotono relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-full">
          <img src={IMAGENES.premioPraise} alt="Jey Avila con su premio en los Praise Music Awards" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top respirar" />
        </Revelar>
        <div className="lg:col-span-8 grid sm:grid-cols-2 border-t border-l border-white/25">
          {LOGROS.map((l, i) => (
            <Revelar key={l.detalle} retraso={i * 100} className="group border-r border-b border-white/25 p-7 transition-colors duration-500 hover:bg-negro activo:bg-negro">
              <Cifra valor={l.cifra} className="font-display text-6xl font-black leading-none text-blanco transition-colors duration-500 group-hover:text-rojo group-activo:text-rojo" />
              <p className="mt-5 font-display text-lg font-bold leading-snug text-blanco">{l.titulo}</p>
              <p className="mt-2 text-sm text-white/85">{l.detalle}</p>
            </Revelar>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
