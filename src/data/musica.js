// Música de Jey Avila. Las canciones son su top de Spotify (ids reales de Spotify).

export const SPOTIFY_ARTISTA = '5E2BC9ixsSVmoP2rkXO0L5'
export const enlaceSpotify = (id) => `https://open.spotify.com/track/${id}`

// duracion en segundos
export const CANCIONES = [
  { titulo: 'Hijo de Mi Vida', spotify: '1j2Jzvn4mZojPgwhJYo0ZE', duracion: 225 },
  { titulo: 'Vuelvo a Creer', spotify: '7Aio0QFkquAKIZZGnlY1GA', duracion: 219, youtube: 'Q-tEGkASZXc' },
  { titulo: 'Lo Mío Llegará', spotify: '5jUWyx8Fkf1n9XjFEnKGDl', duracion: 209, youtube: 'tPqnMrdXk_s' },
  { titulo: 'Arrepentido', spotify: '57W7rEbTRH1EdMd7ZpKU5H', duracion: 212 },
  { titulo: 'No Ando Solo', spotify: '6E9OYZDZL6UBLc4I4mkSH8', duracion: 210 },
  { titulo: 'Espera', spotify: '359pto3PpebBfWrUn8YRkN', duracion: 242 },
  { titulo: 'Vitamina', spotify: '6yB7PkIYr6bgyDL7QV1lsU', duracion: 192 },
  { titulo: 'La Fama', spotify: '4ve6U4CJyrZj3oWbhOYilx', duracion: 250 },
  { titulo: 'Jehová Me Sostiene', spotify: '4zipdVmPknWdTLA1nCzcyC', duracion: 189 },
  { titulo: 'El Guerrero', spotify: '1sXtHXKQyAchSCCT1K1N9Q', duracion: 192, con: 'Full Fuego' },
]

export const formatoDuracion = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

// Historia detrás de una canción (contada por el artista)
export const DETRAS_DE_LA_CANCION = {
  titulo: 'Tu Misericordia',
  relato: 'Esta canción marcó mucho mi vida. Cuando la escribí estaba pasando por un proceso difícil que me enseñó que, si nos soltamos de la mano de Dios, nada podemos hacer.',
  versiculo: 'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.',
  cita: 'Lamentaciones 3:22-23',
}
