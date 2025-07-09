import React, { useEffect, useState, useMemo } from "react";
import styles from "./PointStore.module.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";
import { useAuth } from '../../components/common/AuthContext';
import TopBar from "../../components/TopBar/TopBar";
import { useTranslation } from "react-i18next";


const PointStore = () => {

    const { t } = useTranslation();
    
    const [activeTab, setActiveTab] = useState("point_store");
    const { userId } = useAuth();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    // const API_BASE_URL = "http://localhost:8080";

    const [events, setEvents] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError]   = useState(null);
    const [rewardRequest, setRewardRequest] = useState([]);
    // const [myPoints, setMyPoints] = useState(0);

    const productMap = useMemo(() => 
        Object.fromEntries(events.map(p => [p.id, p])),[events]
    );

    useEffect(() => {
    if (!userId) return;

        const fetchAll = async () => {
            try {
                const [eventRes, pointRes, rewardRequest] = await Promise.all([
                    axios.get(`${API_BASE_URL}/points/product/active`, { withCredentials: true }),
                    axios.get(`${API_BASE_URL}/points/${userId}/total`, { withCredentials: true }),
                    axios.get(`${API_BASE_URL}/points/${userId}/rewards`, { withCredentials: true })
                ]);
                setEvents(eventRes.data.data);
                setTotalPoints(pointRes.data.data);
                setRewardRequest(rewardRequest.data.data);
            } catch (err) {
                console.error(err);
                setError("데이터를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [userId]);


    const handleBuy = async (item) => {
        if (item.stock === 0) {
            alert("품절된 상품입니다.");
            return;
        }
        if (!window.confirm(`${item.name}을(를) ${item.pointPrice}P에 구매하시겠습니까?`)) return;
        try {
            const payload = {
            userId,
            productId: item.id,
            pointsUsed: item.pointPrice,
            referencePostId: null,
            referenceCommentId: null
            };

            const res = await axios.post(
            `${API_BASE_URL}/points/reward`,
            payload,
            { withCredentials: true }
            );

            if (res.data.status === "OK") {
            alert(`${item.name} 구매 요청 성공! 상품이 곧 승인됩니다.`);
            setTotalPoints((prev) => prev - item.pointPrice);
            setEvents((prev) =>
                prev.map((p) =>
                p.id === item.id ? { ...p, stockQty: p.stockQty - 1 } : p
                )
            );
            }
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "구매 중 오류가 발생했습니다.");
        }
    };

    const cancelBuy = async (item, prod) => {
        
        if (!window.confirm(`${prod.name}을(를) 취소하시겠습니까?`)) return;
        try {
            const payload = {
            userId,
            productId: prod.id,
            pointsUsed: item.pointsUsed,
            referencePostId: null,
            referenceCommentId: null
            };

            const res = await axios.post(
            `${API_BASE_URL}/points/rewards/cancel`,
            payload,
            { withCredentials: true }
            );

            if (res.data.status === "OK") {
            alert(`${prod.name} 구매 요청이 취소되었습니다.`);
            setTotalPoints((prev) => prev + item.pointPrice);
            setEvents((prev) =>
                prev.map((p) =>
                p.id === item.id ? { ...p, stockQty: p.stockQty + 1 } : p
                )
            );
            }
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "최소 중 오류가 발생했습니다.");
        }
    };

    
    return (
        <div>
        <TopBar />
        <Nav />
        <div className={styles.container}>
        <div className={styles.tabContainer}>
        <button
            className={`${styles.tab} ${activeTab === "point_store" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("point_store")}
        >
            {t("POINT_STORE")}
        </button>
        <button
            className={`${styles.tab} ${activeTab === "status_reward_request" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("status_reward_request")}
        >
            {t('MY_REQUEST')}
        </button>
        </div>
        {activeTab === "point_store" && (
            <div className={styles.container}>
            <h1 className={styles.pageTitle}>{t("POINT_STORE")}</h1>

            <div className={styles.pointsCard}>
                <span className={styles.pointsLabel}>{t("MY_POINTS")}</span>
                <span className={styles.pointsValue}>{totalPoints.toLocaleString()}P</span>
            </div>
            

            {/* 상품 테이블 */}
            <h2 className={styles.sectionTitle}>🛍️ {t('PRODUCTS')}</h2>
            <table className={styles.productTable}>
                <thead>
                <tr>
                    <th>No</th>
                    <th>{t('PRODUCT')}</th>
                    <th>{t('POINT_STORE_ITEM_DESC')}</th>
                    <th>{t('POINT_USED')}</th>
                    <th>{t('DEADLINE')}</th>
                    <th>{t('PRODUCT_BUY')}</th>
                </tr>
                </thead>
                <tbody>
                {events.map((item, idx) => (
                    <tr key={item.id} className={item.stock === 0 ? styles.soldOutRow : ""}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.pointPrice}P</td>
                    <td>{item.deadline?.slice(0, 10)}</td>
                    <td>
                        <button
                        className={styles.buyBtn}
                        disabled={item.stock === 0}
                        onClick={() => handleBuy(item)}
                        >
                        {item.stock === 0 ? t('SOLDOUT') : t('BUY_BUTTON')}
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={styles.pointGuideWrapper}>
                <button
                    className={styles.pointGuideButton}
                    onClick={() => window.location.href = "/board/FREE_BOARD/423"}
                >
                    🌱 {t('HOW_TO_COLLECT_POINTS')}
                </button>
            </div>
            </div>
            
        )}
        {activeTab === "status_reward_request" && (
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>{t("STATUS_REWARD_REQUEST")}</h2>
                    <table className={styles.productTable}>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>{t('PRODUCT')}</th>
                            <th>{t('POINT_STORE_ITEM_DESC')}</th>
                            <th>{t('POINT_USED')}</th>
                            <th>{t('REQUEST_STATUS')}</th>
                            <th>{t('CANCEL')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {rewardRequest.map((req, idx) => {
                        const prod = productMap[req.productId] || {};
                        console.log("Product Map:", productMap);
                        return (
                            <tr key={req.id}>
                            <td>{idx + 1}</td>
                            <td>{prod.name || `#${req.productId}`}</td>
                            <td>{prod.description || "-"}</td>
                            <td>{req.pointsUsed}P</td>
                            <td>{t(req.status)}</td>
                            <td>
                                {req.status === "PENDING" ? (
                                <button
                                    className={styles.cancelBtn}
                                    onClick={() => cancelBuy(req, prod)}
                                >
                                    {t('CANCEL_BTN')}
                                </button>
                                ) : (
                                ""
                                )}
                            </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        )}
        </div>
        <Foot />
        </div>
    );
};

export default PointStore;