import { AiTwotoneHeart } from "react-icons/ai";
import { RiTruckFill } from "react-icons/ri";
import { useCart } from "../../cart-context/CartProvider";
import { addCartItem } from "../Cart/helper";
import { addWishlistItem, deleteWishlistItem } from "../Wishlist/helper";
import { getWishlistItems } from "./../Wishlist/helper";
import { getCartItems } from "./../Cart/helper";
import { Link } from "react-router-dom";
import { throwToast } from "../../App";
import CartBtn from "./CartBtn";
const ProductCard = ({
  productId,
  title,
  img,
  price,
  item,
  isInCart,
  isInWishlist,
}) => {
  const { state, dispatch } = useCart();

  const addProductToWishlist = async () => {
    if (!state.user._id) {
      return throwToast(dispatch, {
        message: "please sign in first!",
        color: "warning",
      });
    }
    dispatch({ type: "LOADING", payload: true });
    await addWishlistItem(item._id);
    try {
      const wishlistData = await getWishlistItems();
      dispatch({ type: "SET_WISHLIST", payload: wishlistData });
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, { message: "Added to wishlist", color: "success" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, {
        message: "didn't add to wishlist",
        color: "danger",
      });
    }
  };

  const deleteProductFromWishlist = async () => {
    dispatch({ type: "LOADING", payload: true });

    await deleteWishlistItem(isInWishlist);
    try {
      const wishlistItems = await getWishlistItems();
      dispatch({ type: "SET_WISHLIST", payload: wishlistItems });
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, {
        message: "Removed from wishlist",
        color: "success",
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, {
        message: "din't remove from wishlist",
        color: "danger",
      });
    }
  };

  return (
    <div>
      <div className="card">
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
        <Link to={`product/${productId}`}>
          <img className="card-image" src={img} alt="oneplus" />
        </Link>
        <h1 className="card-header">{title}</h1>
        <p className="card-body">₹ {price}</p>
        {item.stock === "In stock" ? (
          <p className="card-body text-success">{item.stock}</p>
        ) : (
          <p className="card-body text-gray">{item.stock}</p>
        )}

        <p className="card-body">
          {item.delivery}
          <RiTruckFill />
        </p>
        {item.stock === "In stock" ? (
          <CartBtn item={item} isInCart={isInCart} />
        ) : (
          <button className="card-btn" disabled>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
