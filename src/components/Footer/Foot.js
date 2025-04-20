import React from 'react';
import './Foot.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Foot = () => {

  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <div className="footer-logo">Handubi</div>
          <div className="footer-title">{t('SITE_TOPIC')}</div>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-x"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <Link to="/board/news"><li>{t('NEWS')}</li></Link>
            <Link to="/board/second_hand"><li>{t('SECOND_HAND')}</li></Link>
            <Link to="/board/asian_market"><li>{t('ASIAN_MARKET')}</li></Link>
            <Link to="/board/life"><li>{t('LIFE')}</li></Link>
            <Link to="/board/real_estate"><li>{t('REAL_ESTATE')}</li></Link>
            <Link to="/board/job_search"><li>{t('JOB_SEARCH')}</li></Link>
            <Link to="/board/child_care"><li>{t('CHILD_CARE')}</li></Link>
            <Link to="/board/travel"><li>{t('TRAVEL')}</li></Link>
            <Link to="/board/club"><li>{t('CLUB')}</li></Link>
            <Link to="/board/free_board"><li>{t('FREE_BOARD')}</li></Link>
            <Link to="/board/korean_company"><li>{t('KOREAN_COMPANY')}</li></Link>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Address</h4>
          <p>1178 Broadway,</p>
          <p>Dubai, UAE</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>+1 (917) 695 - 4990</p>
          <p>info@handubi.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2024 Handubi - All rights reserved
      </div>

    </div>
  );
};

export default Foot;
