import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './CategorySection.module.css';
import { useNavigate } from "react-router-dom";
import { getKorCategories } from "../../../components/Board/getKorCategories";
import { getKorSubCategories } from "../../../components/Board/getKorSubCategories";
import HtmlRenderer from "../../../components/Board/HtmlRenderer";
import { FireTwoTone, MessageOutlined } from '@ant-design/icons';



const TwoByTwoGrid = ({ category, postList, layout }) => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState(postList);
  const [recentPosts, setRecentPosts] = useState(postList);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  useEffect(() => {
    if (layout === 2) {
      getHotPosts();
      getRecentPosts();
    } else {
      setPosts(postList); // 기본 게시글 세팅
    }
  }, [layout, category, postList]);

  const getHotPosts = async () => {
    try {
        if (Array.isArray(category)) {
            const allPosts = [];
            for (const cat of category) {
                const res = await axios.get(
                    `${API_BASE_URL}/posts?category=${String(cat || "").toUpperCase()}&criteria=view`
                );
                if (res.status === 200) {
                    allPosts.push(...res.data.data.slice(0, 4));
                }
            }
            setPosts(allPosts);
          }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const getRecentPosts = async () => {
    try {
        if (Array.isArray(category)) {
            const allPosts = [];
            for (const cat of category) {
                const res = await axios.get(
                    `${API_BASE_URL}/posts?category=${String(cat || "").toUpperCase()}&criteria=createdAt`
                );
            if (res.status === 200) {
                allPosts.push(...res.data.data.slice(0, 4));
            }
        }
        setRecentPosts(allPosts);
        }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const movePage = (id, category) => {
      if(id === 0){
        navigate(`/board/${category}`);
      } else {
        navigate(`/board/${category}/${id}`)
      }
  };

  const renderLayout = (category) => {
    switch (layout) {
      case 1:
        // TODO
      case 2:
        return (
          <div className={styles.container}>
            <div className={styles.gridSquare2}>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "85%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className={styles.header2} colSpan="2"><FireTwoTone twoToneColor="red"/>&nbsp;인기 글&nbsp;<FireTwoTone twoToneColor="red"/></th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {(() => {
                    return posts && posts.length > 0 ? (
                        posts
                        .filter((post) => post.category === category.toUpperCase())
                        .map((post, index) => (
                            <tr key={index} className={styles.row} onClick={() => movePage(post.id, category)}>
                                <td className={styles.subCategory}>
                                    <button className={styles.badge}>{getKorSubCategories(post.subCategory)}</button>
                                </td>
                                <td className={styles.title}>{post.title}</td>
                            </tr>
                          ))
                        ) : (
                            <tr>
                              <td colSpan="2" className={styles.noData}>
                                게시글이 없습니다.
                              </td>
                            </tr>
                        );
                    })()}
                </tbody>
            </table>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "85%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className={styles.header2} colSpan="2"> 최신 글&nbsp;&nbsp;<MessageOutlined style={{color: "green"}}/> </th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                    {(() => {
                        console.log("posts");
                        console.log(posts);
                        
                        return recentPosts && recentPosts.length > 0 ? (
                            recentPosts
                            .filter((post) => post.category === category.toUpperCase())
                            .map((post, index) => (
                                <tr key={index} className={styles.row} onClick={() => movePage(post.id, category)}>
                                    <td className={styles.subCategory}>
                                        <button className={styles.badge}>{getKorSubCategories(post.subCategory)}</button>
                                    </td>
                                    <td className={styles.title}>{post.title}</td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                <td colSpan="2" className={styles.noData}>
                                    게시글이 없습니다.
                                </td>
                                </tr>
                            );
                    })()}
                </tbody>
            </table>
            </div>
          </div>
        );

      default:
        return <p>Invalid layout type selected.</p>;
    }
  };

  return (
    <div className={styles.newsSection}>
        <div className={styles.newsBox}>
        {category.map((cat, index) => (
            <div key={index} className={styles.box}>
            <div className={styles.header}>
                <h2>{getKorCategories(cat)}</h2>
                <button className={styles.viewAll} onClick={() => movePage(0, cat)}>
                View All
                </button>
            </div>
            {renderLayout(cat)}
            </div>
        ))}
        </div>
    </div>
  );
};

export default TwoByTwoGrid;