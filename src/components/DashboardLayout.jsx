import React, { useState } from 'react';
import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const globalStyles = (
  <GlobalStyles
    styles={{
      /* WebKit-based browsers */
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: '10px',
        border: '2px solid #f1f1f1',
      },
      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555',
      },

      /* For Firefox */
      '*': {
        scrollbarWidth: 'thin', // Make scrollbar thinner in Firefox
        scrollbarColor: '#888 #f1f1f1', // Scrollbar thumb and track colors in Firefox
      },
    }}
  />
);

function DashboardLayout({ children }) {
  const [show, setShow] = useState(true);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <CssBaseline />
      {globalStyles}
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
