import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Cursor from './Cursor'
import BotonArriba from './BotonArriba'
import { useFocoTactil } from '../../hooks/useFocoTactil'

export default function Layout() {
  const { pathname } = useLocation()
  useFocoTactil()
  return (
    <div className="min-h-screen flex flex-col">
      <Cursor />
      <Navbar />
      <main key={pathname} className="flex-1 entrar">
        <Outlet />
      </main>
      <Footer />
      <BotonArriba />
    </div>
  )
}
