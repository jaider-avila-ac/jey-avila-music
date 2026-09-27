import { Link } from 'react-router-dom'
import { usePageMeta } from '../../../utils/seo'
import { IMAGENES } from '../../../data/contenido'
import Vinilo from '../../../components/ui/Vinilo'

export default function NoEncontradaPage() {
  usePageMeta('Página no encontrada')
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-[var(--header-h)]">
      <div className="contenedor grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-display text-[24vw] md:text-[11rem] font-black leading-none text-rojo">404</p>
          <h1 className="text-4xl">Esta canción no existe</h1>
          <p className="mt-4 text-neutral-400">La página que buscas no está o cambió de lugar.</p>
          <Link to="/" className="btn btn-rojo mt-8"><span>Volver al inicio</span></Link>
        </div>
        <div className="hidden md:flex justify-center"><Vinilo imagen={IMAGENES.retratoAzul} className="w-80 h-80" /></div>
      </div>
    </section>
  )
}
