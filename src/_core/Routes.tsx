import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import MyCircles from '../pages/MyCircles';
import Payments from '../pages/Payments';
import Profile from '../pages/Profile';
import { RouteConstants } from '../constants/routeConstants';

const Routes: React.FC = () => (
  <>
    <Route exact path={RouteConstants.homeRelative} component={Home} />
    <Route exact path={RouteConstants.myCirclesRelative} component={MyCircles} />
    <Route exact path={RouteConstants.paymentsRelative} component={Payments} />
    <Route exact path={RouteConstants.profileRelative} component={Profile} />
    <Route exact path="/">
      <Redirect to={RouteConstants.homeRelative} />
    </Route>
  </>
);

export default Routes;
