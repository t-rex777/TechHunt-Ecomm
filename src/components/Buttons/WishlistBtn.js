import React, { useState } from "react";
import { useCart } from "../../cart-context/CartProvider";
import { addWishlistItem } from "../Wishlist/helper";
import { throwToast } from "../../App";
import { getWishlistItems, deleteWishlistItem } from "../Wishlist/helper";
import { AiTwotoneHeart } from "react-icons/ai";
import MiniLoader from "../LoaderPage/MiniLoader";

function WishlistBtn({ isInWishlist, item }) {
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);

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
      throwToast(dispatch, { message: "Added to wishlist", color: "success" });
    } catch (error) {
      console.log(error);
      setLoading(false);
      throwToast(dispatch, {
        message: "didn't add to wishlist",
        color: "danger",
      });
    }
  };

  const deleteProductFromWishlist = async () => {
    setLoading(true);
    await deleteWishlistItem(isInWishlist);
    try {
      const wishlistItems = await getWishlistItems();
      dispatch({ type: "SET_WISHLIST", payload: wishlistItems });
      setLoading(false);
      throwToast(dispatch, {
        message: "Removed from wishlist",
        color: "success",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      throwToast(dispatch, {
        message: "din't remove from wishlist",
        color: "danger",
      });
    }
  };
  return (
    <>
      {loading ? (
        <div className="wishlist" style={{ marginBottom: "7px" }}>
          <MiniLoader />
        </div>
      ) : (
        <>
          {isInWishlist === undefined ? (
            <span className="wishlist" onClick={addProductToWishlist}>
              <AiTwotoneHeart />
            </span>
          ) : (
            <span
              className="wishlist"
              onClick={deleteProductFromWishlist}
              style={{ color: "red" }}
            >
              <AiTwotoneHeart />
            </span>
          )}
        </>
      )}
    </>
  );
}

export default WishlistBtn;
