import * as React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://fakestoreapi.com/products?limit=20"
      );
      const data = await response.json();
      const mappedData = data.map((product: any) => ({
        ...product,
        images: [product.image],
      }));
      setProducts(mappedData);
      setFilteredProducts(mappedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const [categories, setCategories] = React.useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const fetchCategories = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await response.json();
    setCategories(data);
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filtered = products.filter(
      (product) =>
        product.title
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="p-2 border rounded-lg shadow"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="container mx-auto">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for products..."
            className="w-1/2 p-2 border rounded-lg shadow"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
