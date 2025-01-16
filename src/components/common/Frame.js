import PropTypes from "prop-types";
import React from "react";
import styles from "./Frame.module.css";


export const Frame = ({ className, text, onClick }) => {

  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <div className={`${styles.frame} ${className}`}>
        <div>{text}</div>
      </div>
    </div>
  );
};

Frame.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  divClassName: PropTypes.string,
  onClick: PropTypes.func,
};
