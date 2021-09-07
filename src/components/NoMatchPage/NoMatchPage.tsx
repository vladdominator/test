import React from "react";
import { NavLink } from "react-router-dom";
import "./NoMatchPage.scss";

const NoMatchPage: React.FC = () => {
  return (
    <div className="container_404">
      <img src="../images/sad-emoticon.png" alt="sad-emoticon" />
      <p className="text_404"> Nothing is there</p>
      <NavLink to="/">
        <button className="create__jog_404">Create your jog first</button>
      </NavLink>
    </div>
  );
};

export { NoMatchPage };
