import Hub from "./Hub";


export default class MeetingHub extends Hub {
  //#region Test Methods
  public async SendMessageToMeeting(data: string[]) {
    this.Connection.invoke('SendMessageToMeeting', ...data);
  }

  public async ReceiveMessage(callback: (login: string, text: string) => void) {
    this.Connection.on('ReceiveMessage', (login, text) => {
      callback(login, text);
    });
  }
  //#endregion

  public async joinMeeting(meetingId: string) {
    this.Connection.invoke('JoinMeeting', meetingId);
  }

  public async leaveMeeting(meetingId: string) {
    this.Connection.invoke('LeaveMeeting', meetingId);
  }

  public async sendOffer(clientId: string, offer: object) {
    this.Connection.invoke('SendOffer', clientId, offer);
  }

  public async sendAnswer(clientId: string, answer: object) {
    this.Connection.invoke('SendAnswer', clientId, answer);
  }

  public async addIceCandidate(roomId: string, obj: object) {
    this.Connection.invoke('AddIceCandidate', roomId, obj);
  }

  public async onReceiveOffer(callback: (connectionId: string, offer: object) => void) {
    this.Connection.on('ReceiveOffer', (connectionId, offer) => {
      callback(connectionId, offer);
    });
  }

  public async onReceiveAnswer(callback: (connectionId: string, answer: object) => void) {
    this.Connection.on('ReceiveAnswer', (connectionId, answer) => {
      callback(connectionId, answer);
    });
  }

  public async onReceiveIceCandidate(callback: (roomId: string, obj: object) => void) {
    this.Connection.on('ReceiveIceCandidate', (roomId, obj) => {
      callback(roomId, obj);
    });
  }
}