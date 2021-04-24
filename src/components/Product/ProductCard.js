import { AiTwotoneHeart } from "react-icons/ai";
import { addCartItem } from "../Cart/helper";
import { addWishlistItem } from "../Wishlist/helper";
const ProductCard = ({ title, img, price, item, quantity }) => {
  const addProductToCart = async () => {
    let { _id, __v, ...cartItem } = item;
    cartItem = JSON.stringify(cartItem);
    console.log(cartItem);
    await addCartItem(cartItem)
      .then((data) => console.log("item added successfully!", data))
      .catch((err) => console.log(err));
  };
  const addProductToWishlist = async () => {
    let { _id, __v, ...wishlistItem } = item;
    wishlistItem = JSON.stringify(wishlistItem);
    console.log(wishlistItem);
    await addWishlistItem(wishlistItem)
      .then((data) => console.log("item added successfully!", data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="card">
        <span className="wishlist" onClick={addProductToWishlist}>
          <AiTwotoneHeart />
        </span>
        <img className="card-image" src={img} alt="oneplus" />
        <h1 className="card-header">{title}</h1>
        <p className="card-body">₹ {price}</p>
        <button className="card-btn btn-secondary" onClick={addProductToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
