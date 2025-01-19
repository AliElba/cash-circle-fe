import React from "react";
import { Redirect, Route } from "react-router-dom";
import Home from "../pages/Home";
import MyCircles from "../pages/MyCircles";
import Payments from "../pages/Payments";
import Profile from "../pages/Profile";
import { RouteConstants } from "../constants/constants";
import Welcome from "../pages/Welcome";
import Intro from "../pages/intro/Intro";
import Login from "../pages/login/Login";
import { useAuth } from "./context/AuthContext";

const AppRoutes: React.FC = () => {
  const { isAuth } = useAuth();
  return (
    <>
      <Route
        path="/"
        exact
        render={() => {
          return isAuth ? <Redirect to={RouteConstants.homeRelative} /> : <Login />;
        }}
      />

      {/*<Route path="/" component={Login} exact />*/}
      <Route path={RouteConstants.introRelative} component={Intro} exact />

      <Route path={RouteConstants.loginRelative} component={Login} exact />

      <Route path={RouteConstants.welcomeRelative} component={Welcome} />

      <Route path={RouteConstants.homeRelative} render={() => <Home />} exact={true} />
      <Route path={RouteConstants.myCirclesRelative} render={() => <MyCircles />} exact={true} />
      <Route path={RouteConstants.paymentsRelative} render={() => <Payments />} exact={true} />
      <Route path={RouteConstants.profileRelative} render={() => <Profile />} exact={true} />
    </>
  );
};

export default AppRoutes;
