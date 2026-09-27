import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { NAV, ARTISTA } from '../../data/artista'
import Logo from './Logo'
import Ecualizador from '../ui/Ecualizador'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setAbierto(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [abierto])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-negro/95 border-b-2 border-rojo' : 'bg-gradient-to-b from-negro/80 to-transparent'}`}>
        <div className="contenedor flex h-[var(--header-h)] items-center justify-between">
          <Link to="/" aria-label={`${ARTISTA.nombre}, inicio`}><Logo /></Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.filter((n) => n.to !== '/contrataciones').map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) => `group relative px-4 py-2 text-sm font-semibold uppercase tracking-[0.15em] transition-colors ${isActive ? 'text-blanco' : 'text-neutral-400 hover:text-blanco activo:text-blanco'}`}
              >
                {({ isActive }) => (
                  <>
                    {/* Bloque rojo inclinado que sube detrás del enlace */}
                    <span className={`absolute inset-0 -skew-x-12 bg-rojo transition-transform duration-300 origin-bottom ${isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100 group-activo:scale-y-100'}`} />
                    <span className="relative">{n.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/contrataciones" className="hidden sm:inline-flex btn btn-rojo !py-3 !px-5"><span>Contrataciones</span></Link>
            <button
              type="button"
              onClick={() => setAbierto(true)}
              className="lg:hidden flex items-center gap-2 bg-rojo px-3 py-2.5 text-xs font-bold uppercase tracking-[0.2em]"
              aria-label="Abrir menú"
              aria-expanded={abierto}
            >
              <Ecualizador barras={3} className="h-3.5" grosor="w-[2px]" color="bg-blanco" /> Menú
            </button>
          </div>
        </div>
      </header>

      {/* Menú de celular: panel rojo que entra desde la derecha */}
      {abierto && (
        <div className="lg:hidden fixed inset-0 z-[60] aparecer">
          <button type="button" className="absolute inset-0 bg-negro/70" onClick={() => setAbierto(false)} aria-label="Cerrar menú" />
          <aside className="panel-menu absolute right-0 top-0 h-full w-[88%] max-w-sm bg-rojo flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-6 h-[var(--header-h)]">
              <span className="font-display text-xl font-extrabold">{ARTISTA.nombre}</span>
              <button type="button" onClick={() => setAbierto(false)} className="w-11 h-11 flex items-center justify-center bg-negro" aria-label="Cerrar menú"><X size={20} /></button>
            </div>
            <nav className="flex-1 px-6 pt-4">
              {NAV.map((n, i) => (
                <span key={n.to} className="block overflow-hidden">
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    className={({ isActive }) => `flex items-center justify-between border-b border-negro/20 py-3 font-display text-3xl font-extrabold text-blanco`}
                    style={{ animation: `subir .6s cubic-bezier(.2,.8,.2,1) ${150 + i * 60}ms both` }}
                  >
                    {({ isActive }) => (
                      <>
                        {n.label}
                        {/* Página actual: ecualizador negro (sin texto negro sobre el rojo) */}
                        {isActive && <Ecualizador barras={4} className="h-6" grosor="w-[4px]" color="bg-negro" />}
                      </>
                    )}
                  </NavLink>
                </span>
              ))}
            </nav>
            <div className="px-6 py-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em]">
              <Ecualizador barras={5} className="h-4" color="bg-negro" /> {ARTISTA.genero}
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
