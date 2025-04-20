import React from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Board.module.css";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";
import RealEstatePostWrite from "./RealEstate/RealEstatePostWrite";
import GeneralPostWrite from "./General/GeneralPostWrite";
import TopBar from "../../components/TopBar/TopBar";
import { useTranslation } from "react-i18next";


function PostWrite() {

  const { category, id } = useParams();
  const { t } = useTranslation();

  return (
    <div>
        <TopBar />
        <Nav />
        <div className={styles.writeContainer}>
          <div className={styles.paper}>
              <h1>{t('WRITE')}</h1>
          </div>
        
          {category.trim() === "real_estate" ? (
            <RealEstatePostWrite category={category} id={id}/>
          ) : (
            <GeneralPostWrite category={category} id={id}/>
          )}

      </div>
      <div style={{ paddingTop: "10%" }} />
      <Foot />
    </div >
  );
}

export default PostWrite;