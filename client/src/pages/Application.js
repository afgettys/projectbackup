import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "../utils/UserContext";
import Home from "./Home";
import mybooks from "./mybooks";
import Nav from "../components/Nav";
import PasswordReset from "./PasswordReset";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import discussion from "./discussion";
import React, { useContext } from "react";

function Application() {
  const user = useContext(UserContext);

  return user ? (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/mybooks" component={mybooks} />
          <Route exact path="/passwordreset" component={PasswordReset} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/discussion" component={discussion} />
        </Switch>
      </div>
    </Router>
  ) : (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Application;
