/** Onda de sonido que avanza sin parar (SVG repetido dos veces para el bucle). */
export default function Onda({ className = 'h-16 text-rojo', grosor = 2 }) {
  const tramo = 'M0 50 Q 25 10 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50'
  const tramo2 = 'M0 50 Q 25 80 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50'
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 800 100" preserveAspectRatio="none" className="onda h-full w-[200%]">
        {[0, 400].map((x) => (
          <g key={x} transform={`translate(${x} 0)`} fill="none" stroke="currentColor" strokeWidth={grosor} vectorEffect="non-scaling-stroke">
            <path d={tramo} />
            <path d={tramo2} opacity=".45" />
          </g>
        ))}
      </svg>
    </div>
  )
}
