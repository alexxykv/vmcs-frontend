import { ShortChatData } from "./chats"
import { ShortUserData } from "./users"

export interface ShortMeetingData {
  id: string
  name: string
}

export interface MeetingData {
  id: string
  name: string
  chat: ShortChatData
  users: Array<ShortUserData>
}

export interface CreateMeetingData {
  name: string
  isInChannel: boolean
  channelId: string
}