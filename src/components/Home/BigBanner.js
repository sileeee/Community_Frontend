import '../../styleguide.css';
import styles from "./BigBanner.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function BigBanner() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 5000;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("https://localhost:8443/home/posts/5");
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
                <img src={banner.imageUrl} alt={`Banner ${banner.id}`} />
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
