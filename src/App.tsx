import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MeetingPage from './pages/MeetingPage';
import ChannelsPage from './pages/ChannelsPage';

import AuthProvider from './providers/AuthProvider';
import UserProvider from './providers/UserProvider';
import ChatHubProvider from './providers/ChatHubProvider';
import ChannelPage from './pages/ChannelPage';
import MeetingHubProvider from './providers/MeetingHubProvider';
import { Link } from 'react-router-dom';
import Layout from './components/Layout';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import createPalette from '@mui/material/styles/createPalette';
import { palette } from '@mui/system';

// import TestPage from './pages/TestPage';

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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ChatHubProvider>
            <MeetingHubProvider>
              {/* <RoutingHeader /> */}
              <ThemeProvider theme={theme}>
                <Layout>
                  <Routing />
                </Layout>
              </ThemeProvider>
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
      <Route path='/' element={<>Hello</>} />
      <Route element={<PrivateRoute />}>
        <Route path='/main' element={<MainPage />} />
        <Route path='/channels' element={<ChannelsPage />} />
        <Route path='/channels/:id' element={<ChannelPage title='TEST' />} />
        <Route path='/meeting/:id' element={<MeetingPage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<h1>Page not found</h1>} />
    </Routes>
  );
}

const RoutingHeader: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Link style={{ padding: '10px' }} to='/'>Main</Link>
      <Link style={{ padding: '10px' }} to='/main'>Private main</Link>
      <Link style={{ padding: '10px' }} to='/login'>Login</Link>
      <Link style={{ padding: '10px' }} to='/channels'>Channels</Link>
    </div>
  );
}


export default App;