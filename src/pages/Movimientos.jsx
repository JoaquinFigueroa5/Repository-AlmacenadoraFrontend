import React, { useState, useContext } from 'react';
import { Box } from '@chakra-ui/react';
import Mtable from '../components/Mtable';
import { Entry } from '../components/Movimientos/Entry';
import { Out } from '../components/Movimientos/Out'; // Asegúrate de importar esto

import { UserContext } from '../context/UserContext';

export const Movimientos = () => {
  const [view, setView] = useState("table"); // ← puede ser 'table', 'entry', o 'out'
  const { user } = useContext(UserContext);

  return (
    <Box bg="brand.fondo" minH="100vh" w="100%">
      {user ? (
        view === "table" ? (
          <Mtable
            switchEntryHandler={() => setView("entry")}
            switchOutHandler={() => setView("out")}
          />
        ) : view === "entry" ? (
          <Entry switchEntryHandler={() => setView("table")} />
        ) : (
          <Out switchOutHandler={() => setView("table")} />
        )
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </Box>
  );
};
