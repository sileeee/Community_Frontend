import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './CategorySection.module.css';
import { useNavigate } from "react-router-dom";
import { getKorSubCategories } from "../../../components/Board/getKorSubCategories";
import HtmlRenderer from "../../../components/Board/HtmlRenderer";
import { FireTwoTone, MessageOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";


const CategorySection = ({ category, postList, layout }) => {

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [posts, setPosts] = useState(postList);
  const [recentPosts, setRecentPosts] = useState(postList);
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
    if (!type) return;
    if (layout === 2) {
      getHotPosts();
    }
    getRecentPosts();
    // } else {
    //   setPosts(postList); // 기본 게시글 세팅
    // }
  }, [layout, category, postList, type]);

  const getHotPosts = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/${type}?category=${String(category || "").toUpperCase()}&criteria=view`
      );
      if (res.status === 200) {
        if (layout === 2) {
          setPosts(res.data.data.slice(0, 6));
        } else {
          setPosts(res.data.data.slice(0, 4));
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const getRecentPosts = async () => {
    try {

      // const selectedType = category === "real_estate" ? "real-estate" : "posts";
      // setType(selectedType);

      const res = await axios.get(
        `${API_BASE_URL}/${type}?category=${String(category || "").toUpperCase()}&criteria=createdAt`
      );
      if (res.status === 200) {
        if (layout === 2) {
          setRecentPosts(res.data.data.slice(0, 6));
        }
        else {
          setRecentPosts(res.data.data.slice(0, 4));
        }
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

  const cleanHtmlContent = (html) => {

    if (!html) return "";

    return html
      .replace(/style="[^"]*"/g, '') 
      .replace(/<img[^>]*>/gi, '') 
      .replace(/<figure[^>]*>.*?<\/figure>/gis, '') 
      .replace(/<figcaption[^>]*>.*?<\/figcaption>/gis, '') 
      .replace(/&nbsp;/gi, '') 
      .replace(/<br[^>]*>/gi, '') 
      .replace(/<p[^>]*>\s*<\/p>/gi, '') 
      .replace(/<div[^>]*>\s*<\/div>/gi, '')
      .replace(/<(strong|h[1-4])[^>]*>/gi, '<p>') 
      .replace(/<\/(strong|h[1-4])>/gi, '</p>');
  };

  const extractImageSrc = (htmlString) => {
    const match = htmlString?.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : htmlString;
  };
  
  const renderLayout = () => {
    switch (layout) {
      case 1:
        return (
          <div className={styles.container}>
            <div className={styles.square}>
              {recentPosts && recentPosts.length > 0 ? (
                [...recentPosts]
                  .sort((a, b) => a.locationId - b.locationId)
                  .map((post, index) => (
                    <div
                      key={index}
                      className={styles.newsItem}
                      onClick={() => movePage(post.id)}>
                      <img
                        className={styles.newsImage}
                        src={extractImageSrc(post.thumbnailUrl) || "/static/img/no_image.png"}
                        alt={post.title}/>
                      <div className={styles.newsContent}>
                        <div className={styles.newsTitle}>
                          {post.title}
                        </div>
                        <div className={styles.newsBody}>
                          {cleanHtmlContent(post.body)
                            .replace(/<[^>]+>/g, "")
                            .slice(0, 120)}...
                        </div>

                        {/* <div className={styles.newsBody}>
                          <HtmlRenderer htmlContent={cleanHtmlContent(post.body)} />
                        </div> */}
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
            <div className={styles.square2}>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "85%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className={styles.header2} colSpan="2"><FireTwoTone twoToneColor="red"/>&nbsp;{t('HOT_POSTS')}&nbsp;<FireTwoTone twoToneColor="red"/></th>
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
                      {t('NO_POSTS')}
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
                  <th className={styles.header2} colSpan="2">{t('RECENT_POSTS')}&nbsp;&nbsp;<MessageOutlined style={{color: "green"}}/> </th>
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
                      {t('NO_POSTS')}
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
        <h2>{t(category.toUpperCase())}</h2>
        <button className={styles.viewAll} onClick={() => movePage(0)}>
          View All
        </button>
      </div>
      {renderLayout()}
    </div>
  );
};

export default CategorySection;