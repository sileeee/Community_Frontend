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
    return window.innerWidth <= 768
      ? `${API_BASE_URL}/home/posts/5` // 모바일 전용 URL
      : `${API_BASE_URL}/home/posts/6`; // 데스크톱 전용 URL
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


  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.bannerContainer}>
      {banners.length > 0 ? (
        <>
          <div
            className={styles.slider}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className={styles.slide}>
                <img src={banner.imageUrl} alt={`Banner ${banner.id}`} className={styles.image}/>
              </div>
            ))}
    </div>

    <div className={`${styles.arrow} ${styles.left}`} onClick={goToPrev}>
      &#8249;
    </div>
    <div className={`${styles.arrow} ${styles.right}`} onClick={goToNext}>
      &#8250;
    </div>
    </>
      ) : (
        <p>Loading banners...</p>
      )}
    </div>
  );
}

export default BigBanner;
