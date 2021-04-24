import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import './App.css';
import Wishlist from './components/Wishlist/Wishlist';

function Myroutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/wishlist" exact component={Wishlist} />
      </Switch>
    </BrowserRouter>
  );
}

export default Myroutes;
