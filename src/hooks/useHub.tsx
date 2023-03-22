import { useMemo } from 'react';
import * as signalR from "@microsoft/signalr";
import path from 'path';

import { useHubConnection } from './useHubConnection';
import Endpoints from '../enums/Endpoints';


export function useHub<TypeHub>(
  constructor: new (connection: signalR.HubConnection) => TypeHub,
  endpoint: Endpoints): TypeHub {
    console.log(process.env.REACT_APP_HOST_URL as string);
  const connectionURL = new URL(path.join(endpoint), "https://localhost:5001").toString();
  
  const hubConnection = useHubConnection(connectionURL);

  const hub = useMemo(() => {
    return new constructor(hubConnection)
  }, [constructor, hubConnection]);

  return hub;
}