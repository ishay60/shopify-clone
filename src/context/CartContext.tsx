import { Product } from "@/components/ProductCard";
import * as React from "react";

//
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = React.useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    const currentTime = new Date().getTime();
    const validCart = parsedCart.filter(
      (item: Product & { addedAt: number }) => {
        return currentTime - item.addedAt < 3600000; // 1 hour in milliseconds
      }
    );
    return validCart.map((item: Product & { addedAt: number }) => ({
      ...item,
      addedAt: currentTime - (3600000 - (currentTime - item.addedAt)), // Adjust remaining time
    }));
  });

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage on every update
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
