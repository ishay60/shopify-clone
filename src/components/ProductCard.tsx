import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css"; // Import the CSS file

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 345, m: 2, boxShadow: 3, borderRadius: 2 }}>
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.images[0]}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            {product.description.slice(0, 50)}...
          </Typography>
          <Typography
            variant="h6"
            color="textPrimary"
            align="center"
            sx={{ mt: 2 }}
          >
            ${product.price}
          </Typography>
        </CardContent>
      </Link>
      <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
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
    </Card>
  );
};

export default ProductCard;
