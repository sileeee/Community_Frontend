import React from "react";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import { Router, Switch } from "react-router-dom/cjs/react-router-dom.min";

import Home from "./routes/Home";

import "./App.css";
import './styleguide.css';


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/">
                <Home />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
