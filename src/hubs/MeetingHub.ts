import { Endpoints } from "../enums/Endpoints";
import Hub from "./Hub";


export default class MeetingHub extends Hub {
  public static readonly Endpoint: Endpoints = Endpoints.MeetingHub;

  public async SendMessageToMeeting(data: string[]) {
    this.checkingConnection().then(() => {
      this.Connection.invoke('SendMessageToMeeting', ...data);
    }).catch(err => this.errorsHandler(err));
  }

  public async ReceiveMessage(callback: (login: string, text: string) => void) {
    this.checkingConnection().then(() => {
      this.Connection.on('ReceiveMessage', (login, text) => {
        callback(login, text);
      });
    }).catch(err => this.errorsHandler(err));
  }
}