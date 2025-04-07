import styles from "./GlobalControls.module.css";
import React from "react";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { GlobalOutlined } from '@ant-design/icons';

const GlobalControls = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = (checked) => {
    i18n.changeLanguage(checked ? "en" : "ko");
  };

  const isEnglish = i18n.language === "en";

  return (
    <div className={styles.globalControls}>
        <div className={styles.leftText}>두바이의 모든 한인들을 위한 커뮤니티</div>
        <div className={styles.rightGroup}>
        <GlobalOutlined className={styles.globalIcon} />
        <div className={styles.languageToggle}>
          <Switch
            checkedChildren="EN"
            unCheckedChildren="KO"
            checked={isEnglish}
            onChange={toggleLanguage}
            size="small"
            style={{
              backgroundColor: isEnglish ? "green" : undefined,
              color: isEnglish ? "black" : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;
