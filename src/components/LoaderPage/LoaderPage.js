import React from "react";
import "./loaderpage.css"
import loaderSvg from "./loader.svg"

function LoaderPage() {
  return (
    <div className="loadingPage">
      <div className="">
          <img src={loaderSvg} alt="" />
      </div>
    </div>
  );
}

export default LoaderPage;
