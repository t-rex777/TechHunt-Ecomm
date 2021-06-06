import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart-context/CartContext";
import EarphoneImg from "../../images/earphone.png"
import tvImg from "../../images/tv.png"
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
      <div
        className="homeCard"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <h3 className="homeCard-text text-center">{category}</h3>
      </div>
    </Link>
  );

  return (
    <div className="homeCards">
      {customCard(
        "phone",
        "https://pngimg.com/uploads/iphone_12/iphone_12_PNG23.png"
      )}
      {customCard(
        "earphone",
        EarphoneImg
      )}
      {customCard(
        "tv",
        tvImg
      )}
      {customCard(
        "watch",
        "https://pngimg.com/uploads/watches/watches_PNG9899.png"
      )}
      {customCard(
        "all",
        "https://freepngimg.com/download/technology/41392-4-gadgets-free-download-png-hd.png"
      )}

      
    </div>
  );
}

export default HomeCard;
