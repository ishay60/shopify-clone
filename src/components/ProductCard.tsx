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
import { Product } from "../types/Product"; // Adjust the import path as needed

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 600,
        width: 300,
        m: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", flex: 7, height: "100%" }}>
        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardMedia
            sx={{ maxHeight: 300 }}
            component="img"
            height="200"
            image={product.images[0]}
            alt={product.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
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
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 100, mt: "auto", mb: 2 }}
      >
        <Button
          sx={{ height: 50, width: "80%" }}
          variant="contained"
          color="primary"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
