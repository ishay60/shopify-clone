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
import { Link } from "react-router-dom";

const CartPopup: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  if (!open) return null;

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        }}
        onClick={onClose}
      ></Box>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 600,
          backgroundColor: "white",
          boxShadow: 24,
          p: 4,
          zIndex: 1000,
          borderRadius: 2,
        }}
      >
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
                  primary={
                    <Link
                      to={`/product/${item.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "clip",
                        textOverflow: "ellipsis",
                      }}
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>
                  }
                  secondary={`Price: $${item.price}`}
                />
                <ListItemSecondaryAction>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      edge="end"
                      aria-label="remove"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Remove />
                    </IconButton>
                    <Typography
                      sx={{ mx: 2, minWidth: 30, textAlign: "center" }}
                    >
                      {item.quantity}
                    </Typography>
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
                      sx={{ ml: 2 }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
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
