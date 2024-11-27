import '../../styleguide.css';
import { Frame } from "../common/Frame";
import styles from "../common/Frame.module.css";

function Shortcut(){
    
    const ScrollToPosition = (text) => {

        let scrollPosition = 0;
    
        if (text === "뉴스") {
          scrollPosition = 1300;
        } else if (text === "마켓정보") {
          scrollPosition = 1900;
        } else if (text === "생활정보") {
            scrollPosition = 2500;
        } else if (text === "중고시장") {
            scrollPosition = 3100;
        } else if (text === "부동산") {
            scrollPosition = 3700;
        } else if (text === "구인구직") {
            scrollPosition = 4300;
        } else if (text === "교육정보") {
            scrollPosition = 4900;
        } else if (text === "여행정보") {
            scrollPosition = 5500;
        } else if (text === "동호회") {
            scrollPosition = 6100;
        } else if (text === "자유게시판") {
            scrollPosition = 6700;
        } else if (text === "한인업소") {
            scrollPosition = 7400;
        }
    
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
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