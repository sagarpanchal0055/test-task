import { createTheme } from '@mui/material/styles';

// Light Theme
const lightTheme = createTheme({
  typography: {
    fontFamily: '"Nunito Sans", sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#4C8BF5',
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
  typography: {
    fontFamily: '"Nunito Sans", sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1f1f1f',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

export { lightTheme, darkTheme };
