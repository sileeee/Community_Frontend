import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../Board.module.css";
import { Card, Select, Pagination } from "antd";
import { useLocation } from "react-router";
import { getProductType } from "../../../components/Board/getProductType";
import { getProductStatus } from "../../../components/Board/getProductStatus";
import { getLocation } from "../../../components/Board/getLocation";
import { getKorSubCategories } from "../../../components/Board/getKorSubCategories";


function RealEstateList({category, selectedSubCategory}) {
  
    const navigate = useNavigate();
    const location = useLocation();
    const { Meta } = Card;  
    const { Option } = Select;
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    
    const [noticeList, setNoticeList] = useState([]);
    const [subCategory, setSubCategory] = useState("TOTAL");
    const [type, setType] = useState();
    const [sortOrder, setSortOrder] = useState("recent");

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);


    const truncateString = (str, maxLength) => {
        if (!str) return ''; // 문자열이 없을 때
        return str.length > maxLength ? str.slice(0, maxLength) + '..' : str;
    };

    const movePage = (item) => {
        let id = item.id + "";
        navigate(`/board/${category}/${id}`, { state: {prev: item.prev, next: item.next, subCategory: subCategory } });
    };

    const convertToStringDate = (param) => {
        let result = param.substr(0,10);
        return result;
    };

    const getLocationByValue = (category, value) => {
        const locations = getLocation(category);
        const location = locations.find(loc => loc.value === value);
        return location ? location.label : null; // 해당 value가 없으면 null 반환
    };

    const getProductStatusByValue = (category, value) => {
        const productStatuses = getProductStatus(category);
        const productStatus = productStatuses.find(loc => loc.value === value);
        return productStatus ? productStatus.label : null; // 해당 value가 없으면 null 반환
    };

    const getProductTypeByValue = (category, value) => {
        const productTypes = getProductType(category);
        const productType = productTypes.find(loc => loc.value === value);
        return productType ? productType.label : null; // 해당 value가 없으면 null 반환
    };

    useEffect(() => {
        if (selectedSubCategory) {
        setSubCategory(selectedSubCategory);
        }
    }, [selectedSubCategory]);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (category === "real_estate") {
            setType("real-estate");
        } else {
            setType("posts");
        }
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
    }, [category, API_BASE_URL]);

    useEffect(() => {

        if (category === "real_estate") {
            setType("real-estate");
        } else {
            setType("posts");
        }
        const fetchPosts = async () => {
        try {
            const url = `${API_BASE_URL}/${type}?category=${String(category || "").toUpperCase()}&subCategory=${subCategory}`;
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
        if(type){
        fetchPosts();
        }
    }, [category, type, subCategory]);

    const sortPosts = (posts, order) => {
        switch (order) {
          case "views":
            return [...posts].sort((a, b) => b.view - a.view);
          case "likes":
            return [...posts].sort((a, b) => b.like - a.like);
          default:
            return [...posts].sort((a, b) => b.createdAt - a.createdAt);
        }
    };

    const sortedData = sortPosts(noticeList, sortOrder);
    const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    
    return (
    <div>
        <div style={{ textAlign: "right", marginBottom: "16px" }}>
            <Select defaultValue="recent" style={{ width: 95 }} onChange={(value) => setSortOrder(value)}>
                <Option value="recent">최신순</Option>
                <Option value="views">조회수순</Option>
                <Option value="likes">좋아요순</Option>
            </Select>
        </div>
        <div style={{
            display: 'flex',
            flexWrap: 'wrap', // 줄바꿈 허용
            justifyContent: 'center', // 좌측 정렬
        }}
        >
        {noticeList && (
            paginatedData.map((notice, index) => (
                <Card
                    key={index}
                    hoverable
                    className={styles.customCard}
                    bodyStyle={{paddingTop: "2px", paddingLeft: "2vw", paddingRight: "2vw"}}
                    cover={
                        <img 
                        alt={notice.title || "example"} 
                        src={notice.thumbnailUrl || "/static/img/no_image.png"} 
                        className={styles.cardCover}
                        />
                        }
                        onClick={() => movePage(notice)}
                    >
                    <Meta 
                        title={
                            <div className={styles.cardTitle}>
                                <div>{truncateString(notice.title, 20)}</div>
                                <div>{notice.price || "- "}AED</div>
                            </div>
                        }
                        
                        description={
                            <div className={styles.cardDescription} style={{"padding": "0px"}}>
                            <div><b>{getProductTypeByValue(category.toUpperCase(), notice.productType) || "-"}</b></div>
                            <div><b>거래 형태 : </b>{getKorSubCategories(notice.subCategory.toUpperCase()) || "-"}</div>
                            <div><b>매물 상태 : </b>{getProductStatusByValue(category.toUpperCase(), notice.productStatus) || "-"}</div>
                            <div><b>실내 면적(sqf) : </b>{notice.innerArea || "-"}</div>
                            <div><b>전체 면적(sqf) : </b>{notice.totalArea || "-"}</div>
                            <div><b>위치 : </b>{getLocationByValue(category.toUpperCase(), notice.state) || "-"}</div>
                            </div>
                        } 
                    />
                </Card>
                ))
            )}
        </div>
        <Pagination
        style={{ textAlign: "center", justifyContent: "center"}}
        current={currentPage}
        pageSize={pageSize}
        total={sortedData.length}
        showSizeChanger
        onChange={(page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        }}
        />
    </div>
  );
}

export default RealEstateList;