import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

function WithAuth({ component: Component, ...rest }) {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    function checkToken() {
      axios("/checktoken")
        .then(res => {
          if (localStorage.length === 0) {
            setRedirect(true);
          } else {
            setRedirect(false);
          }
          if (res.status === 200) {
            setLoading(false);
          } else {
            setLoading(true);
          }
        })
        .catch(err => {
          setLoading(false);
          setRedirect(true);
        });
    }
    checkToken();
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        loading ? (
          <Loader />
        ) : redirect ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
export default WithAuth;
