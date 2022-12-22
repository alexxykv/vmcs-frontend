import { SetStateAction } from "react"
import ChatHub from "../hubs/ChatHub";
import { LoginData } from "./dto/auth";
import { AuthStatusType } from "./responses/auth";
import { UserState } from "./states"

export interface IUserContext {
  userState: UserState
  setUserContext: React.Dispatch<SetStateAction<IUserContext>>
}

export type ChatHubContextType = ChatHub | undefined;

export interface AuthContextType {
  status: AuthStatusType
  login: (loginData: LoginData, callback: VoidFunction) => void
  logout: (callback: VoidFunction) => void
}