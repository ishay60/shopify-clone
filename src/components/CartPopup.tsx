import * as React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import "./CartPopup.css";

const CartPopup: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  if (!open) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <Box className="cart-popup">
        <Typography variant="h6" gutterBottom>
          Your Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <List>
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
      </Box>
    </>
  );
};

export default CartPopup;
