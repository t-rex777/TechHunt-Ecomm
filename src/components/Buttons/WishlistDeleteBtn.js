import React, { useState } from "react";
import { useCart } from "../../cart-context/CartProvider";
import { deleteWishlistItem, getWishlistItems } from "./../Wishlist/helper";
import { throwToast } from "./../../App";
import { AiFillDelete } from "react-icons/ai";
import MiniLoader from "../LoaderPage/MiniLoader";

function WishlistDeleteBtn({ item }) {
  const { dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const deleteProductFromWishlist = async () => {
    setLoading(true);
    await deleteWishlistItem(item._id);
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
        message: "didn't remove from wishlist!",
        color: "danger",
      });
    }
  };
  return (
    <>
      {loading ? (
        <MiniLoader />
      ) : (
        <span
          className="remove-btn"
          onClick={deleteProductFromWishlist}
          style={{ alignSelf: "center" }}
        >
          <AiFillDelete />
        </span>
      )}
    </>
  );
}

export default WishlistDeleteBtn;
