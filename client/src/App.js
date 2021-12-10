import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import test from "./components/pages/test";
import Home from "./components/pages/Home";
import Viewer from './components/pages/Viewer';
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import LibrarianLogin from "./components/auth/LibrarianLogin";
import LibrarianRegister from "./components/auth/LibrarianRegister";

import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateRoute1 from "./components/routing/PrivateRoute1";

import AuthState from "./context/auth/AuthState";
import LibraryAuthState from "./context/librarianauth/AuthState";
import AlertState from "./context/alert/AlertState";
import "./App.css";

const App = () => {
  return (
    <LibraryAuthState>
      <AuthState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className="container">
                  <Alerts />
                  <Switch>
                    <PrivateRoute1 exact path="/" component={Home} />
                    <PrivateRoute exact path="/viewer/:id" component = {Viewer} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/liblogin" component={LibrarianLogin} />
                    <Route exact path="/libregister" component={LibrarianRegister} />
                    <Route exact path="/test" component={About} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
      </AuthState>
    </LibraryAuthState>
  );
};

export default App;
