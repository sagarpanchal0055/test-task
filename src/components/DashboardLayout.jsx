import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

function DashboardLayout({ children }) {
  const [show, setShow] = useState(true);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <CssBaseline />
      {show && <Sidebar />}
      <Box 
        component="main"
        sx={{ flexGrow: 1, overflowX: 'hidden', background: 'transparent' }}
      >
        <Header setShow={setShow} />
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
