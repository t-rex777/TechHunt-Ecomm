import { AiTwotoneHeart } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

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
        <div className="quant-btn">
          <button>+</button>
          <p>Quantity : {quantity}</p>
          <button>-</button>
        </div>
        <span className="content-center place-btn">
          <p>Add to wishlist</p>
        </span>
        <span className="content-center remove-btn">
          <AiFillDelete />
        </span>
      </div>
    </div>
  );
};
export default Card;
