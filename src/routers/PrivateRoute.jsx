import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtTokenValidate } from '../utils/jwtTokenValidate';
import DashboardLayout from '../components/DashboardLayout';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('access_token');

  if (!token || !jwtTokenValidate(token)) {
    localStorage.removeItem('access_token');
    return <Navigate to="/" />;
  }

  return (
    <DashboardLayout>
      <Element {...rest} />
    </DashboardLayout>
  );
};

export default PrivateRoute;
