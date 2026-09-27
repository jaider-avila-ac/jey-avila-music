// ─────────────────────────────────────────────────────────────────────────────
// Datos del artista. Proyecto independiente, pensado para publicarse en su propio
// subdominio. Desarrollado por Jaider Avila Studio.
// ─────────────────────────────────────────────────────────────────────────────

export const ARTISTA = {
  nombre: 'Jey Avila',
  nombreCompleto: 'Jesús Daniel Avila Sierra',
  genero: 'Champeta',
  // Lo que hace: canta, escribe sus canciones y decide cómo se producen
  roles: ['Cantante', 'Compositor', 'Director artístico'],
  origen: 'Córdoba, Colombia',
  // Redes: una red con valor vacío no se muestra
  redes: {
    youtube: 'https://www.youtube.com/@Jey%C3%81vilamusic',
    spotify: 'https://open.spotify.com/artist/5E2BC9ixsSVmoP2rkXO0L5',
    instagram: 'https://www.instagram.com/jey_avilamusic',
    facebook: 'https://www.facebook.com/share/15szJJq4Ck/',
    tiktok: 'https://www.tiktok.com/@jeyavilamusic1',
  },
  // Contrataciones: si ambos están vacíos, la página de contrataciones no muestra formulario
  contacto: {
    whatsapp: '573025680189', // solo dígitos con indicativo
    email: '', // [pendiente]
  },
}

export const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/musica', label: 'Música' },
  { to: '/videos', label: 'Videos' },
  { to: '/historia', label: 'Historia' },
  { to: '/agenda', label: 'Agenda' },
  { to: '/contrataciones', label: 'Contrataciones' },
]

// Crédito del desarrollador (footer)
export const CREDITO = { nombre: 'Jaider Avila Studio', enlace: 'https://jaideravilastd.com' }

export const BIOGRAFIA = [
  'Jesús Daniel Avila Sierra, conocido en la música como Jey Avila, nació el 20 de diciembre de 1999 en Córdoba, Colombia. Creció en un hogar de fe y de música: sus padres, Giovannis de Jesús Avila Feria y Rosa Elena Sierra Ramos, sintieron desde el principio que su hijo venía con un gran propósito.',
  'A los 5 años empezó a aprender a tocar instrumentos y a los 14 escribió sus primeras canciones. En noviembre de 2014 grabó "Navidad", su primer tema, y lanzó el álbum "Llegaste a mí".',
  'Desde entonces lleva un mensaje de esperanza a través de la champeta cristiana, un ritmo que hoy hace sonar en tarimas, campamentos y eventos juveniles.',
  'Jey no solo canta: escribe sus propias canciones y dirige cómo se hacen, desde la letra y la melodía hasta el ritmo y el sonido final de cada tema.',
]

export const INSTRUMENTOS = ['Caja', 'Guacharaca', 'Acordeón', 'Piano', 'Batería', 'Congas', 'Timbales', 'Bajo']

export const SUENO =
  'Ver a toda una juventud llena de propósito, y que los jóvenes golpeados por el dolor, la traición, la ansiedad o la depresión encuentren esperanza y paz verdadera.'

export const LINEA_TIEMPO = [
  { anio: '1999', titulo: 'Nace en Córdoba', texto: 'El 20 de diciembre, en un hogar de fe y amante de la música.' },
  { anio: '2004', titulo: 'Primeros instrumentos', texto: 'Con 5 años empieza a tocar caja, guacharaca, acordeón, piano, batería y más.' },
  { anio: '2014', titulo: 'Su primera canción', texto: 'Graba "Navidad" y lanza el álbum "Llegaste a mí".' },
  { anio: '2017', titulo: 'Primer lugar en Lorica', texto: 'Gana el primer lugar entre los participantes del concurso de la Alcaldía de Lorica, Córdoba.' },
  { anio: '2018', titulo: 'Premios Ágape', texto: 'Primer lugar entre los participantes.' },
  { anio: '2022', titulo: 'Praise Music Awards', texto: 'Canción Champeta del Año, en Bogotá.' },
  { anio: 'Hoy', titulo: 'Nuevas canciones', texto: 'Sigue creando música que exalta el nombre de Jesucristo, junto a su esposa Jenny y su bebé.' },
]

// Condiciones para contratar una presentación (del documento del artista)
export const REQUISITOS = [
  { titulo: 'Buen sonido', texto: 'Equipo de sonido adecuado para el evento.' },
  { titulo: 'Hidratación', texto: 'Agua e hidratación para el artista y su equipo.' },
  { titulo: 'Hospedaje', texto: 'Alojamiento cuando el evento lo requiera.' },
  { titulo: 'Presupuesto acordado', texto: 'Cumplir el valor pactado al momento de la contratación.' },
]
