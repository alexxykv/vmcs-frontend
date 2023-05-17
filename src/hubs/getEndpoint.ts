import * as signalR from "@microsoft/signalr";
import { Hubs } from "../enums";

export function getEndpoint<TypeHub>(constructor: new (connection: signalR.HubConnection) => TypeHub) {
  const connection = new signalR.HubConnectionBuilder().withUrl('http://hub.hub').build();
  const compareHub = new constructor(connection);

  for (const hub of Hubs) {
    if (compareHub instanceof hub.type) {
      return hub.endpoint;
    }
  }

  throw new Error('Endpoint does not exist');
}