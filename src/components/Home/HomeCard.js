import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart-context/CartProvider";

import phones from "../../images/homepageImages/phones.webp";
import earphones from "../../images/homepageImages/earphones.webp";
import sd from "../../images/homepageImages/sd.webp";
import tvs from "../../images/homepageImages/tvs.webp";
import watches from "../../images/homepageImages/watches.webp";
import all from "../../images/homepageImages/all.webp";

function HomeCard() {
  const { dispatch } = useCart();

  const customCard = (category, imageUrl) => (
    <Link
      to="/products"
      style={{ textDecoration: "none" }}
      onClick={() => {
        dispatch({ type: "SET_CATEGORY", payload: category });
      }}
    >
      <div className="homeCard">
        <div
          className="homeCard-images"
          style={{ backgroundImage: `url(${imageUrl})` }}
          alt="products"
        >
          <h3 className="homeCard-text text-center">{category}</h3>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="homeCards">
      {customCard("Phone", phones)}
      {customCard("Earphone", earphones)}
      {customCard("TV", tvs)}
      {customCard("Watch", watches)}
      {customCard("Storage", sd)}
      {customCard("All", all)}
    </div>
  );
}

export default HomeCard;
