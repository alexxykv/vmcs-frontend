import React from 'react';
import MeetingPage from './pages/MeetingPage';
import ChatHubProvider from './providers/ChatHubProvider';
import UserProvider from './providers/UserProvider';

// import TestPage from './pages/TestPage';


const App: React.FC = () => {
  return (
    <UserProvider>
      <ChatHubProvider>
        <MeetingPage />
      </ChatHubProvider>
    </UserProvider>
  );
}


export default App;
