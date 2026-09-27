import { useEffect, useState } from 'react'
import { api } from '../../../utils/api'
import Ecualizador from '../../../components/ui/Ecualizador'
import LoginAdmin from '../components/LoginAdmin'
import PanelAgenda from '../components/PanelAgenda'

/** Panel /jeyadmin: solo para editar la agenda. No aparece en el menú ni en buscadores. */
export default function AdminPage() {
  const [sesion, setSesion] = useState(null) // null = revisando

  useEffect(() => {
    document.title = 'Panel | Jey Avila'
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.appendChild(robots)

    api('/api/admin/sesion')
      .then(setSesion)
      .catch(() => setSesion({ autenticado: false }))
    return () => robots.remove()
  }, [])

  if (!sesion) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3 etiqueta text-neutral-400">
        <Ecualizador barras={5} className="h-4" /> Cargando
      </div>
    )
  }

  return sesion.autenticado
    ? <PanelAgenda email={sesion.email} alSalir={() => setSesion({ autenticado: false })} />
    : <LoginAdmin alEntrar={setSesion} />
}
