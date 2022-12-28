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

// import TestPage from './pages/TestPage';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ChatHubProvider>
            <Routing />
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
      <Route path='/channels' element={<ChannelsPage />} />
      <Route path='/channel' element={<ChannelPage title='TEST' />} />
      <Route path='/meeting' element={<MeetingPage />} />
      <Route element={<PrivateRoute />}>
        <Route path='/main' element={<MainPage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}


export default App;