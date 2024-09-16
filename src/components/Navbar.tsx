import * as React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartPopup from "./CartPopup";

const Navbar: React.FC<{ onCartClick: () => void; isCartOpen: boolean }> = ({
  onCartClick,
  isCartOpen,
}) => {
  const { cart } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-6 items-center relative">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-white hover:text-gray-300">
              Products
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-white hover:text-gray-300">
              Cart
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={onCartClick}
              className="text-white hover:text-gray-300"
            >
              🛒 Cart
            </button>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cart.length}
              </span>
            )}
          </li>
        </ul>
      </div>
      {isCartOpen && <CartPopup onClose={onCartClick} open={false} />}
    </nav>
  );
};

export default Navbar;
