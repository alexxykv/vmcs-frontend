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

  public async addIceCandidate(clientId: string, iceCandidate: RTCIceCandidate) {
    this.Connection.invoke('AddIceCandidate', clientId, iceCandidate);
  }

  public async onReceiveOffer(callback: (connectionId: string, offer: RTCSessionDescriptionInit, username: string) => void) {
    this.Connection.on('ReceiveOffer', (connectionId, offer, username) => {
      callback(connectionId, offer, username);
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

  public async onJoinClient(callback: (connectionId: string, username: string) => void) {
    this.Connection.on('JoinClient', (connectionId, username) => {
      callback(connectionId, username);
    })
  }

  public async onLeaveClient(callback: (connectionId: string) => void) {
    this.Connection.on('LeaveClient', connectionId => {
      callback(connectionId);
    })
  }
}