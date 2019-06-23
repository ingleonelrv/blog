import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./Menu";
import Users from "./Users/index";
import Publications from "./Publications/index";
import Tasks from "./Tasks/index";

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margin">
      <Route exact path="/" component={Users} />
      <Route exact path="/tasks" component={Tasks} />
      <Route exact path="/publications/:index" component={Publications} />
    </div>
  </BrowserRouter>
);

export default App;
