import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Send, Volume2, GlassWater, BedDouble, HandCoins } from 'lucide-react'
import { usePageMeta } from '../../../utils/seo'
import { ARTISTA, REQUISITOS } from '../../../data/artista'
import { IMAGENES, COMPOSICION } from '../../../data/contenido'
import Encabezado from '../../../components/ui/Encabezado'
import TituloSeccion from '../../../components/ui/TituloSeccion'
import Revelar from '../../../components/ui/Revelar'
import Composicion from '../../../components/ui/Composicion'

const ICONOS = [Volume2, GlassWater, BedDouble, HandCoins]
const INICIAL = { tipo: 'presentacion', genero: '', nombre: '', organizacion: '', ciudad: '', fecha: '', mensaje: '' }
const TIPOS = [
  { valor: 'presentacion', label: 'Presentación en vivo' },
  { valor: 'composicion', label: 'Composición de una canción' },
]

export default function ContratacionesPage() {
  usePageMeta('Contrataciones', 'Lleva a Jey Avila a tu evento o pídele que componga tu canción.')
  const { whatsapp, email } = ARTISTA.contacto
  const hayContacto = Boolean(whatsapp || email)
  const [form, setForm] = useState(INICIAL)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const composicion = form.tipo === 'composicion'

  // Los enlaces de la sección de composición llegan con ?tipo=composicion&genero=...
  const [params] = useSearchParams()
  useEffect(() => {
    if (params.get('tipo') !== 'composicion') return
    const genero = params.get('genero') || ''
    setForm((f) => ({ ...f, tipo: 'composicion', genero: COMPOSICION.generos.includes(genero) ? genero : f.genero }))
    document.getElementById('solicitud')?.scrollIntoView({ behavior: 'smooth' })
  }, [params])

  // El sitio no tiene backend: el formulario arma un mensaje de WhatsApp (o un correo)
  const enviar = (e) => {
    e.preventDefault()
    const texto = [
      composicion ? `Hola, quiero que ${ARTISTA.nombre} componga una canción para mí.` : `Hola, quiero contratar a ${ARTISTA.nombre}.`,
      `Nombre: ${form.nombre}`,
      composicion && form.genero && `Género: ${form.genero}`,
      form.organizacion && `Organización o empresa: ${form.organizacion}`,
      `Ciudad: ${form.ciudad}`,
      !composicion && form.fecha && `Fecha del evento: ${form.fecha.split('-').reverse().join('/')}`,
      form.mensaje && `${composicion ? 'Sobre la canción' : 'Detalles'}: ${form.mensaje}`,
    ].filter(Boolean).join('\n')
    if (whatsapp) window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener')
    else window.location.href = `mailto:${email}?subject=${encodeURIComponent(`${composicion ? 'Composición' : 'Contratación'} ${ARTISTA.nombre}`)}&body=${encodeURIComponent(texto)}`
  }

  return (
    <>
      <Encabezado etiqueta="Ministerio musical" titulo="Contrataciones" bajada="Lleva a Jey Avila a tu concierto, festival, campamento o celebración." imagen={IMAGENES.estadioSincelejo} />

      {/* Condiciones */}
      <section className="py-20 sm:py-28">
        <div className="contenedor">
          <TituloSeccion etiqueta="Antes de contratar" titulo="Lo que necesitamos" texto="Para que la presentación salga bien, quien contrata se compromete a:" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REQUISITOS.map((r, i) => {
              const Icono = ICONOS[i]
              return (
                <Revelar key={r.titulo} retraso={i * 100} className="group relative overflow-hidden border-2 border-blanco/15 p-7 min-h-[220px] hover:border-rojo activo:border-rojo transition-colors duration-500">
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-rojo transition-transform duration-500 group-hover:scale-y-100 group-activo:scale-y-100" />
                  <div className="relative">
                    <Icono size={30} strokeWidth={1.5} className="text-rojo transition-colors duration-500 group-hover:text-blanco group-activo:text-blanco" />
                    <h3 className="mt-10 text-2xl">{r.titulo}</h3>
                    <p className="mt-2 text-neutral-400 group-hover:text-blanco/85 group-activo:text-blanco/85 transition-colors duration-500">{r.texto}</p>
                  </div>
                </Revelar>
              )
            })}
          </div>
        </div>
      </section>

      <Composicion />

      {/* Solicitud */}
      <section id="solicitud" className="scroll-mt-20 bg-blanco text-negro py-24 sm:py-32">
        <div className="contenedor grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <TituloSeccion claro={false} etiqueta="Solicitud" titulo={composicion ? 'Cuéntanos de tu canción' : 'Cuéntanos de tu evento'} />
            <p className="mt-6 text-neutral-600 leading-relaxed">
              {composicion ? 'Te responderemos para hablar de tu idea, el género y los tiempos de entrega.' : 'Te responderemos para coordinar fecha, lugar y condiciones.'}
            </p>
            <div className="duotono mt-10 aspect-[4/3] hidden lg:block">
              <img src={IMAGENES.tarimaInfluencia} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            {hayContacto ? (
              <form onSubmit={enviar} className="grid sm:grid-cols-2 gap-x-8 gap-y-8 [&_.input]:border-negro/20 [&_.input]:text-negro">
                <fieldset className="sm:col-span-2">
                  <legend className="etiqueta text-neutral-500">¿Qué necesitas? *</legend>
                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
                    {TIPOS.map((t) => (
                      <label key={t.valor} className={`cursor-pointer border-2 px-4 py-3 font-display text-sm font-bold transition-colors ${form.tipo === t.valor ? 'border-rojo bg-rojo text-blanco' : 'border-negro/15 hover:border-negro activo:border-negro'}`}>
                        <input type="radio" name="tipo" value={t.valor} checked={form.tipo === t.valor} onChange={set('tipo')} className="sr-only" />
                        {t.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {composicion && (
                  <label className="block sm:col-span-2"><span className="etiqueta text-neutral-500">Género</span>
                    <select className="input mt-1 bg-transparent" value={form.genero} onChange={set('genero')}>
                      <option value="">Aún no lo sé</option>
                      {COMPOSICION.generos.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </label>
                )}
                <label className="block"><span className="etiqueta text-neutral-500">Tu nombre *</span><input required className="input mt-1" value={form.nombre} onChange={set('nombre')} /></label>
                <label className="block"><span className="etiqueta text-neutral-500">Organización o empresa</span><input className="input mt-1" value={form.organizacion} onChange={set('organizacion')} /></label>
                <label className="block"><span className="etiqueta text-neutral-500">Ciudad *</span><input required className="input mt-1" value={form.ciudad} onChange={set('ciudad')} /></label>
                {!composicion && <label className="block"><span className="etiqueta text-neutral-500">Fecha del evento</span><input type="date" className="input mt-1" value={form.fecha} onChange={set('fecha')} /></label>}
                <label className="block sm:col-span-2"><span className="etiqueta text-neutral-500">{composicion ? 'Cuéntanos qué quieres decir con tu canción' : 'Detalles del evento'}</span><textarea rows={4} className="input mt-1 resize-y" value={form.mensaje} onChange={set('mensaje')} /></label>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn btn-rojo"><span className="flex items-center gap-3"><Send size={16} /> Enviar solicitud</span></button>
                </div>
              </form>
            ) : (
              // Mientras no haya WhatsApp ni correo configurados en data/artista.js
              <div className="border-2 border-negro p-8 sm:p-10">
                <p className="font-display text-3xl font-extrabold">Escríbenos por sus redes</p>
                <p className="mt-4 text-neutral-600">Mientras habilitamos el canal directo de contrataciones, puedes contactar al ministerio desde sus redes oficiales.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {Object.entries(ARTISTA.redes).filter(([, u]) => u).map(([red, url]) => (
                    <a key={red} href={url} target="_blank" rel="noopener noreferrer" className="btn btn-negro capitalize"><span>{red}</span></a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
