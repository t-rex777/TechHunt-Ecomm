import React from "react";
import { useCart } from "../../cart-context/CartContext";
import Nav from "../Nav";
import WishlistCard from "./WishlistCard";

function Wishlist() {
  const { state } = useCart();
  const { wishlist } = state;

  console.log(wishlist);
  return (
    <>
      <Nav />
      <div className="products">
        {wishlist.map((item) => {
          return (
            <WishlistCard
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

export default Wishlist;
