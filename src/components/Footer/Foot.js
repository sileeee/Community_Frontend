import React from 'react';
import './Foot.css';
import { Link } from 'react-router-dom';

const Foot = () => {
  return (
    <div className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <div className="footer-logo">Handubi</div>
          <div className="footer-title">두바이 한인 커뮤니티</div>
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
            <Link to="/board/job_search"><li>구인구직</li></Link>
            <Link to="/board/news"><li>뉴스</li></Link>
            <Link to="/board/second_hand"><li>중고시장</li></Link>
            <Link to="/board/real_estate"><li>부동산</li></Link>
            <Link to="/board/asian_market"><li>마켓정보</li></Link>
            <Link to="/board/travel"><li>여행정보</li></Link>
            <Link to="/board/child_care"><li>교육정보</li></Link>
            <Link to="/board/club"><li>동호회</li></Link>
            <Link to="/board/freeboard"><li>자유게시판</li></Link>
            <Link to="/board/business"><li>한인업소</li></Link>
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
