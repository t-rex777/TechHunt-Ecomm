import { useState } from "react";
import { useCart } from "../../cart-context/CartProvider";
import { addCartItem } from "../Cart/helper";
import MiniLoader from "./../LoaderPage/MiniLoader";
import { getCartItems } from "./../Cart/helper";
import { throwToast } from "./../../App";
import { Link } from "react-router-dom";
const CartBtn = ({ item, isInCart }) => {
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const addProductToCart = async () => {
    if (!state.user._id) {
      return throwToast(dispatch, {
        message: "please sign in first!",
        color: "warning",
      });
    }
    setLoading(true);
    await addCartItem(item._id);
    try {
      const cartData = await getCartItems();
      dispatch({ type: "SET_CART", payload: cartData });
      setLoading(false);
      throwToast(dispatch, { message: "Added to cart", color: "success" });
    } catch (error) {
      console.log(error);
      setLoading(false);
      throwToast(dispatch, { message: "didn't add to cart", color: "danger" });
    }
  };
  if (item.stock === "In stock") {
    if (isInCart === undefined) {
     return loading ? (
        <button className="card-btn btn-secondary" onClick={addProductToCart}>
          <MiniLoader />
        </button>
      ) : (
        <button className="card-btn btn-secondary" onClick={addProductToCart}>
          Add to cart
        </button>
      );
    }
    return (
      <Link to="/cart">
        <button className="card-btn btn-secondary"> Go to cart</button>
      </Link>
    );
  } else {
    return (
      <button className="card-btn" disabled>
        Add to cart
      </button>
    );
  }
};

export default CartBtn;
