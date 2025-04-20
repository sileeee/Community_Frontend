import React, { useState, useEffect } from "react";
import { Button } from "antd";
import styles from "./WriteButton.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../common/AuthContext';
import { useTranslation } from "react-i18next";


function WriteButton() {

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  const { category } = useParams(); // lower case

  const moveToPage = () => {
    if(isLoggedIn){
      navigate(`/board/new/${String(category || '')}`);
    }else{
      window.confirm("로그인 후 글쓰기가 가능합니다.");
      navigate(`/login`);
    }
  };

  return (
    <div className={styles.container}>
      <Button
        style={{ background: "rgba(0, 115, 47, 1)"}}
        type="primary"
        className={styles.addbutton}
        size="large"
        onClick={moveToPage}>
        {t('WRITE')}
      </Button>
    </div>
  );
}

export default WriteButton;