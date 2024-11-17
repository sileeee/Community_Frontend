import '../../styleguide.css';
import React from 'react';
import './Foot.css';

const Foot = () => {
  return (
    <div className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <div className="footer-logo">KoreaninDubai</div>
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
            <li>Job Search</li>
            <li>News</li>
            <li>Second - Hand Market</li>
            <li>Real Estate</li>
            <li>Asian Market</li>
            <li>Travel</li>
            <li>Education</li>
            <li>Hobbies Club</li>
            <li>Freeboard</li>
            <li>Business</li>
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
