import Ecualizador from './Ecualizador'

/** Encabezado de sección: etiqueta con ecualizador + título grande con la última palabra
 *  resaltada en rojo si hay más de una (sobre fondo rojo va toda en blanco: nunca texto negro sobre rojo). */
export default function TituloSeccion({ etiqueta, titulo, texto, claro = true, sobreRojo = false, className = '' }) {
  const palabras = titulo.split(' ')
  const ultima = palabras.pop()
  const colorTitulo = sobreRojo || claro ? 'text-blanco' : 'text-negro'
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className={`etiqueta flex items-center gap-3 ${sobreRojo ? 'text-blanco' : 'text-rojo'}`}>
        <Ecualizador barras={4} className="h-3" grosor="w-[2px]" color={sobreRojo ? 'bg-blanco' : 'bg-rojo'} /> {etiqueta}
      </p>
      <h2 className={`mt-4 text-4xl sm:text-6xl ${colorTitulo}`}>
        {palabras.length > 0 && `${palabras.join(' ')} `}
        <span className={sobreRojo || palabras.length === 0 ? '' : 'text-rojo'}>{ultima}</span>
      </h2>
      {texto && <p className={`mt-5 text-lg leading-relaxed ${sobreRojo ? 'text-blanco/90' : claro ? 'text-neutral-400' : 'text-neutral-600'}`}>{texto}</p>}
    </div>
  )
}
