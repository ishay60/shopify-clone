import * as React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartPopup from "./CartPopup";
import { AppBar, Toolbar, IconButton, Badge, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar: React.FC<{ onCartClick: () => void; isCartOpen: boolean }> = ({
  onCartClick,
  isCartOpen,
}) => {
  const { cart, totalItems } = useCart();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Store
        </Typography>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
        <Link
          to="/products"
          style={{
            textDecoration: "none",
            color: "inherit",
            marginLeft: "1rem",
          }}
        >
          Products
        </Link>
        <Link
          to="/contact"
          style={{
            textDecoration: "none",
            color: "inherit",
            marginLeft: "1rem",
          }}
        >
          Contact
        </Link>
        <Link
          to="/cart"
          style={{
            textDecoration: "none",
            color: "inherit",
            marginLeft: "1rem",
          }}
        >
          Cart
        </Link>
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
