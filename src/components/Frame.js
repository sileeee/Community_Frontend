import PropTypes from "prop-types";
import React from "react";
import "../App.css";


export const Frame = ({ className, text, divClassName }) => {
  return (
    <div className={`frame ${className}`}>
      <div className={`frame-text${divClassName}`}>{text}</div>
    </div>
  );
};

Frame.propTypes = {
  text: PropTypes.string,
};
