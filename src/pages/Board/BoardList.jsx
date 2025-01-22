import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Board.module.css";
import { Paper } from "@mui/material";
import WriteButton from "../../components/Board/WriteButton";
import SubCategoryButton from "../../components/Board/SubCategoryButton";
import { useLocation } from "react-router";
import { getKorCategories } from "../../components/Board/getKorCategories"
import HotPosts from "../../components/Board/HotPosts";
import RealEstateList from "./RealEstate/RealEstateList";
import GeneralList from "./General/GeneralList";


function BoardList({category}) {  // lower case
  
  const location = useLocation();
  const keyword = location.state?.keyword;
  const API_BASE_URL = "http://localhost:8080"
  // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  const [noticeList, setNoticeList] = useState([]);
  const [subCategory, setSubCategory] = useState("TOTAL");
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState();
  
  const localStorageKey = `pinnedItems_${category}`;

  const [pinnedItems, setPinnedItems] = useState(() => {
    const savedPinnedItems = localStorage.getItem(localStorageKey);
    return savedPinnedItems ? JSON.parse(savedPinnedItems) : [];
  });
  
  const getFilteredPosts = (selected) => {
    setSubCategory(selected);
  };

  const convertToStringDate = (param) => {
    let result = param.substr(0,10);
    return result;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedPinnedItems = localStorage.getItem(localStorageKey);
    setPinnedItems(savedPinnedItems ? JSON.parse(savedPinnedItems) : []);
  }, [category]);

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
    setLoading(true);
    const fetchPost = async () => {
    axios
      .get(`${API_BASE_URL}/ads/banners?category=${String(category || "").toUpperCase()}`)
      .then((res) => {
        const data = res.data.data;
        setBanners(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
    };
    if(type){
      fetchPost();
    }
  }, [category, API_BASE_URL]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = keyword
          ? `${API_BASE_URL}/${type}/search?keyword=${keyword}`
          : `${API_BASE_URL}/${type}?category=${String(category || "").toUpperCase()}&subCategory=${subCategory}`;
        const res = await axios.get(url);

        if (res.status === 200) {
          let totalElements = res.data.data.length;
          let tmp = res.data.data.map((item, index) => ({
            ...item,
            key: totalElements - index,
            createdAt: convertToStringDate(item.createdAt),
          }));
          setNoticeList(tmp);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (type) {
      fetchPosts();
    }
  }, [category, type, keyword]);

  return (
    <div className={styles.container}>
      <h1>{getKorCategories(category)}</h1>

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
            <WriteButton />
          </div>
          
          <HotPosts category={category}/>
          {category.trim() === "real_estate" ? (
            <RealEstateList category={category}/>
          ) : (
            <GeneralList category={category} selectedSubCategory={subCategory} />
          )}

        </Paper>
    </div>
    </div>
  );
}

export default BoardList;