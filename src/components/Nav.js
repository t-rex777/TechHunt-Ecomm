import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiTwotoneHeart,
  AiFillHome,
} from "react-icons/ai";

import { Link } from "react-router-dom";
import { useCart } from "../cart-context/CartContext";

const Nav = () => {
  const {state} = useCart();
  return (
    <div>
      <nav className="nav dark text-white">
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/" className="nav-logo ">
              TechHunt
            </Link>
          </li>
          <Link to="/">
            <li className="nav-item">
              <AiFillHome />
            </li>
          </Link>
          <Link to="/wishlist">
            <li className="nav-item  ml-3">
              <AiTwotoneHeart />
            </li>
          </Link>
          <p className="badge-circle-s danger"> {state.wishlist.length}</p>
          <Link to="/cart">
            <li className="nav-item  ml-3">
              <AiOutlineShoppingCart />
            </li>
          </Link>
          <p className="badge-circle-s danger">{state.cart.length}</p>
          <Link to="">
            <li className="nav-item ml-3 mr-3">
              <AiOutlineSearch />
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
export default Nav;
