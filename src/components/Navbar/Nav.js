import '../../styleguide.css';
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css"

function Nav(){

    const navigate = useNavigate();

    const goToBoard = (category) => {
        navigate(`/board/${String(category || '').toLowerCase()}`);
    };

    return(
        <div className={styles.container}>
            <Link to="/home">
                <div className={styles.logoContainer}>
                    <img className={styles.logo} alt="Handubi" src="../../static/img/handubi-logo.png"/>
                    <div className={styles.logoHandubi}> Handubi </div>
                </div>
            </Link>
            <div className={styles.navbar}>
                <div className={styles.textNavbar} onClick={() => goToBoard('NEWS')} style={{ cursor: 'pointer' }}>뉴스</div>
                
                <div className={styles.textNavbar} onClick={() => goToBoard('ASIAN_MARKET')} style={{ cursor: 'pointer' }}>마켓정보</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('LIFE')} style={{ cursor: 'pointer' }}>생활정보</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('SECOND_HAND')} style={{ cursor: 'pointer' }}>중고시장</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('REAL_ESTATE')} style={{ cursor: 'pointer' }}>부동산</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('JOB_SEARCH')} style={{ cursor: 'pointer' }}>구인구직</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('CHILD_CARE')} style={{ cursor: 'pointer' }}>교육정보</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('TRAVEL')} style={{ cursor: 'pointer' }}>여행정보</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('CLUB')} style={{ cursor: 'pointer' }}>동호회</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('FREE_BOARD')} style={{ cursor: 'pointer' }}>자유게시판</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('KOREAN_COMPANY')} style={{ cursor: 'pointer' }}>한인업소</div>
            </div>

            <div className={styles.notLoggedIn}>
                <Link to="/login">
                    <div className={styles.textLogin}>로그인</div>
                </Link>
                <Link to="/sign-up">
                    <div className={styles.btn}>
                        <div className={styles.btnSignUp}>
                            <div className={styles.textSignUp}>회원가입</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default Nav;
