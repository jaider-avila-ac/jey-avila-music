import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, X } from 'lucide-react'
import { ARTISTA } from '../../../data/artista'
import { VIDEOS, IMAGENES } from '../../../data/contenido'
import FondoYouTube from '../../../components/ui/FondoYouTube'
import Vinilo from '../../../components/ui/Vinilo'
import Ecualizador from '../../../components/ui/Ecualizador'
import Paralaje from '../../../components/ui/Paralaje'

const PRINCIPAL = VIDEOS[0] // "Vuelvo a Creer"

export default function HeroInicio() {
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (!modal) return
    const onKey = (e) => e.key === 'Escape' && setModal(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal])

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-negro flex items-end">
      {/* Celular: foto en duotono con zoom lento (los celulares suelen bloquear el video de fondo
          y así no se gastan datos). Desde tablet: video "Vuelvo a Creer" silenciado y en bucle. */}
      <Paralaje factor={-0.3} className="duotono absolute inset-x-0 top-0 h-[125%] md:hidden" aria-hidden="true">
        <img src={IMAGENES.destacada} alt="" className="w-full h-full object-cover respirar" />
      </Paralaje>
      <FondoYouTube id={PRINCIPAL.id} className="hidden md:block" />
      <div className="absolute inset-0 bg-negro/55" />
      <div className="absolute inset-0 bg-rojo mix-blend-multiply opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/30 to-transparent" />

      <div className="relative contenedor w-full pb-24 pt-32 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8 min-w-0">
          <p className="flex items-center gap-3 etiqueta">
            <Ecualizador barras={5} className="h-4" color="bg-blanco" /> {ARTISTA.genero}
          </p>
          <h1 className="mt-6 text-[22vw] sm:text-[9rem] lg:text-[11rem] font-black leading-[0.95] tracking-tighter">
            <span className="mascara"><span>Jey</span></span>
            <span className="mascara"><span style={{ animationDelay: '.12s' }}>Avila</span></span>
          </h1>
          <p className="mt-6 flex items-center gap-x-[3vw] sm:gap-x-4 whitespace-nowrap font-display text-[3.3vw] sm:text-base font-bold">
            {ARTISTA.roles.map((r, i) => (
              <span key={r} className="flex items-center gap-4">
                {i > 0 && <span className="w-px h-4 bg-blanco/60" aria-hidden="true" />}{r}
              </span>
            ))}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => setModal(true)} className="btn btn-rojo">
              <span className="flex items-center gap-3"><Play size={16} className="fill-current" /> Ver "{PRINCIPAL.titulo}"</span>
            </button>
            <a href={ARTISTA.redes.spotify} target="_blank" rel="noopener noreferrer" className="btn btn-borde"><span>Escuchar en Spotify</span></a>
            <Link to="/contrataciones" className="btn btn-borde"><span>Llévalo a tu evento</span></Link>
          </div>
        </div>

        {/* Vinilo con el sencillo del hero */}
        <div className="lg:col-span-4 hidden lg:flex flex-col items-center gap-5">
          <Vinilo imagen={IMAGENES.retratoAzul} className="w-72 h-72 xl:w-80 xl:h-80" />
          <p className="text-center">
            <span className="etiqueta text-neutral-300 block">Sonando ahora</span>
            <span className="font-display text-2xl font-extrabold">{PRINCIPAL.titulo}</span>
          </p>
        </div>
      </div>

      {/* Modal con el video completo y con sonido */}
      {modal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-negro/90 p-4 aparecer" role="dialog" aria-modal="true" onClick={() => setModal(false)}>
          <button type="button" className="absolute top-4 right-4 w-12 h-12 bg-rojo flex items-center justify-center" aria-label="Cerrar video"><X size={22} /></button>
          <div className="w-full max-w-5xl aspect-video border-2 border-rojo" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${PRINCIPAL.id}?autoplay=1&rel=0&modestbranding=1`}
              title={PRINCIPAL.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  )
}
