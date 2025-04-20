import React, { useState, useEffect } from "react";
import styles from "./HotPost.module.css";
import axios from "axios";
import HtmlRenderer from "./HtmlRenderer";
import { useNavigate } from "react-router-dom";
import { FireTwoTone, MessageOutlined } from '@ant-design/icons';
import { getKorSubCategories } from "./getKorSubCategories";
import { useTranslation } from "react-i18next";


function HotPosts({category}) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState();
    const [weeklyHotposts, setWeeklyHotposts] = useState();
    const [monthlyHotPosts, setMonthlyHotPosts] = useState();
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
        if (type) {
            getHotPosts();
            getMonthlyHotPosts();
            getWeeklyHotPosts();
        }
    }, [type, category]);

    const getHotPosts = async () => {
        try {
            const res = await axios.get(
                `${API_BASE_URL}/${type}?category=${String(category || "").toUpperCase()}&criteria=view`
          );
          if (res.status === 200) {
            setPosts(res.data.data.slice(0, 4));
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
    };

    const getMonthlyHotPosts = async() => {
        try {

            const now = new Date();
            const pastDate = new Date();
            pastDate.setDate(now.getDate() - 30);

            const formatDate = (date) => date.toISOString().split(".")[0]; // ISO 8601 포맷 (밀리초 제거)

            const res = await axios.get(
                `${API_BASE_URL}/likes?category=${String(category || "").toUpperCase()}&startDate=${formatDate(pastDate)}&endDate=${formatDate(now)}`
            );
            if (res.status === 200) {
                const posts = res.data.data.slice(0, 4);
    
                const postDetails = await Promise.all(
                    posts.map(async (post) => {
                        const response = await axios.get(`${API_BASE_URL}/posts/${post.postId}`);
                        return response.data.data;
                    })
                );
    
                setMonthlyHotPosts(postDetails);
            }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
    }

    const getWeeklyHotPosts = async() => {
        try {
            const res = await axios.get(
                `${API_BASE_URL}/likes?category=${String(category || "").toUpperCase()}`
          );
          if (res.status === 200) {
            const posts = res.data.data.slice(0, 4);
    
                const postDetails = await Promise.all(
                    posts.map(async (post) => {
                        const response = await axios.get(`${API_BASE_URL}/posts/${post.postId}`);
                        return response.data.data;
                    })
                );
    
                setWeeklyHotposts(postDetails);
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
    }


    const movePage = (id, category) => {
        navigate(id === 0 ? `/board/${category}` : `/board/${category}/${id}`);
    };
  
    const renderLayout = () => {
        const noPicCategories = [
            "free_board",
            "job_search",
            "korean_company",
            "life",
            "child_care",
            "club",
        ];
        if (noPicCategories.includes(category)) {
            return (
                <div className={styles.noPicContainer}>
                    <div className={styles.noPicSquare}>
                    <table className={styles.noPicTable}>
                    <colgroup>
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "85%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                        <th className={styles.noPicHeader2} colSpan="2"><FireTwoTone twoToneColor="red"/>&nbsp; {t('WEEKLY_POSTS')}&nbsp;<FireTwoTone twoToneColor="red"/></th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {weeklyHotposts && weeklyHotposts.length > 0 ? (
                        weeklyHotposts.map((post, index) => (
                            <tr key={index} className={styles.noPicRow} onClick={() => movePage(post.id)}>
                            <td className={styles.noPicSubCategory}>
                            <button className={styles.noPicBadge}>{getKorSubCategories(post.subCategory)}</button>
                            </td>
                            <td className={styles.noPicTitle}>
                                {post.title}
                            </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="2" className={styles.noPicNoData}>
                            {t('NO_POSTS')}
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <table className={styles.noPicTable}>
                    <colgroup>
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "85%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                        <th className={styles.noPicHeader2} colSpan="2"><FireTwoTone twoToneColor="red"/>&nbsp; {t('MONTHLY_POSTS')}&nbsp;<FireTwoTone twoToneColor="red"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyHotPosts && monthlyHotPosts.length > 0 ? (
                        monthlyHotPosts.map((post, index) => (
                            <tr key={index} className={styles.noPicRow} onClick={() => movePage(post.id)}>
                            <td className={styles.noPicSubCategory}>
                            <button className={styles.noPicBadge}>{getKorSubCategories(post.subCategory)}</button>
                            </td>
                            <td className={styles.noPicTitle}>
                                {post.title}
                            </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="2" className={styles.noPicNoData}>
                            {t('NO_POSTS')}
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
            );
        }
        else{
            return (
            <div>
            <div className={styles.header3} colSpan="2"><FireTwoTone twoToneColor="red"/>&nbsp;{t('HOT_POSTS')}&nbsp;<FireTwoTone twoToneColor="red"/></div>
            <div className={styles.square}>
                {posts && posts.length > 0 ? (
                    posts
                    .map((post, index) => (
                    <div
                        key={index}
                        className={styles.newsItem}
                        onClick={() => movePage(post.id, category)}>
                        <img
                        className={styles.newsImage}
                        src={post.thumbnailUrl || "/static/img/no_image.png"}
                        alt={post.title}/>
                        <div className={styles.newsContent}>
                        <div className={styles.newsTitle}>
                            {post.title.length > 15 ? post.title.substr(0, 18) + ".." : post.title}
                        </div>
                        <div className={styles.newsBody}>
                            <HtmlRenderer htmlContent={post.body} maxLength={50} />
                        </div>
                        </div>
                    </div>
                    ))
                ) : (
                <p>{t('NO_POSTS')}</p>
                )}
            </div>
            </div>
        );
    }
    }

    return (
        <div className={styles.container}>
            {renderLayout()}
        </div>
    );
}

export default HotPosts;