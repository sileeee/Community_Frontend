import "../../../App.css";
import styles from "../PostDetail.module.css";
import ButtonSet from "../../../components/Board/ButtonSet";
import HtmlRenderer from "../../../components/Board/HtmlRenderer";
import { useAuth } from '../../../components/common/AuthContext';
import { getKorSubCategories } from "../../../components/Board/getKorSubCategories";
import { getProductType } from "../../../components/Board/getProductType";
import { getProductStatus } from "../../../components/Board/getProductStatus";
import { getLocation } from "../../../components/Board/getLocation";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper } from "@mui/material";
import { LikeOutlined, CalendarOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';




function RealEstatePostDetail({commentsCount, category, pageId}) {
  
    const { isLoggedIn, name, userRole } = useAuth();
    
    const [like, setLike] = useState(0);
    const [boardDetail, setBoardDetail] = useState();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const getLocationByValue = (category, value) => {
        const locations = getLocation(category);
        const location = locations.find(loc => loc.value === value);
        return location ? location.label : null; // 해당 value가 없으면 null 반환
    };
    
    const getProductStatusByValue = (category, value) => {
        const productStatuses = getProductStatus(category);
        console.log(category);
        const productStatus = productStatuses.find(loc => loc.value === value);
        return productStatus ? productStatus.label : null; // 해당 value가 없으면 null 반환
    };
    
    const getProductTypeByValue = (category, value) => {
        const productTypes = getProductType(category);
        const productType = productTypes.find(loc => loc.value === value);
        return productType ? productType.label : null; // 해당 value가 없으면 null 반환
    };

    const convertToStringDate = (param) => {
        let result = param.substr(0, 10) + " " + param.substr(11, 5);
        return result;
    };

    useEffect(() => {
        if (!pageId) return;
    
        const fetchData = async () => {
            try {
                const postResponse = await (
                    axios.get(`${API_BASE_URL}/real-estate/${pageId}`)
                );
                if (postResponse.status === 200) {
                    setBoardDetail(postResponse.data.data);
                    setLike(postResponse.data.data.like);
                }
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };
    
        fetchData();
    }, [pageId, isLoggedIn]);
    
    
    function checkUser(boardDetail){
        if(userRole=='ADMIN'){
            return <ButtonSet id={pageId} page={"real-estate"} category={category}/>
        }
        if(boardDetail.author===name){
            return <ButtonSet id={pageId} page={"real-estate"} category={category}/>
        }
    }

    return (
        <div>
            {boardDetail && (
                <Paper elevation={0} square className={styles.paper}>
                    
                    <div>
                        {checkUser(boardDetail)}
                    </div>
                    
                    <table className={styles.table_}>
                        <thead>
                            <tr>
                                <th className={styles.subCategory_box}>{boardDetail.subCategory}</th>
                            </tr>
                            <tr>
                                <th className={styles.table_title}>{boardDetail.title}</th>
                            </tr>
                            <tr>
                            <td className={styles.table_info}>
                                <span className={styles.infoSpan}>
                                    <div className={styles.iconWithText}>
                                        <CalendarOutlined />
                                        {convertToStringDate(boardDetail.createdAt)}
                                    </div>
                                </span>

                                <span className={styles.infoSpan}>
                                    <div className={styles.iconWithText}>
                                        <EyeOutlined />
                                        {boardDetail.view}
                                    </div>
                                </span>

                                <span className={styles.infoSpan}>
                                    <div className={styles.iconWithText}>
                                        <LikeOutlined />
                                        Like {like}
                                    </div>
                                </span>

                                <span className={styles.infoSpan}>
                                    <div className={styles.iconWithText}>
                                        <CommentOutlined />
                                        Comment {commentsCount}
                                    </div>
                                </span>
                            </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.table_td_2}>
                                <table className={styles.detailTable}>
                                        <tbody>
                                            <tr>
                                                <td>건물 종류</td>
                                                <td>{getProductTypeByValue(category.toUpperCase(), boardDetail.productType) || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>거래 형태</td>
                                                <td>{getKorSubCategories(boardDetail.subCategory) || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>매물 상태</td>
                                                <td>{getProductStatusByValue(category.toUpperCase(), boardDetail.productStatus) || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>실내 면적</td>
                                                <td>{boardDetail.innerArea?boardDetail.innerArea:"-"}</td>
                                            </tr>
                                            <tr>
                                                <td>전체 면적</td>
                                                <td>{boardDetail.totalArea?boardDetail.totalArea:"-"}</td>
                                            </tr>
                                            <tr>
                                                <td>주</td>
                                                <td>{getLocationByValue(category.toUpperCase(), boardDetail.state) || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>가격(AED)</td>
                                                <td>{boardDetail.price?boardDetail.price:"-"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <HtmlRenderer htmlContent={boardDetail.body} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Paper>
            )}
        </div>    
    );
}
export default RealEstatePostDetail;