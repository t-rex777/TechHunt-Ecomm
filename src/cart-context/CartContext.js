import React, { createContext, useContext, useReducer } from "react";

const cartProvider = createContext();
export function CartContext({ children }) {
  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "PRODUCT":
        return { ...state, products: action.payload };
      case "CART":
        return { ...state, cart: action.payload };
      case "WISHLIST":
        return { ...state, wishlist: action.payload };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, {
    products: [],
    cart: {},
    wishlist: [],
  });

  return (
    <cartProvider.Provider value={{ state, dispatch }}>
      {children}
    </cartProvider.Provider>
  );
}

export const useCart = () => {
  return useContext(cartProvider);
};
