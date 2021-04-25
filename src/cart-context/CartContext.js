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

      case "FINALPRODUCT":
        return { ...state, finalProducts: action.payload };

      case "CART":
        return { ...state, cart: action.payload };

      case "WISHLIST":
        return { ...state, wishlist: action.payload };

      case "SORT_ASC":
        return {
          ...state,
          finalProducts: state.finalProducts.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          ),
        };

      case "SORT_DES":
        return {
          ...state,
          finalProducts: state.finalProducts.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          ),
        };

      case "FILTER_DELIVERY":
        return {
          ...state,
          fastDelivery: !state.fastDelivery,
        };
      case "FILTER_STOCK":
        return {
          ...state,
          stock: !state.stock,
        };
      case "FASTDELIVERY":
        return { ...state, finalProducts: action.payload };

        case "FASTDELIVERY_OFF":         
        return { ...state, fastDelivery: false };

        case "INSTOCK_ON":         
        return { ...state, stock: true };

      case "INSTOCK":
        return { ...state, finalProducts: action.payload };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, {
    products: [],
    finalProducts: [],
    cart: [],
    wishlist: [],
    stock: true,
    fastDelivery: false,
  });
  const { products, stock, fastDelivery } = state;
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

  useEffect(() => {
    const fastDeliveryProducts = products.filter(
      (a) => a.delivery === "Fast delivery"
    );
    
    const inStockProducts = products.filter((a) => a.stock === "In stock");

    if (fastDelivery) {
      dispatch({ type: "FASTDELIVERY", payload: fastDeliveryProducts });
    } else if (!stock) {
      dispatch({ type: "INSTOCK", payload: inStockProducts });
    } else {
      dispatch({ type: "FINALPRODUCT", payload: products });
    }
  }, [products, fastDelivery, stock]);

  return (
    <cartProvider.Provider value={{ state, dispatch }}>
      {children}
    </cartProvider.Provider>
  );
}

export const useCart = () => {
  return useContext(cartProvider);
};
