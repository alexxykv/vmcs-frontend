import { useMemo } from "react";
import path from "path";
import * as signalR from "@microsoft/signalr";

import { useHubConnection } from "./useHubConnection";
import { getEndpoint } from "../hubs";


export function useHub<TypeHub>(constructor: new (connection: signalR.HubConnection) => TypeHub): TypeHub {
  const endpoint = getEndpoint(constructor);
  const connectionURL = new URL(path.join(endpoint), process.env.REACT_APP_HOST_URL as string).toString();
  
  const hubConnection = useHubConnection(connectionURL);

  const hub = useMemo(() => {
    return new constructor(hubConnection)
  }, [constructor, hubConnection]);

  return hub;
}