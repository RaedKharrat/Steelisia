import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const userRole = localStorage.getItem('userRole'); // Get user role from localStorage

  // If there's no user role or if the role is not admin and trying to access restricted dashboard route, redirect
  if (!userRole || (userRole === 'client' && rest.path.includes('dashboard'))) {
    return <Navigate to="/home" />;
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
