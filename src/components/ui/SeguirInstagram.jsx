import { Instagram } from 'lucide-react'
import { ARTISTA } from '../../data/artista'
import { IMAGENES } from '../../data/contenido'
import TituloSeccion from './TituloSeccion'
import Revelar from './Revelar'

// Usuario sacado del enlace (instagram.com/jey_avilamusic → @jey_avilamusic)
const usuario = (url) => `@${url.replace(/\/+$/, '').split('/').pop()}`

// Fotos de su Instagram en tres carriles, como una carretera: el del medio baja y los de los lados
// suben, cada uno a su velocidad. Cada carril repite sus fotos dos veces para que el bucle no
// tenga cortes.
const FOTOS = [
  IMAGENES.destacada, IMAGENES.retratoRojo, IMAGENES.tarimaInfluencia, IMAGENES.estadioSincelejo, IMAGENES.retratoGafas,
  IMAGENES.estudioGrabando, IMAGENES.tarimaChaqueta, IMAGENES.premioPraise, IMAGENES.conciertoLuces, IMAGENES.tarimaBrazo,
  IMAGENES.praiseArtistas, IMAGENES.estudioCabina, IMAGENES.publicoTarima, IMAGENES.orando,
]
// 7 fotos por carril, cada carril empezando en otra foto
const rotar = (n) => [...FOTOS.slice(n), ...FOTOS.slice(0, n)].slice(0, 7)
const CARRILES = [
  { fotos: rotar(0), sentido: 'carril-sube', duracion: '46s' },
  { fotos: rotar(7), sentido: 'carril-baja', duracion: '38s' },
  { fotos: rotar(3), sentido: 'carril-sube', duracion: '52s' },
]

/** Sección destacada para seguir a Jey en Instagram. */
export default function SeguirInstagram() {
  const url = ARTISTA.redes.instagram
  if (!url) return null
  const enlace = { href: url, target: '_blank', rel: 'noopener noreferrer' }

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="contenedor grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <Revelar className="lg:col-span-5">
          <TituloSeccion etiqueta="Redes" titulo="Síguelo en Instagram" />
          <a {...enlace} className="mt-8 block break-all font-display text-2xl sm:text-4xl font-black transition-colors hover:text-rojo activo:text-rojo">
            {usuario(url)}
          </a>
          <p className="mt-5 text-lg leading-relaxed text-neutral-400">
            Su día a día, sus lanzamientos y sus próximas presentaciones.
          </p>
          <a {...enlace} className="btn btn-rojo mt-10">
            <span className="flex items-center gap-3"><Instagram size={18} /> Seguir en Instagram</span>
          </a>
        </Revelar>

        {/* Carretera de fotos; los bordes superior e inferior se desvanecen */}
        <Revelar retraso={150} className="lg:col-span-7">
          <div className="grid grid-cols-3 gap-3 h-[440px] sm:h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
            {CARRILES.map((carril, c) => (
              <div key={c} className={`${carril.sentido} flex flex-col`} style={{ '--duracion': carril.duracion }}>
                {[...carril.fotos, ...carril.fotos].map((foto, i) => (
                  <a key={i} {...enlace} aria-label={`Ver ${usuario(url)} en Instagram`} tabIndex={i < carril.fotos.length ? 0 : -1}
                    className="group relative block aspect-[4/5] shrink-0 mb-3">
                    <span className="duotono absolute inset-0 block">
                      <img src={foto} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </span>
                    <span className="absolute inset-0 z-10 flex items-center justify-center bg-negro/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <Instagram size={30} />
                    </span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </Revelar>
      </div>
    </section>
  )
}
