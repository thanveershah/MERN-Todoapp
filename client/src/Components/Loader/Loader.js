import React, { Component } from "react";
import "./Loader.scss";
class Loader extends Component {
  render() {
    return (
      <div className="loader-container">
        <div className="loader">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }
}
export default Loader;
