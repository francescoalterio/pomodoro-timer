import React from "react";
import "./styles.css";

const ButtonPage = ({ children, page, handleClick }) => {
  return (
    <button
      className={page === children ? "button-page page-active" : "button-page"}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default ButtonPage;
