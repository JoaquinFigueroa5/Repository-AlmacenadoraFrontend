import { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useProduct } from "../../shared/hooks/useProducts";
import { ProductSearch } from "../../components/products/ProductSearch";
import { Products } from "../../components/products/Product";
import NavBar from "../../components/NavBar";
import "./ProductPage.css";

export const ProductsPage = () => {
  const { getProducts, allProducts, isFetching } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  const handleBuy = (productId) => {
    console.log("Editar producto:", productId);
  };

  const handleAddToCart = (productId) => {
    console.log("Eliminar producto:", productId);
  };

  return (
    <>
      <NavBar />
      <Box p={4}>
        <div className="products-header">
          <Heading className="title">Nuestros Productos</Heading>
          <div className="search">
            <ProductSearch />
          </div>
        </div>

        {isFetching ? (
          "Cargando productos..."
        ) : allProducts.length > 0 ? (
          <Products 
            products={allProducts}
            onBuy={handleBuy}
            onAddToCart={handleAddToCart}
          />
        ) : (
          "No se encontraron productos."
        )}
      </Box>
    </>
  );
};
