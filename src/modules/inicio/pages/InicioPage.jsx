import { usePageMeta } from '../../../utils/seo'
import Logros from '../../../components/ui/Logros'
import EnVivo from '../../../components/ui/EnVivo'
import CtaContratar from '../../../components/ui/CtaContratar'
import Lanzamientos from '../../../components/ui/Lanzamientos'
import Merengue from '../../../components/ui/Merengue'
import EnTelevision from '../../../components/ui/EnTelevision'
import Composicion from '../../../components/ui/Composicion'
import Productor from '../../../components/ui/Productor'
import SeguirInstagram from '../../../components/ui/SeguirInstagram'
import HeroInicio from '../components/HeroInicio'
import CancionesDestacadas from '../components/CancionesDestacadas'
import TopCanciones from '../components/TopCanciones'

export default function InicioPage() {
  usePageMeta()
  return (
    <>
      <HeroInicio />
      <Lanzamientos />
      <CancionesDestacadas />
      <TopCanciones />
      <Logros />
      <Composicion />
      <Merengue />
      <EnTelevision />
      <Productor />
      <EnVivo />
      <SeguirInstagram />
      <CtaContratar />
    </>
  )
}
