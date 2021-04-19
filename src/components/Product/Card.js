import { AiTwotoneHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
const Card = ({ title, img, price, item, quantity }) => {
  return (
    <div>
      <div className="card">
        <span className="wishlist">
          <AiTwotoneHeart />
        </span>
        <img className="card-image" src={img} alt="oneplus" />
        <h1 className="card-header">{title}</h1>
        <p className="card-body">{price}</p>
        <button className="card-btn btn-secondary">Add to cart</button>
      </div>
    </div>
  );
};
export default Card;
