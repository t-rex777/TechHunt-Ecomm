import React, { useEffect, useState } from "react";
import { useCart } from "../../cart-context/CartContext";
import ProductCard from "./ProductCard";
import { BsFilterRight } from "react-icons/bs";
// import Loading from "../Loading/Loading";
import Nav from "../../Nav/Nav";
import SideBar from "./../../Nav/SideBar";

function Product() {
  const { state, dispatch } = useCart();
  const { products, finalProducts, category } = state;
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
  useEffect(() => {
    console.log(category);
    if (category === "phone") {
      const filteredProducts = products.filter(
        (product) => product.category === "phone"
      );
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "earphone") {
      const filteredProducts = products.filter(
        (product) => product.category === "earphone"
      );
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "tv") {
      const filteredProducts = products.filter(
        (product) => product.category === "tv"
      );
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "watch") {
      const filteredProducts = products.filter(
        (product) => product.category === "watch"
      );
      dispatch({ type: "SET_FINALPRODUCTS", payload: filteredProducts });
    } else if (category === "all") {
      dispatch({ type: "SET_FINALPRODUCTS", payload: products });
    }
  }, []);

  return (
    <>
      <Nav />
      <span
        className="filter mr-1 "
        onClick={() => {
          setFilter(!viewFilter);
        }}
      >
        <BsFilterRight size={20} />
        Filter
      </span>
      {viewFilter && <SideBar />}
      <h1 className="text-center mb-2">{category}</h1>
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
