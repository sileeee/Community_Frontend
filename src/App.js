import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/User/Login/Login";
import SignUp from "./pages/User/SignUp/SignUp";
import NewsBoard from "./pages/Board/NewsBoard";

import "./App.css";
import './styleguide.css';
import PostDetail from "./pages/Board/PostDetail";


function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/news" element={<NewsBoard />} />
        <Route path="/news/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
