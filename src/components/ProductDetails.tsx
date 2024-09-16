import * as React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string; // Updated to match the API response
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { addToCart } = useCart();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      console.log("Fetched product data:", data); // Debug statement
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProduct();
  }, [id]);

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

  if (!product) {
    return (
      <Typography variant="h6" align="center">
        Product not found.
      </Typography>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 600,
          width: "100%",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
          />
        )}
        <Typography
          variant="h4"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          {product.title}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          paragraph
        >
          {product.description}
        </Typography>
        <Typography
          variant="h5"
          color="textPrimary"
          align="center"
          sx={{ mb: 3 }}
        >
          ${product.price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
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
        </Button>
      </Box>
    </Container>
  );
};

export default ProductDetails;
