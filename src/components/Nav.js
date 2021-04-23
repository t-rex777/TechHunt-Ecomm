import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiTwotoneHeart,
  AiFillHome,
} from "react-icons/ai";

import { Link } from "react-router-dom";

const Nav = () => {
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
          <Link to="/cart">
            <li className="nav-item  ml-3">
              <AiOutlineShoppingCart />
              
            </li>
          </Link><p className="badge-circle-s danger"> 10</p>
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
