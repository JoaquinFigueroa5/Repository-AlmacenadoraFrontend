// En Movimientos.jsx
import React, { useState, useContext } from 'react';
import { Box } from '@chakra-ui/react';
import Mtable from '../components/Mtable';
import { Entry } from '../components/Movimientos/Entry';
import { Out } from '../components/Movimientos/Out';
import { UserContext } from '../context/UserContext';

export const Movimientos = () => {
  const [isEntry, setIsEntry] = useState(true); // Inicializa en true para mostrar la tabla primero
  const { user } = useContext(UserContext);

  const handleEntryPageToggle = () => {
    setIsEntry((prev) => !prev);
  };

  return (
    <Box bg="brand.fondo" minH="100vh" w="100%">
      {user ? (
        isEntry ? (
          <Mtable switchEntryHandler={handleEntryPageToggle} />
        ) : (
          <Entry switchEntryHandler={handleEntryPageToggle} />
        )
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </Box>
  );
};