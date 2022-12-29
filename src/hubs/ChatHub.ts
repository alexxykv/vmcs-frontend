import Hub from "./Hub";


export default class ChatHub extends Hub {
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
    console.log(this.Connection, text, chatId);
    this.Connection.invoke('SendMessage', text, chatId);
  }

  public async ReceiveMessage(callback: (id: string, username: string, text: string, chatId: string) => void) {
    this.Connection.on('ReceiveMessage', (id, username, text, chatId) => {
      callback(id, username, text, chatId);
    });
  }
}