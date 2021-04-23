import { AiTwotoneHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { addCartItem } from "../Cart/helper";
const ProductCard = ({ title, img, price, item, quantity }) => {
  return (
    <div>
      <div className="card">
        <span className="wishlist">
          <AiTwotoneHeart />
        </span>
        <img className="card-image" src={img} alt="oneplus" />
        <h1 className="card-header">{title}</h1>
        <p className="card-body">₹ {price}</p>
        <button
          className="card-btn btn-secondary"
          onClick={() => {
            let { _id, __v, ...cartItem } = item;
            cartItem = JSON.stringify(cartItem);
            console.log(cartItem);
            addCartItem(cartItem)
              .then((data) => console.log("item added successfully!", data))
              .catch((err) => console.log(err));
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
