import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "core-js";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

// import  'emailjs-com';
import "jquery";

import { icons } from "./assets/icons";

import { Provider } from "react-redux";
import store from "./store";

React.icons = icons;

axios.defaults.baseURL = "http://5.9.111.198:13880/api/";
axios.defaults.headers.common["Authorization"] =
  "Bearer" + localStorage.getItem("login");
axios.defaults.headers.common = localStorage.getItem("document");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
