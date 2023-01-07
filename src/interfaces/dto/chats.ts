import { ShortMessageData } from "./messages"

export interface ShortChatData {
  id: string
  messages: Array<ShortMessageData>
}