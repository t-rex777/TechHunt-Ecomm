import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import "./App.css";
import SignIn from "./components/User/SignIn";
import PrivateRoute from "./components/User/PrivateRoute";
import Home from "./components/Home/Home";

function Myroutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/products" exact component={Product} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/cart" exact component={Cart} />
        <PrivateRoute path="/wishlist" exact component={Wishlist} />
      </Switch>
    </BrowserRouter>
  );
}

export default Myroutes;
