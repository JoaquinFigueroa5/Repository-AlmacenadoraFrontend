import React, { useEffect, useState } from "react";
import {
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useProducts } from "../shared/hooks";

const ProductList = () => {
  const { products, isFetching, getProducts } = useProducts();
  const [canFetch, setCanFetch] = useState(true); // Nuevo estado para controlar las solicitudes

  // Llamamos a `getProducts` solo una vez al montar el componente si no tenemos productos
  useEffect(() => {
    if (canFetch && !products) {
      getProducts(); // Solo hace la solicitud si no tenemos productos cargados
      setCanFetch(false); // Deshabilitamos las solicitudes hasta que se cumpla el tiempo
      const timeoutId = setTimeout(() => {
        setCanFetch(true); // Permitimos que se realicen nuevas solicitudes después de un tiempo
      }, 5000); // Espera de 5 segundos entre solicitudes (puedes ajustarlo según sea necesario)

      return () => clearTimeout(timeoutId); // Limpiar el timeout si el componente se desmonta
    }
  }, [canFetch, getProducts, products]); // Dependencias para controlar cuando hacer la solicitud

  if (isFetching) {
    return (
      <Center py={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!products || products.length === 0) {
    return <p>No hay productos disponibles</p>;
  }

  // Aseguramos que los productos sean un array
  const data = products.map((p, index) => ({
    id: index + 1,
    Producto: p.name,
    stock: p.stock,
    price: p.price && p.price.$numberDecimal ? parseFloat(p.price.$numberDecimal) : 0, // Aseguramos que price sea un número
  }));

  return (
    <Stack spacing={6}>
      <Heading as={'h2'}>Productos</Heading>
      <Table variant="simple" size="md" w="100%">
        <Thead>
          <Tr>
            <Th width="33%">Product</Th>
            <Th width="33%">Stock</Th>
            <Th width="33%">Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.Producto}</Td>
              <Td>{item.stock}</Td>
              <Td>${item.price.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default ProductList;











