import React from "react";
import "./Theme.css";
import { useRef } from "react";

import image from "../w1.jpg";
import image1 from "../w2.jpg";
import image2 from "../w3.jpg";
import image3 from "../w4.jpg";
import image5 from "../w5.jpg";

import { useGlitch } from "react-powerglitch";

const Test = () => {
  const glitch = useGlitch();
  return (
    <div className="Container">
      <h2 className="theme-head" ref={glitch.ref}>
        Themes
      </h2>

      <div className="main-card">
        <div className="card-1">
          <img className="image-1" src={image1}></img>

          <p className="p-theme">Romance</p>
        </div>

        <div className="card-1">
          <img className="image-1" src={image2}></img>
          <p className="p-theme">Sci-Fi</p>
        </div>
        <div className="card-1">
          <img className="image-1" src={image3}></img>
          <p className="p-theme">Horror</p>
        </div>
        <div className="card-1">
          <img className="image-1" src={image5}></img>
          <p className="p-theme">Comedy</p>
        </div>
      </div>
    </div>
  );
};

export default Test;
