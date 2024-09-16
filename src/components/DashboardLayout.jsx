import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box 
        component="main"
        sx={{ flexGrow: 1, overflowX: 'hidden', background: 'transparent' }}
      >
        <Header />
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
