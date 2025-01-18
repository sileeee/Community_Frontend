import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../Board.module.css";
import { Paper } from "@mui/material";
import { Table, Button } from "antd";
import WriteButton from "../../../components/Board/WriteButton";
import SubCategoryButton from "../../../components/Board/SubCategoryButton";
import { useLocation } from "react-router";
import { getKorCategories } from "../../../components/Board/getKorCategories"
import { useAuth } from '../../../components/common/AuthContext';
import { PushpinFilled } from '@ant-design/icons';
import HotPosts from "../../../components/Board/HotPosts";


function RealEstateBoardList() {  // lower case
  
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = location.state?.keyword;
  const { userRole } = useAuth();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const category = "real_estate";
  
  const [noticeList, setNoticeList] = useState([]);
  const [subCategory, setSubCategory] = useState("TOTAL");
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const localStorageKey = `pinnedItems_${category}`;
  const [pinnedItems, setPinnedItems] = useState(() => {
    // 컴포넌트가 처음 렌더링될 때 `localStorage`에서 핀 데이터를 가져옴
    const savedPinnedItems = localStorage.getItem("pinnedItems");
    return savedPinnedItems ? JSON.parse(savedPinnedItems) : [];
  });
  
  const getFilteredPosts = (selected) => {
    setSubCategory(selected);
  };

  const togglePin = (record) => {
    let updatedPinnedItems;

    if (pinnedItems.some((pinned) => pinned.id === record.id)) {
      // 이미 핀된 게시글을 제거
      updatedPinnedItems = pinnedItems.filter((pinned) => pinned.id !== record.id);
    } else {
      // 새 게시글을 핀에 추가
      updatedPinnedItems = [...pinnedItems, record];
    }
    setPinnedItems(updatedPinnedItems);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedPinnedItems)); // 카테고리별 고정게시글 저장
  };


  const movePage = (item) => {
    let id = item.id + "";

    if (category !== "search") {
      navigate(`/board/${category}/${id}`, { state: {prev: item.prev, next: item.next, subCategory: subCategory } });
    }
    else if (keyword) {
      navigate(`/board/${category}/${id}`, { state: {prev: item.prev, next: item.next } });
    }

  };

  const convertToStringDate = (param) => {
    let result = param.substr(0,10);
    return result;
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      align: "center",
      width: "2%",
      responsive: ["md"], // 480px 이상에서만 표시
    },
    {
      title: "제목",
      dataIndex: "title",
      align: "center",
      width: "60%",
      render: (text, record) => (
        <>
          {pinnedItems.some((pinned) => pinned.id === record.id) && (
            <PushpinFilled style={{ color: "#00732f", marginRight: 8 }} />
          )}
          {text}{" "}
        </>
      ),
    },
    {
      title: "작성자",
      dataIndex: "author",
      align: "center",
      width: "10%",
      responsive: ["md"], // 480px 이상에서만 표시
    },
    {
      title: "작성날짜",
      dataIndex: "createdAt",
      align: "center",
      width: "10%",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      responsive: ["md"], // 480px 이상에서만 표시
    },
    {
      title: "좋아요",
      dataIndex: "like",
      align: "center",
      width: "2%",
      sorter: (a, b) => a.like - b.like,
      responsive: ["md"], // 480px 이상에서만 표시
    },
    {
      title: "조회수",
      dataIndex: "view",
      align: "center",
      width: "10%",
      sorter: (a, b) => a.view - b.view,
    },
    ...(userRole === "ADMIN"
      ? [
          {
            title: "고정하기",
            dataIndex: "pin",
            align: "center",
            width: "1%",
            render: (_, record) => (
              <Button
                type={
                  pinnedItems.some((pinned) => pinned.id === record.id)
                    ? "primary"
                    : "default"
                }
                onClick={() => togglePin(record)}
              >
                {pinnedItems.some((pinned) => pinned.id === record.id)
                  ? "Unpin"
                  : "Pin"}
              </Button>
            ),
            responsive: ["md"], // 480px 이상에서만 표시
          },
        ]
      : []),
  ];

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
    setBanners([]);
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/ads/banners?category=${String(category || "").toUpperCase()}`)
      .then((res) => {
        const data = res.data.data;
        setBanners(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, API_BASE_URL]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = keyword
          ? `${API_BASE_URL}/real-estate/search?keyword=${keyword}`
          : `${API_BASE_URL}/real-estate?subCategory=${subCategory}`;
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
  fetchPosts();
  }, [category, subCategory, keyword]);

  const mergedData = [
    ...pinnedItems,
    ...noticeList.filter(
      (item) => !pinnedItems.some((pinned) => pinned.id === item.id)
    ),
  ];

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

          {noticeList && (
              <Table
                  columns={columns}
                  dataSource={mergedData}
                  rowClassName={(record) =>
                    pinnedItems.some((pinned) => pinned.id === record.id)
                      ? styles.pinnedRow
                      : styles.tableRow
                  }
                  size="middle"
                  pagination={{
                  position: ["none", "bottomRight"],
                  }}
                  onRow={(record, rowIndex) => {
                  return {
                      onClick: (event) => {
                      movePage(record);
                      },
                  };
                  }}
            />
          )}
        </Paper>
    </div>
    </div>
  );
}

export default RealEstateBoardList;