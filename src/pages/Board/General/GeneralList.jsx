import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../Board.module.css";
import { Table, Button } from "antd";
import { useLocation } from "react-router";
import { useAuth } from '../../../components/common/AuthContext';
import { PushpinFilled } from '@ant-design/icons';
import { useTranslation } from "react-i18next";


function GeneralList({category, selectedSubCategory}) {
  
    const navigate = useNavigate();
    const location = useLocation();
    const keyword = location.state?.keyword;
    const { userRole } = useAuth();
    const { t } = useTranslation();

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    
    const [noticeList, setNoticeList] = useState([]);
    const [subCategory, setSubCategory] = useState("TOTAL");
    const [type, setType] = useState();
  
    const localStorageKey = `pinnedItems_${category}`;
  
    const [pinnedItems, setPinnedItems] = useState(() => {
        const savedPinnedItems = localStorage.getItem(localStorageKey);
        return savedPinnedItems ? JSON.parse(savedPinnedItems) : [];
    });


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
        let itemCategory = item.category ? item.category : "real_estate";
        let itemSubCategory = item.subCategory;

        navigate(`/board/${itemCategory}/${id}`, { state: { subCategory: itemSubCategory } });
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
      title: t('TOPIC'),
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
      title: t('AUTHOR'),
      dataIndex: "author",
      align: "center",
      width: "10%",
      responsive: ["md"], // 480px 이상에서만 표시
    },
    {
      title: t('CREATED_AT'),
      dataIndex: "createdAt",
      align: "center",
      width: "10%",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      responsive: ["md"], // 480px 이상에서만 표시
    },
    {
      title: t('LIKE'),
      dataIndex: "like",
      align: "center",
      width: "2%",
      sorter: (a, b) => a.like - b.like,
      responsive: ["md"], // 480px 이상에서만 표시
    },
    {
      title: t('VIEW'),
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

        if (category === "real_estate") {
            setType("real-estate");
        } else {
            setType("posts");
        }
        const savedPinnedItems = localStorage.getItem(localStorageKey);
        setPinnedItems(savedPinnedItems ? JSON.parse(savedPinnedItems) : []);

    }, [category]);

    useEffect(() => {
        // 페이지가 로드될 때마다 subCategory를 초기화
        setSubCategory("TOTAL");
    }, [location.key]);


    useEffect(() => {
      const fetchPosts = async () => {
        try {
          let tmp = [];

          if (keyword) {
            const urls = [
              `${API_BASE_URL}/posts/search?keyword=${keyword}`,
              `${API_BASE_URL}/real-estate/search?keyword=${keyword}`,
            ];
            const responses = await Promise.all(urls.map((url) => axios.get(url)));
            
            responses.forEach((res) => {
              if (res.status === 200 && Array.isArray(res.data.data)) {
                const data = res.data.data.map((item, index) => ({
                  ...item,
                  key: tmp.length + index,
                  createdAt: convertToStringDate(item.createdAt),
                }));
                tmp = [...tmp, ...data];
              }
            });
          } else {
            const url = `${API_BASE_URL}/${type}?category=${String(category || "").toUpperCase()}&subCategory=${subCategory}`;
            const res = await axios.get(url);

            if (res.status === 200) {
                tmp = res.data.data.map((item, index) => ({
                    ...item,
                    key: index,
                    createdAt: convertToStringDate(item.createdAt),
                }));
            }
          }
          setNoticeList(tmp);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      if (type) {
          fetchPosts();
      }
  }, [type, subCategory, keyword, API_BASE_URL, category]);
  

    useEffect(() => {
        if (selectedSubCategory) {
        setSubCategory(selectedSubCategory);
        }
    }, [selectedSubCategory]);

    const mergedData = [...pinnedItems, ...noticeList].filter(
        (item, index, self) => self.findIndex((i) => i.id === item.id) === index
    );

    return (
        <div>
          {keyword? (
            noticeList && (
              <Table
                  columns={columns}
                  dataSource={noticeList}
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
          )
          ):(
            noticeList && (
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
            )
          )}
        </div>
    );
}

export default GeneralList;