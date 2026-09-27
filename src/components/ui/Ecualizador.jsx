// Duraciones y retrasos fijos (no aleatorios) para que no cambien entre renders
const RITMO = [0.9, 1.3, 0.7, 1.1, 0.8, 1.4, 1, 0.75, 1.2, 0.95, 1.35, 0.85]

/** Barras de ecualizador que se mueven sin parar. */
export default function Ecualizador({ barras = 5, className = 'h-4', grosor = 'w-[3px]', color = 'bg-rojo', separacion = 'gap-[3px]' }) {
  return (
    <span className={`inline-flex items-end ${separacion} ${className}`} aria-hidden="true">
      {Array.from({ length: barras }, (_, i) => (
        <span
          key={i}
          className={`barra-eq h-full ${grosor} ${color}`}
          style={{ animationDuration: `${RITMO[i % RITMO.length]}s`, animationDelay: `${-i * 0.17}s` }}
        />
      ))}
    </span>
  )
}
