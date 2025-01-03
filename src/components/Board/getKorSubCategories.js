export const getKorSubCategories = (subCategory) => {

    if (subCategory === "TOTAL") {
        return "TOTAL";
    } else if (subCategory === "SOCIETY") {
        return "사회";
    } else if (subCategory === "POLITICS") {
        return "정치";
    } else if (subCategory === "SPORTS") {
        return "스포츠";
    } else if (subCategory === "ECONOMICS") {
        return "경제";
    } else if (subCategory === "CULTURE") {
        return "문화";
    } else if (subCategory === "KOREAN") {
        return "한인마트";
    } else if (subCategory === "ASIAN") {
        return "아시안마트";
    } else if (subCategory === "GROUP") {
        return "공동구매";
    } else if (subCategory === "HOSPITAL") {
        return "의료정보";
    } else if (subCategory === "BEAUTY") {
        return "미용";
    } else if (subCategory === "VISA") {
        return "비자";
    } else if (subCategory === "RESTAURANT") {
        return "식당";
    } else if (subCategory === "DELIVER") {
        return "택배";
    } else if (subCategory === "CAR") {
        return "자동차";
    } else if (subCategory === "COMPANY") {
        return "회사설립";
    } else if (subCategory === "ELECTRONIC") {
        return "전자기기";
    } else if (subCategory === "FURNITURE") {
        return "가구";
    } else if (subCategory === "HOUSEHOLD") {
        return "생활용품";
    } else if (subCategory === "TICKET") {
        return "티켓/상품권";
    } else if (subCategory === "USED_CAR") {
        return "자동차";
    }  else if (subCategory === "DIRHAM") {
        return "디르함";
    } else if (subCategory === "BUY") {
        return "구매";
    } else if (subCategory === "HANDOVER") {
        return "판매";
    } else if (subCategory === "RENT") {
        return "임대";
    } else if (subCategory === "FULL_TIME") {
        return "풀타임";
    } else if (subCategory === "PART_TIME") {
        return "파트타임";
    } else if (subCategory === "DAY") {
        return "하루근무";
    } else if (subCategory === "PARENTING") {
        return "출산/육아";
    } else if (subCategory === "EDUCATION") {
        return "교육";
    } else if (subCategory === "ACADEMY") {
        return "학원";
    } else if (subCategory === "EXPERIENCE") {
        return "체험";
    } else if (subCategory === "ACCOMODATION") {
        return "숙소";
    } else if (subCategory === "RENT_CAR") {
        return "렌트카";
    } else if (subCategory === "EVENT") {
        return "이벤트";
    } else if (subCategory === "SPORT") {
        return "스포츠";
    } else if (subCategory === "HOBBY") {
        return "취미";
    } else if (subCategory === "RELIGION") {
        return "종교";
    } else if (subCategory === "STUDY") {
        return "공부";
    } else if (subCategory === "KOREAN_HOSPITAL") {
        return "병원";
    } else if (subCategory === "KOREAN_BEAUTY") {
        return "미용";
    } else if (subCategory === "KOREAN_ACCOMODATION") {
        return "숙박";
    }  else if (subCategory === "KOREAN_RESTAURANT") {
        return "식당";
    } else if (subCategory === "KOREAN_MARKET") {
        return "마켓";
    } else if (subCategory === "KOREAN_HEALTH") {
        return "헬스";
    } else if (subCategory === "KOREAN_LAW") {
        return "법률";
    } else if (subCategory === "KOREAN_CAR") {
        return "자동차";
    } else if (subCategory === "KOREAN_ACADEMY") {
        return "학원";
    }  else if (subCategory === "KOREAN_ESTATE") {
        return "부동산";
    }  else if (subCategory === "KOREAN_TRAVEL") {
        return "여행사";
    }  else if (subCategory === "INFO") {
        return "부동산정보";
    }  else if (subCategory === "INVESTMENT") {
        return "금융/투자";
    }  else if (subCategory === "LAW") {
        return "법률";
    } else if (subCategory === "ETC") {
        return "ETC";
    } else {
        return [
        ];
    }
};
