import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Grid,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { Add, Remove, Delete } from "@mui/icons-material";
import "./CartPopup.css"; // Import the CSS file

const CartPopup: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Your Cart</DialogTitle>
      <DialogContent>
        {cart.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} sx={{ mb: 2 }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={8}>
                    <ListItemText
                      primary={item.title}
                      secondary={`Price: $${item.price}`}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <IconButton
                        edge="end"
                        aria-label="remove"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        sx={{ mx: 1 }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        edge="end"
                        aria-label="add"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        sx={{ mx: 1 }}
                      >
                        <Add />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeFromCart(item.id)}
                        sx={{ mx: 1 }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        )}
        <Box mt={3}>
          <Typography variant="h6">Total Items: {totalItems}</Typography>
          <Typography variant="h6">
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartPopup;
