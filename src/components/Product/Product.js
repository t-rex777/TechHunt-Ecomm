import React from "react";
import { useCart } from "../../cart-context/CartContext";
import Nav from "./../Nav";
import ProductCard from "./ProductCard";
import SideBar from "./../SideBar";

function Product() {
  const { state } = useCart();
  const { finalProducts } = state;
  const isInCart = (productName) =>
    state.cart.find((cartItem) => cartItem.name === productName);

  const isInWishlist = (productName) =>{
    let wishlistId;
    state.wishlist.find((cartItem) => {
      if(cartItem.name === productName){
        wishlistId = cartItem._id;
      }
      return undefined;
    });
    return wishlistId;
  }
    
  return (
    <>
      <Nav />
      <SideBar />
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
