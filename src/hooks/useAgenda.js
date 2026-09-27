import { useEffect, useState } from 'react'
import { api } from '../utils/api'

/** Agenda pública (título, subtítulo, imagen y fechas) que se edita desde /jeyadmin.
 *  Devuelve { estado: 'cargando' | 'listo' | 'error', agenda }. */
export function useAgenda() {
  const [resultado, setResultado] = useState({ estado: 'cargando', agenda: null })

  useEffect(() => {
    let activo = true
    api('/api/agenda')
      .then((agenda) => activo && setResultado({ estado: 'listo', agenda }))
      .catch(() => activo && setResultado({ estado: 'error', agenda: null }))
    return () => { activo = false }
  }, [])

  return resultado
}
