import React, { useState } from "react";
import { signup } from "./helper";
import { Redirect, Link } from "react-router-dom";
import Nav from "../../Nav/Nav";
import "./user.css";
import LoaderPage from "./../LoaderPage/LoaderPage";
import { useCart } from "../../cart-context/CartProvider";

function SignUp() {
  const { state, dispatch } = useCart();
  const [shouldRedirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
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
      await signup(user);
      setRedirect(true);
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      dispatch({ type: "LOADING", payload: false });

      console.log(error);
    }
  };
  return (
    <>
      <Nav />
      {shouldRedirect && <Redirect to="/signin" />}
      {state.loading && <LoaderPage />}

      <div className="signin">
        <h1 className="text-center mb-2">Sign Up</h1>
        <form className="form-validation" onSubmit={formSubmit}>
          <div className="row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={user.name}
              onChange={handleChange}
            />
            <br />
          </div>
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
          Already have an account ? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
