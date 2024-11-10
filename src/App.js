import React from "react";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import { Router, Switch } from "react-router-dom/cjs/react-router-dom.min";

import Home from "./pages/Home/Home";
import Login from "./pages/User/Login/Login";
import SignUp from "./pages/User/SignUp/SignUp";
import NewsBoard from "./pages/Board/NewsBoard";

import "./App.css";
import './styleguide.css';


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/home">
              <Home />
          </Route>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/sign-up">
              <SignUp />
          </Route>
          <Route path="/news">
              <NewsBoard />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
