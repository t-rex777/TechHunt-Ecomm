import { AiFillDelete } from "react-icons/ai";
import { useCart } from "../../cart-context/CartContext";
import { addCartItem } from "../Cart/helper";
import { getCartItems } from "./../Cart/helper";
import {
  deleteWishlistItem,
  getWishlistItems,
  updateWishlistItem,
} from "./helper";

const WishlistCard = ({ title, img, price, item, quantity }) => {
  const { dispatch } = useCart();
  const increaseItem = async () => {
    item.quantity += 1;
    const updatedQuantity = { quantity: item.quantity };
    await updateWishlistItem(item._id, JSON.stringify(updatedQuantity))
      .then(async (data) => {
        await getWishlistItems()
          .then((data) => {
            dispatch({ type: "WISHLIST", payload: data });
            console.log(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const decreaseItem = async () => {
    item.quantity -= 1;
    const updatedQuantity = { quantity: item.quantity };
    await updateWishlistItem(item._id, JSON.stringify(updatedQuantity))
      .then(async (data) => {
        await getWishlistItems()
          .then((data) => {
            dispatch({ type: "WISHLIST", payload: data });
            console.log(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const deleteItem = async () => {
    await deleteWishlistItem(item._id)
      .then(async (data) => {
        console.log("item deleted successfully!", data);

        await getWishlistItems()
          .then((data) => dispatch({ type: "WISHLIST", payload: data }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const addProductToCart = async () => {
    let { _id, __v, ...cartItem } = item;
    cartItem = JSON.stringify(cartItem);
    console.log(cartItem);
    await addCartItem(cartItem)
      .then(
        async (data) =>
          await getCartItems()
            .then((data) => dispatch({ type: "CART", payload: data }))
            .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="card" style={{ height: "470px" }}>
        <img className="card-image" src={img} alt="oneplus" />
        <h1 className="card-header">{title}</h1>
        <p className="card-body">₹ {price}</p>
        <div className="quant-btn mt-1">
          <button onClick={increaseItem}>+</button>
          <p>Quantity : {quantity}</p>
          <button onClick={decreaseItem}>-</button>
        </div>
        <span className="content-center place-btn" onClick={addProductToCart}>
          <p>Add to cart</p>
        </span>
        <span className="content-center remove-btn" onClick={deleteItem}>
          <AiFillDelete />
        </span>
      </div>
    </div>
  );
};
export default WishlistCard;
