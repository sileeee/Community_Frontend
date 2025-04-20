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
            <Frame className="frame" text={t('NEWS')} onClick={() => ScrollToPosition("뉴스")} />
            <Frame className="frame" text={t('FREE_BOARD')} onClick={() => ScrollToPosition("자유게시판")} />
            <Frame className="frame" text={t('SECOND_HAND')} onClick={() => ScrollToPosition("중고장터")} />
            <Frame className="frame" text={t('JOB_SEARCH')} onClick={() => ScrollToPosition("구인구직")} />
            <Frame className="frame" text={t('ASIAN_MARKET')} onClick={() => ScrollToPosition("마켓정보")} />
            <Frame className="frame" text={t('LIFE')} onClick={() => ScrollToPosition("생활정보")} />
            <Frame className="frame" text={t('CHILD_CARE')} onClick={() => ScrollToPosition("교육정보")} />
            <Frame className="frame" text={t('TRAVEL')} onClick={() => ScrollToPosition("여행정보")} />
            <Frame className="frame" text={t('REAL_ESTATE')} onClick={() => ScrollToPosition("부동산")} />
            <Frame className="frame" text={t('CLUB')} onClick={() => ScrollToPosition("동호회")} />
            
            {/* <Frame className="frame" divClassName="frame-text" text="한인업소" onClick={() => ScrollToPosition("한인업소")} /> */}
        </div>
    );
}
export default Shortcut;