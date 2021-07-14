import React, { useEffect, createContext, useContext, useReducer } from "react";
import { getProducts } from "../components/Product/helper";
import { getCartItems } from "../components/Cart/helper";
import { getWishlistItems } from "../components/Wishlist/helper";
import { getUserDetails } from "../components/User/helper";
import Axios from "axios";
import { API } from "../API";
import { setTechHuntHeader } from "../utils";
import { reducerFunction, initialState } from "./CartReducers";

const cartContext = createContext();
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const { categoryProducts, stock, fastDelivery } = state;

  useEffect(() => {
    (async () => {
      dispatch({ type: "LOADING", payload: true });
      try {
        const data = await getProducts();
        dispatch({ type: "SET_FINALPRODUCTS", payload: data });
        dispatch({ type: "SET_PRODUCTS", payload: data });
        dispatch({ type: "SET_CATEGORYPRODUCTS", payload: data });
        dispatch({ type: "LOADING", payload: false });
      } catch (error) {
        console.log(error);
      }
    })();

    const rToken = localStorage.getItem("_rtoken");
    if (rToken && typeof rToken === "string") {
      (async () => {
        try {
          dispatch({ type: "LOADING", payload: true });

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

          // setting user
          const userData = await getUserDetails();
          dispatch({ type: "SET_USER", payload: userData });

          // setting cart
          const cartData = await getCartItems();
          dispatch({ type: "SET_CART", payload: cartData });

          // setting wishlist
          const wishlistData = await getWishlistItems();
          dispatch({ type: "SET_WISHLIST", payload: wishlistData });

          // turning loader off
          dispatch({ tyoe: "LOADING", payload: false });
        } catch (error) {
          console.log(error);
          localStorage.removeItem("_rtoken");
          dispatch({ type: "SIGN_OUT" });
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (categoryProducts) {
      const fastDeliveryProducts = categoryProducts.filter(
        (a) => a.delivery === "Fast delivery"
      );
      const inStockProducts = categoryProducts.filter(
        (a) => a.stock === "In stock"
      );

      if (stock === true && fastDelivery === true) {
        dispatch({ type: "SET_FINALPRODUCTS", payload: fastDeliveryProducts });
      } else if (stock === false && fastDelivery === false) {
        dispatch({ type: "SET_FINALPRODUCTS", payload: inStockProducts });
      } else if (stock === false && fastDelivery === true) {
        const stockedFastdeliveryProducts = fastDeliveryProducts.filter(
          (s) => s.stock === "In stock"
        );
        dispatch({
          type: "SET_FINALPRODUCTS",
          payload: stockedFastdeliveryProducts,
        });
      } else if (stock === true && fastDelivery === false) {
        dispatch({
          type: "SET_FINALPRODUCTS",
          payload: categoryProducts,
        });
      }
    }
  }, [categoryProducts, fastDelivery, stock]);

  useEffect(() => {
    let initialPrice = 0;
    let isFastDelivery = 0;
    state.cart.forEach(({ item, quantity }) => {
      initialPrice += item.price * quantity;
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
    <cartContext.Provider value={{ state, dispatch }}>
      {children}
    </cartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(cartContext);
};
