import ChatHub from "../hubs/ChatHub";
import { ShortMessageData } from "./dto";

export interface MessageProps {
    shortMessage: ShortMessageData
}

export interface ChatProps {
  chatHub: ChatHub
}