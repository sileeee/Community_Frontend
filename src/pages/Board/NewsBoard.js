import "../../App.css";
import '../../styleguide.css';
import React from "react";
import styles from "./NewsBoard.module.css";
import BoardList from "./BoardList";
import Nav from "../../components/Navbar/Nav";


function NewsBoard() {
  return (
    <div className="handubi">
        <div className="div">
            <div className="parent-group">
                <Nav />
                <div className={styles.container}>
                    <h1>UAE News</h1>
                    <BoardList />
                </div>
            </div>
        </div>
    </div>
  );
}

export default NewsBoard;