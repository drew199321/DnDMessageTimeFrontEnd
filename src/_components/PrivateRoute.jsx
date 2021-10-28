/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import authToken from '../_helpers/auth';

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!authToken.isAuthenticated) {
          console.log(authToken);
          return <Redirect to={{ pathname: '/' }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
}
