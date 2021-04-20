import React from "react";
import { useCart } from "../../cart-context/CartContext";
import Nav from "../Nav";
import { useEffect } from "react";
import { getCartItems } from "./helper";
import Card from "./Card";

function Cart() {
  const { state, dispatch } = useCart();
  const { cart } = state;

  useEffect(() => {
    (async () => {
      await getCartItems()
        .then((data) => dispatch({ type: "CART", payload: data }))
        .catch((err) => console.log(err));
    })();
  }, []);
  console.log(cart.cartItems);
  return (
    <>
      <Nav />
      {/* <div className="products">
        {cart.cartItems.map((item) => {
          return (
            <Card
              key={item._id}
              item={item}
              title={item.name}
              img={item.img}
              price={item.price}
              quantity={item.quantity}
            />
          );
        })}
      </div> */}
    </>
  );
}

export default Cart;
