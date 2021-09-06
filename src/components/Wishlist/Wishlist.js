import React from "react";
import { useCart } from "../../cart-context/CartProvider";
import WishlistCard from "./WishlistCard";
import emptyWishlist from "../../images/emptywishlist.svg";
import Nav from "./../../Nav/Nav";
import LoaderPage from "./../LoaderPage/LoaderPage";

function Wishlist() {
  const { state } = useCart();
  const { wishlist } = state;
  return (
    <>
      <Nav />
      {state.loading && <LoaderPage />}
      <h2 className="text-center mt-1 mb-1">My wishlist ({wishlist.length})</h2>
      {wishlist.length !== 0 ? (
        <div className="products" style={{ justifyContent: "center" }}>
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
          <img
            className="responsive"
            src={emptyWishlist}
            alt="emptywishlist"
            style={{ maxWidth: "300px" }}
          />
          <h3 className="mt-4">You can wish more ...</h3>
        </div>
      )}
    </>
  );
}

export default Wishlist;
