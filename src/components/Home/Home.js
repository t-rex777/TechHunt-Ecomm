import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import "./home.css";
import Nav from "./../../Nav/Nav";
import appleImg from "../../images/apple.png";
import samsungImg from "../../images/samsung.png";
import oneplusImg from "../../images/oneplus.png";
import covidDonationImg from "../../images/covidDonation.jpg";
import covidHeroesImg from "../../images/covidHeroes.jpg";
import paySafelyImg from "../../images/paySafely.jpg";
import safeDeliveryImg from "../../images/safeDelivery.jpg";
import vaccineSlotFinderImg from "../../images/vaccineSlotFinder.jpg";
import regdVaccineImg from "../../images/regdVaccine.jpg";

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
    <div style={{backgroundColor:"#fff"}}>
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

        <h2 className="mt-2 ml-2">TechHunt's response to COVID-19</h2>
        <div className="panel mt-2 mb-2">
          <div className="panel-item">
            <img src={covidDonationImg} alt="covid donation" />
          </div>
          <div className="panel-item">
            <img src={covidHeroesImg} alt="heroes" />
          </div>
          <div className="panel-item">
            <img src={regdVaccineImg} alt="regd for vaccine" />
          </div>
          <div className="panel-item">
            <img src={vaccineSlotFinderImg} alt="slot finder" />
          </div>
          <div className="panel-item">
            <img src={safeDeliveryImg} alt="safe delivery" />
          </div>
          <div className="panel-item">
            <img src={paySafelyImg} alt="pay safe" />
          </div>
        </div>

        <h2 className="mt-2 ml-2">TechHunt's products</h2>
        <HomeCard />
      </div>
    </div>
  );
}

export default App;
