import React from "react";
import { Redirect, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import MyCircles from "../pages/MyCircles";
import Payments from "../pages/Payments";
import Profile from "../pages/Profile";
import { RouteConstants } from "../constants/constants";
import Welcome from "../pages/Welcome";
import Intro from "../pages/intro/Intro";
import Login from "../pages/login/Login";
import useIsAuth from "./hooks/useIsAuth";
import Register from "../pages/register/Register";

const AppRoutes: React.FC = () => {
  const isAuth = useIsAuth();
  return (
    <>
      <Route path="/" exact render={() => (isAuth ? <Redirect to={RouteConstants.homeRelative} /> : <Login />)} />
      <Route path={RouteConstants.introRelative} component={Intro} exact />
      <Route path={RouteConstants.loginRelative} component={Login} exact />
      <Route path={RouteConstants.registerRelative} component={Register} />
      <Route path={RouteConstants.welcomeRelative} component={Welcome} />
      <Route path={RouteConstants.homeRelative} render={() => <Home />} exact={true} />
      <Route path={RouteConstants.myCirclesRelative} render={() => <MyCircles />} exact={true} />
      <Route path={RouteConstants.paymentsRelative} render={() => <Payments />} exact={true} />
      <Route path={RouteConstants.profileRelative} render={() => <Profile />} exact={true} />
    </>
  );
};

export default AppRoutes;
