import PropTypes from "prop-types";
import React from "react";
import "../App.css";


export const Frame = ({ className, text = "Job Search", divClassName }) => {
  return (
    <div className={`frame ${className}`}>
      <div className={`job-search ${divClassName}`}>{text}</div>
    </div>
  );
};

Frame.propTypes = {
  text: PropTypes.string,
};
