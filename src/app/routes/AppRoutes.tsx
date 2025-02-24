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
      {/* Public Routes */}
      <PrivateRoute path="/" exact component={Home} />
      <Route path={RouteConstants.introRelative} component={Intro} exact />
      <Route path={RouteConstants.loginRelative} component={Login} exact />
      <Route path={RouteConstants.registerRelative} component={Register} />

      <Route path={RouteConstants.welcomeRelative} component={Welcome} />
      <Route path={RouteConstants.paymentsRelative} render={() => <Payments />} exact={true} />
      <Route path={RouteConstants.profileRelative} render={() => <Profile />} exact={true} />

      <Route path={RouteConstants.circleRelative} component={MyCircles} exact />

      <Route path={RouteConstants.circleCreateRelative} component={Circle} exact />
      <Route path={`${RouteConstants.circleEditRelative}/:circleId`} component={Circle} exact />
      <Route path={RouteConstants.circleCongratulationsRelative} component={CongratulationsPage} exact />
      <Route path={`${RouteConstants.circleDetailsRelative}/:circleId`} component={CircleDetails} exact />

      {/* Protected Routes */}
      <PrivateRoute path={RouteConstants.homeRelative} component={Home} exact={true} />
    </>
  );
};

export default AppRoutes;
