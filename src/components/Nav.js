import "../App.css";
import '../styleguide.css';

function Nav(){

    return(
        <div className="group-14">
            <div className="group-17">
                <div className="text-wrapper-41">Handubi</div>
                <img className="logo" alt="Handubi" src="static/img/handubi-logo.png"/>
            </div>
            <div className="navbar">
                <div className="text-wrapper-30">구인구직</div>
                <div className="text-wrapper-30">뉴스</div>
                <div className="text-wrapper-30">부동산</div>
                <div className="text-wrapper-30">중고시장</div>
                <div className="text-wrapper-30">마켓정보</div>
                <div className="text-wrapper-30">여행정보</div>
                <div className="text-wrapper-30">교육정보</div>
                <div className="text-wrapper-30">생활정보</div>
                <div className="text-wrapper-30">동호회</div>
                <div className="text-wrapper-30">자유게시판</div>
                <div className="text-wrapper-30">한인업소</div>
            </div>

            <div className="group-15">
                <div className="text-wrapper-40">로그인</div>
                
                <div className="group-16">
                    <div className="overlap-group-3">
                        <div className="text-wrapper-39">회원가입</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Nav;
