import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import "./App.css";
import SignIn from "./components/User/SignIn";
import PrivateRoute from "./components/User/PrivateRoute";
import Home from "./components/Home/Home";
import SignUp from './components/User/SignUp';
import ProductPage from './components/Product/ProductPage';

function Myroutes() {
  return (
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
  );
}

export default Myroutes;
