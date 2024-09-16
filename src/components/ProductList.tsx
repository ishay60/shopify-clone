import * as React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css"; // Import the CSS file

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string; // Add category to the Product interface
}

const ProductList: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

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
        category: product.category, // Map category from the API response
      }));
      setProducts(mappedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearchQuery && matchesCategory;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="search-sort-container mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input p-2 border rounded"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select p-2 border rounded ml-2"
        >
          <option value="All">All Categories</option>
          {/* Add more categories as needed */}
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          No results found. Please refine your search.
        </div>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
