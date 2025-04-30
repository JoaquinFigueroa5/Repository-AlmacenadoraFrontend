import { useNavigate } from "react-router-dom";
import { ProductCard } from "./ProductCard";

export const Products = ({ products }) => {
  const navigate = useNavigate();

  const handleBuy = (productId) => {
    console.log("Comprar producto:", productId);
  };

  const handleAddToCart = (productId) => {
    console.log("Agregar al carrito:", productId);
  };

  const handleNavigateToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onNavigate={handleNavigateToProduct}
        />
      ))}
    </div>
  );
};
