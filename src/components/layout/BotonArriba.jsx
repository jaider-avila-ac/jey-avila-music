import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/** Botón flotante para volver al inicio de la página. Aparece después de bajar un poco. */
export default function BotonArriba() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const revisar = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    revisar()
    window.addEventListener('scroll', revisar, { passive: true })
    return () => window.removeEventListener('scroll', revisar)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
      className={`group fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-rojo text-blanco shadow-lg shadow-black/40 transition-all duration-300 hover:bg-blanco hover:text-rojo ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp size={22} className="transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  )
}
