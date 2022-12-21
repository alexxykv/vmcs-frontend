import React, { useEffect } from 'react';
import ChatHubProvider from './providers/ChatHubProvider';
import UserProvider from './providers/UserProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import PrivateRoute from './components/PrivateRoute';
import { checkJWT } from './api/Api';

// import TestPage from './pages/TestPage';


const App: React.FC = () => {
  useEffect(() => {
    checkJWT();
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <ChatHubProvider>
          <Routing />
        </ChatHubProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element="Hello" />
      <Route element={<PrivateRoute />}>
        <Route path='/main' element={<MainPage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}


export default App;
