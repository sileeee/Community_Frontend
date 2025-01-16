export const getKorCategories = (category) => {

    if (category === "news") {
        return "뉴스";
    } else if (category === "asian_market") {
        return "마켓정보";
    } else if (category === "life") {
        return "생활정보";
    } else if (category === "second_hand") {
        return "중고장터";
    } else if (category === "real_estate") {
        return "부동산";
    } else if (category === "job_search") {
        return "구인구직";
    } else if (category === "child_care") {
        return "교육정보";
    } else if (category === "travel") {
        return "여행정보";
    } else if (category === "club") {
        return "동호회";
    } else if (category === "free_board") {
        return "자유게시판";
    } else if (category === "korean_company") {
        return "한인업소";
    } else if (category === "search") {
        return "검색결과";
    } else {
        return [
        ];
    }
};
