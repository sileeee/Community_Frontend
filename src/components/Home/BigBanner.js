import styles from "./BigBanner.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function BigBanner() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 5000;
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // 화면 크기를 기준으로 요청 URL을 설정
  const getUrlByScreenSize = () => {
    return window.innerWidth < 768
      ? `${API_BASE_URL}/home/posts/52` // 모바일 전용 URL
      : `${API_BASE_URL}/home/posts/51`; // 데스크톱 전용 URL
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(getUrlByScreenSize());
        setBanners(response.data.data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, intervalTime);// 컴포넌트 언마운트 시 setInterval 해제
    return () => clearInterval(autoSlide);
  }, [banners.length]); // banners.length가 변경될 때마다 재설정

  return (
    <div className={styles.bannerContainer}>
      {banners.length > 0 ? (
        <div className={styles.box}>
          <div className={styles.box1}>
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`${styles.slide} ${
                  index === currentIndex ? styles.active : ""
                }`}
                style={{
                  display: index === currentIndex ? "block" : "none",
                }}
              >
                <img
                  src={banner.imageUrl}
                  alt={`Banner ${banner.id}`}
                  className={styles.bigImage}
                />
              </div>
            ))}
          </div>
          <div className={styles.box2}>
            <a href="https://www.instagram.com/korea.dubai/?igsh=MWppYjZweGhhaGRmcQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
              <img
                src="https://handubi.com/api/images/ad_location6.png"
                className={styles.smallImage}
              />
            </a>
          </div>
          <div className={styles.box3}>
            <a href="https://www.youtube.com/@koreadubai" target="_blank" rel="noopener noreferrer">
              <img
                src="https://handubi.com/api/images/ad_location7.png"
                className={styles.smallImage}
              />
            </a>
          </div>
          <div className={styles.box4}>
            <a href="https://www.instagram.com/korea.dubai/?igsh=MWppYjZweGhhaGRmcQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
              <img
                src="https://handubi.com/api/images/ad_location8.png"
                className={styles.smallImage}
              />
            </a>
          </div>
        </div>
      ) : (
        <p>Loading banners...</p>
      )}
    </div>
  );
}

export default BigBanner;
