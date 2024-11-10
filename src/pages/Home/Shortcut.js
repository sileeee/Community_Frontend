import "../../App.css";
import '../../styleguide.css';
import { Frame } from "../../components/common/Frame";

function Shortcut(){

    return(
        <div className="center-container">
            <Frame className="frame-1" text="구인구직" />
            <Frame className="frame-1" text="뉴스" />
            <Frame className="frame-1" text="부동산" />
            <Frame className="frame-1" text="중고시장" />
            <Frame className="frame-1" text="마켓정보" />
            <Frame className="frame-1" text="여행정보" />
            <Frame className="frame-1" text="교육정보" />
            <Frame className="frame-1" text="생활정보" />
            <Frame className="frame-1" text="동호회" />
            <Frame className="frame-1" text="자유게시판" />
            <Frame className="frame-1" text="한인업소" />
        </div>
    );
}
export default Shortcut;