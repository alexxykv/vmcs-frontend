import { useState, useEffect } from 'react';
import * as signalR from "@microsoft/signalr";


export const useHub = (connectionURL: string) => {
  const [hubConnection, setHubConnection] = useState<signalR.HubConnection>();

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(connectionURL)
      .build();

    setHubConnection(connection);
  }, [connectionURL]);

  return [hubConnection]
}