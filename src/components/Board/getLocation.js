export const getLocation = (category) => {

    if (category === "REAL_ESTATE") {
        return [
        { label: "아부다비", value: "ABU_DHABI" },
        { label: "아지만", value: "AJMAN" },
        { label: "두바이", value: "DUBAI" },
        { label: "푸자이라", value: "FUJAIRAH" },
        { label: "라스알카이마", value: "RAS_AL_KHAIMAH" },
        { label: "샤르자", value: "SHARJAH" },
        { label: "움알쿠와인", value: "UMM_AL_QUWAIN" },
        { label: "ETC", value: "ETC" }
        ];
    } else {
        return [
        ];
    }
};
