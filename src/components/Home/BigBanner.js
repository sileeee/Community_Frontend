import '../../styleguide.css';
import styles from "./BigBanner.module.css";


function BigBanner(){

    return(
        <div className={styles.bannerContainer}>
          <div className={styles.overlap}>
            <div className={styles.mainText}>
              Korean Life <br />
              in Dubai
            </div>
          </div>
        </div>

    );
}
export default BigBanner;