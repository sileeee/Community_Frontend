export const getKorCategories = (category) => {

    if (!category) return "";
    const lowerCategory = category.toLowerCase();

    if (lowerCategory === "news") {
        return "뉴스";
    } else if (lowerCategory === "asian_market") {
        return "마켓정보";
    } else if (lowerCategory === "life") {
        return "생활정보";
    } else if (lowerCategory === "second_hand") {
        return "중고장터";
    } else if (lowerCategory === "real_estate") {
        return "부동산";
    } else if (lowerCategory === "job_search") {
        return "구인구직";
    } else if (lowerCategory === "child_care") {
        return "교육정보";
    } else if (lowerCategory === "travel") {
        return "여행정보";
    } else if (lowerCategory === "club") {
        return "동호회";
    } else if (lowerCategory === "free_board") {
        return "자유게시판";
    } else if (lowerCategory === "korean_company") {
        return "한인업소";
    } else if (lowerCategory === "search") {
        return "검색결과";
    } else {
        return [
        ];
    }
};
