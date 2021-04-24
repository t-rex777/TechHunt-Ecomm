import React from "react";
import { useCart } from "../../cart-context/CartContext";
import Nav from "../Nav";

import CartCard from "./CartCard";

function Cart() {
  const { state } = useCart();
  const { cart } = state;

  
  return (
    <>
      <Nav />
      <div className="products">
        {cart.map((item) => {
          return (
            <CartCard
              key={item._id}
              item={item}
              title={item.name}
              img={item.img}
              price={item.price}
              quantity={item.quantity}
            />
          );
        })}
      </div>
    </>
  );
}

export default Cart;
