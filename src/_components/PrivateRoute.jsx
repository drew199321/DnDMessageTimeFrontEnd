/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  let isAuthenticated = false;
  const data = localStorage.user;
  if (data) isAuthenticated = JSON.parse(data).isAuthenticated;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to={{ pathname: '/' }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
}
