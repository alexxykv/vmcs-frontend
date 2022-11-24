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

  protected async checkingConnection() {
    if (this.Connection) {
      switch (this.Connection.state) {
        case HubConnectionState.Connected: return;
        case HubConnectionState.Disconnected: {
          await this.Connection.start();
          return;
        }
      }
    }
    throw new Error();
  }

  protected errorsHandler(err: Error) {
    console.log(err.message);
  }
}