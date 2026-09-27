import Ecualizador from '../ui/Ecualizador'

/** Logo tipográfico provisional: nombre en Anton con un ecualizador que se mueve. */
export default function Logo({ className = '' }) {
  return (
    <span className={`group inline-flex items-end gap-2 select-none ${className}`}>
      <span className="font-display text-xl sm:text-2xl font-extrabold leading-none tracking-tight">
        Jey <span className="text-rojo transition-colors duration-300 group-hover:text-blanco group-activo:text-blanco">Avila</span>
      </span>
      <Ecualizador barras={4} className="h-5 mb-0.5" grosor="w-[3px]" />
    </span>
  )
}
