import { useRoutes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';
import routes from './Routes';
import { Suspense } from 'react';
import Loading from './components/Loading';

function App() {


  let element = useRoutes(routes);

  return (
    <>
      
        {/* <NavBar /> */}
        <Suspense fallback={ <Loading/> } >
          {element}
        </Suspense>
        <Toaster
          position='bottom-top-center'
          reverseOrder={false}
        />
    </>
  )
}

export default App
