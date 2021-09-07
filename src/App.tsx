import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { asyncUserMethod, IJogs } from "./asyncUserMethod";
import { ClickPage } from "./components/ClickPage/ClickPage";
import { Header } from "./components/Header/Header";
import { Information } from "./components/Information/Information";
import { Jogs } from "./components/Jogs/Jogs";

export interface User {
  email?: string;
  first_name?: string;
  id?: string;
  last_name?: string;
  phone?: string;
  role?: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User>({});
  const [jogs, setJogs] = useState<IJogs[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);

  const fetchData = async (token: string) => {
    const [userData, jogsData] = await asyncUserMethod(token);
    setUser(userData);

    setJogs(
      jogsData.filter((item: IJogs) => item.user_id == userData.response.id)
    );
    setProcessing(false);
  };

  useEffect(() => {
    setProcessing(true);
    const token = localStorage.getItem("token");
    if (token) {
      fetchData(token);
    } else {
      setProcessing(false);
    }
  }, []);

  if (processing) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Header user={user} />
      {Object.keys(user).length !== 0 ? (
        <>
          <Route path="/info" exact render={() => <Information />} />
          <Route path="/" exact render={() => <Jogs jogs={jogs} />} />
        </>
      ) : (
        <>
          <Route
            path="/"
            exact
            render={() => (
              <ClickPage
                setUser={setUser}
                user={user}
                setJogs={setJogs}
                jogs={jogs}
              />
            )}
          />
        </>
      )}
    </BrowserRouter>
  );
};

export { App };
