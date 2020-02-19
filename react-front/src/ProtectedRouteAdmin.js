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
        if (localStorage.getItem("userId")&&localStorage.getItem("userRole")==="admin") {
          return <Component {...props} />;
        }else if(localStorage.getItem("userId")&&localStorage.getItem("userRole")==="user"){
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
