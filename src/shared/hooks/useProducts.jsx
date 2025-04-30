import { useState } from "react";
import toast from "react-hot-toast";
import { getProducts as getProductsRequest } from "../../services/api";

export const useProducts = () => {
  const [products, setProducts] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getProducts = async (isLogged = false) => {
    setIsFetching(true); 

    const productsData = await getProductsRequest();

    setIsFetching(false); 

    if (productsData.error) {
      toast.error(productsData.e?.response?.data || 'Error al traer los productos');
      return;
    }

    setProducts(productsData.data.products);

    if (isLogged) {
      return { products: productsData.data.products };
    }
  };

  return {
    products, 
    isFetching, 
    getProducts, 
  };
};
