export const getCategories = (category) => {

    if (category === "NEWS") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "사회", value: "SOCIETY" },
        { label: "정치", value: "POLITICS" },
        { label: "스포츠", value: "SPORTS" },
        { label: "경제", value: "ECONOMICS" },
        { label: "문화", value: "CULTURE" },
        { label: "ETC", value: "ETC" },
        ];
    } else if (category === "LIFE") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "식당", value: "RESTAURANT" },
        { label: "마트", value: "MARKET" },
        { label: "체험", value: "EXPERIENCE" },
        { label: "숙소", value: "ACCOMODATION" },
        { label: "여행 팁", value: "TRAVEL_TIPS" },
        { label: "출산/육아", value: "PARENTING" },
        { label: "의료", value: "HOSPITAL" },
        { label: "미용", value: "BEAUTY" },
        { label: "비자", value: "VISA" },
        { label: "금융/투자", value: "INVESTMENT" },
        { label: "법률", value: "LAW" },
        { label: "택배", value: "DELIVER" },
        { label: "자동차", value: "CAR" },
        { label: "공동구매", value: "GROUP" },
        // { label: "한인마트", value: "KOREAN" },
        // { label: "아시안마트", value: "ASIAN" },
        // { label: "회사설립", value: "COMPANY" },
        { label: "ETC", value: "ETC" },
        ];
    } else if (category === "SECOND_HAND") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "전자기기", value: "ELECTRONIC" },
        { label: "가구", value: "FURNITURE" },
        { label: "생활용품", value: "HOUSEHOLD" },
        { label: "티켓/상품권", value: "TICKET" },
        { label: "자동차", value: "USED_CAR" },
        { label: "디르함", value: "DIRHAM" },
        { label: "ETC", value: "ETC" },
        ];
    } else if (category === "REAL_ESTATE") {
        return [
        { label: "부동산정보", value: "INFO" },
        { label: "TOTAL", value: "TOTAL" },
        { label: "구매", value: "BUY" },
        { label: "판매", value: "HANDOVER" },
        { label: "임대", value: "RENT" },
        { label: "ETC", value: "ETC" },
        ];
    } else if (category === "JOB_SEARCH") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "구인", value: "HIRING" },
        { label: "구직", value: "JOB_SEEKING" },
        { label: "ETC", value: "ETC" },
        ];
    } else if (category === "CHILD_CARE") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "유아", value: "TODDLER" },
        { label: "초등", value: "ELEMENTARY" },
        { label: "중고등", value: "MIDDLE" },
        { label: "맘수다", value: "MOM_TALK" },
        { label: "ETC", value: "ETC" },
        ];
    // } else if (category === "TRAVEL") {
    //     return [
    //     { label: "TOTAL", value: "TOTAL" },
    //     { label: "체험", value: "EXPERIENCE" },
    //     { label: "숙소", value: "ACCOMODATION" },
    //     { label: "렌트카", value: "RENT_CAR" },
    //     { label: "이벤트", value: "EVENT" },
    //     { label: "ETC", value: "ETC" },
    //     ];
    } else if (category === "CLUB") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "스포츠", value: "SPORT" },
        { label: "취미", value: "HOBBY" },
        { label: "종교", value: "RELIGION" },
        { label: "공부", value: "STUDY" },
        { label: "ETC", value: "ETC" },
        ];
    } else if (category === "FREE_BOARD") {
        return [
        ];
    } else if (category === "KOREAN_COMPANY") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "병원", value: "KOREAN_HOSPITAL" },
        { label: "미용", value: "KOREAN_BEAUTY" },
        { label: "숙박", value: "KOREAN_ACCOMODATION" },
        { label: "식당", value: "KOREAN_RESTAURANT" },
        { label: "마켓", value: "KOREAN_MARKET" },
        { label: "헬스", value: "KOREAN_HEALTH" },
        { label: "법률", value: "KOREAN_LAW" },
        { label: "자동차", value: "KOREAN_CAR" },
        { label: "학원", value: "KOREAN_ACADEMY" },
        { label: "부동산", value: "KOREAN_ESTATE" },
        { label: "여행사", value: "KOREAN_TRAVEL" },
        { label: "ETC", value: "ETC" },
        ];
    } else if (category === "TRADE_TYPE") {
        return [
        { label: "팝니다", value: "SELL_USED" },
        { label: "삽니다", value: "BUY_USED" }
        ];
    } else if (category === "MY_POSTS") {
        return [
        { label: "뉴스", value: "NEWS" },
        { label: "자유게시판", value: "FREE_BOARD" },
        { label: "중고장터", value: "SECOND_HAND" },
        { label: "구인구직", value: "JOB_SEARCH" },
        { label: "정보공유", value: "LIFE" },
        { label: "교육정보", value: "CHILD_CARE" },
        // { label: "여행정보", value: "TRAVEL" },
        { label: "부동산", value: "REAL_ESTATE" },
        { label: "동호회", value: "CLUB" },
        { label: "한인업소", value: "KOREAN_COMPANY" },
        { label: "모든링크", value: "LINK_HUB" }
        ];
    }
    else {
        return [
        ];
    }
};
