import React, { useEffect, useState } from "react";
import { useCart } from "../../cart-context/CartContext";
import Nav from "../Nav";
import CartCard from "./CartCard";
import emptyCart from "../../images/emptycart.svg";

function Cart() {
  const { state } = useCart();
  const { cart, priceDetails } = state;
 
  
  return (
    <>
    {console.log(cart)}
      <Nav />
      <h1 className="text-center text-xl">Cart</h1>
      {cart.length !== 0 ? (
        <div className="cartpage">
          <div className="">
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
          <div className="checkout">
            <h1>Price Details</h1>
            <p className="mt-1 text-md p-1">Price : ₹{priceDetails.price}</p>
            <p className="mt-1 text-md p-1">Discount : ₹{priceDetails.discount}</p>
            <p className="mt-1 text-md p-1">
              Delivery Charges : ₹{priceDetails.deliveryCharges}
            </p>
            <h3 className="mt-1 text-md p-1">
              Total Amount : ₹{priceDetails.totalAmount}
            </h3>
          </div>
        </div>
      ) : (
        <div className="empty-img mt-4">
          <img className="responsive" src={emptyCart} alt="emptycart" />
          <h1 className="mt-4">Your cart is filled with air ...</h1>
        </div>
      )}
    </>
  );
}

export default Cart;
