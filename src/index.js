import React from "react";
import ReactDOM from "react-dom";
import { CartContext } from "./cart-context/CartContext";
import Myroutes from "./Myroutes";

ReactDOM.render(
  <React.StrictMode>
    <CartContext>
      <Myroutes />
    </CartContext>
  </React.StrictMode>,
  document.getElementById("root")
);
