import React from "react";
import { useCart } from "../../cart-context/CartProvider";
import CartCard from "./CartCard";
import emptyCart from "../../images/emptycart.svg";
import Nav from "./../../Nav/Nav";
import LoaderPage from "./../LoaderPage/LoaderPage";
import StripePayment from './StripePayment';

function Cart() {
  const { state } = useCart();
  const { cart, priceDetails } = state;

  return (
    <>
      <Nav />
      <h1 className="text-center text-xl">Cart</h1>
      {state.loading && <LoaderPage />}
      {cart.length !== 0 ? (
        <div className="cartpage">
          <div className="cartitems">
            {cart.map(({ item, quantity }) => {
              return (
                <CartCard
                  key={item._id}
                  item={item}
                  title={item.name}
                  img={item.img}
                  price={item.price}
                  quantity={quantity}
                />
              );
            })}
          </div>
          <div className="checkout">
            <h3>Price Details</h3>
            <hr className="line-separator" />
            <p className="mt-1 text-s p-1" style={{}}>
              Price : ₹{priceDetails.price.toLocaleString()}
            </p>
            <p className="mt-1 text-s p-1 ">
              Discount : ₹{priceDetails.discount.toLocaleString()}
            </p>
            <p className="mt-1 text-s p-1 ">
              Delivery Charges : ₹
              {priceDetails.deliveryCharges.toLocaleString()}
            </p>
            <h3 className="mt-1  p-1">
              Total Amount : ₹{priceDetails.totalAmount.toLocaleString()}
            </h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StripePayment />
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-img mt-4">
          <img
            className="responsive"
            src={emptyCart}
            alt="emptycart"
            style={{ maxWidth: "300px" }}
          />
          <h3 className="mt-4 text-center">Your cart is filled with air ...</h3>
        </div>
      )}
    </>
  );
}

export default Cart;
