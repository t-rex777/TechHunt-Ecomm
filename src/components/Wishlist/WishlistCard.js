import { AiFillDelete } from "react-icons/ai";
import { useCart } from "../../cart-context/CartProvider";
import { addCartItem } from "../Cart/helper";
import { getCartItems } from "./../Cart/helper";
import { deleteWishlistItem, getWishlistItems } from "./helper";

const WishlistCard = ({ title, img, price, item }) => {
  const { state, dispatch } = useCart();

  const isInCart = (productName) =>
    state.cart.find(({ item }) => item.name === productName);

  const deleteProductFromWishlist = async () => {
    dispatch({ type: "LOADING", payload: true });

    await deleteWishlistItem(item._id);
    try {
      const wishlistItems = await getWishlistItems();
      dispatch({ type: "SET_WISHLIST", payload: wishlistItems });
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
    }
  };
  const addProductToCart = async () => {
    if (!isInCart(title)) {
      dispatch({ type: "LOADING", payload: true });

      await addCartItem(item._id);
      try {
        const cartData = await getCartItems();
        dispatch({ type: "SET_CART", payload: cartData });
        dispatch({ type: "LOADING", payload: false });
      } catch (error) {
        console.log(error);
        dispatch({ type: "LOADING", payload: false });
      }
    }
  };

  return (
    <div>
      <div className="card" style={{ height: "400px" }}>
        <img className="card-image" src={img} alt="oneplus" />
        <h1 className="card-header mt-1 text-center">{title}</h1>
        <p className="card-body text-center">₹ {price}</p>
        <span
          className=" place-btn"
          onClick={addProductToCart}
          style={{ alignSelf: "center" }}
        >
          <p>Add to cart</p>
        </span>
        <span
          className="remove-btn"
          onClick={deleteProductFromWishlist}
          style={{ alignSelf: "center" }}
        >
          <AiFillDelete />
        </span>
      </div>
    </div>
  );
};
export default WishlistCard;
