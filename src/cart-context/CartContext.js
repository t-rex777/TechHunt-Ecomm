import React, { useEffect, createContext, useContext, useReducer } from "react";
import { getProducts } from "../components/Product/helper";
import { isAuthenticated } from "../components/User/helper";
import { getCartItems } from "./../components/Cart/helper";
import { getWishlistItems } from "./../components/Wishlist/helper";
import { getUserDetails } from "./../components/User/helper";
import Axios from "axios";
import { API } from "./../API";
import { setTechHuntHeader } from "../utils";

const cartProvider = createContext();
export function CartContext({ children }) {
  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "SET_USER":
        return { ...state, user: action.payload };
      case "SIGN_OUT": {
        localStorage.removeItem("_rtoken");
        return { ...state, user: {}, cart: [], wishlist: [] };
      }
      case "SET_PRODUCTS":
        return { ...state, products: action.payload };

      case "SET_FINALPRODUCTS":
        return { ...state, finalProducts: action.payload };

      case "SET_CART":
        return { ...state, cart: action.payload };

      case "SET_WISHLIST":
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
    user: {},
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
        dispatch({ type: "SET_FINALPRODUCTS", payload: data });
      } catch (error) {
        console.log(error);
      }
    })();

    const rToken = localStorage.getItem("_rtoken");
    if (rToken && typeof rToken === "string") {
      (async () => {
        try {
          const newAccessTokenRequest = await Axios({
            baseURL: API,
            method: "GET",
            url: "/token/access",
            headers: {
              "refresh-token": `Bearer ${rToken}`,
            },
          });
          const { accessToken, refreshToken } = newAccessTokenRequest.data;
          localStorage.setItem("_rtoken", refreshToken);
          setTechHuntHeader(accessToken);
          const userData = await getUserDetails();
          dispatch({ type: "SET_USER", payload: userData });

          // setting cart
          (async () => {
            try {
              const data = await getCartItems();
              dispatch({ type: "SET_CART", payload: data });
            } catch (error) {
              console.log(error);
            }
          })();

          // setting wishlist
          (async () => {
            try {
              const data = await getWishlistItems();
              dispatch({ type: "SET_WISHLIST", payload: data });
            } catch (error) {
              console.log(error);
            }
          })();
        } catch (error) {
          console.log(error);
          localStorage.removeItem("_rtoken");
          dispatch({ type: "SIGN_OUT" });
        }
      })();
    }
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
      dispatch({ type: "SET_FINALPRODUCTS", payload: products });
    }
  }, [products, fastDelivery, stock]);

  useEffect(() => {
    let initialPrice = 0;
    let isFastDelivery = 0;
    state.cart.forEach((item) => {
      initialPrice += item.price * item.quantity;
      item.delivery === "Fast delivery" && (isFastDelivery += 1);
    });
    let finalPrice =
      initialPrice + isFastDelivery * 100 - Math.floor(initialPrice * 0.1);
    dispatch({
      type: "PRICE_DETAILS",
      payload: { initialPrice, isFastDelivery, finalPrice },
    });
  }, [state.cart]);

  return (
    <cartProvider.Provider value={{ state, dispatch }}>
      {children}
    </cartProvider.Provider>
  );
}

export const useCart = () => {
  return useContext(cartProvider);
};
