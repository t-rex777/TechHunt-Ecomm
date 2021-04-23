import { AiTwotoneHeart } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useCart } from "../../cart-context/CartContext";
import { deleteCartItem, getCartItems, updateCartItem } from "./helper";

const CartCard = ({ title, img, price, item, quantity }) => {
  const { dispatch } = useCart();
  return (
    <div>
      <div className="card">
        <span className="wishlist">
          <AiTwotoneHeart />
        </span>
        <img className="card-image" src={img} alt="oneplus" />
        <h1 className="card-header">{title}</h1>
        <p className="card-body">{price}</p>
        <div className="quant-btn">
          <button
            onClick={() => {
              item.quantity += 1;
              const updatedQuantity = { quantity: item.quantity };
              updateCartItem(item._id, JSON.stringify(updatedQuantity))
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
                getCartItems()
                  .then((data) => dispatch({ type: "CART", payload: data }))
                  .catch((err) => console.log(err));
            }}
          >
            +
          </button>
          <p>Quantity : {quantity}</p>
          <button onClick={() => {
              item.quantity -= 1;
              const updatedQuantity = { quantity: item.quantity };
              updateCartItem(item._id, JSON.stringify(updatedQuantity))
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
                getCartItems()
                  .then((data) => dispatch({ type: "CART", payload: data }))
                  .catch((err) => console.log(err));
            }}>-</button>
        </div>
        <span className="content-center place-btn">
          <p>Add to wishlist</p>
        </span>
        <span
          className="content-center remove-btn"
          onClick={() => {
            deleteCartItem(item._id)
              .then((data) => {
                console.log("item deleted successfully!", data);

                getCartItems()
                  .then((data) => dispatch({ type: "CART", payload: data }))
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }}
        >
          <AiFillDelete />
        </span>
      </div>
    </div>
  );
};
export default CartCard;
