import React, { useEffect, useState } from "react";
import appleImg from "../../images/apple.png";
import samsungImg from "../../images/samsung.png";
import oneplusImg from "../../images/oneplus.png";
import HomeCard from "./HomeCard";
import "./home.css"
import Nav from './../../Nav/Nav';

function App() {
  const [slideCounter, setSlideCounter] = useState(0);
  const [slideStyle, setSlideStyle] = useState({
    slide1: { display: "flex" },
    slide2: { display: "none" },
    slide3: { display: "none" },
  });

  useEffect(() => {
    if (slideCounter % 3 === 0) {
      setSlideStyle({
        slide1: { display: "flex" },
        slide2: { display: "none" },
        slide3: { display: "none" },
      });
    } else if (slideCounter % 3 === 1) {
      setSlideStyle({
        slide1: { display: "none" },
        slide2: { display: "flex" },
        slide3: { display: "none" },
      });
    } else if (slideCounter % 3 === 2) {
      setSlideStyle({
        slide1: { display: "none" },
        slide2: { display: "none" },
        slide3: { display: "flex" },
      });
    }
  }, [slideCounter]);

  return (
    <div>
      <Nav />
      <div className="home">
        <div className="banner">
          <div className="slide" style={slideStyle.slide1}>
            <img src={samsungImg} alt="" />
          </div>
          <div className="slide" style={slideStyle.slide2}>
            <img src={appleImg} alt="" />
          </div>
          <div className="slide" style={slideStyle.slide3}>
            <img src={oneplusImg} alt="" />
          </div>
          <div
            className="prev"
            onClick={() => {
              setSlideCounter(slideCounter - 1);
            }}
          >
            &#10094;
          </div>
          <div
            className="next"
            onClick={() => {
              setSlideCounter(slideCounter + 1);
            }}
          >
            &#10095;
          </div>
        </div>
        <HomeCard />
      </div>
    </div>
  );
}

export default App;
