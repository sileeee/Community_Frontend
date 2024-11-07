import React from "react";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import { Router, Switch } from "react-router-dom/cjs/react-router-dom.min";

import BigBanner from "./routes/BigBanner";

import "./App.css";
import './styleguide.css';


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/">
            <div className="handubi">
              <div className="div">
                <BigBanner />
                <div className="text-wrapper-7">Everything in one place</div>
              </div>
            </div>
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
