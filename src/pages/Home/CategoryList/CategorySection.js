import React from 'react';
import styles from './CategorySection.module.css';

const Testt = () => {
  return (
  <div className={styles.newsSection}>
    <div className={styles.header}>
      <h2>News</h2>
      <button className={styles.viewAll}>View All</button>
    </div>
    
    <div className={styles.container}>
      <div className={styles.square}>

        <div className={styles.newsItem}>
          <img className={styles.newsImage} src="/static/img/rectangle-17.png" alt="Large News" />
          <div className={styles.newsContent}>
            <h3>GDRFA Dubai receives over 100 visa violators in first half hour as Amnesty begins</h3>
            <p>gravida Sed nisl. elementum urna gravida non. In felis, facilisis ipsum nec elit at, lacus tincidunt lobortis, vitae quis venenatis enim. laoreet ullamcorper</p>
          </div>
        </div>

        <div className={styles.newsItem}>
          <img className={styles.newsImage} src="/static/img/rectangle-17.png" alt="Large News" />
          <div className={styles.newsContent}>
            <h3>GDRFA Dubai receives over 100 visa violators in first half hour as Amnesty begins</h3>
            <p>gravida Sed nisl. elementum urna gravida non. In felis, facilisis ipsum nec elit at, lacus tincidunt lobortis, vitae quis venenatis enim. laoreet ullamcorper</p>
          </div>
        </div>

        <div className={styles.newsItem}>
          <img className={styles.newsImage} src="/static/img/rectangle-17.png" alt="Large News" />
          <div className={styles.newsContent}>
            <h3>GDRFA Dubai receives over 100 visa violators in first half hour as Amnesty begins</h3>
            <p>gravida Sed nisl. elementum urna gravida non. In felis, facilisis ipsum nec elit at, lacus tincidunt lobortis, vitae quis venenatis enim. laoreet ullamcorper</p>
          </div>
        </div>

        <div className={styles.newsItem}>
          <img className={styles.newsImage} src="/static/img/rectangle-17.png" alt="Large News" />
          <div className={styles.newsContent}>
            <h3>GDRFA Dubai receives over 100 visa violators in first half hour as Amnesty begins</h3>
            <p>gravida Sed nisl. elementum urna gravida non. In felis, facilisis ipsum nec elit at, lacus tincidunt lobortis, vitae quis venenatis enim. laoreet ullamcorper</p>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Testt;
