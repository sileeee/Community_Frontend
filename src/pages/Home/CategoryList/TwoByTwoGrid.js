import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './TwoByTwoGrid.module.css';
import { useNavigate } from "react-router-dom";
import { getKorCategories } from "../../../components/Board/getKorCategories";
import { getKorSubCategories } from "../../../components/Board/getKorSubCategories";
import HtmlRenderer from "../../../components/Board/HtmlRenderer";
import { FireTwoTone, MessageOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";


const TwoByTwoGrid = ({ category, postList, layout }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (Array.isArray(category)) {
          const hotPosts = [];
          const recentPostsData = [];
          for (const cat of category) {
            const hotRes = await axios.get(
              `${API_BASE_URL}/posts?category=${String(cat || "").toUpperCase()}&criteria=view`
            );
            const recentRes = await axios.get(
              `${API_BASE_URL}/posts?category=${String(cat || "").toUpperCase()}&criteria=createdAt`
            );

            if (hotRes.status === 200) hotPosts.push(...hotRes.data.data.slice(0, 4));
            if (recentRes.status === 200) recentPostsData.push(...recentRes.data.data.slice(0, 4));
          }
          setPosts(hotPosts);
          setRecentPosts(recentPostsData);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [category, API_BASE_URL]);

  const movePage = (id, category) => {
    navigate(id === 0 ? `/board/${category}` : `/board/${category}/${id}`);
  };

  const PostTable = ({ headerIcon, headerText, postData, category }) => (
    <table className={styles.table}>
      <colgroup>
        <col style={{ width: "15%" }} />
        <col style={{ width: "85%" }} />
      </colgroup>
      <thead>
        <tr>
          <th className={styles.header2} colSpan="2">
            {headerIcon}&nbsp;{headerText}&nbsp;{headerIcon}
          </th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {postData && postData.length > 0 ? (
          postData
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
              {t('NO_POSTS')}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderLayout = (cat, layoutNo) => {
    switch (layoutNo) {
      case 1:
        return (
          <div className={styles.container}>
            <div className={styles.square}>
              {postList && postList.length > 0 ? (
                postList
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
                          {post.title.length > 15 ? post.title.substr(0, 18) + ".." : post.title}
                        </div>
                        <div className={styles.newsBody}>
                          <HtmlRenderer htmlContent={post.content} maxLength={70} />
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
      case 2:
        return (
          <div className={styles.container}>
            <div className={styles.gridSquare2}>
              <PostTable
                headerIcon={<FireTwoTone twoToneColor="red" />}
                headerText={t('HOT_POSTS')}
                postData={posts}
                category={cat}
              />
              <PostTable
                headerIcon={<MessageOutlined style={{ color: "green" }} />}
                headerText={t('RECENT_POSTS')}
                postData={recentPosts}
                category={cat}
              />
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
              <h2>{t(cat.toUpperCase())}</h2>
              <button className={styles.viewAll} onClick={() => movePage(0, cat)}>
                View All
              </button>
            </div>
            {renderLayout(cat, layout[index])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwoByTwoGrid;
