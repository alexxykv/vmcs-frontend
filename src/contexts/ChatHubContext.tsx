import { createContext } from "react";
import { ChatHubContextType } from "../interfaces/contexts";

export const defaultChatHubContext: ChatHubContextType = null!;
const ChatHubContext = createContext<ChatHubContextType>(defaultChatHubContext);

export default ChatHubContext;