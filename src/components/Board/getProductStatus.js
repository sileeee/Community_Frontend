export const getProductStatus = (category) => {

    if (category === "REAL_ESTATE") {
        return [
        { label: "빈 공간", value: "EMPTY" },
        { label: "거주 중", value: "OCCUPIED" },
        { label: "완공 전", value: "CONSTRUCTION_IN_PROGRESS" },
        { label: "거래 중", value: "PROCESS" },
        { label: "거래 완료", value: "COMPLETE" },
        { label: "ETC", value: "ETC" }
        ];
    } else {
        return [
        ];
    }
};
