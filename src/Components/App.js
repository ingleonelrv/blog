import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./Menu";
import Users from "./Users/index";

const App = () => (
  <BrowserRouter>
    <Menu />
    <Route exact path="/" component={Users} />
  </BrowserRouter>
);

export default App;
