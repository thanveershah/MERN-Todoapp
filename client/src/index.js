import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SetAuth from "./Components/Auth/SetAuth";

SetAuth(localStorage.token);

ReactDOM.render(<App />, document.getElementById("root"));
