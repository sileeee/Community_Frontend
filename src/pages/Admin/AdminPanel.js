import React, { useEffect, useState, useMemo } from "react";
import styles from "./AdminPanel.module.css";
import axios from "axios";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";
import { useAuth } from '../../components/common/AuthContext';
import TopBar from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router";
import MyPoints from "../MyPage/MyPoints";


const AdminPanel = () => {

    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [query, setQuery] = useState("");
    const [viewUserId, setViewUserId] = useState(null);
    const [members, setMembers] = useState([]);
    const [rewardMembers, setRewardMembers] = useState([]);

    const [totalPoints, setTotalPoints] = useState(0);
    
    const [totalMembers, setTotalMembers] = useState(0);
    const [totalRewards, setTotalRewards] = useState(0);

    const { userId } = useAuth();
    const [activeTab, setActiveTab] = useState("manage_points");
    
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

    const fetchData = async () => {
        try {
            const res1 = await axios.get(`${API_BASE_URL}/admin/point/list`, {
                params: { query },
                withCredentials: true,
            });
            const d1 = res1.data.data;
            setMembers(d1.members ?? []);
            setTotalMembers(d1.totalMembers ?? 0);
            setTotalPoints(d1.totalPoints ?? 0);

            const res2 = await axios.get(`${API_BASE_URL}/admin/reward/list`, {
                params: { query },
                withCredentials: true,
            });
            const d2 = res2.data.data;
            setRewardMembers(d2 ?? []);
            setTotalRewards((d2 ?? []).length);
        } catch (e) {
            console.error("Failed to fetch", e);
        }
    };

    useEffect(() => {
        const savedStatus = localStorage.getItem("adminRewardStatus");
        if (savedStatus) setStatusFilter(savedStatus);
        
        const savedTab = localStorage.getItem("adminActiveTab");
        if (savedTab) {
            setActiveTab(savedTab);
            localStorage.removeItem("adminActiveTab");
        }
        fetchData();
    }, []);

    const acceptReward = async (requestId) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/admin/reward/${requestId}/accept`, {
                withCredentials: true,
            });
            if (res.data.status === "OK") {
                window.confirm("승인되었습니다");
                localStorage.setItem("adminActiveTab", activeTab);
                window.location.reload();
            }
        } catch (e) {
            console.error("Failed to accept reward", e);
        }
    };

    const rejectReward = async (requestId) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/admin/reward/${requestId}/reject`, {
                withCredentials: true,
            });
            if (res.data.status === "OK") {
                window.confirm("거절되었습니다");
                localStorage.setItem("adminActiveTab", activeTab);
                window.location.reload();
            }
        } catch (e) {
            console.error("Failed to reject reward", e);
        }
    };

    const moveAdminPointPanel = (url) => {
        navigate(url);
    };

    const filteredRewards = useMemo(() => {
        const f = statusFilter.toUpperCase();
        return rewardMembers
            .filter(r => f === "ALL" || (r.status ?? "").toUpperCase() === f)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [rewardMembers, statusFilter]);

    const totalFiltered = filteredRewards.length;


    const handleStatusChange = (val) => {
        const upper = (val || "").toUpperCase().trim();
        setStatusFilter(upper);
        localStorage.setItem("adminRewardStatus", upper);
    };

    return (
        <div>
        <TopBar />
        <Nav />
        <div className={styles.container}>
            {!viewUserId && (
            <>
            <div className={styles.tabContainer}>
                <button
                    className={`${styles.tab} ${activeTab === "manage_points" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("manage_points")}
                >
                    포인트 관리
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "request_reward" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("request_reward")}
                >
                    보상 신청 및 처리
                </button>
            </div>
            {activeTab === "manage_points" && (
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
                        <th>이메일</th>
                        <th>닉네임</th>
                        <th>포인트</th>
                        <th>최근 수정 날짜</th>
                        <th>내역</th>
                        <th>조정</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map((m, i) => (
                        <tr key={m.userId}>
                        <td>{i + 1}</td>
                        <td>{m.email}</td>
                        <td>{m.name}</td>
                        <td>{m.totalPoints}</td>
                        <td>{m.updatedAt?.slice(0, 10)}</td>
                        <td>
                            <button className={styles.detailBtn} onClick={() => setViewUserId(m.userId)}>보기</button>
                        </td>
                        <td>
                            <button onClick={() => moveAdminPointPanel(`/admin/points/${m.userId}/`)} className={styles.adjustBtn}>조정</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                )}

            {activeTab === "request_reward" && (
                <div className={styles.adminContainer}>
                    <h1 className={styles.title}>보상 신청 리스트</h1>
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
                    <div>신청 수: {totalFiltered}회</div>

                    <select
                        value={statusFilter}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className={styles.statusSelect}
                    >
                    <option value="ALL">전체</option>
                    <option value="PENDING">대기</option>
                    <option value="APPROVED">승인</option>
                    <option value="REJECTED">거절</option>
                    </select>
                </div>

                <table className={styles.pointTable}>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>닉네임</th>
                        <th>현재 포인트</th>
                        <th>차감될 포인트</th>
                        <th>신청 내용</th>
                        <th>신청 날짜</th>
                        <th>현재 상태</th>
                        <th>승인여부</th>
                    </tr>
                    </thead>
                    <tbody>
                        {filteredRewards.map((m, i) => (
                            <tr key={m.id}>
                            <td>{i + 1}</td>
                            <td>{m.name}</td>
                            <td>{m.totalPoints}</td>
                            <td>{m.pointsUsed}</td>
                            <td>{m.rewardType}</td>
                            <td>{m.createdAt?.slice(0, 10)}</td>
                            <td>{m.status}</td>
                            <td>
                                {m.status === "PENDING" ? (
                                <>
                                    <button onClick={() => acceptReward(m.id)} className={styles.adjustBtn}>
                                    승인
                                    </button>
                                    <button onClick={() => rejectReward(m.id)} className={styles.rewardRejectBtn}>
                                    거절
                                    </button>
                                </>
                                ) : (
                                "처리 완료"
                                )}
                            </td>
                            </tr>
                    
                ))}
                </tbody>
            </table>
            </div>
        )}    
        </>
        )}
        {viewUserId && (
                <div className={`${styles.adminContainer} ${styles.pointsWrapper}`}>
                <button
                    onClick={() => setViewUserId(null)}
                    className={styles.backBtn}
                >
                    ← 뒤로가기
                </button>

                <MyPoints targetId={viewUserId} />
                </div>
            )}
        </div>
        <Foot />
        </div>
    );
};

export default AdminPanel;