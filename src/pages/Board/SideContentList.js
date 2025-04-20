import "../../App.css";
import styles from "./PostDetail.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { List } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";


function SideContentList({ pageId, category, subCategory }) {

    const navigate = useNavigate();
    const [data, setData] = useState();
    const [type, setType] = useState("posts");
    const { t } = useTranslation();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        if (category === "real_estate") {
          setType("real-estate");
        } else {
          setType("posts");
        }
      }, [category]);

    useEffect(() => {
        let data_tmp = [];
        const fetchPosts = async () => {
            axios
            .get(`${API_BASE_URL}/${type}?category=${category.toUpperCase()}&subCategory=${subCategory}`)
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
        };
        if (type) {
            fetchPosts();
        }
    }, [pageId]);


    const movePage = (url, id) => {
        if(id){
            navigate(url+id, {state: {id: id, category: category}});
        }else{
            navigate(url, {state: {category: category}});
        }
    };

    return (
        <div>
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
                            {t('PREPOST')}
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
                            {t('NEXTPOS')}
                            </span>
                        </span>
                        {item.title}
                    </List.Item>
                    )
                }/>
            )}
        </div>
    );
}


export default SideContentList;