import { useEffect, useRef, useState } from 'react'
import { CalendarPlus, Check, ExternalLink, ImageUp, LogOut, Pencil, Trash2, X } from 'lucide-react'
import { api } from '../../../utils/api'
import { redimensionarImagen } from '../../../utils/redimensionar'
import Ecualizador from '../../../components/ui/Ecualizador'

const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

// "2026-10-18" → "Dom 18 oct 2026"
const fechaLegible = (iso) => {
  const [a, m, d] = iso.split('-').map(Number)
  return `${DIAS[new Date(a, m - 1, d).getDay()]} ${d} ${MESES[m - 1]} ${a}`
}
const hoyIso = () => {
  const h = new Date()
  return `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, '0')}-${String(h.getDate()).padStart(2, '0')}`
}
const ordenar = (lista) => [...lista].sort((a, b) => a.fecha.localeCompare(b.fecha) || a.id - b.id)

/** Edición de la agenda: textos e imagen del afiche y las fechas (agregar, editar, borrar). */
export default function PanelAgenda({ email, alSalir }) {
  const [agenda, setAgenda] = useState(null)
  const [aviso, setAviso] = useState(null) // { tipo: 'ok' | 'error', texto }
  const temporizador = useRef(null)

  const avisar = (tipo, texto) => {
    clearTimeout(temporizador.current)
    setAviso({ tipo, texto })
    temporizador.current = setTimeout(() => setAviso(null), 4000)
  }

  // Si la sesión venció, vuelve al inicio de sesión; si no, muestra el error
  const manejarError = (err) => {
    if (err.estado === 401) alSalir()
    else avisar('error', err.message)
  }

  useEffect(() => {
    api('/api/admin/agenda').then(setAgenda).catch(manejarError)
    return () => clearTimeout(temporizador.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const salir = async () => {
    try { await api('/api/admin/logout', { metodo: 'POST' }) } catch { /* igual se sale */ }
    alSalir()
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b-2 border-rojo bg-negro/95 backdrop-blur">
        <div className="contenedor flex items-center justify-between gap-4 py-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-display text-lg font-black">
              Jey <span className="text-rojo">Avila</span> <Ecualizador barras={4} className="h-4" grosor="w-[3px]" />
            </p>
            <p className="truncate text-xs text-neutral-400">{email}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <a href="/agenda" target="_blank" rel="noopener noreferrer" className="flex h-11 items-center gap-2 border-2 border-blanco/20 px-3 text-sm font-semibold hover:border-blanco">
              <ExternalLink size={16} /> <span className="hidden sm:inline">Ver agenda</span>
            </a>
            <button type="button" onClick={salir} className="flex h-11 items-center gap-2 bg-rojo px-3 text-sm font-semibold hover:bg-blanco hover:text-rojo">
              <LogOut size={16} /> <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {aviso && (
        <p role="status" className={`fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 px-5 py-4 text-sm font-semibold shadow-2xl aparecer ${aviso.tipo === 'ok' ? 'bg-blanco text-negro' : 'bg-rojo text-blanco'}`}>
          {aviso.texto}
        </p>
      )}

      <main className="contenedor py-10 sm:py-14">
        <h1 className="text-4xl sm:text-5xl">Agenda</h1>
        <p className="mt-2 text-neutral-400">Lo que cambies aquí se ve de inmediato en la página de la agenda.</p>

        {!agenda ? (
          <p className="mt-16 flex items-center gap-3 etiqueta text-neutral-400"><Ecualizador barras={5} className="h-4" /> Cargando</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="min-w-0 space-y-10 lg:col-span-5">
              <Textos agenda={agenda} setAgenda={setAgenda} avisar={avisar} manejarError={manejarError} />
              <Imagen agenda={agenda} setAgenda={setAgenda} avisar={avisar} manejarError={manejarError} />
            </div>
            <div className="min-w-0 lg:col-span-7">
              <Fechas agenda={agenda} setAgenda={setAgenda} avisar={avisar} manejarError={manejarError} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function Bloque({ titulo, children }) {
  return (
    <section className="border-2 border-blanco/10 p-5 sm:p-7">
      <h2 className="text-2xl">{titulo}</h2>
      {children}
    </section>
  )
}

function Textos({ agenda, setAgenda, avisar, manejarError }) {
  const [titulo, setTitulo] = useState(agenda.titulo)
  const [subtitulo, setSubtitulo] = useState(agenda.subtitulo)
  const [guardando, setGuardando] = useState(false)
  const cambio = titulo !== agenda.titulo || subtitulo !== agenda.subtitulo

  const guardar = async (e) => {
    e.preventDefault()
    setGuardando(true)
    try {
      setAgenda(await api('/api/admin/agenda/textos', { metodo: 'PUT', datos: { titulo, subtitulo } }))
      avisar('ok', 'Textos guardados')
    } catch (err) {
      manejarError(err)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <Bloque titulo="Textos del afiche">
      <form onSubmit={guardar} className="mt-6 space-y-6">
        <label className="block">
          <span className="etiqueta text-neutral-400">Título (el año se agrega solo)</span>
          <input required maxLength={40} className="input mt-1" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </label>
        <label className="block">
          <span className="etiqueta text-neutral-400">Subtítulo</span>
          <input required maxLength={60} className="input mt-1" value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} />
        </label>
        <button type="submit" disabled={!cambio || guardando} className="btn btn-rojo disabled:opacity-40 disabled:pointer-events-none">
          <span>{guardando ? 'Guardando…' : 'Guardar textos'}</span>
        </button>
      </form>
    </Bloque>
  )
}

function Imagen({ agenda, setAgenda, avisar, manejarError }) {
  const entrada = useRef(null)
  const [subiendo, setSubiendo] = useState(false)

  const elegir = async (e) => {
    const archivo = e.target.files?.[0]
    e.target.value = ''
    if (!archivo) return
    setSubiendo(true)
    try {
      const { blob, nombre } = await redimensionarImagen(archivo)
      setAgenda(await api('/api/admin/agenda/imagen', { metodo: 'POST', archivo: { campo: 'imagen', blob, nombre } }))
      avisar('ok', 'Imagen actualizada')
    } catch (err) {
      manejarError(err)
    } finally {
      setSubiendo(false)
    }
  }

  return (
    <Bloque titulo="Imagen del afiche">
      <div className="mt-6 grid grid-cols-[7rem_1fr] sm:grid-cols-[9rem_1fr] items-center gap-5">
        <div className="relative aspect-[4/5] overflow-hidden bg-blanco/5">
          <img src={agenda.imagen} alt="Imagen actual de la agenda" className="h-full w-full object-cover object-top grayscale" />
          {subiendo && <span className="absolute inset-0 flex items-center justify-center bg-negro/70"><Ecualizador barras={4} className="h-5" /></span>}
        </div>
        <div>
          <p className="text-sm text-neutral-400">En la página se ve en blanco y negro. Mejor una foto vertical.</p>
          <input ref={entrada} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={elegir} />
          <button type="button" disabled={subiendo} onClick={() => entrada.current.click()} className="btn btn-borde mt-4 disabled:opacity-40">
            <span className="flex items-center gap-2"><ImageUp size={16} /> {subiendo ? 'Subiendo…' : 'Cambiar imagen'}</span>
          </button>
        </div>
      </div>
    </Bloque>
  )
}

function Fechas({ agenda, setAgenda, avisar, manejarError }) {
  const [nueva, setNueva] = useState({ fecha: '', municipio: '' })
  const [agregando, setAgregando] = useState(false)
  const [editando, setEditando] = useState(null) // { id, fecha, municipio }
  const hoy = hoyIso()
  const fechas = ordenar(agenda.fechas)
  const cambiarFechas = (fn) => setAgenda((a) => ({ ...a, fechas: ordenar(fn(a.fechas)) }))

  const agregar = async (e) => {
    e.preventDefault()
    setAgregando(true)
    try {
      const creada = await api('/api/admin/agenda/fechas', { metodo: 'POST', datos: nueva })
      cambiarFechas((l) => [...l, creada])
      setNueva({ fecha: '', municipio: '' })
      avisar('ok', `Fecha agregada: ${fechaLegible(creada.fecha)} · ${creada.municipio}`)
    } catch (err) {
      manejarError(err)
    } finally {
      setAgregando(false)
    }
  }

  const guardarEdicion = async (e) => {
    e.preventDefault()
    try {
      const { id, ...datos } = editando
      const actualizada = await api(`/api/admin/agenda/fechas/${id}`, { metodo: 'PUT', datos })
      cambiarFechas((l) => l.map((f) => (f.id === id ? actualizada : f)))
      setEditando(null)
      avisar('ok', 'Fecha actualizada')
    } catch (err) {
      manejarError(err)
    }
  }

  const borrar = async (f) => {
    if (!window.confirm(`¿Borrar ${fechaLegible(f.fecha)} · ${f.municipio}?`)) return
    try {
      await api(`/api/admin/agenda/fechas/${f.id}`, { metodo: 'DELETE' })
      cambiarFechas((l) => l.filter((x) => x.id !== f.id))
      avisar('ok', 'Fecha borrada')
    } catch (err) {
      manejarError(err)
    }
  }

  return (
    <Bloque titulo={`Fechas (${fechas.length})`}>
      <form onSubmit={agregar} className="mt-6 grid gap-5 sm:grid-cols-[11rem_1fr_auto] sm:items-end">
        <label className="block">
          <span className="etiqueta text-neutral-400">Fecha</span>
          <input type="date" required className="input mt-1 [color-scheme:dark]" value={nueva.fecha} onChange={(e) => setNueva({ ...nueva, fecha: e.target.value })} />
        </label>
        <label className="block">
          <span className="etiqueta text-neutral-400">Lugar</span>
          <input required maxLength={80} placeholder="Ej. Montería" className="input mt-1" value={nueva.municipio} onChange={(e) => setNueva({ ...nueva, municipio: e.target.value })} />
        </label>
        <button type="submit" disabled={agregando} className="btn btn-rojo disabled:opacity-40">
          <span className="flex items-center gap-2"><CalendarPlus size={16} /> {agregando ? 'Agregando…' : 'Agregar'}</span>
        </button>
      </form>

      <ul className="mt-8 border-t-2 border-blanco/10">
        {fechas.length === 0 && <li className="py-6 text-neutral-400">Todavía no hay fechas.</li>}
        {fechas.map((f) => editando?.id === f.id ? (
          <li key={f.id} className="border-b-2 border-blanco/10 bg-blanco/5 px-3 py-4">
            <form onSubmit={guardarEdicion} className="grid gap-4 sm:grid-cols-[11rem_1fr_auto] sm:items-end">
              <input type="date" required aria-label="Fecha" className="input [color-scheme:dark]" value={editando.fecha} onChange={(e) => setEditando({ ...editando, fecha: e.target.value })} />
              <input required maxLength={80} aria-label="Lugar" className="input" value={editando.municipio} onChange={(e) => setEditando({ ...editando, municipio: e.target.value })} />
              <div className="flex gap-2">
                <button type="submit" aria-label="Guardar" className="flex h-11 w-11 items-center justify-center bg-rojo hover:bg-blanco hover:text-rojo"><Check size={18} /></button>
                <button type="button" aria-label="Cancelar" onClick={() => setEditando(null)} className="flex h-11 w-11 items-center justify-center border-2 border-blanco/20 hover:border-blanco"><X size={18} /></button>
              </div>
            </form>
          </li>
        ) : (
          <li key={f.id} className={`flex items-center gap-4 border-b-2 border-blanco/10 px-1 py-3 ${f.fecha < hoy ? 'text-neutral-500' : ''}`}>
            <span className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-4">
              <span className="block text-xs font-semibold sm:w-40 sm:shrink-0 sm:text-sm">
                {fechaLegible(f.fecha)}{f.fecha < hoy && <span className="etiqueta ml-2 text-neutral-500">Pasada</span>}
              </span>
              <span className="block break-words font-display font-bold uppercase leading-tight">{f.municipio}</span>
            </span>
            <button type="button" aria-label={`Editar ${f.municipio}`} onClick={() => setEditando({ id: f.id, fecha: f.fecha, municipio: f.municipio })}
              className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-blanco/15 hover:border-blanco"><Pencil size={16} /></button>
            <button type="button" aria-label={`Borrar ${f.municipio}`} onClick={() => borrar(f)}
              className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-blanco/15 hover:border-rojo hover:bg-rojo"><Trash2 size={16} /></button>
          </li>
        ))}
      </ul>
    </Bloque>
  )
}
