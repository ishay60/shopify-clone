import * as React from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct({
          ...data,
          images: [data.image],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto my-10">
      <div className="flex flex-col md:flex-row space-x-6">
        <div className="md:w-1/2 w-full h-96">
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-green-500 text-2xl font-semibold mb-4">
            ${product.price}
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
