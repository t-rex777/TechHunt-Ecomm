import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import SignIn from "./components/User/SignIn";
import PrivateRoute from "./components/User/PrivateRoute";
import Home from "./components/Home/Home";
import SignUp from "./components/User/SIgnUp";
import ProductPage from "./components/Product/ProductPage";
import "./App.css";
import Toast from "./components/Toast.js/Toast";
import { useCart } from "./cart-context/CartProvider";

export const throwToast = (dispatch, payload) => {
  dispatch({
    type: "TOAST",
    payload,
  });
  dispatch({ type: "TOAST_STYLE", payload: { display: "block" } });
  setTimeout(() => {
    dispatch({ type: "TOAST_STYLE", payload: { display: "none" } });
  }, 4000);
};

function Myroutes() {
  const { state } = useCart();
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/products" exact component={Product} />
          <Route path="/product/:productId" exact component={ProductPage} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/cart" exact component={Cart} />
          <PrivateRoute path="/wishlist" exact component={Wishlist} />
        </Switch>
      </BrowserRouter>

      {state.toast && (
        <Toast message={state.toast.message} color={state.toast.color} />
      )}
    </>
  );
}

export default Myroutes;
