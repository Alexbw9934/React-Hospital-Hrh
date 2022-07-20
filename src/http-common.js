import axios from "axios";
export default axios.create({
  baseURL: "http://5.9.111.198:13880/api",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});
