import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import IHub from "./IHub";

export default class Hub implements IHub {
  private readonly _connection: HubConnection;

  public get Connection() {
    return this._connection;
  }

  constructor(connection: HubConnection) {
    this._connection = connection;
  }

  // TODO: Rewrite start and stop methods and use them

  public async start() {
    if (this.Connection.state === HubConnectionState.Disconnected) {
      await this.Connection.start();
      // console.log(`Connected to ${this.Connection.baseUrl}.`);
    }
    return;
  }

  public async stop() {
    if (this.Connection.state === HubConnectionState.Connected) {
      await this.Connection.stop();
    }
    return;
  }
}