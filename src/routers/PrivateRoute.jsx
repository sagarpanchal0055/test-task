import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { jwtTokenValidate } from '../utils/jwtTokenValidate';
import DashboardLayout from '../components/DashboardLayout';

const PrivateRoute = ({ element: Element, roles, ...rest }) => {

  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const token = localStorage.getItem('access_token');
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null;


  if (!token || !jwtTokenValidate(token)) {
    localStorage.removeItem('access_token');
    return <Navigate to="/" />;
  }

  return <DashboardLayout>
    <Element {...rest} />
  </DashboardLayout>
};

export default PrivateRoute;
