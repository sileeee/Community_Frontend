import "../../App.css";
import '../../styleguide.css';
import styles from "./PostDetail.module.css";
import ButtonSet from "../../components/Board/ButtonSet";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";
import HtmlRenderer from "../../components/Board/HtmlRenderer";
import Comment from "../../components/Board/Comment"
import { useAuth } from '../../components/common/AuthContext';
import { getKorCategories } from "../../components/Board/getKorCategories"

import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { Paper } from "@mui/material";
import { List, Button, Flex } from "antd";
import { UnorderedListOutlined, LikeOutlined, CaretUpOutlined, CaretDownOutlined, CalendarOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';




function PostDetail() {
  
    const navigate = useNavigate();
    const { category, id } = useParams();
    const location = useLocation();
    const sub = location.state?.subCategory;
    const { isLoggedIn, name, userRole } = useAuth();
    
    const [postCategory, setPostCategory] = useState();
    const [pageId, setPageId] = useState(id);
    const [like, setLike] = useState(0);
    const [isUserLike, setIsUserLike] = useState(false);
    const [boardDetail, setBoardDetail] = useState();
    const [data, setData] = useState();
    const [subCategory, setSubCategory] = useState(sub);
    const [commentsCount, setCommentsCount] = useState(0);

    const handleCommentsCountChange = (count) => {
        setCommentsCount(count);
    };


    useEffect(() => {
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

    const convertToStringDate = (param) => {
        let result = param.substr(0, 10) + " " + param.substr(11, 5);
        return result;
    };

    const toggledLikeBtn = (pageId) => {

        const newLikeState = !isUserLike; // 새 상태 계산
        setIsUserLike(newLikeState); // 상태 업데이트

        // 서버에 좋아요 상태 업데이트 요청
        axios
            .post(`https://localhost:8443/likes`, { postId: pageId, likeType: "UP" }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                // 좋아요 개수 갱신
                axios
                    .get(`https://localhost:8443/likes/count/${pageId}`)
                    .then((res) => {
                        if (res.status === 200) {
                            setLike(res.data.data);
                        }
                    })
                    .catch(console.error);
            })
            .catch(console.error);
    };

    useEffect(() => {
        if (!pageId) return;
    
        const fetchData = async () => {
            try {
                const [postResponse, likeCountResponse, likeStatusResponse] = await Promise.all([
                    axios.get(`https://localhost:8443/posts/${pageId}`),
                    axios.get(`https://localhost:8443/likes/count/${pageId}`),
                    isLoggedIn
                        ? axios.get(`https://localhost:8443/likes/${pageId}`, {
                            withCredentials: true,
                            headers: { 'Content-Type': 'application/json' },
                        })
                        : Promise.resolve({ status: 200, data: { data: false } }), // 로그인되지 않은 경우 기본값 처리
                ]);
    
                if (postResponse.status === 200) {
                    const { category, subCategory } = postResponse.data.data;
                    setBoardDetail(postResponse.data.data);
                    setPostCategory(category);
                    setSubCategory(subCategory);
                }
    
                if (likeCountResponse.status === 200) {
                    setLike(likeCountResponse.data.data);
                }
    
                if (isLoggedIn && likeStatusResponse.status === 200) {
                    setIsUserLike(likeStatusResponse.data.data);
                }
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };
    
        fetchData();
    }, [pageId, isLoggedIn]);
    
    
    useEffect(() => {
        if (!subCategory) return;
        if (category == "search") return;
        let data_tmp = [];
        axios
        .get(`https://localhost:8443/posts?category=${category.toUpperCase()}&subCategory=${subCategory}`)
        .then((res) => {
            if (res.status === 200) {
                let totalElements = res.data.data.length;
                let tmp = res.data.data;
                let index = tmp.findIndex((item) => item.id === parseInt(pageId));

                if (index !== 0) {
                    data_tmp.push({
                        type: "prev",
                        title: tmp[index - 1].title,
                        id: tmp[index - 1].id,
                    });
                }
                if (index !== totalElements - 1) {
                    data_tmp.push({
                        type: "next",
                        title: tmp[index + 1].title,
                        id: tmp[index + 1].id,
                    });
                }
                data_tmp && setData(data_tmp);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [pageId, subCategory]);

    function checkUser(boardDetail){
        if(userRole=='ADMIN'){
            return <ButtonSet id={pageId} page={"posts"} category={category}/>
        }
        if(boardDetail.author===name){
            return <ButtonSet id={pageId} page={"posts"} category={category}/>
        }
    }

    return (
        <div className="handubi">
            <div className="div">
                <div className="parent-group"> 
                    <Nav />
                    <h1 className={styles.category}>{getKorCategories(category)}</h1>   

                    <div className={styles.container}>
                        {boardDetail && (
                        <Paper elevation={0} square className={styles.paper}>
                            
                            <div>
                            {checkUser(boardDetail)}
                            {/* <ButtonSet id={pageId} page={"posts"} category={category}/> */}
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
                                            <div className={styles.author_container}>
                                                <span style={{ paddingRight: "50px" }}>
                                                <b>{boardDetail.author}</b>
                                                </span>
                                            </div>
                                            <span style={{ paddingRight: "50px" }}>
                                            <CalendarOutlined style={{paddingRight: "10px"}} />
                                            {convertToStringDate(boardDetail.createdAt)}
                                            </span>
                                            <span style={{ paddingRight: "50px" }}>
                                            <EyeOutlined style={{paddingRight: "10px"}} />
                                            {boardDetail.view}
                                            </span>
                                            <span style={{ paddingRight: "50px" }}>
                                            <LikeOutlined style={{paddingRight: "5px"}} />Like&nbsp;&nbsp;
                                            {like}
                                            </span><span style={{ paddingRight: "50px" }}>
                                            <CommentOutlined style={{paddingRight: "5px"}} />Comment&nbsp;&nbsp;
                                            {commentsCount}
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
                            <div className={styles.likeContainer}>
                                <Flex wrap gap="small" className="site-button-ghost-wrapper">
                                <Button type="primary" 
                                ghost 
                                size="large"
                                icon={<UnorderedListOutlined />}
                                style={{ border: "1px solid gray", color: "gray", width: "150px"}}
                                onClick={() => {movePage(`/board/${postCategory.toLowerCase()}`, 0)}}>
                                목록
                                </Button>
                                <Button type="primary" 
                                ghost
                                size="large" 
                                icon={<LikeOutlined />}
                                style={{
                                    border: isUserLike ? "1.4px solid green" : "1px solid gray", // 테두리 색상
                                    backgroundColor: isUserLike ? "#d9f4d8" : "transparent", // 내부 색상
                                    color: isUserLike ? "green" : "gray", // 텍스트 및 아이콘 색상
                                    width: "150px",
                                }}
                                onClick={() => isLoggedIn? toggledLikeBtn(pageId) : alert('로그인 후 사용가능합니다.')}>
                                좋아요
                                </Button>
                                </Flex>
                            </div>
                            
                            <Comment postId={pageId} onCommentsCountChange={handleCommentsCountChange}/>

                            <div className={styles.list}>
                            {data && data.length !== 0 && (
                                <List
                                bordered
                                dataSource={data}
                                renderItem={(item) =>
                                    item.type === "prev" ? (
                                    <List.Item
                                        onClick={() => movePage(`/board/${category}/`, item.id)}
                                        className={styles.list_item} >
                                        <span className={styles.icon_container}>
                                        <CaretUpOutlined />
                                            <span className={styles.prev_btn}>
                                            이전 글
                                            </span>
                                        </span>
                                        {item.title}
                                    </List.Item>
                                    ) : (
                                    <List.Item
                                        onClick={() => movePage(`/board/${category}/`, item.id)}
                                        className={styles.list_item}>
                                        <span className={styles.icon_container}>
                                        <CaretDownOutlined />
                                            <span className={styles.prev_btn}>
                                            다음 글
                                            </span>
                                        </span>
                                        {item.title}
                                    </List.Item>
                                    )
                                }/>
                            )}
                            </div>
                        </Paper>
                        
                        )}
                    </div>

                    <div className="space"/>
                            <Foot />
                </div>
            </div>
        </div>
    );
}

export default PostDetail;