import React from "react";
import "./styles/ButtonPage.css";

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
