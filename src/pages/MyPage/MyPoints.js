import React, { useState, useEffect } from "react";
import styles from "./MyPage.module.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from '../../components/common/AuthContext';


function MyPoints({ targetId }) { 
    
  const { t } = useTranslation();
  const { userId: authUserId } = useAuth();
  const uid = targetId ?? authUserId;
  const [myPoints, setMyPoints] = useState([]);
  const [history, setHistory] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!uid) return;
    const fetchPosts = async () => {
      try {
          const [pointRes, historyRes] = await Promise.all([
              axios.get(`${API_BASE_URL}/points/${uid}/total`, { withCredentials: true }),
              axios.get(`${API_BASE_URL}/points/${uid}/history`, { withCredentials: true }),
          ]);

          if (pointRes.status === 200) {
              setMyPoints(pointRes.data.data);
          }

          if (historyRes.status === 200) {
              setHistory(historyRes.data.data); // 배열로 받기
          }
          } catch (error) {
          console.error("Error fetching points:", error);
          }
      };
      fetchPosts();
  }, [uid]);

  return (
    <div>
      <div className={styles.formMyPage}>
        <h1>{t("MY_POINTS")}</h1>

        <div className={styles.pointsCard}>
          <h2>Total Points</h2>
          <div className={styles.pointsValue}>{myPoints}</div>

        </div>

        <div className={styles.historySection}>
          <h2>{t("POINT_HISTORY")}</h2>
          <table className={styles.historyTable}>
            <thead>
              <tr>
                <th>{t("DATE")}</th>
                <th>{t("POINT_ACTION")}</th>
                <th>{t("POINT")}</th>
                <th>{t("POINT_DESCRIPTION")}</th>
              </tr>
            </thead>
            <tbody>
            {history.map((item, index) => (
                <tr key={index}>
                <td>{item.createdAt?.slice(0, 10)}</td>
                <td>{t(item.actionType)}</td>
                <td className={styles.points}>{item.points > 0 ? `+${item.points}` : `${item.points}`}</td>
                <td>
                    {item.referencePostId
                    ? `게시글 ID #${item.referencePostId}`
                    : item.referenceCommentId
                    ? `댓글 ID #${item.referenceCommentId}`
                    : "-"}
                </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPoints;