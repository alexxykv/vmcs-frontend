import { HubConnection } from "@microsoft/signalr";

export default interface IHub {
  readonly Connection: HubConnection;
}