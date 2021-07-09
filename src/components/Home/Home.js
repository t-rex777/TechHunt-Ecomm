import React from "react";
import HomeCard from "./HomeCard";
import "./home.css";
import Nav from "./../../Nav/Nav";
import bannerImg from "../../images/banner.webp"

function App() {
 

  return (
    <div style={{backgroundColor:"#fff"}}>
      <Nav />
      <div className="home">
        <div className="banner">
          <span className="banner-text">Find your desired products </span>
          <img className="banner-image" src={bannerImg} alt="" />
        </div>
        <h2 className="mt-2 ml-2 text-center">TechHunt's products</h2>
        <HomeCard />
      </div>
    </div>
  );
}

export default App;
