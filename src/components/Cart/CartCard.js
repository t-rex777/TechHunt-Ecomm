import { AiFillDelete } from "react-icons/ai";
import { useCart } from "../../cart-context/CartContext";
import { addWishlistItem } from "../Wishlist/helper";
import { deleteCartItem, getCartItems, updateCartItem } from "./helper";
import { getWishlistItems } from './../Wishlist/helper';

const CartCard = ({ title, img, price, item, quantity }) => {
  const { dispatch } = useCart();
  const increaseItem = async () => {
    item.quantity += 1;
    const updatedQuantity = { quantity: item.quantity };
    await updateCartItem(item._id, JSON.stringify(updatedQuantity))
      .then(async (data) => {
        await getCartItems()
          .then((data) => {
            dispatch({ type: "CART", payload: data });
            console.log(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const decreaseItem = async () => {
    item.quantity -= 1;
    const updatedQuantity = { quantity: item.quantity };
    await updateCartItem(item._id, JSON.stringify(updatedQuantity))
      .then(async (data) => {
        await getCartItems()
          .then((data) => {
            dispatch({ type: "CART", payload: data });
            console.log(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const deleteItem = async () => {
    await deleteCartItem(item._id)
      .then(async (data) => {
        console.log("item deleted successfully!", data);

        await getCartItems()
          .then((data) => dispatch({ type: "CART", payload: data }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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
      <div className="card" style={{height:"470px"}}>
        <img className="card-image" src={img} alt="oneplus" />
        <h1 className="card-header">{title}</h1>
        <p className="card-body">₹ {price}</p>
        <div className="quant-btn mt-1">
          <button onClick={increaseItem}>+</button>
          <p>Quantity : {quantity}</p>
          <button onClick={decreaseItem}>-</button>
        </div>
        <span
          className="content-center place-btn"
          onClick={addProductToWishlist} 
        >
          <p>Add to wishlist</p>
        </span>
        <span className="content-center remove-btn" onClick={deleteItem}>
          <AiFillDelete />
        </span>
      </div>
    </div>
  );
};
export default CartCard;
