import React, { useEffect, useState, useCallback } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Box, Heading, Button } from '@chakra-ui/react';
import { useMovimientos } from '../../shared/hooks';
import dayjs from 'dayjs';

const MovimientosTableComponent = ({switchEntryHandler}) => {
  

  const { movimientos, getMovimientos, isFetching, error } = useMovimientos(); // Incluimos 'error' del hook
  const [tableData, setTableData] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  console.log("Estado de movimientos en el componente (inicial):", movimientos);

  // Llamamos a getMovimientos cuando el componente se monta, solo una vez
  useEffect(() => {
    if (!hasFetched) {
      getMovimientos();
      setHasFetched(true);
    }
    console.log("Estado de movimientos en el componente (después de getMovimientos):", movimientos);
  }, [getMovimientos, hasFetched, movimientos]);

  // Transformamos los movimientos cuando llegan a nuestro componente
  useEffect(() => {
    if (movimientos?.movements && Array.isArray(movimientos.movements)) {
      const formattedData = movimientos.movements.map((movimiento) => ({
        producto: movimiento.product === "Data not found" ? "Producto no disponible" : movimiento.product,
        cantidad: movimiento.quantity,
        empleado: movimiento.employee === "Data not found" ? "Empleado no disponible" : movimiento.employee,
        fecha: dayjs(movimiento.date).format('DD/MM/YYYY HH:mm:ss'),
        razon: movimiento.reason || "N/A",
      }));
      setTableData(formattedData);
      console.log("Estado de tableData (formateado):", formattedData); // Nuevo console.log
    } else {
      console.log("movimientos o movimientos.movements no es un array:", movimientos);
    }
  }, [movimientos]);

  // Si estamos en el proceso de carga, mostramos un mensaje
  if (isFetching) {
    return <div>Cargando movimientos...</div>;
  }

  // Si hay un error, mostramos un mensaje
  if (error) {
    return <div>Error al cargar los movimientos: {error.message}</div>;
  }

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>Movimientos de Productos</Heading>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Movimientos registrados en el sistema</TableCaption>
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th>Cantidad</Th>
            <Th>Empleado</Th>
            <Th>Fecha</Th>
            <Th>Razón</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((movimiento, index) => (
            <Tr key={index}>
              <Td>{movimiento.producto}</Td>
              <Td>{movimiento.cantidad}</Td>
              <Td>{movimiento.empleado}</Td>
              <Td>{movimiento.fecha}</Td>
              <Td>{movimiento.razon}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MovimientosTableComponent;


