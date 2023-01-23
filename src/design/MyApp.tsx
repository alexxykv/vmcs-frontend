import { createTheme, ThemeProvider } from '@mui/material';
import React, { useState, useMemo } from 'react';
import DashboardPage from './DashboardPage';
import Layout from './Layout';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const MyApp: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Layout>
          <DashboardPage />
        </Layout>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default MyApp;