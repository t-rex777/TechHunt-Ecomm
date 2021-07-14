import React from "react";
import StripeCheckOutButton from "react-stripe-checkout";
import { useCart } from "../../cart-context/CartProvider";
import { techHuntAPI } from "./../../utils";
import { throwToast } from "./../../App";
import { useHistory } from "react-router-dom";
import { clearCart } from "./helper";

function StripePayment() {
  const { state, dispatch } = useCart();
  const history = useHistory();
  const stripePaymentToken = async (token) => {
    try {
      dispatch({ type: "LOADING", payload: true });
      const paymentBody = {
        token,
        amount: state.priceDetails.totalAmount,
      };
      await techHuntAPI.post(`/stripepayment`, {
        ...paymentBody,
      });
      throwToast(dispatch, {
        message: "Payment done successfully!",
        color: "success",
      });
      dispatch({ type: "LOADING", payload: false });
      setTimeout(async () => {
        const userCart = await clearCart();
        dispatch({ type: "SET_CART", payload: userCart });
        history.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, {
        message: "Something went wrong!",
        color: "danger",
      });
    }
  };

  return (
    <StripeCheckOutButton
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      token={stripePaymentToken}
      amount={state.priceDetails.totalAmount * 100}
      name="Buy products"
      billingAddress
      shippingAddress
    >
      <button className="btn btn-success mt-1" style={{ width: "100%" }}>
        Stripe payment
      </button>
    </StripeCheckOutButton>
  );
}

export default StripePayment;
