import React from "react";
import { Button, Flex } from "antd";
import styles from "./SubCategoryButton.module.css";

function SubCategoryButton({onSubCategoryChange}) {

  return (
    <div className={styles.container}>
        <Flex wrap gap="small" className="site-button-ghost-wrapper">
        <Button type="primary" 
          ghost 
          size="large" 
          className={styles.button}
          style={{ border: "1px solid #04AA6D", color: "green"}}
          onClick={() => {onSubCategoryChange("TOTAL")}}>
        TOTAL
        </Button>
        <Button type="primary" 
          ghost 
          size="large" 
          className={styles.button}
          style={{ border: "1px solid #04AA6D", color: "green"}}
          onClick={() => {onSubCategoryChange("SOCIETY")}}>
        사회
        </Button>
        <Button type="primary" 
          ghost 
          size="large" 
          className={styles.button}
          style={{ border: "1px solid #04AA6D", color: "green"}}
          onClick={() => {onSubCategoryChange("POLITICS")}}>
        정치
        </Button>
        <Button type="primary" 
          ghost 
          size="large" 
          className={styles.button}
          style={{ border: "1px solid #04AA6D", color: "green"}}
          onClick={() => {onSubCategoryChange("SPORTS")}}>
        스포츠
        </Button>
        <Button type="primary" 
          ghost 
          size="large" 
          className={styles.button}
          style={{ border: "1px solid #04AA6D", color: "green"}}
          onClick={() => {onSubCategoryChange("ENTERTAINMENT")}}>
        연예
        </Button>
        <Button type="primary" 
          ghost 
          size="large" 
          className={styles.button}
          style={{ border: "1px solid #04AA6D", color: "green"}}
          onClick={() => {onSubCategoryChange("ETC")}}>
        ETC
        </Button>
        </Flex>
    </div>
  );
}

export default SubCategoryButton;