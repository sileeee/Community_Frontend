import React, { useState, useEffect } from "react";
import { Button } from "antd";
import styles from "./WriteButton.module.css";
import { useNavigate, useParams } from "react-router-dom";


function WriteButton({ value }) {

  const navigate = useNavigate();

  const { category } = useParams();

  const moveToWritePage = () => {
    navigate(`/board/new/${String(category || '').toUpperCase()}`);
  };

  return (
    <div className={styles.container}>
      <Button
        style={{ background: "rgba(0, 115, 47, 1)"}}
        type="primary"
        className={styles.addbutton}
        size="large"
        onClick={moveToWritePage}>
        글쓰기
      </Button>
    </div>
  );
}

export default WriteButton;