import React, { useState } from "react";
import { signin } from "./helper";
import { useCart } from "../../cart-context/CartContext";
import { setTechHuntHeader } from "../../utils";
import { Redirect } from "react-router-dom";
import Nav from "../Nav";
import "./user.css";
import { techHuntAPI } from './../../utils';

function SignIn() {
  const { dispatch } = useCart();
  const [shouldRedirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    email: "admin@gmail.com",
    password: "admin",
    re_password: "admin",
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
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Nav />
      {shouldRedirect && <Redirect to="/" />}
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
      </div>
    </>
  );
}

export default SignIn;
