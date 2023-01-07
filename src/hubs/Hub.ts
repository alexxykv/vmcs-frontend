import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import IHub from "../interfaces/common/IHub";

export default class Hub implements IHub {
  private readonly _connection: HubConnection;

  public get Connection() {
    return this._connection;
  }

  constructor(connection: HubConnection) {
    this._connection = connection;
  }

  public async start() {
    if (this.Connection.state === HubConnectionState.Disconnected) {
      await this.Connection.start();
      console.log(`Connected to ${this.Connection.baseUrl}.`);
      return;
    }

    const errorMessage = []
    errorMessage.push(
      `Cannot starts connecting when the connection state is not ${HubConnectionState.Disconnected}`,
      `Actual connection state is ${this.Connection.state}`
    );

    throw new Error(errorMessage.join('\n'));
  }
}