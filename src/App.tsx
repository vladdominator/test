import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { asyncUserMethod, IJogs } from "./asyncUserMethod";
import { ClickPage } from "./components/ClickPage/ClickPage";
import { Header } from "./components/Header/Header";
import { Information } from "./components/Information/Information";
import { Jogs } from "./components/Jogs/Jogs";
import { NoMatchPage } from "./components/NoMatchPage/NoMatchPage";

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
  const [processing, setProcessing] = useState<boolean>(true);
  const [filter, setFilter] = useState<boolean>(false);

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

  return (
    <BrowserRouter>
      <Header user={user} setFilter={setFilter} filter={filter} />
      {processing ? (
        <div>Loading...</div>
      ) : Object.keys(user).length !== 0 ? (
        <Switch>
          <Route path="/info" exact render={() => <Information />} />
          <Route
            path="/"
            exact
            render={() => (
              <Jogs jogs={jogs} setJogs={setJogs} filter={filter} />
            )}
          />
          <Route component={NoMatchPage} path="" />
        </Switch>
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
