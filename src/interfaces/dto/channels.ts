import { ShortChatData } from "./chats"
import { ShortMeetingData } from "./meetings"
import { ShortUserData } from "./users"

export interface ChannelData {
  id: string
  name: string
  creator: ShortUserData
  chat: ShortChatData
  users: Array<ShortUserData>
  meetings: Array<ShortMeetingData>
  avatarUri: string
}

export interface ShortChannelData {
  id: string
  name: string
  chatId: string
  avatarUri: string
}

export interface CreateChannelData {
  name: string
}