import React, { useEffect, useState } from "react";
import { useCart } from "../../cart-context/CartProvider";
import ProductCard from "./ProductCard";
import { BsFilterRight } from "react-icons/bs";
import Nav from "../../Nav/Nav";
import LoaderPage from "./../LoaderPage/LoaderPage";
import SideNav from "../../Nav/SideNav";
import FilterModal from "./../../Nav/FilterModal";
import {  useSortCategory } from "./helper";

function Product() {
  const { state } = useCart();
  const { finalProducts } = state;

  const isInCart = (productName) =>
    state.cart.find(({ item }) => item.name === productName);

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

  useSortCategory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      {state.loading && <LoaderPage />}
      <Nav />
      <div className="product-page">
        <SideNav />
        <div className="product-main">
          <span
            className="filter mr-1 "
            onClick={() => {
              setFilter(!viewFilter);
            }}
          >
            <BsFilterRight size={20} />
            Filter
          </span>
          <div>
            <div
              style={viewFilter ? { display: "block" } : { display: "none" }}
            >
              <FilterModal setFilter={setFilter} />{" "}
              {/* check this , values are not persisting*/}
            </div>
          </div>
          <div className="products">
            {finalProducts.length > 0 ? (
              finalProducts.map((item) => {
                isInCart(item.name);
                return (
                  <ProductCard
                    key={item._id}
                    productId={item._id}
                    item={item}
                    title={item.name}
                    img={item.img}
                    price={item.price}
                    quantity={item.quantity}
                    isInCart={isInCart(item.name)}
                    isInWishlist={isInWishlist(item.name)}
                  />
                );
              })
            ) : (
              <h1 className="text-center ml-2 mt-2">No products found!</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
