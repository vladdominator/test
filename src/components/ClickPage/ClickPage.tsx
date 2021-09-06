import React from "react";
import { User } from "../../App";
import { asyncUserMethod, IJogs } from "../../asyncUserMethod";
import "./ClickPage.scss";

interface IClickPage {
  setUser(user: User): void;
  user: User;
  setJogs(jogs: IJogs[]): void;
  jogs: IJogs[];
}

const ClickPage: React.FC<IClickPage> = (props) => {
  const handleAuthorizationClick = async (): Promise<void> => {
    const token =
      "eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf";
    const [user, jogs] = await asyncUserMethod(
      "eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf"
    );
    props.setUser(user);
    props.setJogs(jogs);
    localStorage.setItem("token", token);
  };
  return (
    <main>
      <div className="container">
        <div className="main__container">
          <div className="click__me_container">
            <img src="../images/bear-face.png" alt="bear-face" />
            <button
              className="click__me_button"
              onClick={handleAuthorizationClick}
            >
              Let me in
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export { ClickPage };
