import React, { Component } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handeChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    const email = this.state.email;
    const password = this.state.password;
    const users = {
      email,
      password
    };
    if (email && password) {
      axios("/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({ users })
      })
        .then(res => {
          console.log(res);
          const token = res.data.token;
          const user = res.data.user.email;
          localStorage.setItem("token", token);
          localStorage.setItem("user", user);

          // this.props.history.push("/todolist");

          window.location.href = "/todolist";
        })
        .catch(err => console.log(err));
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="login-wrapper">
          <div className="login-container">
            <h2>Login</h2>
            <div className="form-group">
              <input
                type="text"
                name="email"
                title=""
                onChange={this.handeChange}
                required
              />
              <label>
                <span>Email</span>
              </label>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                title=""
                onChange={this.handeChange}
                required
              />
              <label>
                <span>Password</span>
              </label>
            </div>

            <div className="form-group">
              <button onClick={this.handleSubmit}>Login</button>
            </div>
            <hr />

            <Link to="/register">
              <div id="create">Don't have an account? Create one</div>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
