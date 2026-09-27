import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import Layout from './components/layout/Layout'
import { InicioPage } from './modules/inicio'
import { MusicaPage } from './modules/musica'
import { VideosPage } from './modules/videos'
import { HistoriaPage } from './modules/historia'
import { AgendaPage } from './modules/agenda'
import { ContratacionesPage } from './modules/contrataciones'
import { NoEncontradaPage } from './modules/error'
import { AdminPage } from './modules/admin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Panel de la agenda (sin menú ni pie del sitio) */}
        <Route path="/jeyadmin" element={<AdminPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<InicioPage />} />
          <Route path="musica" element={<MusicaPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="historia" element={<HistoriaPage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="contrataciones" element={<ContratacionesPage />} />
          <Route path="*" element={<NoEncontradaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
