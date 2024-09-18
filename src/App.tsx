import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Footer from "./components/Footer";
import CartPopup from "./components/CartPopup";
import { CartProvider } from "./context/CartContext";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import "./App.css";

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartProvider>
      <Router>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            backgroundColor: "#f0f2f5",
          }}
        >
          {/* Navbar */}
          <Navbar onCartClick={toggleCart} isCartOpen={isCartOpen} />

          {/* Main Content */}
          <Box sx={{ flexGrow: 1, pt: 8 }}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Box>

          {/* Footer */}
          <Footer />

          {/* Cart Popup */}
          <CartPopup open={isCartOpen} onClose={toggleCart} />
        </Box>
      </Router>
    </CartProvider>
  );
};

export default App;
