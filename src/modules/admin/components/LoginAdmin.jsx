import { useState } from 'react'
import { LogIn } from 'lucide-react'
import { api } from '../../../utils/api'
import Ecualizador from '../../../components/ui/Ecualizador'

/** Inicio de sesión con el correo y la contraseña entregados (no hay registro). */
export default function LoginAdmin({ alEntrar }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const entrar = async (e) => {
    e.preventDefault()
    setError('')
    setEnviando(true)
    try {
      alEntrar(await api('/api/admin/login', { metodo: 'POST', datos: { email, password } }))
    } catch (err) {
      setError(err.message)
      setEnviando(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <p className="flex items-center gap-3 font-display text-2xl font-black">
          Jey <span className="text-rojo">Avila</span> <Ecualizador barras={5} className="h-5" grosor="w-[3px]" />
        </p>
        <h1 className="mt-8 text-4xl sm:text-5xl">Panel de la agenda</h1>
        <p className="mt-3 text-neutral-400">Entra con el correo y la contraseña que te entregaron.</p>

        <form onSubmit={entrar} className="mt-10 space-y-8">
          <label className="block">
            <span className="etiqueta text-neutral-400">Correo</span>
            <input type="email" required autoComplete="username" className="input mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block">
            <span className="etiqueta text-neutral-400">Contraseña</span>
            <input type="password" required autoComplete="current-password" className="input mt-1" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <p role="alert" className="border-l-4 border-rojo bg-rojo/10 px-4 py-3 text-sm">{error}</p>}
          <button type="submit" disabled={enviando} className="btn btn-rojo w-full disabled:opacity-60">
            <span className="flex items-center justify-center gap-3"><LogIn size={16} /> {enviando ? 'Entrando…' : 'Entrar'}</span>
          </button>
        </form>
      </div>
    </main>
  )
}
