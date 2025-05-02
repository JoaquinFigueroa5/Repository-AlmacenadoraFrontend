import { useEffect, useState } from "react";
import { Box, Heading, Button, useDisclosure, Flex, Spacer } from "@chakra-ui/react";
import { useProduct } from "../../shared/hooks/useProducts";
import { ProductSearch } from "../../components/products/ProductSearch";
import { Products } from "../../components/products/Product";
import { ProductFormModal } from "../../components/products/ProductFormModal";
import NavBar from "../../components/NavBar";
import Footer from "../../components/dashboard/Footer";
import "./ProductPage.css";

const ProductsPage = () => {
  const { getProducts, products, isFetching, deleteProduct } = useProduct();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);


  useEffect(() => {
    console.log('Products loaded:', products);  // Verifica que allProducts tiene los productos correctos
  }, [products]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else {
      setFilteredProducts(products || []);
    }
  }, [searchTerm, products]);

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    onOpen(); 
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product); 
    onOpen(); 
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <NavBar />
      <Box p={4} width="100%" maxWidth="1700px" mx="auto">
        <Flex
          className="products-header"
          direction={{ base: "column", md: "row" }} 
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: 2, md: 4 }}
          mt={4}
          mb={4}
        >
          <Heading className="title" mb={{ base: 2, md: 0 }}>Nuestros Productos</Heading>
          <Spacer /> 
          <Button colorScheme="teal" onClick={handleOpenAddModal}>
            ¡Registrar nuevo producto!
          </Button>
          <ProductSearch onSearch={handleSearch} />
        </Flex>

        <Box display="flex" justifyContent="center" width="100%">
          <Box maxWidth="1600px" width="100%">
            {isFetching ? (
              "Cargando productos..."
            ) : filteredProducts.length > 0 ? (
              <Products
                products={filteredProducts}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={deleteProduct}
              />
            ) : (
              "No se encontraron productos."
            )}
          </Box>
        </Box>
      </Box>

      <ProductFormModal
        isOpen={isOpen}
        onClose={() => {
          setProductToEdit(null);
          onClose();
        }}
        productToEdit={productToEdit}
        onProductSaved={getProducts}
      />
    </>
  );
};

export default ProductsPage;
