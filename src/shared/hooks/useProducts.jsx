import { useState } from "react";
import toast from "react-hot-toast";
import { getProducts, getProducts as getProductsRequest } from "../../services";

export const useProduct = () =>{
    const [products, setProducts] = useState(null)
    
    const getProducts = async (isLogged = false) => {
        const productData = await getProductsRequest()

        if(productData.error){
            return toast.error(
                productData.e?.response?.data || 'An error occurred while reading channels'
            )
        }
        if (!isLogged) {
            return setProducts({
                products: productData.data.products
            })
        }
    }

    return{
        getProducts,
        isFetching: !Boolean(products),
        allProductos: products?.products
    }
}