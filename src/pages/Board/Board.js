import "../../App.css";
import React from "react";
import { useParams } from 'react-router-dom';

import BoardList from "./BoardList";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";
import RealEstateBoardList from "./RealEstate/RealEstateBoardList";


function Board() {

  const { category } = useParams(); // lower case

  return (
    <div className="handubi">
        <div className="div">
            <div className="parent-group">
                <Nav />
                {category.trim() === "real_estate" ? (
                  <RealEstateBoardList />
                ) : (
                  <BoardList category={category}/>
                )}
                <div className="space"/>
                <Foot />
            </div>
        </div>
    </div>
  );
}

export default Board;