// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import authProvider from './authProvider';

const PrivateRoute=({ children })=> {
  return authProvider.isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
