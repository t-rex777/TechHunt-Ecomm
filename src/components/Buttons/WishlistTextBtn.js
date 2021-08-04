import React, { useState } from "react";
import { useCart } from "../../cart-context/CartProvider";
import MiniLoader from "../LoaderPage/MiniLoader";
import { addWishlistItem } from "../Wishlist/helper";
import { throwToast } from "./../../App";
import { getWishlistItems, deleteWishlistItem } from "./../Wishlist/helper";

function WishlistTextBtn({ isInWishlist, item }) {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useCart();
  const addProductToWishlist = async () => {
    if (!state.user._id) {
      return throwToast(dispatch, {
        message: "please sign in first!",
        color: "warning",
      });
    }
    setLoading(true);
    await addWishlistItem(item._id);
    try {
      const wishlistData = await getWishlistItems();
      dispatch({ type: "SET_WISHLIST", payload: wishlistData });
      setLoading(false);
      throwToast(dispatch, {
        message: "added to wishlist!",
        color: "success",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      throwToast(dispatch, {
        message: "didn't add to wishlist!",
        color: "danger",
      });
    }
  };

  const deleteProductFromWishlist = async () => {
    setLoading(true);
    await deleteWishlistItem(isInWishlist._id);
    try {
      const wishlistItems = await getWishlistItems();
      dispatch({ type: "SET_WISHLIST", payload: wishlistItems });
      setLoading(false);
      throwToast(dispatch, {
        message: "removed from wishlist!",
        color: "success",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      throwToast(dispatch, {
        message: "didn't removed from wishlist!",
        color: "danger",
      });
    }
  };

  if (isInWishlist === undefined) {
    return (
      <>
        {loading ? (
          <button className={`card-btn wishlistBtn`}>
            <MiniLoader />
          </button>
        ) : (
          <button
            className={`card-btn wishlistBtn`}
            onClick={addProductToWishlist}
          >
            Add to wishlist
          </button>
        )}
      </>
    );
  }
  return (
    <>
      {loading ? (
        <button className={`card-btn wishlistBtn`}>
          <MiniLoader />
        </button>
      ) : (
        <button
          className={`card-btn wishlistBtn`}
          onClick={deleteProductFromWishlist}
        >
          Remove from wishlist
        </button>
      )}
    </>
  );
}

export default WishlistTextBtn;
