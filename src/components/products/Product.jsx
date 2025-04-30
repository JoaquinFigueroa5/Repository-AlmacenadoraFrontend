import { SimpleGrid } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";

export const Products = ({ products, onBuy, onAddToCart }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={8} >
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onBuy={onBuy}
          onAddToCart={onAddToCart}
        />
      ))}
    </SimpleGrid>
  );
};
