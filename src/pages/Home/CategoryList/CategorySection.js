import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './CategorySection.module.css';
import { useNavigate } from "react-router-dom";
import { getKorCategories } from "../../../components/Board/getKorCategories";
import { getKorSubCategories } from "../../../components/Board/getKorSubCategories";
import HtmlRenderer from "../../../components/Board/HtmlRenderer";
import { FireTwoTone, MessageTwoTone } from '@ant-design/icons';



const CategorySection = ({ category, postList, layout }) => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState(postList);
  const [recentPosts, setRecentPosts] = useState(postList);
  
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
      const res = await axios.get(
        `https://localhost:8443/posts?category=${String(category || "").toUpperCase()}&criteria=view`
      );
      if (res.status === 200) {
        setPosts(res.data.data.slice(0, 7));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const getRecentPosts = async () => {
    try {
      const res = await axios.get(
        `https://localhost:8443/posts?category=${String(category || "").toUpperCase()}&criteria=createdAt`
      );
      if (res.status === 200) {
        setRecentPosts(res.data.data.slice(0, 7));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const movePage = (id) => {
      if(id === 0){
        navigate(`/board/${category}`);
      } else {
        navigate(`/board/${category}/${id}`)
      }
  };

  const renderLayout = () => {
    switch (layout) {
      case 1:
        return (
          <div className={styles.container}>
            <div className={styles.square}>
              {posts && posts.length > 0 ? (
                [...posts]
                  .sort((a, b) => a.locationId - b.locationId)
                  .map((post, index) => (
                    <div
                      key={index}
                      className={styles.newsItem}
                      onClick={() => movePage(post.postId)}
                    >
                      <img
                        className={styles.newsImage}
                        src={post.imageUrl || "/static/img/handubi-logo.png"}
                        alt={post.title}
                      />
                      <div className={styles.newsContent}>
                        <div className={styles.newsTitle}>
                          {post.title.length > 15
                            ? post.title.substr(0, 15) + "..."
                            : post.title}
                        </div>
                        <div className={styles.newsBody}>
                          <HtmlRenderer
                            htmlContent={post.content}
                            maxLength={70}
                          />
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

      case 2:
        return (
          <div className={styles.container}>
            <div className={styles.square2}>
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
                {posts && posts.length > 0 ? (
                  posts.map((post, index) => (
                    <tr key={index} className={styles.row} onClick={() => movePage(post.id)}>
                      <td className={styles.subCategory}>
                      <button className={styles.badge}>{getKorSubCategories(post.subCategory)}</button>
                      </td>
                      <td className={styles.title}>
                        {post.title}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className={styles.noData}>
                      게시글이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "85%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className={styles.header2} colSpan="2"> 최신 글&nbsp;&nbsp;<MessageTwoTone/></th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {recentPosts && recentPosts.length > 0 ? (
                  recentPosts.map((rpost, index) => (
                    <tr key={index} className={styles.row}  onClick={() => movePage(rpost.id)}>
                      <td className={styles.subCategory}>
                        <button className={styles.badge}>{getKorSubCategories(rpost.subCategory)}</button>
                      </td>
                      <td className={styles.title}>
                        {rpost.title}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className={styles.noData}>
                      게시글이 없습니다.
                    </td>
                  </tr>
                )}
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
      <div className={styles.header}>
        <h2>{getKorCategories(category)}</h2>
        <button className={styles.viewAll} onClick={() => movePage(0)}>
          View All
        </button>
      </div>
      {renderLayout()}
    </div>
  );
};

export default CategorySection;