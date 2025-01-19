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
    } else if (category === "ASIAN_MARKET") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "한인마트", value: "KOREAN" },
        { label: "아시안마트", value: "ASIAN" },
        { label: "공동구매", value: "GROUP" },
        { label: "ETC", value: "ETC" },
        ];
    } else if (category === "LIFE") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "의료정보", value: "HOSPITAL" },
        { label: "미용", value: "BEAUTY" },
        { label: "비자", value: "VISA" },
        { label: "식당", value: "RESTAURANT" },
        { label: "택배", value: "DELIVER" },
        { label: "자동차", value: "CAR" },
        { label: "회사설립", value: "COMPANY" },
        { label: "출산/육아", value: "PARENTING" },
        { label: "금융/투자", value: "INVESTMENT" },
        { label: "법률", value: "LAW" },
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
        { label: "TOTAL", value: "TOTAL" },
        { label: "부동산정보", value: "INFO" },
        { label: "구매", value: "BUY" },
        { label: "판매", value: "HANDOVER" },
        { label: "급매", value: "URGENT_HANDOVER" },
        { label: "off-plan", value: "OFF_PLAN" },
        { label: "임대", value: "RENT" },
        { label: "ETC", value: "ETC" },
        ];
    } else if (category === "JOB_SEARCH") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "풀타임", value: "FULL_TIME" },
        { label: "파트타임", value: "PART_TIME" },
        { label: "하루근무", value: "DAY" },
        { label: "ETC", value: "ETC" },
        ];
    } else if (category === "CHILD_CARE") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "교육", value: "EDUCATION" },
        { label: "학원", value: "ACADEMY" },
        { label: "ETC", value: "ETC" },
        ];
    } else if (category === "TRAVEL") {
        return [
        { label: "TOTAL", value: "TOTAL" },
        { label: "체험", value: "EXPERIENCE" },
        { label: "숙소", value: "ACCOMODATION" },
        { label: "렌트카", value: "RENT_CAR" },
        { label: "이벤트", value: "EVENT" },
        { label: "ETC", value: "ETC" },
        ];
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
    } else {
        return [
        ];
    }
};
