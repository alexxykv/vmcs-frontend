import { useContext } from "react";
import ChatHubContext from "../contexts/ChatHubContext";

export function useChatHub() {
  return useContext(ChatHubContext);
}