import { AiTwotoneHeart } from "react-icons/ai";
import { RiTruckFill } from "react-icons/ri";
import { useCart } from "../../cart-context/CartContext";
import { addCartItem } from "../Cart/helper";
import { addWishlistItem, deleteWishlistItem } from "../Wishlist/helper";
import { getWishlistItems } from "./../Wishlist/helper";
import { getCartItems } from "./../Cart/helper";
import { Link } from "react-router-dom";
const ProductCard = ({ title, img, price, item, isInCart, isInWishlist }) => {
  const { dispatch } = useCart();
  const addProductToCart = async () => {
    let { _id, __v, ...cartItem } = item;
    cartItem = JSON.stringify(cartItem);
    console.log(cartItem);
    await addCartItem(cartItem)
      .then((data) => console.log("item added successfully!", data))
      .catch((err) => console.log(err));

    await getCartItems()
      .then((data) => dispatch({ type: "CART", payload: data }))
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

  const deleteProductFromWishlist = async () => {
    await deleteWishlistItem(isInWishlist)
      .then(async (data) => {
        console.log("item deleted successfully!", data);
        await getWishlistItems()
          .then((data) => dispatch({ type: "WISHLIST", payload: data }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
   await console.log(isInWishlist)
  };

  const cartButton = () => {
    if (isInCart === undefined) {
      return (
        <button className="card-btn btn-secondary" onClick={addProductToCart}>
          Add to cart
        </button>
      );
    }
    return (
      <Link to="/cart">
        <button className="card-btn btn-secondary">Go to cart</button>
      </Link>
    );
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

        <img className="card-image" src={img} alt="oneplus" />
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
          cartButton()
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
