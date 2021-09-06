import React from "react";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <img src="../images/logo.png" alt="logo" />
        </div>
      </div>
    </header>
  );
};

export { Header };
