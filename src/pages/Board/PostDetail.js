import "../../App.css";
import styles from "./PostDetail.module.css";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";
import Comment from "../../components/Board/Comment"
import { useAuth } from '../../components/common/AuthContext';
import { getKorCategories } from "../../components/Board/getKorCategories"

import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { Button, Flex } from "antd";
import { UnorderedListOutlined, LikeOutlined, CaretUpOutlined, CaretDownOutlined, CalendarOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';
import RealEstatePostDetail from "./RealEstate/RealEstatePostDetail";
import GeneralPostDetail from "./General/GeneralPostDetail";
import SideContentList from "./SideContentList";



function PostDetail() {
  
    const navigate = useNavigate();
    const { category, id } = useParams();
    const location = useLocation();
    const subCategory = location.state?.subCategory;
    const keyword = location.state?.keyword;
    const { isLoggedIn } = useAuth();
    
    const [pageId, setPageId] = useState(id);
    const [isUserLike, setIsUserLike] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleCommentsCountChange = (count) => {
        setCommentsCount(count);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            setPageId(id);
        }
    }, [id]);

    const movePage = (url, id) => {
        if(id){
            navigate(url+id, {state: {id: id, category: category}});
        }else{
            navigate(url, {state: {category: category}});
        }
    };

    const toggledLikeBtn = (pageId) => {

        const newLikeState = !isUserLike; // 새 상태 계산
        setIsUserLike(newLikeState); // 상태 업데이트

        // 서버에 좋아요 상태 업데이트 요청
        axios
            .post(`${API_BASE_URL}/likes`, { postId: pageId, likeType: "UP" }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .catch(console.error);
    };

    useEffect(() => {
        if (!pageId) return;
    
        const fetchData = async () => {
            try {
                {isLoggedIn
                    ? axios.get(`${API_BASE_URL}/likes/${pageId}`, {
                        withCredentials: true,
                        headers: { 'Content-Type': 'application/json' },
                    }).then((res) => {
                        if(res.status === 200){
                            setIsUserLike(res.data.data);
                        }
                    })
                    : Promise.resolve({ status: 200, data: { data: false } })
                 } // 로그인되지 않은 경우 기본값 처리
                } catch (error) {
                    console.error("Error fetching post details:", error);
                }
        };
        fetchData();
    }, [pageId, isLoggedIn]);
    

    return (
        <div className="handubi">
            <div className="div">
                <div className="parent-group"> 
                    <Nav />
                    <h1 className={styles.category}>{getKorCategories(category)}</h1>   

                    <div className={styles.container}>
                        
                    {category.trim() === "real_estate" ? (
                        <RealEstatePostDetail commentsCount={commentsCount} category={category} pageId={pageId}/>
                        ) : (
                        <GeneralPostDetail commentsCount={commentsCount} category={category} pageId={pageId} keyword={keyword}/>
                        )}

                        <div className={styles.likeContainer}>
                            <Flex wrap gap="small">
                            <Button type="primary" 
                            ghost 
                            size="large"
                            className={styles.likeBtn}
                            icon={<UnorderedListOutlined />}
                            style={{ border: "1px solid gray", color: "gray", width: "150px"}}
                            onClick={() => {movePage(`/board/${category.toLowerCase()}`, 0)}}>
                            목록
                            </Button>
                            <Button type="primary" 
                            ghost
                            size="large" 
                            icon={<LikeOutlined />}
                            className={styles.likeBtn}
                            style={{
                                border: isUserLike ? "1.4px solid green" : "1px solid gray", // 테두리 색상
                                backgroundColor: isUserLike ? "#d9f4d8" : "transparent", // 내부 색상
                                color: isUserLike ? "green" : "gray", // 텍스트 및 아이콘 색상
                                width: "150px",
                            }}
                            onClick={() => isLoggedIn? toggledLikeBtn(pageId) : window.confirm('로그인 후 사용가능합니다.')}>
                            좋아요
                            </Button>
                            </Flex>
                        </div>
                        
                        <Comment postId={pageId} onCommentsCountChange={handleCommentsCountChange}/>

                        <div className={styles.list}>
                            {
                                subCategory && category != "search" ? (
                                    <SideContentList pageId={pageId} category={category} subCategory={subCategory}/>
                                ):(<></>)
                            } 
                        </div>
                    </div>

                    <div className="space"/>
                    <Foot />
                </div>
            </div>
        </div>
    );
}

export default PostDetail;