import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Board.module.css";
import { Paper } from "@mui/material";
import WriteButton from "../../components/Board/WriteButton";
import SubCategoryButton from "../../components/Board/SubCategoryButton";
import { useLocation } from "react-router";
import HotPosts from "../../components/Board/HotPosts";
import RealEstateList from "./RealEstate/RealEstateList";
import GeneralList from "./General/GeneralList";
import { useTranslation } from "react-i18next";


function BoardList({category}) {  // lower case
  
  const location = useLocation();
  const keyword = location.state?.keyword;
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  const [subCategory, setSubCategory] = useState("TOTAL");
  const [banners, setBanners] = useState([]);
  const [type, setType] = useState();
  const { t } = useTranslation();
  
  const localStorageKey = `pinnedItems_${category}`;
  
  const getFilteredPosts = (selected) => {
    setSubCategory(selected);
  };

  useEffect(() => {
    // 페이지가 로드될 때마다 subCategory를 초기화
    setSubCategory("TOTAL");
  }, [location.key]);

  useEffect(() => {
    if (category === "real_estate") {
      setType("real-estate");
    } else {
      setType("posts");
    }
  }, [category]);

  useEffect(() => {
    setBanners([]);
    const fetchPost = async () => {
    axios
      .get(`${API_BASE_URL}/ads/banners?category=${String(category || "").toUpperCase()}`)
      .then((res) => {
        const data = res.data.data;
        setBanners(data);
      })
      .catch(console.error);
    };
    if(type){
      fetchPost();
    }
  }, [category, API_BASE_URL]);


  return (
    <div className={styles.container}>
      <h1>{t(category.toUpperCase())}</h1>

      <div className={styles.bannerContainer}>
        {banners.map((banner, index) => (
            <a
              key={index}
              href={banner.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className={styles.bannerImage}
              />
            </a>
          ))}
      </div>

      <div className={styles.datagrid}>
        <Paper elevation={0} square className={styles.paper}>
          <div className={styles.buttonContainer}>
            {!keyword && (
                <SubCategoryButton
                  category={category.toUpperCase()}
                  onSubCategoryChange={(selectedCategory) => getFilteredPosts(selectedCategory)}
                />
            )}
            {!keyword && (
              <WriteButton />
            )}
          </div>
          {!keyword && (
            <HotPosts category={category}/>
          )}
          {(category.trim() === "real_estate" && !keyword)? (
            <RealEstateList category={category} selectedSubCategory={subCategory}/>
          ) : (
            <GeneralList category={category} selectedSubCategory={subCategory} />
          )}

        </Paper>
    </div>
    </div>
  );
}

export default BoardList;