import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchPost.module.css';
import { useTranslation } from "react-i18next";



function SearchPost(){

  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    if(!keyword){
      window.confirm("검색창에 키워드를 입력하세요.")
    }else{
      navigate('/board/search', {state: {keyword: keyword}});
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const searchWithKeyword = () => {
    handleSearch();
  };

  return (
      <div className={styles.searchWrapper}>
          <div className={styles.inputWrapper}>
              <input 
                  type="text" 
                  placeholder={t('SEARCH_KEYWORD')}
                  className={styles.searchInput}
                  value={keyword}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  /> 
              <div className={styles.searchBtnContainer} onClick={searchWithKeyword}>
                  <div className={styles.btnTextContainer}>
                  <div className={styles.btnText}>Search</div>
                  <img className={styles.search} alt="Search" src="/static/img/search.png" />
                  </div>
              </div>
          </div>
      </div>
  );
}

export default SearchPost;