import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Toaster 
        position='bottom-right'
        reverseOrder={false}
      />
    </>
  )
}

export default App
