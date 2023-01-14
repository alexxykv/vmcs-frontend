import { MessageData } from "./messages"

export interface ShortChatData {
  id: string
  messages: Array<MessageData>
}