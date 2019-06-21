import React from "react";
import ReactDOM from "react-dom";
import "./CSS/index.css";
import "./CSS/icons.css";
import App from "./Components/App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
