import React from 'react';
import { Box } from '@chakra-ui/react';
import ProductList from './ProductList';

const Sidebar = () => {
  return (
    <>
    <Box
      position="fixed"
      top="0"
      left="0"
      w="220px"
      h="100vh"
      bg="brand.primario"
      p={3}
      overflowY="auto"
      zIndex={10} // Asegúrate de que este valor sea menor que el del Navbar
    >
      <ProductList />
    </Box>
    </>
    );
};

export default Sidebar;


