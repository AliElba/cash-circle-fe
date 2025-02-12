import React from "react";
import { Redirect, Route } from "react-router-dom";
import Home from "../pages/home/Home";

import Payments from "../pages/Payments";
import Profile from "../pages/Profile";
import { RouteConstants } from "../constants/constants";
import Welcome from "../pages/Welcome";
import Intro from "../pages/intro/Intro";
import Login from "../pages/login/Login";
import useIsAuth from "./hooks/useIsAuth";
import Register from "../pages/register/Register";
import Circle from "../pages/circle/Circle";
import MyCircles from "../pages/my-circles/MyCircles";
import CongratulationsPage from "../pages/circle/congratulations-page/CongratulationsPage";

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
      <Route path={RouteConstants.circleRelative} render={() => <MyCircles />} exact={true} />
      <Route path={RouteConstants.paymentsRelative} render={() => <Payments />} exact={true} />
      <Route path={RouteConstants.profileRelative} render={() => <Profile />} exact={true} />

      <Route path={RouteConstants.circleRelative} component={MyCircles} exact />

      <Route path={RouteConstants.circleCreateRelative} component={Circle} exact />
      <Route path={`${RouteConstants.circleRelative}/edit/:circleId`} component={Circle} exact />
      <Route path={RouteConstants.circleCongratulationsRelative} component={CongratulationsPage} exact />
    </>
  );
};

export default AppRoutes;
