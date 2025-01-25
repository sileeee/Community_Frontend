import React, { useState, useEffect } from "react";
import styles from "./HotPost.module.css";
import axios from "axios";
import HtmlRenderer from "./HtmlRenderer";
import { useNavigate } from "react-router-dom";
import { FireTwoTone } from '@ant-design/icons';
import { getKorSubCategories } from "./getKorSubCategories";


function HotPosts({category}) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState();
    const [type, setType] = useState("posts");
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
                <table className={styles.noPicTable}>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "85%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className={styles.noPicHeader2} colSpan="2"><FireTwoTone twoToneColor="red"/>&nbsp;인기 글&nbsp;<FireTwoTone twoToneColor="red"/></th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {posts && posts.length > 0 ? (
                  posts.map((post, index) => (
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
                      게시글이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
            );
        }
        else{
            return (
            <div>
            <div className={styles.header3} colSpan="2"><FireTwoTone twoToneColor="red"/>&nbsp;인기 글&nbsp;<FireTwoTone twoToneColor="red"/></div>
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
                <p>게시글이 없습니다.</p>
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