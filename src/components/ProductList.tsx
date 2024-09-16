import * as React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import ProductCard from "./ProductCard"; // Import the ProductCard component
import "./ProductList.css"; // Import the CSS file

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
        category: product.category,
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

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="center" mb={4}>
        <TextField
          label="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          className="search-input"
          sx={{ mr: 2 }}
        />
        <FormControl variant="outlined" className="category-select">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="jewelery">Jewelery</MenuItem>
            <MenuItem value="men's clothing">Men's Clothing</MenuItem>
            <MenuItem value="women's clothing">Women's Clothing</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {filteredProducts.length === 0 ? (
        <Typography variant="h6" align="center">
          No results found. Please refine your search.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductList;
