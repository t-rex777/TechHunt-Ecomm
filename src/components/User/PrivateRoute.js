import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  return (
    <>
      {localStorage.getItem("_rtoken") &&
      typeof localStorage.getItem("_rtoken") === "string" ? (
        <Route {...props} />
      ) : (
        <Redirect from={props.path} to="/signin" />
      )}
    </>
  );
};

export default PrivateRoute;
