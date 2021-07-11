import React from "react";
import "./loaderpage.css"
import loaderSvg from "./loader.svg"

function LoaderPage() {
  return (
    <div className="loadingPage">
      <div className="">
          <img src={loaderSvg} alt="" />
      </div>
      <h3>Loading, please wait...</h3>
    </div>
  );
}

export default LoaderPage;
