import React, { useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "@sweetalert/with-react";

function Register({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const users = {
      email,
      password
    };

    if (email && password) {
      axios
        .post("/signup", { users })
        .then(res => {
          console.log(res.status);
          swal({
            title: "Account created successfully",
            icon: "success"
          });
          history.push("/login");
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <React.Fragment>
      <div className="register-wrapper">
        <div className="register-container">
          <h2>Register</h2>
          <div className="form-group">
            <input
              type="email"
              name="email"
              title=""
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
              required
            />
            <label>
              <span>Password</span>
            </label>
          </div>

          <div className="form-group">
            <button onClick={handleSubmit}>Create</button>
          </div>
          <hr />

          <Link to="/login">
            <div id="create">Already have an account? Login</div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
