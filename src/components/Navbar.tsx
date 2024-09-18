import * as React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartPopup from "./CartPopup";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar: React.FC<{ onCartClick: () => void; isCartOpen: boolean }> = ({
  onCartClick,
  isCartOpen,
}) => {
  const { cart, totalItems } = useCart();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          My Store
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          <Box sx={{ ml: 2 }}>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Products
            </Link>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Contact
            </Link>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Cart
            </Link>
          </Box>
        </Box>
        <IconButton color="inherit" onClick={onCartClick}>
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      {isCartOpen && <CartPopup onClose={onCartClick} open={false} />}
    </AppBar>
  );
};

export default Navbar;
