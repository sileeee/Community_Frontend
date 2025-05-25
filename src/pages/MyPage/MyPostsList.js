import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../Board/Board.module.css";
import { Table, Button } from "antd";
import { useLocation } from "react-router";
import { useAuth } from '../../components/common/AuthContext';
import { useTranslation } from "react-i18next";


function MyPostsList({category, selectedSubCategory, type}) {
  
    const navigate = useNavigate();
    const location = useLocation();
    const keyword = location.state?.keyword;
    const { userRole } = useAuth();
    const { t } = useTranslation();

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    
    const [noticeList, setNoticeList] = useState([]);
    const [subCategory, setSubCategory] = useState("");

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
    {
      title: t('STATUS'),
      dataIndex: "postStatus",
      align: "center",
      width: "10%",
      sorter: (a, b) => a.postStatus - b.postStatus,
      render: (text) => {
        if (text === "PUBLIC") return "공개";
        if (text === "PRIVATE") return "비공개";
        return "-";
      }
    }
    ];

    useEffect(() => {
        // 페이지가 로드될 때마다 subCategory를 초기화
        setSubCategory("");
    }, [location.key]);


    useEffect(() => {
      const fetchPosts = async () => {
        try {
            let tmp = [];
            let url = `${API_BASE_URL}/${type}/my?category=${String(subCategory || "").toUpperCase()}`;;
            if (subCategory === '') {
                url = `${API_BASE_URL}/${type}/my`;
                console.log("Fetching all posts for my page");
            }
            
            const res = await axios.get(url, {
                withCredentials: true,
            });

            if (res.status === 200) {
                tmp = res.data.data.map((item, index) => ({
                    ...item,
                    key: index,
                    createdAt: convertToStringDate(item.createdAt),
                }));
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
    if (selectedSubCategory !== undefined) {
      setSubCategory(selectedSubCategory);
    }
  }, [selectedSubCategory]);

    return (
        <div>
          {(
            noticeList && (
              <Table
                  columns={columns}
                  dataSource={noticeList}
                  rowClassName={(record) =>
                      styles.tableRow
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

export default MyPostsList;