import React, { useState, useEffect } from "react";
import styles from "../Board/Board.module.css";
import { Paper } from "@mui/material";
import SubCategoryButton from "../../components/Board/SubCategoryButton";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import MyPostsList from "./MyPostsList";


function MyPosts() {  // lower case
  const category = "my_posts"; // 고정된 카테고리로 설정
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = location.state?.keyword;
  
  const [subCategory, setSubCategory] = useState("");
  const [type, setType] = useState();
  const { t } = useTranslation();
  
  const getFilteredPosts = (selected) => {
    setSubCategory(selected);
  };

  useEffect(() => {
    console.log("subCategory 값:", subCategory);
  }, [subCategory]);

  useEffect(() => {
    // 페이지가 새로고침될 때만 초기화
    if (!location.state) {
      setSubCategory("");
    }
  }, [location.key]);

  useEffect(() => {
    if (subCategory === "REAL_ESTATE") {
      setType("real-estate");
    } else {
      setType("posts");
    }
  }, [subCategory]);

  return (
    <div className={styles.container}>

      <div className={styles.datagrid}>
        <Paper elevation={0} square className={styles.paper}>
          <div className={styles.buttonContainer}>
            {!keyword && (
                <SubCategoryButton
                  category={category.toUpperCase()}
                  onSubCategoryChange={(selectedCategory) => getFilteredPosts(selectedCategory)}
                />
            )}
            </div>
            <MyPostsList 
                category={category} 
                selectedSubCategory={subCategory}
                type={type}
            />
        </Paper>
    </div>
    </div>
  );
}

export default MyPosts;