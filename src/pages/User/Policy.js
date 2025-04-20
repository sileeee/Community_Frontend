import React, { useEffect } from "react";
import styles from "./Login.module.css";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";
import TopBar from "../../components/TopBar/TopBar";
import { useTranslation } from "react-i18next";


const MyPage = () => {
    
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    return (
        <div>
        <TopBar />
        <Nav />
        <div className={styles.policyContainer}>
        <h1>{t("privacy.title")}</h1>
        <div className={styles.policyContent}>
          <p>{t("privacy.intro", { site: "Handubi" })}</p>

          <h2>{t("privacy.collection.title")}</h2>
          <p>{t("privacy.collection.desc")}</p>
          <ul>
            <li>{t("privacy.collection.required")}</li>
            <li>{t("privacy.collection.optional")}</li>
          </ul>
          <p>{t("privacy.collection.auto")}</p>
          <ul>
            <li>{t("privacy.collection.logs")}</li>
            <li>{t("privacy.collection.cookies")}</li>
          </ul>

          <h2>{t("privacy.usage.title")}</h2>
          <p>{t("privacy.usage.desc")}</p>
          <ul>
            <li>{t("privacy.usage.signup")}</li>
            <li>{t("privacy.usage.community")}</li>
            <li>{t("privacy.usage.ads")}</li>
            <li>{t("privacy.usage.improve")}</li>
            <li>{t("privacy.usage.law")}</li>
          </ul>

          <h2>{t("privacy.storage.title")}</h2>
          <p>{t("privacy.storage.period")}</p>
          <ul>
            <li>{t("privacy.storage.member")}</li>
            <li>{t("privacy.storage.legal")}</li>
          </ul>
          <p>{t("privacy.storage.deletion")}</p>
          <ul>
            <li>{t("privacy.storage.user_request")}</li>
            <li>{t("privacy.storage.irreversible")}</li>
          </ul>

          <h2>{t("privacy.sharing.title")}</h2>
          <p>{t("privacy.sharing.desc")}</p>
          <ul>
            <li>{t("privacy.sharing.consent")}</li>
            <li>{t("privacy.sharing.law")}</li>
            <li>{t("privacy.sharing.trusted")}</li>
          </ul>

          <h2>{t("privacy.cookies.title")}</h2>
          <p>{t("privacy.cookies.desc")}</p>

          <h2>{t("privacy.rights.title")}</h2>
          <p>{t("privacy.rights.desc")}</p>
          <ul>
            <li>{t("privacy.rights.view_edit_delete")}</li>
            <li>{t("privacy.rights.withdraw")}</li>
            <li>{t("privacy.rights.transfer")}</li>
          </ul>
          <p>{t("privacy.rights.contact")}</p>

          <h2>{t("privacy.protection.title")}</h2>
          <p>{t("privacy.protection.desc")}</p>
          <ul>
            <li>{t("privacy.protection.ssl")}</li>
            <li>{t("privacy.protection.encryption")}</li>
            <li>{t("privacy.protection.monitoring")}</li>
          </ul>

          <h2>{t("privacy.changes.title")}</h2>
          <p>{t("privacy.changes.desc")}</p>

          <h2>{t("privacy.contact.title")}</h2>
          <p>{t("privacy.contact.desc")}</p>
          <p>
            {t("privacy.contact.email")}: koreadubai058@gmail.com<br />
            {t("privacy.contact.phone")}:<br />
            {t("privacy.contact.address")}:
          </p>
        </div>
        </div>
        <Foot />
        </div>
    );
};

export default MyPage;