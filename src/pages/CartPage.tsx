import * as React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <List sx={{ width: "100%", maxWidth: 600 }}>
          {cart.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.title}
                secondary={`Price: $${item.price}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Remove />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton
                  edge="end"
                  aria-label="add"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Add />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="h6">Total Items: {totalItems}</Typography>
        <Typography variant="h6">
          Total Price: ${totalPrice.toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;
