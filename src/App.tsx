import React from 'react';
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

import AuthProvider from './providers/AuthProvider';
import UserProvider from './providers/UserProvider';
import ChatHubProvider from './providers/ChatHubProvider';

import MeetingHubProvider from './providers/MeetingHubProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


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
      <Route path='/' element={<WelcomePage />} />
      <Route element={<PrivateRoute />}>
        <Route path='/main' element={<MainPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='/channels' element={<ChannelsPage />} />
        <Route path='/channels/:id' element={<ChannelPage />} />
        <Route path='/meeting/:id' element={<MeetingPage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

// const RoutingHeader: React.FC = () => {
//   return (
//     <div style={{ display: 'flex', gap: '20px' }}>
//       <Link style={{ padding: '10px' }} to='/'>Main</Link>
//       <Link style={{ padding: '10px' }} to='/main'>Private main</Link>
//       <Link style={{ padding: '10px' }} to='/login'>Login</Link>
//       <Link style={{ padding: '10px' }} to='/channels'>Channels</Link>
//     </div>
//   );
// }


export default App;