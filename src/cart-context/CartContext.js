import React, { useEffect, createContext, useContext, useReducer } from "react";
import { getProducts } from "../components/Product/helper";
import { getCartItems } from "./../components/Cart/helper";
import { getWishlistItems } from "./../components/Wishlist/helper";

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
    cart: [],
    wishlist: [],
  });

  useEffect(() => {
    (async () => {
      await getProducts()
        .then((data) => dispatch({ type: "PRODUCT", payload: data }))
        .catch((err) => console.log(err));
    })();
    (async () => {
      await getCartItems()
        .then((data) => dispatch({ type: "CART", payload: data }))
        .catch((err) => console.log(err));
    })();
    (async () => {
      await getWishlistItems()
        .then((data) => dispatch({ type: "WISHLIST", payload: data }))
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <cartProvider.Provider value={{ state, dispatch }}>
      {children}
    </cartProvider.Provider>
  );
}

export const useCart = () => {
  return useContext(cartProvider);
};
