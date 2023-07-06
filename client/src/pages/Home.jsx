import React, { useState } from "react";
import { Link } from "react-router-dom";
import cloud from "./cloud.png";
import online from "./online.png";
import pause from "./pause.png";
import plane from "./plane.png";
import play from "./play.png";

import "./homee.css";

const Home = () => {
  
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = () => {
    setIsPaused((prevState) => !prevState);
  };

  return (
    <>
      
        <div className="mainy">
          <div className="content">
            <button className="button1">
              <Link to={`/Shop`} >Explore</Link>
            </button>
          </div>
          <img
            src={cloud}
            id="clouds"
            className={isPaused ? "paused" : ""}
          />
          <img src={plane} id="airplane" className={isPaused ? "paused" : ""} />
          <div id="package" className={isPaused ? "paused" : ""}>
            <img src={online} className="package1" />
            <img src={online} className="package2" />
            <img src={online} className="package3" />
          </div>
          {isPaused ? (
  <img
    src={play}
    id="playBtn"
    onClick={handleClick}
    className={isPaused ? "paused" : ""}
  />
) : (
  <img
    src={pause}
    id="pauseBtn"
    onClick={handleClick}
    className={isPaused ? "paused" : ""}
  />
)}

        </div>
      
    </>
  );
};

export default Home;
