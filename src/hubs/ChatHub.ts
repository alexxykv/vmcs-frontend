import { Endpoints } from "../enums/Endpoints";
import Hub from "./Hub";


export default class ChatHub extends Hub {
  public static readonly enpoint = Endpoints.ChatHub;

  public async JoinChat(chatId: string) {
    this.Connection.invoke('JoinChat', chatId);
  }

  public async JoinChats(chatIds: string[]) {
    for (const chatId of chatIds) {
      this.JoinChat(chatId);
    }
  }

  public async LeaveChat(chatId: string) {
    this.Connection.invoke('LeaveChat', chatId);
  }

  public async SendMessage(text: string, chatId: string) {
    this.Connection.invoke('SendMessage', text, chatId);
  }

  public async ReceiveMessage(callback: (username: string, text: string, chaId: string) => void) {
    this.Connection.on('ReceiveMessage', (username, text, chatId) => {
      callback(username, text, chatId);
    });
  }
}