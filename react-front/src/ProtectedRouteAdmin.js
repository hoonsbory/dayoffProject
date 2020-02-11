import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRouteAdmin = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (sessionStorage.getItem("userId")&&sessionStorage.getItem("userRole")==="admin") {
          return <Component {...props} />;
        }else if(sessionStorage.getItem("userId")&&sessionStorage.getItem("userRole")==="user"){
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
