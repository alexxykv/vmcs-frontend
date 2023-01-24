import { useMemo } from 'react';
import * as signalR from "@microsoft/signalr";

import LocalStorageKeys from '../enums/LocalStorageKeys';
import { JWTData } from '../interfaces/dto/auth';


export const useHubConnection = (connectionURL: string): signalR.HubConnection => {
  const jwt = localStorage.getItem(LocalStorageKeys.TOKEN);
  const jwtData = JSON.parse(jwt || '{}') as JWTData;

  const hubConnection = useMemo(() => {
    return new signalR.HubConnectionBuilder()
      .withUrl(connectionURL, { 
        accessTokenFactory: () => jwtData.token,
        // skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      // .configureLogging(signalR.LogLevel.None)
      .build();
  }, [connectionURL, jwtData.token]);

  return hubConnection;
}