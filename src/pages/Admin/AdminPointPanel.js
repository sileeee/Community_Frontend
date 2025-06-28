import React, { useEffect, useState } from "react";
import styles from "./AdminPointPanel.module.css";
import axios from "axios";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";
import { useAuth } from '../../components/common/AuthContext';
import TopBar from "../../components/TopBar/TopBar";
import { useNavigate, useParams } from "react-router";


const ADD_ACTIONS = [
    "WRITE_POST",
    "COMMENT",
    "LIKE_RECEIVED",
    "ETC",
];

const SUB_ACTIONS = [
    "REPORT_ACCEPTED",
    "POST_DELETED",
    "ETC",
];

const ADD_ACTION_LABELS = {
    WRITE_POST: "게시글 작성",
    COMMENT: "댓글 작성",
    LIKE_RECEIVED: "좋아요 받음",
    ETC: "기타",
};

const SUB_ACTION_LABELS = {
    REPORT_ACCEPTED: "신고 처리됨",
    POST_DELETED: "글 삭제됨",
    ETC: "기타",
};

const AdminPointPanel = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [userInfo, setUserInfo] = useState(null);
    const [add, setAdd] = useState({ action: ADD_ACTIONS[0], points: 0, info: "" });
    const [sub, setSub] = useState({ action: SUB_ACTIONS[0], points: 0, info: "" });

    useEffect(() => {
    (async () => {
        try {
        const totalRes = await axios.get(`${API_BASE_URL}/points/${id}/total`, { withCredentials: true });
        const secureRes = await axios.get(`${API_BASE_URL}/users/${id}`, { withCredentials: true });
        setUserInfo({ name: secureRes.data.data.name, totalPoints: totalRes.data.data });
        } catch (e) {
        console.error(e);
        }
    })();
    }, [id]);

    const sendAddjust = async (payload) => {
    try {
        await axios.post(`${API_BASE_URL}/points/add`, payload, { withCredentials: true });
        window.confirm("처리되었습니다");
        navigate(-1);
    } catch (e) {
        alert("실패: " + e.response?.data?.message);
    }
    };

    if (!userInfo) return null;

    return (
    <>
        <TopBar />
        <Nav />
        <div className={styles.pageContainer}>

        <div className={styles.wrapper}>
        <h1 className={styles.title}>포인트 조정</h1>

        <p className={styles.current}>회원 닉네임 : {userInfo.name}</p>
        <p className={styles.current}>현재 총 포인트 : {userInfo.totalPoints.toLocaleString()}</p>

        <div className={styles.section}>
            <h2>포인트 추가</h2>
            <select value={add.action} className={styles.pointSelect} onChange={(e) => setAdd({ ...add, action: e.target.value })}>
            {ADD_ACTIONS.map((a) => (
                <option key={a} value={a}>{ADD_ACTION_LABELS[a]}</option>
            ))}
            </select>
            <input type="text" placeholder="포인트" className={styles.pointInput} value={add.points}
                onChange={(e) => setAdd({ ...add, points: Number(e.target.value) })} />
            <input type="text" placeholder="관련 정보 및 사유" className={styles.pointInput} value={add.info}
                onChange={(e) => setAdd({ ...add, info: e.target.value })} />
            <button className={styles.addBtn}
                onClick={() => sendAddjust({
                    userId: parseInt(id),
                    actionType: add.action,
                    points: Math.abs(add.points),
                    referenceNote: add.info
                })}>추가</button>
        </div>

        <div className={styles.section}>
            <h2>포인트 삭감</h2>
            <select value={sub.action} className={styles.pointSelect} onChange={(e) => setSub({ ...sub, action: e.target.value })}>
            {SUB_ACTIONS.map((a) => (
                <option key={a} value={a}>{SUB_ACTION_LABELS[a]}</option>
            ))}
            </select>
            <input type="text" placeholder="포인트" className={styles.pointInput} value={sub.points}
                onChange={(e) => setSub({ ...sub, points: Number(e.target.value) })} />
            <input type="text" placeholder="관련 정보 및 사유" className={styles.pointInput} value={sub.info}
                onChange={(e) => setSub({ ...sub, info: e.target.value })} />
            <button className={styles.subBtn}
                onClick={() => sendAddjust({
                    userId: Math.abs(id),
                    actionType: sub.action,
                    points: -Math.abs(sub.points),
                    referenceNote: sub.info
                })}>삭감</button>
        </div>

        <button className={styles.cancelBtn} onClick={() => navigate(-1)}>뒤로가기</button>
        </div>
        </div>
        <Foot />
    </>
    );
};
export default AdminPointPanel;
