export interface ChannelInvitationData {
  id: string
  senderUsername: string
  recipientUsername: string
  channelName: string
}

export interface ChannelInvitationRequestData {
  channelId: string
  recipientId: string
}