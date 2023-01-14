import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'JetBrains Mono'
  },
  palette: {
    primary: {
      main: '#1976d2',
      mainHover: '#176abd',
      lightHover: '#4083c5'
    }
  }
});

export default theme;