import { SPOTIFY_ARTISTA } from '../../data/musica'
import { useVisible } from '../../hooks/useVisible'

/** Reproductor oficial de Spotify con el top del artista. Solo se carga al acercarse a la
 *  pantalla, para no frenar la carga inicial. */
export default function ReproductorSpotify({ alto = 452 }) {
  const [ref, visible] = useVisible({ umbral: 0 })
  return (
    <div ref={ref} className="relative bg-[#121212] border-2 border-rojo" style={{ height: alto }}>
      {visible && (
        <iframe
          title="Jey Avila en Spotify"
          src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTISTA}?utm_source=generator&theme=0`}
          width="100%"
          height={alto - 4}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="block border-0"
        />
      )}
    </div>
  )
}
