import { RiTruckFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import CartBtn from "../Buttons/CartBtn";
import WishlistBtn from "../Buttons/WishlistBtn";
const ProductCard = ({
  productId,
  title,
  img,
  price,
  item,
  isInCart,
  isInWishlist,
}) => {
  return (
    <div>
      <div className="card">
        <WishlistBtn item={item} isInWishlist={isInWishlist} />
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
        <CartBtn item={item} isInCart={isInCart} />
      </div>
    </div>
  );
};
export default ProductCard;
