import React from "react";
import { Route } from "react-router-dom";
import Home from "../../pages/home/Home";

import Payments from "../../pages/payments/Payments";
import Profile from "../../pages/Profile";
import { RouteConstants } from "../../constants/constants";
import Welcome from "../../pages/Welcome";
import Intro from "../../pages/intro/Intro";
import Login from "../../pages/login/Login";
import useIsAuth from "../hooks/useIsAuth";
import Register from "../../pages/register/Register";
import Circle from "../../pages/circle/Circle";
import MyCircles from "../../pages/my-circles/MyCircles";
import CongratulationsPage from "../../pages/circle/congratulations-page/CongratulationsPage";
import PrivateRoute from "./PrivateRoute";
import CircleDetails from "../../pages/circle-details/CircleDetails";

const AppRoutes: React.FC = () => {
  const isAuth = useIsAuth();
  return (
    <>
      <PrivateRoute path="/" exact component={Home} />

      {/* Public Routes */}
      <Route path={RouteConstants.introRelative} component={Intro} exact />
      <Route path={RouteConstants.loginRelative} component={Login} exact />
      <Route path={RouteConstants.registerRelative} component={Register} />

      {/* Protected Routes */}
      <PrivateRoute path={RouteConstants.welcomeRelative} component={Welcome} />
      <PrivateRoute path={RouteConstants.paymentsRelative} component={Payments} exact={true} />
      <PrivateRoute path={RouteConstants.profileRelative} component={Profile} exact={true} />

      <PrivateRoute path={RouteConstants.circleRelative} component={MyCircles} exact />

      <PrivateRoute path={RouteConstants.circleCreateRelative} component={Circle} exact />
      <PrivateRoute path={`${RouteConstants.circleEditRelative}/:circleId`} component={Circle} exact />
      <PrivateRoute path={RouteConstants.circleCongratulationsRelative} component={CongratulationsPage} exact />
      <PrivateRoute path={`${RouteConstants.circleDetailsRelative}/:circleId`} component={CircleDetails} exact />

      <PrivateRoute path={RouteConstants.homeRelative} component={Home} exact={true} />
    </>
  );
};

export default AppRoutes;
