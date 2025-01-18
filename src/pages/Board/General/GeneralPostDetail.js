import "../../../App.css";
import styles from "../PostDetail.module.css";
import ButtonSet from "../../../components/Board/ButtonSet";
import HtmlRenderer from "../../../components/Board/HtmlRenderer";
import { useAuth } from '../../../components/common/AuthContext';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper } from "@mui/material";
import { LikeOutlined, CalendarOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';




function GeneralPostDetail({commentsCount, category, pageId}) {
  
    const { isLoggedIn, name, userRole } = useAuth();
    
    const [like, setLike] = useState(0);
    const [boardDetail, setBoardDetail] = useState();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


    const convertToStringDate = (param) => {
        let result = param.substr(0, 10) + " " + param.substr(11, 5);
        return result;
    };

    useEffect(() => {
        if (!pageId) return;
    
        const fetchData = async () => {
            try {
                const postResponse = await (
                    axios.get(`${API_BASE_URL}/posts/${pageId}`)
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
            return <ButtonSet id={pageId} page={"posts"} category={category}/>
        }
        if(boardDetail.author===name){
            return <ButtonSet id={pageId} page={"posts"} category={category}/>
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
export default GeneralPostDetail;