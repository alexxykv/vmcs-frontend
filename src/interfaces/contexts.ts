import { SetStateAction } from "react"
import ChatHub from "../hubs/ChatHub";
import { LoginData, RegisterData, AuthStatusType } from "./dto/auth";
import { UserState } from "./states"

export interface IUserContext {
  userState: UserState
  setUserContext: React.Dispatch<SetStateAction<IUserContext>>
}

export type ChatHubContextType = ChatHub;

export interface AuthContextType {
  status: AuthStatusType
  login: (loginData: LoginData, callback: VoidFunction) => void
  logout: (callback: VoidFunction) => void
  register: (registerData: RegisterData, callback: VoidFunction) => void
}