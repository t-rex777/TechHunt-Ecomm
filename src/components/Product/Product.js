import React, { useState } from "react";
import { useCart } from "../../cart-context/CartContext";
import Nav from "./../Nav";
import ProductCard from "./ProductCard";
import SideBar from "./../SideBar";
import { BsFilterRight } from "react-icons/bs";
// import Loading from "../Loading/Loading";

function Product() {
  const { state } = useCart();
  const { finalProducts } = state;
  const isInCart = (productName) =>
    state.cart.find(({item}) => item.name === productName);

  const isInWishlist = (productName) => {
    let wishlistId;
    state.wishlist.find((cartItem) => {
      if (cartItem.name === productName) {
        wishlistId = cartItem._id;
      }
      return undefined;
    });
    return wishlistId;
  };

  const [viewFilter, setFilter] = useState(false);

  return (
    <>
      <Nav />
      <span
        className="filter mr-1"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontSize: "2rem",
          cursor: "pointer",
        }}
        onClick={() => {
          setFilter(!viewFilter);
        }}
      >
        <BsFilterRight size={30} />
        Filter
      </span>
      {viewFilter && <SideBar />}
      <div className="products">
        {finalProducts.map((item) => {
          isInCart(item.name);
          return (
            <ProductCard
              key={item._id}
              item={item}
              title={item.name}
              img={item.img}
              price={item.price}
              quantity={item.quantity}
              isInCart={isInCart(item.name)}
              isInWishlist={isInWishlist(item.name)}
            />
          );
        })}
      </div>
    </>
  );
}

export default Product;
