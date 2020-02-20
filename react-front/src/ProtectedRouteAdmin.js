import React from "react";
import { Route, Redirect } from "react-router-dom";
import cookie from 'react-cookies';

export const ProtectedRouteAdmin = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (cookie.load("userinfo")&&localStorage.getItem("userRole")==="admin") {
          return <Component {...props} />;
        }else if(cookie.load("userinfo")&&localStorage.getItem("userRole")==="user"){
          return (
            <Redirect
              to={{
                pathname: "/error",
                state: {
                  from: props.location
                }
              }}
            />
          );



        }
        else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
