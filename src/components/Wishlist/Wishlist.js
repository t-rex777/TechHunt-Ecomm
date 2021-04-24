import React from "react";
import { useCart } from "../../cart-context/CartContext";
import Nav from "../Nav";
import { useEffect } from "react";
import { getWishlistItems } from "./helper";
import WishlistCard from "./WishlistCard";

function Wishlist() {
  const { state, dispatch } = useCart();
  const { wishlist } = state;

  useEffect(() => {
    (async () => {
      await getWishlistItems()
        .then((data) => dispatch({ type: "WISHLIST", payload: data }))
        .catch((err) => console.log(err));
    })();
  }, []);
  console.log(wishlist)
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
