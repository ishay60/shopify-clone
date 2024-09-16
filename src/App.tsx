import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails"; // Import product details page
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext"; // Import CartProvider

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <div className="flex-grow">
            <Routes>
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
