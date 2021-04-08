import React from "react";
import Auth from "./components/Auth/Auth";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./components/Main/Main";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/main" exact component={Main} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
