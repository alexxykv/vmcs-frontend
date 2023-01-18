import React, { useEffect } from 'react';
import Endpoints from '../enums/Endpoints';
import { useHub } from '../hooks/useHub';
import ChatHub from '../hubs/ChatHub';
import { WithChildrenProps } from '../interfaces/props';
import ChatHubContext from '../contexts/ChatHubContext';


const ChatHubProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const chatHub = useHub(ChatHub, Endpoints.ChatHub);

  useEffect(() => {
    chatHub.start();

    return () => {
      chatHub.stop();
    };
  }, [chatHub]);

  return (
    <ChatHubContext.Provider value={chatHub}>
      {children}
    </ChatHubContext.Provider>
  );
}

export default ChatHubProvider;