import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/User/Login/Login";
import SignUp from "./pages/User/SignUp/SignUp";
import NewsBoard from "./pages/Board/NewsBoard";

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
        {/* 이거 경로 잘 수정해야함. 수정하고 BoardList.jsx의 movePage()함수 살펴보기 */}
        <Route path="/news" element={<NewsBoard />} /> 

        <Route path="/news/:id" element={<PostDetail />} />

        <Route path="/new/NEWS" element={<PostWrite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
