import { Button, Flex } from "antd";
import styles from "./SubCategoryButton.module.css";
import React, { useState } from "react";
import { getCategories } from "../Board/getCategories";
import { useTranslation } from "react-i18next";

function SubCategoryButton({category, onSubCategoryChange}) {

  const [selectedCategory, setSelectedCategory] = useState("TOTAL");
  const { t } = useTranslation();

  const categories = getCategories(category);
  
  return (
    <div className={styles.container}>
      <Flex wrap gap="small">
        {categories.map((subCategory, index) => (
          <Button
            key={index}
            type="primary"
            ghost
            size="large"
            className={styles.button}
            style={{
              border: "1px solid #04AA6D",
              color: selectedCategory === subCategory.value ? "white" : "green",
              backgroundColor: selectedCategory === subCategory.value ? "green" : "transparent"
            }}
            onClick={() => {
              setSelectedCategory(subCategory.value);
              onSubCategoryChange(subCategory.value);
            }}
          >
            {t(subCategory.value)}
          </Button>
        ))}
      </Flex>
    </div>
  );
}

export default SubCategoryButton;