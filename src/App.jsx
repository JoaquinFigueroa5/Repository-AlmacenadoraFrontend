import { useRoutes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';
import routes from './Routes';
import theme from './resources/index'

function App() {

  let element = useRoutes(routes);

  return (
    <>
      <ChakraProvider theme={theme}>
        {/* <NavBar /> */}
        {element}
        <Toaster
          position='bottom-right'
          reverseOrder={false}
        />
      </ChakraProvider>
    </>
  )
}

export default App
