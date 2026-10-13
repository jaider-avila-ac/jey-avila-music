import Ecualizador from './Ecualizador'

/** Encabezado de sección: etiqueta con ecualizador + título grande con la última palabra
 *  resaltada en rojo si hay más de una. "claro" = texto claro (sección negra); false en secciones blancas. */
export default function TituloSeccion({ etiqueta, titulo, texto, claro = true, className = '' }) {
  const palabras = titulo.split(' ')
  const ultima = palabras.pop()
  const colorTitulo = claro ? 'text-blanco' : 'text-negro'
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className={`etiqueta flex items-center gap-3 ${claro ? 'text-neutral-400' : 'text-neutral-500'}`}>
        <Ecualizador barras={4} className="h-3" grosor="w-[2px]" color={claro ? 'bg-blanco' : 'bg-negro'} /> {etiqueta}
      </p>
      <h2 className={`mt-4 text-[min(2.25rem,9vw)] sm:text-6xl ${colorTitulo}`}>
        {palabras.length > 0 && `${palabras.join(' ')} `}
        <span className={palabras.length === 0 ? '' : 'text-rojo'}>{ultima}</span>
      </h2>
      {texto && <p className={`mt-5 text-lg leading-relaxed ${claro ? 'text-neutral-400' : 'text-neutral-600'}`}>{texto}</p>}
    </div>
  )
}
