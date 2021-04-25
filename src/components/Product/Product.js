import React from "react";
import { useCart } from "../../cart-context/CartContext";
import Nav from "./../Nav";
import ProductCard from "./ProductCard";
import SideBar from "./../SideBar";

function Product() {
  const { state } = useCart();
  const {finalProducts} = state;
  
  return (
    <>
      <Nav />
      <SideBar />
      <div className="products">
        {finalProducts.map((item) => {
          return (
            <ProductCard
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
    </>
  );
}

export default Product;
