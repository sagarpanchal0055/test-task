import { createTheme } from '@mui/material/styles';

// Light Theme
const lightTheme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: 'none',
          border: '1px solid #ccc',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Nunito Sans", sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#4C8BF5',
    },
    secondary: {
      main: '#ffffff',
      text: '#202224'
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  },
});

// Dark Theme
const darkTheme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: 'none',
          border: '1px solid #ccc',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Nunito Sans", sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#273142',
      text: '#fff'
    },
    background: {
      default: '#1B2431',
      paper: '#273142',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

export { lightTheme, darkTheme };
