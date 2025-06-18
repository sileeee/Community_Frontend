// Nav.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styles from "./Nav.module.css";
import { getCategories } from "../Board/getCategories";
import axios from 'axios';

function Nav(){

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const goToBoard = (category, subCategory = null) => {
        navigate(`/board/${String(category || '').toLowerCase()}`, {
            state: subCategory ? { subCategory } : undefined,
          });
    };

      return (
        <div className={styles.container}>
          <div className={styles.navbar}>
            {["NEWS", "FREE_BOARD", "SECOND_HAND", "JOB_SEARCH", "LIFE", "CHILD_CARE", "REAL_ESTATE", "CLUB", "KOREAN_COMPANY", "LINK_HUB"].map((cat) => {
              const subCategories = getCategories(cat).filter(sub => sub.value !== "ETC" && sub.value !== "TOTAL");
              const hasDropdown = subCategories.length > 0;
    
              return (
                <div
                  key={cat}
                  className={styles.textNavbar}
                  onMouseEnter={() => hasDropdown && setHoveredCategory(cat)}
                  onMouseLeave={() => hasDropdown && setHoveredCategory(null)}
                  onClick={() => goToBoard(cat)}
                >
                  {t(cat)}
                  {hoveredCategory === cat && hasDropdown && (
                    <div
                      className={styles.dropdownContainer}
                      onMouseEnter={() => setHoveredCategory(cat)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {subCategories.map((sub, idx) => (
                        <div
                          key={idx}
                          className={styles.dropdownItem}
                          onClick={(e) => {
                            e.stopPropagation();
                            goToBoard(cat, sub.value);
                          }}
                        >
                          {sub.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
export default Nav;
