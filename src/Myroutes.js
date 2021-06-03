import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import Wishlist from './components/Wishlist/Wishlist';
import App from "./App"
import './App.css';
import SignIn from './components/User/SignIn';

function Myroutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Product} />
        <Route path="/signin" exact component={SignIn} />
        {/* <Route path="/" exact component={App} /> */}
        {/* <Route path="/cart" exact component={Cart} /> */}
        {/* <Route path="/wishlist" exact component={Wishlist} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Myroutes;
