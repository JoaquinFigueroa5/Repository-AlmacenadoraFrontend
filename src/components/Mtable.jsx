import { Box, Button } from '@chakra-ui/react'
import NavBar from '../components/NavBar';
import MovimientosTableComponent from '../components/Movimientos/Registros'

const Mtable = ({ switchEntryHandler }) => {
  return (
    <Box bg="brand.fondo" minH="100vh" w="100%">
      <NavBar />
      <Button variant="solid" onClick={switchEntryHandler}>Entrada</Button>
      {/* <Button variant="solid">Salida</Button> {/* Puedes agregar un botón para "Salida" si lo necesitas */}
      <MovimientosTableComponent />
    </Box>
  )
}

export default Mtable