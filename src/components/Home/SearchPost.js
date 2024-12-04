import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchPost.module.css';



function SearchPost(){

  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    if(!keyword){
      alert("검색창에 키워드를 입력하세요.")
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
                  placeholder="궁금하신 모든 것을 찾아보세요!" 
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