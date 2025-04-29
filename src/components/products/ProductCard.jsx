import { Button, Card, Image, Text, Badge, Stack } from "@chakra-ui/react"

export const ProductCard = ({ product, onBuy, onAddToCart }) => {
  return (
    <Card maxW="sm" overflow="hidden" boxShadow="lg" borderRadius="xl">
      <Image
        src={product.image}
        alt={product.name}
        objectFit="cover"
        height="200px"
        width="100%"
      />
      <Card.Body padding="4">
        <Stack spacing="1">
          <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
          <Text fontSize="sm" color="gray.600">{product.description}</Text>
          <Badge colorScheme="purple" width="fit-content">{product.category}</Badge>
          <Text fontSize="md" color="green.500" mt="2">
            Q{parseFloat(product.price.$numberDecimal).toFixed(2)}
          </Text>
          <Text fontSize="sm" color={product.stock > 0 ? "teal.500" : "red.500"}>
            Stock: {product.stock}
          </Text>
        </Stack>
      </Card.Body>
      <Card.Footer gap="2" padding="4">
      </Card.Footer>
    </Card>
  )
}
