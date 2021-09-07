import React from "react";
import { NavLink } from "react-router-dom";
import { User } from "../../App";
import "./Header.scss";

interface IHeader {
  user: User;
  filter: boolean;
  setFilter(bool: boolean): void;
}

const Header: React.FC<IHeader> = (props) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <NavLink to="/">
            <img src="../images/logo.png" alt="logo" />
          </NavLink>
          {Object.keys(props.user).length !== 0 ? (
            <div className="navigation">
              <NavLink
                to="/"
                activeClassName="active__link"
                className="link"
                exact
              >
                JOGS
              </NavLink>
              <NavLink
                to="/info"
                activeClassName="active__link"
                className="link"
                exact
              >
                INFO
              </NavLink>
              <NavLink
                to="/contactus"
                activeClassName="active__link"
                className="link"
                exact
              >
                CONTACT US
              </NavLink>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="39"
                height="39"
                viewBox="0 0 39 39"
                className="filter"
                onClick={() => props.setFilter(!props.filter)}
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    fill={props.filter ? "#fff" : "#62AA14"}
                    d="M32.814 8.83c-.209-.478-.57-.717-1.086-.717H8.195c-.514 0-.876.24-1.084.717-.209.503-.123.932.257 1.287l9.064 9.064v8.935c0 .32.117.595.35.828l4.706 4.706c.22.233.497.35.827.35.148 0 .3-.03.46-.092.478-.209.717-.57.717-1.085V19.181l9.064-9.064c.38-.355.466-.784.258-1.287z"
                  />
                  <rect
                    width="37"
                    height="37"
                    x="1"
                    y="1"
                    stroke={props.filter ? "#7ed321" : "#62AA14"}
                    strokeWidth="2"
                    rx="6"
                  />
                </g>
              </svg>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
