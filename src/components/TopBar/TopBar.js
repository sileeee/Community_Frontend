import styles from "./TopBar.module.css";
import React, { useState, useRef, useEffect } from "react";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { GlobalOutlined } from '@ant-design/icons';
import { useAuth } from '../common/AuthContext';
import { MenuOutlined } from '@ant-design/icons';
import { Button } from "antd";


const TopBar = () => {

    const { isLoggedIn, logout, name } = useAuth();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { userRole } = useAuth();

    const isSmallScreen = window.innerWidth <= 768;
    const [menuOpen, setMenuOpen] = useState(false);
    const myPageRef = useRef(null);
    const dropdownRef = useRef(null);

    const toggleLanguage = (checked) => {
        i18n.changeLanguage(checked ? "en" : "ko");
    };

    const toggleMenu = () => {
        if (!menuOpen && myPageRef.current) {
            const rect = myPageRef.current.getBoundingClientRect();
        }
        setMenuOpen(prev => !prev);
    };
    
    useEffect(() => {
        if (!menuOpen) return;

        const handleClickOutside = (e) => {
        if (
            dropdownRef.current && !dropdownRef.current.contains(e.target) &&
            myPageRef.current   && !myPageRef.current.contains(e.target)
        ) {
            setMenuOpen(false);
        }};
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    const goToMyPage = () => {
        navigate(`/mypage`);
        setMenuOpen(false);
    };

    const goToAdminPage = () => {
        navigate(`/admin`);
        setMenuOpen(false);
    };

    const isEnglish = i18n.language === "en";

    return (
        <div className={styles.globalControls}>
            <div className={styles.leftSection}></div>

            <Link to="/">
                <div className={styles.logoContainer}>
                    <img className={styles.logo} alt="Handubi" src="/../static/img/handubi-logo.png" />
                    <div className={styles.logoHandubi}> Handubi </div>
                </div>
            </Link>
            <div className={styles.rightSection}>
            <div className={styles.rightGroup}
                style={{ gap: isLoggedIn ? "40px" : "50px" }}>
                <div className={styles.languageText}>
                    <GlobalOutlined className={styles.globalIcon} />
                    <div className={styles.languageToggle}>
                        <Switch
                            checkedChildren="EN"
                            unCheckedChildren="KO"
                            checked={isEnglish}
                            onChange={toggleLanguage}
                            size="small"
                            style={{
                                backgroundColor: isEnglish ? "green" : undefined,
                                color: isEnglish ? "black" : undefined,
                            }}
                        />
                    </div>
                </div>

                {isLoggedIn ? (
                    <div className={styles.LoggedIn}>
                        <div className={styles.btn}>
                            <div className={styles.textNickname}>
                                {t('HELLO')}<br />
                                {name.length > 5 ? `${name.slice(0, 5)}...` : name}&nbsp;{t('SIR')}!
                            </div>
                            <div ref={myPageRef} className={styles.myPage} onClick={toggleMenu}>
                                <MenuOutlined className={styles.myPageIcon}/>
                                <div ref={dropdownRef} className={styles.myPageText}>Menu</div>
                                {menuOpen && (
                                    <div className={styles.dropdownMenu}>
                                    <div onClick={goToMyPage} className={styles.menuItem}>
                                        {t('MANAGE_ACCT')}
                                    </div>
                                    <div onClick={() => logout()} className={styles.menuItem}>
                                        {t("LOGOUT")}
                                    </div>
                                    {userRole === "ADMIN" && (
                                    <div onClick={goToAdminPage} className={styles.menuItem}>
                                        {t("ADMIN_PANEL")}
                                    </div>
                                    )}
                                    </div>
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
                                        fontSize: isSmallScreen ? "2vw" : "clamp(10px, 1.3vw, 19px)",
                                        lineHeight: "normal",
                                        fontWeight: "500",
                                        height: "auto",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderColor: "rgba(0, 115, 47, 1)",
                                        color: "rgba(0, 115, 47, 1)"
                                    }}
                                    type="ghost"
                                    className={styles.signUpBtn}
                                    size="large"
                                > {t('LOGIN')}
                                </Button>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default TopBar;
