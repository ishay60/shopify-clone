import * as React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white transform hover:scale-105 transition-transform duration-300">
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="w-full h-64 flex items-center justify-center overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-contain max-h-full max-w-full"
          />
        </div>

        {/* Product Info */}
        <h2 className="text-lg font-semibold mt-4 text-center">
          {product.title}
        </h2>
        <p className="text-gray-500 text-sm text-center mt-2">
          {product.description.slice(0, 50)}... {/* Shortened description */}
        </p>
        <p className="text-green-500 font-bold text-xl mt-4 text-center">
          ${product.price}
        </p>
      </Link>

      {/* Add to Cart Button */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
          onClick={() =>
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              quantity: 1,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
