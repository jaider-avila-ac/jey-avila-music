import { Link } from 'react-router-dom'
import TituloSeccion from '../../../components/ui/TituloSeccion'
import ListaCanciones from '../../../components/ui/ListaCanciones'
import ReproductorSpotify from '../../../components/ui/ReproductorSpotify'
import Revelar from '../../../components/ui/Revelar'

export default function TopCanciones() {
  return (
    <section className="py-24 sm:py-32">
      <div className="contenedor">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <TituloSeccion etiqueta="Lo más escuchado" titulo="Canciones" />
          <Link to="/musica" className="btn btn-borde self-start lg:self-auto"><span>Ver toda la música</span></Link>
        </div>
        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <Revelar className="lg:col-span-7"><ListaCanciones limite={6} /></Revelar>
          <Revelar retraso={150} className="lg:col-span-5"><ReproductorSpotify alto={452} /></Revelar>
        </div>
      </div>
    </section>
  )
}
