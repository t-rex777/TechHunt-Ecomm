import React, { useState } from "react";
import { signin } from "./helper";
import { useCart } from "../../cart-context/CartProvider";
import { setTechHuntHeader } from "../../utils";
import { Redirect, Link } from "react-router-dom";
import { getCartItems } from "../Cart/helper";
import { getWishlistItems } from "./../Wishlist/helper";
import Nav from "./../../Nav/Nav";
import "./user.css";
import LoaderPage from "./../LoaderPage/LoaderPage";
import { throwToast } from "./../../App";

function SignIn() {
  const { state, dispatch } = useCart();
  const [shouldRedirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    email: "admin@gmail.com",
    password: "admin@gmail.com",
    re_password: "admin@gmail.com",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOADING", payload: true });
    try {
      if (user.password !== user.re_password) {
        // show error
        alert("Both passwords does not match!!");
        return "";
      }
      const data = await signin(user);
      const { userData, accessToken, refreshToken } = data;
      dispatch({ type: "SET_USER", payload: userData });
      setTechHuntHeader(accessToken);
      localStorage.setItem("_rtoken", refreshToken);

      // setting cart
      const cartData = await getCartItems();
      dispatch({ type: "SET_CART", payload: cartData }); //is not updating on signin, but works on reload.

      // setting wishlist
      const wishlistData = await getWishlistItems();
      dispatch({ type: "SET_WISHLIST", payload: wishlistData });
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, { message: "Signed in", color: "success" });

      setRedirect(true);
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING", payload: false });
      throwToast(dispatch, {
        message: "Wrong credentials!",
        color: "danger",
      });
    }
  };
  return (
    <>
      <Nav />
      {shouldRedirect && <Redirect to="/" />}
      {state.loading && <LoaderPage />}
      <div className="signin">
        <h1 className="text-center mb-2">Sign In</h1>
        <form className="form-validation" onSubmit={formSubmit}>
          <div className="row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={user.email}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={user.password}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="row">
            <label htmlFor="re_password">Re-enter Password</label>
            <input
              type="password"
              id="re_password"
              name="re_password"
              className="form-input"
              value={user.re_password}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="submit-btn">
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </div>
        </form>
        <p className="text-center mt-2">
          Don't have an account ? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </>
  );
}

export default SignIn;
