import { HubConnectionState } from "@microsoft/signalr";
import { MessageData } from "../interfaces/dto";
import Hub from "./Hub";


export default class ChatHub extends Hub {
  public async JoinChat(chatId: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('JoinChat', chatId);
    }
  }

  public async JoinChats(chatIds: string[]) {
    for (const chatId of chatIds) {
      this.JoinChat(chatId);
    }
  }

  public async LeaveChat(chatId: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('LeaveChat', chatId);
    }
  }

  public async SendMessage(text: string, chatId: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('SendMessage', text, chatId);
    }
  }

  public async onReceiveMessage(callback: (message: MessageData) => void) {
    if (this.Connection.state === HubConnectionState.Connected) { 
      this.Connection.on('ReceiveMessage', (message) => {
        callback(message);
      });
    }
  }

  public async offReceiveMessage() {
    if (this.Connection.state === HubConnectionState.Connected) { 
      this.Connection.off('ReceiveMessage');
    }
  }
}