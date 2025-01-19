export const getProductType = (category) => {

    if (category === "REAL_ESTATE") {
        return [
        { label: "아파트", value: "APARTMENT" },
        { label: "빌라", value: "VILLA" },
        { label: "콘도", value: "CONDO" },
        { label: "타운하우스", value: "TOWNHOUSE" },
        { label: "펜트하우스", value: "PENTHOUSE" },
        { label: "상업용", value: "COMMERCIAL" },
        { label: "ETC", value: "ETC" },
        ];
    } else {
        return [
        ];
    }
};
