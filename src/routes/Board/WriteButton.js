import React, { useState, useEffect } from "react";
import { Button } from "antd";
import styles from "./WriteButton.module.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";


function WriteButton({ value }) {
  
  const history = useHistory();
  const account = useSelector((state) => state.user.loginSuccess);
  const [isLogged, setIsLogged] = useState(false);

  const moveToWritePage = () => {
    if(isLogged){
      history.push(window.location.pathname + "/write");
    } else {
      history.push({
      pathname: `/login`});
    }
  };

  useEffect(() => {
    if (account && account.status === "OK") 
      setIsLogged(true);
  }, [account]);

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