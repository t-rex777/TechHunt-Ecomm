import { AiFillDelete } from "react-icons/ai";
import { RiTruckFill } from "react-icons/ri";
import { useCart } from "../../cart-context/CartContext";
import { addWishlistItem } from "../Wishlist/helper";
import { deleteCartItem, getCartItems, updateCartItem } from "./helper";
import { getWishlistItems } from "./../Wishlist/helper";

const CartCard = ({ title, img, price, item, quantity }) => {
  const { state, dispatch } = useCart();

  const changeQuantity = async (change) => {
    dispatch({ type: "LOADING", payload: true });
    if (change === "increase") {
      quantity += 1;
    } else if (change === "decrease") {
      if (quantity === 1) {
        return deleteItem();
      }
      quantity -= 1;
    }
    const updatedQuantity = { quantity: quantity };
    try {
      await updateCartItem(item._id, updatedQuantity);
      const cartItems = await getCartItems();
      dispatch({ type: "SET_CART", payload: cartItems });
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async () => {
    dispatch({ type: "LOADING", payload: true });
    await deleteCartItem(item._id);
    try {
      console.log("item deleted successfully!");
      const cartItems = await getCartItems();
      dispatch({ type: "SET_CART", payload: cartItems });
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      console.log(error);
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
