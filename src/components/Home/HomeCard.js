import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart-context/CartContext";

function HomeCard() {
  const { dispatch } = useCart();
  return (
    <div className="homeCards">
      <Link
        to="/products"
        onClick={() => {
          dispatch({ type: "SET_CATEGORY", payload: "phone" });
        }}
      >
        <div className="homeCard">
          <h3 className="homeCard-text text-center">Phones</h3>
        </div>
      </Link>
      <Link
        to="/products"
        onClick={() => {
          dispatch({ type: "SET_CATEGORY", payload: "earphone" });
        }}
      >
        <div className="homeCard">
          <h3 className="homeCard-text text-center">Earphones</h3>
        </div>
      </Link>
      <Link
        to="/products"
        onClick={() => {
          dispatch({ type: "SET_CATEGORY", payload: "tv" });
        }}
      >
        <div className="homeCard">
          <h3 className="homeCard-text text-center">TV</h3>
        </div>
      </Link>
      <Link
        to="/products"
        onClick={() => {
          dispatch({ type: "SET_CATEGORY", payload: "watch" });
        }}
      >
        <div className="homeCard">
          <h3 className="homeCard-text text-center">Smartwatches</h3>
        </div>
      </Link>
      <Link
        to="/products"
        onClick={() => {
          dispatch({ type: "SET_CATEGORY", payload: "all" });
        }}
      >
        <div className="homeCard">
          <h3 className="homeCard-text text-center">All</h3>
        </div>
      </Link>
    </div>
  );
}

export default HomeCard;
