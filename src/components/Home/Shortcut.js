import { Frame } from "../common/Frame";
import styles from "../common/Frame.module.css";

function Shortcut(){
    
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
            <Frame className="frame" text="뉴스" onClick={() => ScrollToPosition("뉴스")} />
            <Frame className="frame" text="마켓정보" onClick={() => ScrollToPosition("마켓정보")} />
            <Frame className="frame" text="생활정보" onClick={() => ScrollToPosition("생활정보")} />
            <Frame className="frame" text="중고시장" onClick={() => ScrollToPosition("중고시장")} />
            <Frame className="frame" text="부동산" onClick={() => ScrollToPosition("부동산")} />
            <Frame className="frame" text="구인구직" onClick={() => ScrollToPosition("구인구직")} />
            <Frame className="frame" text="교육정보" onClick={() => ScrollToPosition("교육정보")} />
            <Frame className="frame" text="여행정보" onClick={() => ScrollToPosition("여행정보")} />
            <Frame className="frame" text="동호회" onClick={() => ScrollToPosition("동호회")} />
            <Frame className="frame" text="자유게시판" onClick={() => ScrollToPosition("자유게시판")} />
            {/* <Frame className="frame" divClassName="frame-text" text="한인업소" onClick={() => ScrollToPosition("한인업소")} /> */}
        </div>
    );
}
export default Shortcut;