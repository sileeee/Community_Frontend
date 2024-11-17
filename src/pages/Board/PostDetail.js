import "../../App.css";
import '../../styleguide.css';
import styles from "./PostDetail.module.css";
import ButtonSet from "../../components/Board/ButtonSet";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";

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
    
    const [pageId, setPageId] = useState(id);
    const [boardDetail, setBoardDetail] = useState();
    const [data, setData] = useState();
    const [subCategory, setSubCategory] = useState(sub);

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

    useEffect(() => {
        pageId &&
        axios
            .get(`https://localhost:8443/posts/${pageId}`)
            .then((res) => {
            if (res.status === 200) {
                setBoardDetail(res.data.data);
                setSubCategory(res.data.data.subCategory);
            }
            })
            .catch(function (error) {
                console.log(error);
            });
        }, [pageId]);
    
    useEffect(() => {
        if (!subCategory) return;
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

    return (
        <div className="handubi">
            <div className="div">
                <div className="parent-group"> 
                    <Nav />
                    <h1 className={styles.category}>{category}</h1>   

                    <div className={styles.container}>
                        {boardDetail && (
                        <Paper elevation={0} square className={styles.paper}>
                            
                            <div>
                            <ButtonSet id={pageId} />
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
                                            <LikeOutlined style={{paddingRight: "10px"}} />Like
                                            13
                                            </span><span style={{ paddingRight: "50px" }}>
                                            <CommentOutlined style={{paddingRight: "10px"}} />Comment
                                            4
                                            </span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr>
                                        <td className={styles.table_td_2}>
                                            {boardDetail.body}
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
                                onClick={() => {movePage(`/board/${category}`, 0)}}>
                                목록
                                </Button>
                                <Button type="primary" 
                                ghost 
                                size="large" 
                                icon={<LikeOutlined />}
                                style={{ border: "1px solid gray", color: "gray", width: "150px"}}
                                onClick={() => {}}>
                                좋아요
                                </Button>
                                </Flex>
                            </div>
                            
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