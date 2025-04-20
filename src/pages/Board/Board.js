import "../../App.css";
import React from "react";
import { useParams } from 'react-router-dom';

import BoardList from "./BoardList";
import Nav from "../../components/Navbar/Nav";
import TopBar from "../../components/TopBar/TopBar";
import Foot from "../../components/Footer/Foot";


function Board() {

  const { category } = useParams(); // lower case

  return (
    <div className="handubi">
        <div className="div">
            <div className="parent-group">
                <TopBar />
                <Nav />
                <BoardList category={category}/>
                <div className="space"/>
                <Foot />
            </div>
        </div>
    </div>
  );
}

export default Board;