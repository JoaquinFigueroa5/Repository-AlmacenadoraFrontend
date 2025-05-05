import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Box, Heading, Button, useColorModeValue } from '@chakra-ui/react';
import { useMovimientos } from '../../shared/hooks';
import dayjs from 'dayjs';

const MovimientosTableComponent = () => {


  const { movimientos, getMovimientos, } = useMovimientos();
  const [tableData, setTableData] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const entradaBg = useColorModeValue('green.300', 'green.500');
  const salidaBg = useColorModeValue('red.300', 'red.500');
  const entradaHover = useColorModeValue('green.400', 'green.400');
  const salidaHover = useColorModeValue('red.400', 'red.400');



  useEffect(() => {
    if (!hasFetched) {
      getMovimientos();
      setHasFetched(true);
    }
  }, [getMovimientos, hasFetched, movimientos]);

  useEffect(() => {
    if (movimientos?.movements && Array.isArray(movimientos.movements)) {

      const formattedData = movimientos.movements.map((movimiento) => {
        const razon = movimiento.reason || "N/A";
        const destino = movimiento.destiny || "N/A";
        const tipo = razon === "N/A" && destino === "N/A" ? "Entrada" : "Salida";

        return {
          producto:
            movimiento.product === "Data not found"
              ? "Producto no disponible"
              : movimiento.product?.name || "Producto sin nombre",
          cantidad: movimiento.quantity,
          empleado:
            movimiento.employee === "Data not found"
              ? "Empleado no disponible"
              : movimiento.employee?.name || "Empleado sin nombre",
          fecha: dayjs(movimiento.date).format('DD/MM/YYYY HH:mm:ss'),
          razon,
          destino,
          tipo
        };
      });

      setTableData(formattedData);
    }
  }, [movimientos]);

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>Movimientos de Productos</Heading>

      <Table colorScheme="teal">
        <TableCaption>Movimientos registrados en el sistema</TableCaption>
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th>Cantidad</Th>
            <Th>Empleado</Th>
            <Th>Fecha</Th>
            <Th>Razón</Th>
            <Th>Destino</Th>
            <Th>Tipo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((movimiento, index) => (
            <Tr
              key={index}
              bg={movimiento.tipo === 'Entrada' ? entradaBg : salidaBg}
              _hover={{ bg: movimiento.tipo === 'Entrada' ? entradaHover : salidaHover }}
            >
              <Td>{movimiento.producto}</Td>
              <Td>{movimiento.cantidad}</Td>
              <Td>{movimiento.empleado}</Td>
              <Td>{movimiento.fecha}</Td>
              <Td>{movimiento.razon}</Td>
              <Td>{movimiento.destino}</Td>
              <Td>{movimiento.tipo}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MovimientosTableComponent;


