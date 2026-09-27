import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, PenLine } from 'lucide-react'
import { COMPOSICION, IMAGENES } from '../../data/contenido'
import Ecualizador from './Ecualizador'
import Revelar from './Revelar'
import Paralaje from './Paralaje'

const enlaceGenero = (g) => `/contrataciones?tipo=composicion&genero=${encodeURIComponent(g)}`

/** Servicio de composición: Jey escribe canciones por encargo en varios géneros. */
export default function Composicion() {
  // El género del título cambia solo, uno tras otro
  const [actual, setActual] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActual((i) => (i + 1) % COMPOSICION.generos.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Paralaje factor={-0.12} className="duotono absolute right-0 -top-[10%] h-[120%] w-full lg:w-1/2 opacity-20" aria-hidden="true">
        <img src={IMAGENES.estudioCabina} alt="" className="w-full h-full object-cover respirar" />
      </Paralaje>
      <div className="absolute inset-0 bg-gradient-to-r from-negro via-negro/90 to-negro/60" />

      <div className="relative contenedor grid lg:grid-cols-12 gap-12 lg:gap-16">
        <Revelar className="lg:col-span-6 min-w-0">
          <p className="etiqueta flex items-center gap-3 text-rojo">
            <Ecualizador barras={4} className="h-3" grosor="w-[2px]" /> Servicio de composición
          </p>
          <h2 className="mt-4 text-4xl sm:text-6xl">
            Compongo tu canción
            <span className="mascara text-rojo" aria-live="polite">
              <span key={actual}>{COMPOSICION.generos[actual].toLowerCase()}</span>
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-300 max-w-xl">
            Jey canta, escribe sus canciones y dirige cómo se hacen. Ahora también puede escribir la tuya: con tu historia, tu mensaje y el ritmo que quieras.
          </p>
          <Link to={enlaceGenero('')} className="btn btn-rojo mt-10">
            <span className="flex items-center gap-3"><PenLine size={16} /> Pide tu canción</span>
          </Link>
        </Revelar>

        <div className="lg:col-span-6 min-w-0">
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {COMPOSICION.generos.map((g, i) => (
              <Revelar as="li" key={g} retraso={i * 70}>
                <Link to={enlaceGenero(g)}
                  className={`group flex items-center justify-between gap-2 border-2 px-4 py-4 font-display text-sm sm:text-base font-bold transition-colors duration-300 hover:border-rojo activo:border-rojo hover:bg-rojo activo:bg-rojo ${i === actual ? 'border-rojo text-blanco' : 'border-blanco/15 text-neutral-200'}`}>
                  {g}
                  <ArrowUpRight size={16} className="shrink-0 text-rojo transition-all duration-300 group-hover:text-blanco group-activo:text-blanco group-hover:-translate-y-0.5 group-activo:-translate-y-0.5 group-hover:translate-x-0.5 group-activo:translate-x-0.5" />
                </Link>
              </Revelar>
            ))}
          </ul>

          <ol className="mt-10 space-y-6">
            {COMPOSICION.pasos.map((p, i) => (
              <Revelar as="li" key={p.titulo} retraso={150 + i * 100} className="flex gap-5">
                <span className="font-display text-3xl font-black leading-none text-rojo">0{i + 1}</span>
                <div>
                  <h3 className="text-xl">{p.titulo}</h3>
                  <p className="mt-1 text-neutral-400">{p.texto}</p>
                </div>
              </Revelar>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
