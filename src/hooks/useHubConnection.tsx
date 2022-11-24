import { useMemo } from 'react';
import * as signalR from "@microsoft/signalr";


export const useHubConnection = (connectionURL: string): signalR.HubConnection => {
  const hubConnection = useMemo(() => {
    return new signalR.HubConnectionBuilder()
      .withUrl(connectionURL)
      .withAutomaticReconnect()
      .build();
  }, [connectionURL]);

  return hubConnection;
}