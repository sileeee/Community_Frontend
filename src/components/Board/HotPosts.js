import React, { useState, useEffect } from "react";
import styles from "./HotPost.module.css";
import axios from "axios";
import HtmlRenderer from "../../components/Board/HtmlRenderer";
import { useNavigate } from "react-router-dom";


function HotPosts({category}) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        getHotPosts();
    }, [category, API_BASE_URL]);

    const getHotPosts = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/posts?category=${String(category || "").toUpperCase()}&criteria=view`
          );
          if (res.status === 200) {
            setPosts(res.data.data.slice(0, 4));
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
    };

    const movePage = (id, category) => {
        navigate(id === 0 ? `/board/${category}` : `/board/${category}/${id}`);
    };
  
    const renderLayout = () => {
        return (
            <div className={styles.square}>
                {posts && posts.length > 0 ? (
                    posts
                    .map((post, index) => (
                    <div
                        key={index}
                        className={styles.newsItem}
                        onClick={() => movePage(post.postId)}>
                        <img
                        className={styles.newsImage}
                        src={post.imageUrl || "/static/img/handubi-logo.png"}
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
                <p>게시글이 없습니다.</p>
                )}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {renderLayout()}
        </div>
    );
}

export default HotPosts;