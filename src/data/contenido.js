// Videos, logros, colaboraciones, agenda e imágenes del sitio de Jey Avila.
const IMG = '/img'
const VID = '/video'

export const IMAGENES = {
  retratoAzul: `${IMG}/retrato-azul.webp`,
  retratoMicrofono: `${IMG}/retrato-microfono.webp`,
  multitud: `${IMG}/multitud-luces.webp`,
  escenario: `${IMG}/escenario-carpa.webp`,
  guachy: `${IMG}/guachy-records.webp`,
  // Fotos de su Instagram
  destacada: `${IMG}/jey-destacada.webp`,
  retratoRojo: `${IMG}/retrato-rojo.webp`,
  retratoGafas: `${IMG}/retrato-gafas.webp`,
  tarimaChaqueta: `${IMG}/tarima-chaqueta.webp`,
  tarimaInfluencia: `${IMG}/tarima-influencia.webp`,
  tarimaBrazo: `${IMG}/tarima-brazo-arriba.webp`,
  estadioSincelejo: `${IMG}/estadio-sincelejo.webp`,
  conciertoLuces: `${IMG}/concierto-luces.webp`,
  publicoTarima: `${IMG}/publico-tarima.webp`,
  estudioGrabando: `${IMG}/estudio-grabando.webp`,
  estudioCabina: `${IMG}/estudio-cabina.webp`,
  premioPraise: `${IMG}/premio-praise.webp`,
  praiseArtistas: `${IMG}/praise-artistas.webp`,
  orando: `${IMG}/orando.webp`,
  publico: `${IMG}/publico.webp`,
  enVivo1: `${IMG}/en-vivo-gorra-1.webp`,
  enVivo2: `${IMG}/en-vivo-gorra-2.webp`,
}

// Videos de YouTube. VIDEOS[0] va de fondo en el hero de inicio.
export const VIDEOS = [
  { id: 'Q-tEGkASZXc', titulo: 'Vuelvo a Creer', tipo: 'Video oficial' },
  { id: 'rtDYOGKWxAY', titulo: 'Vivo Happy', tipo: 'Video oficial' },
  { id: 'tPqnMrdXk_s', titulo: 'Lo Mío Llegará', tipo: 'Video oficial' },
  { id: 'h553vZRsW7o', titulo: 'Cásate Conmigo', tipo: 'Audio oficial' },
]

// Canciones destacadas (sección de inicio)
export const DESTACADAS = [
  { id: 'rtDYOGKWxAY', titulo: 'Vivo Happy', tipo: 'Video oficial' },
  { id: 'tPqnMrdXk_s', titulo: 'Lo Mío Llegará', tipo: 'Video oficial' },
  { id: 'h553vZRsW7o', titulo: 'Cásate Conmigo', tipo: 'Audio oficial' },
]

// Últimos lanzamientos (el más reciente primero)
export const LANZAMIENTOS = [
  { id: '-THfCOxkVzc', titulo: 'Ya no Llores', anio: 2026 },
  { id: 'Ba6UZMWh748', titulo: 'Vitamina', anio: 2025 },
]

// Merengue urbano: una canción fuera de su género habitual
export const MERENGUE = {
  id: 'y94krB6w6wc',
  titulo: 'Llegó la Hora',
  genero: 'Merengue urbano',
  leyenda: 'Jey también se atrevió con otro ritmo: "Llegó la Hora" es su merengue urbano, con el mismo mensaje de fe que lleva en la champeta.',
}

// Presentación en televisión
export const EN_TV = {
  id: 'ifuul7gIl4E',
  titulo: 'Jey Avila en Telecaribe',
  detalle: 'Llevando su champeta a Telecaribe, el canal regional del Caribe colombiano.',
}

// Presentación en vivo en YouTube
export const EN_VIVO_YOUTUBE = { id: 'NnX0DkbeUCU', titulo: 'Lo Mío Llegará · En vivo' }

// Clips cortos de conciertos (videos propios, sin sonido, en public/video). Sin título se muestra "En vivo"
export const CLIPS = [
  { video: `${VID}/en-vivo-1.mp4`, poster: `${VID}/en-vivo-1.jpg`, titulo: '' },
  { video: `${VID}/en-vivo-2.mp4`, poster: `${VID}/en-vivo-2.jpg`, titulo: 'Campamento Resplandece' },
  { video: `${VID}/en-vivo-3.mp4`, poster: `${VID}/en-vivo-3.jpg`, titulo: '' },
]

// Jey de cerca (videos propios con sonido, en public/video)
export const DE_CERCA = [
  { video: `${VID}/vallenato-a-capela.mp4`, poster: `${VID}/vallenato-a-capela.jpg`, titulo: 'Vallenato a capela', detalle: 'Sin pista, solo su voz' },
  { video: `${VID}/asi-escribi-lo-mio-llegara.mp4`, poster: `${VID}/asi-escribi-lo-mio-llegara.jpg`, titulo: 'Así escribí "Lo Mío Llegará"', detalle: 'Cómo nació la canción' },
]

// Servicio de composición: Jey escribe canciones por encargo
export const COMPOSICION = {
  generos: ['Cristiana', 'Vallenato', 'Merengue', 'Afrobeat', 'Reguetón', 'Champeta'],
  pasos: [
    { titulo: 'Cuéntame tu historia', texto: 'Qué quieres decir, para quién es y en qué ritmo la imaginas.' },
    { titulo: 'Escribo la canción', texto: 'Letra y melodía pensadas para tu mensaje.' },
    { titulo: 'Te la entrego', texto: 'Lista para que la grabes o la cantes.' },
  ],
}

// Casa productora con la que graba
export const PRODUCTOR = {
  nombre: 'Guachy Records',
  logo: `${IMG}/guachy-records.webp`,
  lema: 'Transformamos ideas en éxitos',
  servicios: [
    { titulo: 'Producción musical', detalle: 'Completa' },
    { titulo: 'Jingles', detalle: 'Pegadizos' },
    { titulo: 'Mezcla', detalle: 'Profesional' },
    { titulo: 'Masterización', detalle: 'Para plataformas' },
  ],
  cierre: '¡Eleva tu sonido al estándar de la industria!',
  // [pendiente] WhatsApp o red de Guachy Records; si está vacío no se muestra el botón "Contáctanos hoy"
  contacto: '',
}

export const LOGROS = [
  { cifra: '2022', titulo: 'Canción Champeta del Año', detalle: 'Praise Music Awards · Bogotá' },
  { cifra: '41', titulo: 'Países', detalle: '"Hijo de mi vida" se escucha en 41 países' },
  { cifra: '1er', titulo: 'Primer lugar entre los participantes', detalle: 'Premios Ágape · 2018' },
  { cifra: '1er', titulo: 'Primer lugar entre los participantes', detalle: 'Concurso Alcaldía de Lorica · 2017' },
]

// Colaboraciones con otros artistas (agregar aquí las nuevas)
export const COLABORACIONES = [
  { artista: 'Full Fuego', cancion: 'El Guerrero', spotify: '1sXtHXKQyAchSCCT1K1N9Q' },
]

