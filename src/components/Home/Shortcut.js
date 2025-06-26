import { Frame } from "../common/Frame";
import styles from "../common/Frame.module.css";
import { useTranslation } from "react-i18next";

function Shortcut(){
    
    const { t } = useTranslation();

    const ScrollToPosition = (text) => {

        // 모든 h2 태그를 가져옴
        const elements = document.querySelectorAll("h2");

        // 요소를 순회하며 텍스트 내용이 일치하는 요소를 찾음
        for (const element of elements) {
            if (element.textContent.trim() === text) {
                // 해당 요소로 부드럽게 스크롤
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
        }
    };

    return(
        <div className={styles.centerContainer}>
            <Frame className="frame" text={t('NEWS')} onClick={() => ScrollToPosition(t('NEWS'))} />
            <Frame className="frame" text={t('FREE_BOARD')} onClick={() => ScrollToPosition(t('FREE_BOARD'))} />
            <Frame className="frame" text={t('SECOND_HAND')} onClick={() => ScrollToPosition(t('SECOND_HAND'))} />
            <Frame className="frame" text={t('JOB_SEARCH')} onClick={() => ScrollToPosition(t('JOB_SEARCH'))} />
            <Frame className="frame" text={t('LIFE')} onClick={() => ScrollToPosition(t('LIFE'))} />
            <Frame className="frame" text={t('CHILD_CARE')} onClick={() => ScrollToPosition(t('CHILD_CARE'))} />
            <Frame className="frame" text={t('REAL_ESTATE')} onClick={() => ScrollToPosition(t('REAL_ESTATE'))} />
            <Frame className="frame" text={t('CLUB')} onClick={() => ScrollToPosition(t('CLUB'))} />
            <Frame className="frame" text={t('KOREAN_COMPANY')} onClick={() => ScrollToPosition(t('KOREAN_COMPANY'))} />
            
            {/* <Frame className="frame" divClassName="frame-text" text="한인업소" onClick={() => ScrollToPosition("한인업소")} /> */}
        </div>
    );
}
export default Shortcut;