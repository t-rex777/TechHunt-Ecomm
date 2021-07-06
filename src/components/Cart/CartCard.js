import { AiFillDelete } from "react-icons/ai";
import { RiTruckFill } from "react-icons/ri";
import { useCart } from "../../cart-context/CartProvider";
import { addWishlistItem } from "../Wishlist/helper";
import { deleteCartItem, getCartItems, updateCartItem } from "./helper";
import { getWishlistItems } from "./../Wishlist/helper";

const CartCard = ({ title, img, price, item, quantity }) => {
  const { state, dispatch } = useCart();

  const changeQuantity = async (change) => {
    if (change === "increase") {
      quantity += 1;
      dispatch({ type: "INCREMENT_QNT", payload: item._id });
    } else if (change === "decrease") {
      if (quantity === 1) {
        return deleteItem();
      }
      dispatch({ type: "DECREMENT_QNT", payload: item._id });
      quantity -= 1;
    }
    const updatedQuantity = { quantity };
    try {
      await updateCartItem(item._id, updatedQuantity);
    } catch (error) {
      console.log(error);
      if (change === "increase") {
        dispatch({ type: "DECREMENT_QNT", payload: item._id });
      } else {
        dispatch({ type: "INCREMENT_QNT", payload: item._id });
      }
    }
  };

  const deleteItem = async () => {
    dispatch({ type: "LOADING", payload: true });

    await deleteCartItem(item._id);
    try {
      dispatch({ type: "DELETE_FROM_CART", payload: item._id });
      dispatch({ type: "LOADING", payload: false });
      console.log("item deleted successfully!");
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
    }
  };

  const addProductToWishlist = async () => {
    dispatch({ type: "LOADING", payload: true });

    const isInWishlist = state.wishlist.find(
      (wishlistItem) => wishlistItem._id === item._id
    );
    if (!isInWishlist) {
      await addWishlistItem(item._id);
      try {
        const wishlistData = await getWishlistItems();
        dispatch({ type: "SET_WISHLIST", payload: wishlistData });
        dispatch({ type: "LOADING", payload: false });
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch({ type: "LOADING", payload: false });
    }
  };
  return (
    <div>
      <div className="cart-card">
        <img
          className="card-image mr-2"
          src={img}
          alt="product"
          style={{ width: "150px", height: "250px" }}
        />
        <div className="card-main ">
          <div className="card-main-info mr-1">
            <h1 className="card-header">{title}</h1>
            <p className="card-body">₹ {price}</p>
            <p className="card-body mt-1">
              {item.delivery} <RiTruckFill />
            </p>
            <div className="quant-btn">
              <button
                onClick={() => {
                  changeQuantity("increase");
                }}
              >
                +
              </button>
              <p>{quantity}</p>
              <button
                onClick={() => {
                  changeQuantity("decrease");
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className="interactions">
            <span
              className="content-center place-btn mr-2"
              onClick={addProductToWishlist}
            >
              <p>Add to wishlist</p>
            </span>
            <span
              className="content-center remove-btn mb-1 ml-2"
              onClick={deleteItem}
              style={{ fontSize: "2.5rem" }}
            >
              <AiFillDelete />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartCard;
