import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MyCircles from '../pages/MyCircles';
import Payments from '../pages/Payments';
import Profile from '../pages/Profile';
import { RouteConstants } from '../constants/routeConstants';
import Login from '../pages/Login';
import Welcome from '../pages/Welcome';

const AppRoutes: React.FC = () => (
  <>
    <Route path="/" exact>
      <Redirect to={RouteConstants.loginRelative} />
    </Route>
    <Route path={RouteConstants.loginRelative} component={Login} />
    <Route path={RouteConstants.welcomeRelative} component={Welcome} />

    <Route path={RouteConstants.homeRelative} render={() => <Home />} exact={true} />
    <Route path={RouteConstants.myCirclesRelative} render={() => <MyCircles />} exact={true} />
    <Route path={RouteConstants.paymentsRelative} render={() => <Payments />} exact={true} />
    <Route path={RouteConstants.profileRelative} render={() => <Profile />} exact={true} />

    {/*<Route path="*" exact={true}>
      <Redirect to={RouteConstants.homeRelative} />
    </Route>*/}
  </>
);

export default AppRoutes;
