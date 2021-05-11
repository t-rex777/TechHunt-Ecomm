import React from "react";
import { useCart } from "../../cart-context/CartContext";
import Nav from "../Nav";
import WishlistCard from "./WishlistCard";
import emptyWishlist from "../../images/emptywishlist.svg"

function Wishlist() {
  const { state } = useCart();
  const { wishlist } = state;

  console.log(wishlist);
  return (
    <>
      <Nav />
      <h1 className="text-l text-center mb-4">Wishlist</h1>
      {wishlist.length !== 0 ? (
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
      ) : (
        <div className="empty-img mt-4">
          <img className="responsive" src={emptyWishlist}  alt="emptywishlist" />
          <h1 className="mt-4">You can wish more ...</h1>
        </div>
      )}
      
    </>
  );
}

export default Wishlist;
