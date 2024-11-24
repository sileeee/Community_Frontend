import "../../App.css";
import '../../styleguide.css';
import React from "react";
import { useParams } from 'react-router-dom';

import BoardList from "./BoardList";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";


function Board() {

  const { category } = useParams(); // lower case

  return (
    <div className="handubi">
        <div className="div">
            <div className="parent-group">
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