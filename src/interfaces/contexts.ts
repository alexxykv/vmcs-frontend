import { SetStateAction } from "react"
import ChatHub from "../hubs/ChatHub";
import { UserState } from "./states"

export interface IUserContext {
  userState: UserState
  setUserState: React.Dispatch<SetStateAction<IUserContext>>
}

export type ChatHubContextType = ChatHub | undefined;