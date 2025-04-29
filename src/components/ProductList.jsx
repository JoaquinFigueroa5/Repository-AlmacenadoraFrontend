import { Stack, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];

const ProductList = () => {
  return (
    <Stack spacing={6}>
      <Table variant="simple" size="md" w="100%">
        <Thead>
          <Tr>
            <Th width="33%">Product</Th>
            <Th width="33%">Category</Th>
            <Th width="33%">Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td width="33%">{item.name}</Td>
              <Td width="33%">{item.category}</Td>
              <Td width="33%">${item.price.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default ProductList;



