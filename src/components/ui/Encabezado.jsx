import Ecualizador from './Ecualizador'
import Onda from './Onda'
import Paralaje from './Paralaje'

/** Cabecera de páginas internas: título gigante, foto recortada en
 *  diagonal y un ecualizador enorme moviéndose de fondo. "encuadre" (object-position de Tailwind)
 *  elige qué parte de la foto se ve. "caraArriba": para fotos con la cabeza pegada al borde de
 *  arriba; la foto empieza debajo del menú, se ve desde su borde superior y crece hacia abajo. */
export default function Encabezado({ etiqueta, titulo, bajada, imagen, encuadre = 'object-center', caraArriba = false }) {
  return (
    <section className="relative overflow-hidden bg-negro pt-[calc(var(--header-h)+3.5rem)] pb-14 sm:pb-20">
      {/* Ecualizador gigante de fondo */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-[0.12]" aria-hidden="true">
        <Ecualizador barras={12} className="h-[70%] min-h-[220px]" grosor="w-[6vw] max-w-[70px]" separacion="gap-[2vw]" />
      </div>
      {imagen && (
        // En celular la foto queda de fondo, más tenue, para que el encabezado también tenga movimiento
        <div className={`foto absolute right-0 ${caraArriba ? 'top-[var(--header-h)] h-[calc(100%-var(--header-h))]' : 'top-0 h-full'} w-[70%] opacity-35 md:opacity-100 md:w-[42%]`} style={{ clipPath: 'polygon(22% 0, 100% 0, 100% 100%, 0 100%)' }}>
          <Paralaje factor={-0.2} className={`absolute inset-x-0 h-[120%] ${caraArriba ? 'top-0' : '-top-[10%]'}`}>
            <img src={imagen} alt="" className={`w-full h-full object-cover ${caraArriba ? 'object-top origin-top' : encuadre} respirar`} />
          </Paralaje>
        </div>
      )}
      <div className="relative contenedor">
        <p className="etiqueta text-neutral-400">{etiqueta}</p>
        <h1 className="mt-4 text-[9vw] sm:text-6xl lg:text-8xl">
          <span className="mascara"><span>{titulo}</span></span>
        </h1>
        {bajada && <p className="mt-6 max-w-xl text-lg text-neutral-300 leading-relaxed">{bajada}</p>}
      </div>
      <Onda className="absolute inset-x-0 bottom-0 h-10 text-neutral-500" />
    </section>
  )
}
