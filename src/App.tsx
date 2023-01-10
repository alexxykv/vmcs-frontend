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

// import TestPage from './pages/TestPage';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ChatHubProvider>
            <MeetingHubProvider>
              {/* <RoutingHeader /> */}
              <Layout>
                <Routing />
              </Layout>
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