import React, { createContext, useEffect } from "react";
import { ChatHubContextType } from "../interfaces/Contexts";
import { WithChildrenProps } from "../interfaces/Props";
import { ChatHub } from "../hubs";
import { useAuth, useHub } from "../hooks";

export const ChatHubContext = createContext<ChatHubContextType>(null!);

export const ChatHubProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const auth = useAuth();
  const chatHub = useHub(ChatHub);

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