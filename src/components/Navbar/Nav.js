import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styles from "./Nav.module.css"

function Nav(){

    const { t } = useTranslation();
    const navigate = useNavigate();

    const goToBoard = (category) => {
        navigate(`/board/${String(category || '').toLowerCase()}`);
    };

    return(
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.textNavbar} onClick={() => goToBoard('NEWS')}>{t('NEWS')}</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('FREE_BOARD')}>{t('FREE_BOARD')}</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('SECOND_HAND')}>{t('SECOND_HAND')}</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('JOB_SEARCH')}>{t('JOB_SEARCH')}</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('LIFE')}>{t('LIFE')}</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('CHILD_CARE')}>{t('CHILD_CARE')}</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('TRAVEL')}>{t('TRAVEL')}</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('REAL_ESTATE')}>{t('REAL_ESTATE')}</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('CLUB')}>{t('CLUB')}</div>
                <div className={styles.textNavbar} onClick={() => goToBoard('KOREAN_COMPANY')}>{t('KOREAN_COMPANY')}</div>
            </div>
        </div>
    );
}
export default Nav;
