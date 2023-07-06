import React, { Fragment, useEffect } from "react";
import { Route , Redirect } from "react-router-dom";
import { useSelector } from "react-redux";


const UserRoute = ({ children, component: Component, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

    
  return (user?.token &&  <Route {...rest} render={(props) => {
            if (user===null) {
              return <Redirect to="/login" />;
            }

            

            return <Component {...props} />;
          }}/> )
};

export default UserRoute;