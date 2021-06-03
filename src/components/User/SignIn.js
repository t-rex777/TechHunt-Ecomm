import React from "react";
import Nav from "../Nav";
import "./user.css";

function SignIn() {
  return (
    <>
      <Nav />
      <div className="content-center">
        <h1 className="text-center mb-2">Sign In</h1>
        <form className="form-validation">
          <div className="row">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
            />
            <br />
          </div>
          <div className="row">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
            />
            <br />
          </div>
          <div className="row">
            <label for="re-password">Re-enter Password</label>
            <input
              type="password"
              id="re-password"
              name="re-password"
              className="form-input"
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
