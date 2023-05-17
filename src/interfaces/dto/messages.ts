import { ShortUserData } from "./Users"

export interface ShortMessageData {
  id: string
  username: string
  text: string
}

export interface MessageData {
  id: string
  chatId: string
  user: ShortUserData
  text: string
  modifiedAt: string
}