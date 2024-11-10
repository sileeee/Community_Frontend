import '../../styleguide.css';
import React from "react";
import styles from "./Nav.module.css"

function Nav(){

    return(
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} alt="Handubi" src="../../static/img/handubi-logo.png"/>
                <div className={styles.logoHandubi}> Handubi </div>
            </div>
            <div className={styles.navbar}>
                <div className={styles.textNavbar}>구인구직</div>
                <div className={styles.textNavbar}>뉴스</div>
                <div className={styles.textNavbar}>부동산</div>
                <div className={styles.textNavbar}>중고시장</div>
                <div className={styles.textNavbar}>마켓정보</div>
                <div className={styles.textNavbar}>여행정보</div>
                <div className={styles.textNavbar}>교육정보</div>
                <div className={styles.textNavbar}>생활정보</div>
                <div className={styles.textNavbar}>동호회</div>
                <div className={styles.textNavbar}>자유게시판</div>
                <div className={styles.textNavbar}>한인업소</div>
            </div>

            <div className={styles.notLoggedIn}>
                <div className={styles.textLogin}>로그인</div>
                <div className={styles.btn}>
                    <div className={styles.btnSignUp}>
                        <div className={styles.textSignUp}>회원가입</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Nav;
