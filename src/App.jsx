import { useRoutes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';
import routes from './Routes';

function App() {

  let element = useRoutes(routes);

  return (
    <>
      <ChakraProvider>
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
