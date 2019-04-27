import React from 'react';
import { navigate } from 'gatsby';

const isBrowser = () => typeof window !== 'undefined';

const PrivateRoute = ({ component: Component, props, ...rest }) => {
  if (
    !props.isAuthenticated &&
    isBrowser &&
    window.location.pathname !== `/app/login`
  ) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/app/login`);
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
