import React, { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import MeetingPage from './pages/MeetingPage';
import ChannelPage from './pages/ChannelPage';
import ChannelsPage from './pages/ChannelsPage';
import NotFoundPage from './pages/NotFoundPage';
import InvitationsPage from './pages/InvitationsPage';
import DashboardPage from './pages/DashboardPage';

import AuthProvider from './providers/AuthProvider';
import UserProvider from './providers/UserProvider';
import ChatHubProvider from './providers/ChatHubProvider';
import CodeSharingProvider from './providers/CodeSharingProvider';
import MeetingHubProvider from './providers/MeetingHubProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const App: React.FC = () => {
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
        typography: {
          fontFamily: 'JetBrains Mono'
        },
        palette: {
          mode
        },
      }),
    [mode],
  );

  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ChatHubProvider>
            <MeetingHubProvider>
              <CodeSharingProvider>
                <ColorModeContext.Provider value={colorMode}>
                  <ThemeProvider theme={theme}>
                    <Layout>
                      <Routing />
                    </Layout>
                  </ThemeProvider>
                </ColorModeContext.Provider>
              </CodeSharingProvider>
            </MeetingHubProvider>
          </ChatHubProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/channels/:id' element={<ChannelPage />} />
        <Route path='/meeting/:id' element={<MeetingPage />} />
        <Route path='/invitations' element={<InvitationsPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}


export default App;