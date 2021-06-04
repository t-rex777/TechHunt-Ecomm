import { AiFillDelete } from "react-icons/ai";
import { RiTruckFill } from "react-icons/ri";
import { useCart } from "../../cart-context/CartContext";
import { addWishlistItem } from "../Wishlist/helper";
import { deleteCartItem, getCartItems, updateCartItem } from "./helper";
import { getWishlistItems } from "./../Wishlist/helper";

const CartCard = ({ title, img, price, item, quantity }) => {
  const { dispatch } = useCart();

  const changeQuantity = async (change) => {
    if (change === "increase") {
      quantity += 1;
    } else if (change === "decrease") {
      quantity -= 1;
    }
    const updatedQuantity = { quantity: quantity };
    await updateCartItem(item._id, updatedQuantity);
    try {
      const cartItems = await getCartItems();
      dispatch({ type: "SET_CART", payload: cartItems });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItem = async () => {
    await deleteCartItem(item._id);
    try {
      console.log("item deleted successfully!");
      const cartItems = await getCartItems();
      dispatch({ type: "SET_CART", payload: cartItems });
    } catch (error) {
      console.log(error);
    }
  };
  const addProductToWishlist = async () => {
    let { _id, __v, ...wishlistItem } = item;
    wishlistItem = JSON.stringify(wishlistItem);
    console.log(wishlistItem);
    await addWishlistItem(wishlistItem)
      .then((data) => console.log("item added successfully!", data))
      .catch((err) => console.log(err));
    await getWishlistItems()
      .then((data) => dispatch({ type: "WISHLIST", payload: data }))
      .catch((err) => console.log(err));
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
