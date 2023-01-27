import React, { useEffect } from 'react';
import Endpoints from '../enums/Endpoints';
import { useHub } from '../hooks/useHub';
import ChatHub from '../hubs/ChatHub';
import { WithChildrenProps } from '../interfaces/props';
import ChatHubContext from '../contexts/ChatHubContext';
import { useAuth } from '../hooks/useAuth';


const ChatHubProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const auth = useAuth();
  const chatHub = useHub(ChatHub, Endpoints.ChatHub);

  useEffect(() => {
    if (auth.status === 'Authorized') {
      chatHub.Connection.start();
    }
    
    return () => {
      chatHub.Connection.stop();
    };
  }, [chatHub, auth.status]);

  return (
    <ChatHubContext.Provider value={chatHub}>
      {children}
    </ChatHubContext.Provider>
  );
}

export default ChatHubProvider;