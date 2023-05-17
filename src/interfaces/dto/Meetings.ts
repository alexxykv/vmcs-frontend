import { ShortChatData } from "./Chats"
import { ShortUserData } from "./Users"

export interface ShortMeetingData {
  id: string
  name: string
}

export interface MeetingData {
  id: string
  name: string
  chat: ShortChatData
  users: Array<ShortUserData>
  repositoryId: string
}

export interface CreateMeetingData {
  name: string
  isInChannel: boolean
  channelId: string
}