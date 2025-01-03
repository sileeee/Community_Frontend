import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css"
import { useAuth } from '../common/AuthContext';
import { SmileFilled } from '@ant-design/icons';
import DropdownMenu from "./DropdownMenu";
import { Button } from "antd";


function Nav(){

    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, logout, name } = useAuth();
    const navigate = useNavigate();
    const isSmallScreen = window.innerWidth <= 768;

    const goToBoard = (category) => {
        navigate(`/board/${String(category || '').toLowerCase()}`);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const goToMyPage = () => {
        navigate(`/mypage`);
        setMenuOpen(false);
    };

    return(
        <div className={styles.container}>
            <Link to="/">
                <div className={styles.logoContainer}>
                    <img className={styles.logo} alt="Handubi" src="/../static/img/handubi-logo.png"/>
                    <div className={styles.logoHandubi}> Handubi </div>
                </div>
            </Link>
            <div className={styles.navbar}>
                <div className={styles.textNavbar} onClick={() => goToBoard('NEWS')} style={{ cursor: 'pointer' }}>뉴스</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('SECOND_HAND')} style={{ cursor: 'pointer' }}>중고장터</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('ASIAN_MARKET')} style={{ cursor: 'pointer' }}>마켓정보</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('LIFE')} style={{ cursor: 'pointer' }}>생활정보</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('REAL_ESTATE')} style={{ cursor: 'pointer' }}>부동산</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('JOB_SEARCH')} style={{ cursor: 'pointer' }}>구인구직</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('CHILD_CARE')} style={{ cursor: 'pointer' }}>교육정보</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('TRAVEL')} style={{ cursor: 'pointer' }}>여행정보</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('CLUB')} style={{ cursor: 'pointer' }}>동호회</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('FREE_BOARD')} style={{ cursor: 'pointer' }}>자유게시판</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('KOREAN_COMPANY')} style={{ cursor: 'pointer' }}>한인업소</div>
            </div>

            {isLoggedIn ? (
                <div className={styles.notLoggedIn}>
                <div className={styles.btn}>
                    <div className={styles.textNickname}>
                        안녕하세요<br />
                        {name.length > 5 ? `${name.slice(0, 5)}...` : name}&nbsp;님!
                    </div>
                    <div className={styles.myPage} onClick={toggleMenu}>
                        <SmileFilled className={styles.myPageIcon}/>
                        <div className={styles.myPageText}>My Page</div>
                        {menuOpen && (
                            <DropdownMenu style={{ top: "70px", right: "30px" }}>
                                <div onClick={goToMyPage} className={styles.menuItem}>
                                    회원정보 수정
                                </div>
                                <div onClick={() => logout()} className={styles.menuItem}>
                                    로그아웃
                                </div>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
                </div>
                
            ) : (
                <div className={styles.notLoggedIn}>
                    <Link to="/login">
                    <div className={styles.containerBtn}>
                        <Button
                            style={{
                                background: "rgba(0, 115, 47, 1)",
                                fontSize: isSmallScreen? "2vw" : "clamp(10px, 1.3vw, 19px)",
                                lineHeight: "normal",
                                fontWeight: "500",
                                height: "auto",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            type="primary"
                            className={styles.signUpBtn}
                            size="large">
                            로그인
                        </Button>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}
export default Nav;
