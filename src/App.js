import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/User/Login/Login";
import SignUp from "./pages/User/SignUp/SignUp";
import Board from "./pages/Board/Board";

import "./App.css";
import './styleguide.css';
import PostDetail from "./pages/Board/PostDetail";
import PostWrite from "./pages/Board/PostWrite";


function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      
        <Route path="/board/:category" element={<Board/>} /> 
        <Route path="/board/:category/:id" element={<PostDetail />} />
        <Route path="/board/new/:category" element={<PostWrite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
