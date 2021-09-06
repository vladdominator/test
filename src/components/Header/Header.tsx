import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <NavLink to="/">
            <img src="../images/logo.png" alt="logo" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export { Header };
