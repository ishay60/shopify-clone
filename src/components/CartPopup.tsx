import * as React from "react";
import { useCart } from "../context/CartContext";
import "./CartPopup.css"; // Import the CSS file

const CartPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-popup fixed top-16 right-4 bg-white shadow-lg rounded-lg w-80 p-4 z-50">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <ul className="space-y-4">
          {cart.length === 0 ? (
            <li>Your cart is empty.</li>
          ) : (
            cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">Price: ${item.price}</p>
                  <div className="flex items-center flex-row flex-nowrap">
                    <div className="flex flex-row flex-nowrap">
                      <p className="mx-2 flex-row">{item.quantity}</p>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        ➖
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        ➕
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold mr-4">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="mt-4">
          <p className="font-semibold">Total Items: {totalItems}</p>
          <p className="font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default CartPopup;
