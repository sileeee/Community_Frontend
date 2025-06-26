import React, { useEffect, useState } from "react";
import styles from "./AdminPanel.module.css";
import axios from "axios";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";
import { useAuth } from '../../components/common/AuthContext';
import TopBar from "../../components/TopBar/TopBar";
import { useTranslation } from "react-i18next";


const AdminPanel = () => {

    const { t } = useTranslation();
    const [query, setQuery] = useState("");
    const [members, setMembers] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [totalMembers, setTotalMembers] = useState(0);
    const { userId } = useAuth();
    
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    
    const fetchData = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/admin/point/list`, {
            params: { query },
            withCredentials: true,
        });
        const data = res.data.data;
        setMembers(data.members);
        setTotalMembers(data.totalMembers);
        setTotalPoints(data.totalPoints);
        } catch (e) {
        console.error("Failed to fetch", e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
        <TopBar />
        <Nav />
        <div className={styles.container}>
            <div className={styles.adminContainer}>
            <h1 className={styles.title}>포인트 관리</h1>

            <div className={styles.searchRow}>
                <label className={styles.searchLabel}>검색:</label>
                <input
                className={styles.searchInput}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="닉네임 또는 ID"
                />
                <button className={styles.searchBtn} onClick={fetchData}>
                조회
                </button>
            </div>

            <div className={styles.statsRow}>
                <div>👥 포인트 가진 회원 수: {totalMembers}명</div>
                <div>💰 총 포인트: {totalPoints.toLocaleString()}점</div>
            </div>

            <table className={styles.pointTable}>
                <thead>
                <tr>
                    <th>No</th>
                    <th>회원 ID</th>
                    <th>이름</th>
                    <th>포인트</th>
                    <th>수정일</th>
                    <th>내역</th>
                    <th>조정</th>
                </tr>
                </thead>
                <tbody>
                {members.map((m, i) => (
                    <tr key={m.userId}>
                    <td>{i + 1}</td>
                    <td>{m.userId}</td>
                    <td>{m.name}</td>
                    <td>{m.totalPoints}</td>
                    <td>{m.updatedAt?.slice(0, 10)}</td>
                    <td>
                        <button className={styles.detailBtn}>보기</button>
                    </td>
                    <td>
                        <button className={styles.adjustBtn}>조정</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        <Foot />
        </div>
    );
};

export default AdminPanel;