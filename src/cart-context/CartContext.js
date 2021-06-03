import React, { useEffect, createContext, useContext, useReducer } from "react";
import { getProducts } from "../components/Product/helper";
import { getCartItems } from "./../components/Cart/helper";
import { getWishlistItems } from "./../components/Wishlist/helper";

const cartProvider = createContext();
export function CartContext({ children }) {
  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "SET_PRODUCTS":
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
      case "PRICE_DETAILS":
        return {
          ...state,
          priceDetails: {
            price: action.payload.initialPrice,
            deliveryCharges: action.payload.isFastDelivery * 100,
            discount: Math.floor(action.payload.initialPrice * 0.1),
            totalAmount: action.payload.finalPrice,
          },
        };
      case "LOADING":
        return { ...state, loading: !state.loading };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, {
    products: [],
    finalProducts: [],
    cart: [],
    priceDetails: {
      price: 0,
      discount: 0,
      deliveryCharges: 0,
      totalAmount: 0,
    },
    wishlist: [],
    stock: true,
    fastDelivery: false,
    loading: false,
  });
  const { products, stock, fastDelivery } = state;
  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        console.log(data);
        dispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      try {
        const data = await getCartItems();
        dispatch({ type: "CART", payload: data });
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      try {
        const data = await getWishlistItems();
        dispatch({ type: "WISHLIST", payload: data });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   const fastDeliveryProducts = products.filter(
  //     (a) => a.delivery === "Fast delivery"
  //   );
  //   const inStockProducts = products.filter((a) => a.stock === "In stock");
  //   if (fastDelivery) {
  //     dispatch({ type: "FASTDELIVERY", payload: fastDeliveryProducts });
  //   } else if (!stock) {
  //     dispatch({ type: "INSTOCK", payload: inStockProducts });
  //   } else {
  //     dispatch({ type: "FINALPRODUCT", payload: products });
  //   }
  // }, [products, fastDelivery, stock]);

  // useEffect(() => {
  //   let initialPrice = 0;
  //   let isFastDelivery = 0;
  //   state.cart.forEach((item) => {
  //     initialPrice += item.price * item.quantity;
  //     item.delivery === "Fast delivery" && (isFastDelivery += 1);
  //   });
  //   let finalPrice =
  //     initialPrice + isFastDelivery * 100 - Math.floor(initialPrice * 0.1);
  //   dispatch({
  //     type: "PRICE_DETAILS",
  //     payload: { initialPrice, isFastDelivery, finalPrice },
  //   });
  // }, [state.cart]);

  return (
    <cartProvider.Provider value={{ state, dispatch }}>
      {children}
    </cartProvider.Provider>
  );
}

export const useCart = () => {
  return useContext(cartProvider);
};
