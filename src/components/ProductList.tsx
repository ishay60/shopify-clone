import * as React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { Grid2 } from "@mui/material"; // Import Grid2 component
import { SelectChangeEvent } from "@mui/material";
import ProductCard from "./ProductCard"; // Import the ProductCard component
import Pagination from "./Pagination"; // Import the Pagination component
import { Product } from "../types/Product"; // Import the Product type

const ProductList: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const mappedData = data.map((product: any) => ({
        ...product,
        quantity: 1,
        images: [product.image],
        category: product.category,
      }));
      setProducts(mappedData);
      setTotalPages(Math.ceil(mappedData.length / 4)); // 4 products per page
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
    setPage(1); // Reset to first page on search change
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
    setPage(1); // Reset to first page on category change
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearchQuery && matchesCategory;
  });

  React.useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / 4));
  }, [filteredProducts]);

  const paginatedProducts = filteredProducts.slice((page - 1) * 4, page * 4);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, width: "100%", margin: "0 auto" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          label="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          sx={{ mr: 2 }}
        />
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
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
      {paginatedProducts.length === 0 ? (
        <Typography variant="h6" align="center">
          No results found. Please refine your search.
        </Typography>
      ) : (
        <>
          <Grid2 container spacing={3} justifyContent="center">
            {paginatedProducts.map((product) => (
              <Grid2
                key={product.id}
                sx={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                  className: "flex justify-center",
                }}
              >
                <ProductCard product={product} />
              </Grid2>
            ))}
          </Grid2>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductList;
