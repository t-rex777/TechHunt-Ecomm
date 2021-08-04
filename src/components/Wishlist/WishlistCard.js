import { useCart } from "../../cart-context/CartProvider";
import CartBtn from "../Buttons/CartBtn";
import WishlistDeleteBtn from "../Buttons/WishlistDeleteBtn";

const WishlistCard = ({ title, img, price, item }) => {
  const { state } = useCart();

  const isInCart = (productName) =>
    state.cart.find(({ item }) => item.name === productName);

  return (
    <div>
      <div className="card" style={{ height: "400px" }}>
        <img className="card-image" src={img} alt="oneplus" />
        <h1 className="card-header mt-1 text-center">{title}</h1>
        <p className="card-body text-center">₹ {price}</p>
        <div className="mb-1">
          <CartBtn item={item} isInCart={isInCart(title)} />
        </div>
        <span style={{ alignSelf: "center" }}>
          <WishlistDeleteBtn item={item} />
        </span>
      </div>
    </div>
  );
};
export default WishlistCard;
