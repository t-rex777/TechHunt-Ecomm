import React from "react";
import { useEffect } from "react";
import { useCart } from "../../cart-context/CartContext";
import { getProducts } from "./helper";
import Nav from "./../Nav";
import Card from "./Card";

function Product() {
  const { dispatch, state } = useCart();
  const { products } = state;
  useEffect(() => {
    getProducts().then((data) => {
      dispatch({ type: "PRODUCT", payload: data });
    });
  }, []);
  return (
    <>
      <Nav />
      <div className="products">
        {products.map((item) => {
          return (
            <Card
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
