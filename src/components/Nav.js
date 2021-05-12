import { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiTwotoneHeart,
  AiFillHome,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

import { Link } from "react-router-dom";
import { useCart } from "../cart-context/CartContext";

const Nav = () => {
  const { state } = useCart();
  const [toggle, setToggle] = useState(false);
  const toggleChange = (e) => {
    setToggle(!toggle);
  };
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
            <li className="nav-item dropdown">
              <AiFillHome />
            </li>
          </Link>
          <Link to="/wishlist">
            <li className="nav-item  ml-3 dropdown">
              <AiTwotoneHeart />
            </li>
          </Link>
          <p className="badge-circle-s danger dropdown">
            {state.wishlist.length}
          </p>
          <Link to="/cart">
            <li className="nav-item  ml-3 dropdown">
              <AiOutlineShoppingCart />
            </li>
          </Link>
          <p className="badge-circle-s danger dropdown">{state.cart.length}</p>
          <Link to="">
            <li className="nav-item ml-3 mr-3 dropdown">
              <AiOutlineSearch />
            </li>
          </Link>

          <li className="nav-item ml-3 mr-3 hamBurger" onClick={toggleChange}>
            <GiHamburgerMenu />
          </li>
        </ul>
      </nav>
      {toggle && (
        <ul className="stacked-list">
          <Link to="/">
            <li className="stacked-list-item">
              <h3>
                <AiFillHome /> Home
              </h3>
            </li>
          </Link>

          <Link to="/wishlist">
            <li className="stacked-list-item">
              <h3 className="mobile-icon">
                <AiTwotoneHeart /> Wishlist
                <span className="mobile-badge-nav">{state.wishlist.length}</span>
              </h3>
            </li>
          </Link>

          <Link to="/cart">
            <li className="stacked-list-item">
              <h3>
                <AiOutlineShoppingCart /> Cart <span className="mobile-badge-nav">{state.cart.length}</span>
              </h3>
            </li>
          </Link>

          <Link to="/search">
            <li className="stacked-list-item">
              <h3>
                <AiOutlineSearch /> Search
              </h3>
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
};
export default Nav;
