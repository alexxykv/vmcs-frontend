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

  public async sendOffer(clientId: string, offer: RTCSessionDescriptionInit) {
    this.Connection.invoke('SendOffer', clientId, offer);
  }

  public async sendAnswer(clientId: string, answer: RTCSessionDescriptionInit) {
    this.Connection.invoke('SendAnswer', clientId, answer);
  }

  public async addIceCandidate(meetingId: string, iceCandidate: RTCIceCandidate) {
    this.Connection.invoke('AddIceCandidate', meetingId, iceCandidate);
  }

  public async onReceiveOffer(callback: (connectionId: string, offer: RTCSessionDescriptionInit) => void) {
    this.Connection.on('ReceiveOffer', (connectionId, offer) => {
      callback(connectionId, offer);
    });
  }

  public async onReceiveAnswer(callback: (connectionId: string, answer: RTCSessionDescriptionInit) => void) {
    this.Connection.on('ReceiveAnswer', (connectionId, answer) => {
      callback(connectionId, answer);
    });
  }

  public async onReceiveIceCandidate(callback: (connectionId: string, iceCandidate: RTCIceCandidate) => void) {
    this.Connection.on('ReceiveIceCandidate', (connectionId, iceCandidate) => {
      callback(connectionId, iceCandidate);
    });
  }

  public async onJoinedNewClient(callback: (connectionId: string) => void) {
    this.Connection.on('JoinedNewClient', connectionId => {
      callback(connectionId);
    })
  }
}