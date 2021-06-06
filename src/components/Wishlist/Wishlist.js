import React from "react";
import { useCart } from "../../cart-context/CartContext";
import WishlistCard from "./WishlistCard";
import emptyWishlist from "../../images/emptywishlist.svg"
import Nav from './../../Nav/Nav';

function Wishlist() {
  const { state } = useCart();
  const { wishlist } = state;
  return (
    <>
      <Nav />
      <h1 className="text-center text-xl">Wishlist</h1>
      {wishlist.length !== 0 ? (
        <div className="products" style={{justifyContent:"center"}}>
        {wishlist.map((item) => {
          return (
            <WishlistCard
              key={item._id}
              item={item}
              title={item.name}
              img={item.img}
              price={item.price}
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
