import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Home = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="header-wrapper">
      <header>
        <div>
          <Link to="/">
            <img
              width="100"
              src={process.env.PUBLIC_URL + "/images/logointer.png"}
              alt=""
            />
          </Link>
        </div>
        <div className="right-section">
          {localStorage.length === 0 ? (
            <Link to="/login">Login</Link>
          ) : (
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Home;
