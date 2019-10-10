import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Todolist from "./Components/TodoList/Todolist";
import WithAuth from "./Components/Auth/WithAuth";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <WithAuth path="/todolist" component={Todolist} />
      </Router>
    </div>
  );
}

export default App;
