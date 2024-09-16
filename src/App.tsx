import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <Navbar onCartClick={toggleCart} isCartOpen={isCartOpen} />

          {/* Main Content */}
          <div className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
