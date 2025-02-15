import React from "react";
import { Redirect, Route } from "react-router-dom";
import useIsAuth from "../hooks/useIsAuth";
import { RouteConstants } from "../../constants/constants";

const PrivateRoute: React.FC<{ component: React.ElementType; path: string; exact?: boolean }> = ({
  component: Component,
  ...rest
}) => {
  const isAuth = useIsAuth();
  return (
    <Route
      {...rest}
      render={(props) => (isAuth ? <Component {...props} /> : <Redirect to={RouteConstants.loginRelative} />)}
    />
  );
};

export default PrivateRoute;
