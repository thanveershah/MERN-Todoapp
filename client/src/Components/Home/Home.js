import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="left-section">
        <div>
          <h1>Welcome to my Todo App</h1>
          <h3>
            From work to play, <br /> To Do is the way to get stuff done every
            day.
          </h3>
          <Link to="/todolist" id="join">
            Start Now
          </Link>
        </div>
      </div>
      <div className="right-section">
        <img src={process.env.PUBLIC_URL + "/images/banner.jpg"} alt="" />
      </div>
    </div>
  );
};

export default Home;
