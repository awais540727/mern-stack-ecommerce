import { useEffect } from "react";
import { useState, useContext, createContext } from "react";
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let existingCartProduct = localStorage.getItem("cart");
    if (existingCartProduct) setCart(JSON.parse(existingCartProduct));
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// costom hook

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
