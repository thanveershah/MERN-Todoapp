import axios from "axios";

export default function SetAuth(token) {
  if (token) {
    axios.defaults.headers.common["x-access-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-access-token"];
  }
}
