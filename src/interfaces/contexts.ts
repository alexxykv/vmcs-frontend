import ChatHub from "../hubs/ChatHub";
import MeetingHub from "../hubs/MeetingHub";
import { LoginData, RegisterData, AuthStatusType } from "./dto/auth";
import { UserData } from "./dto/users";

export interface UserContextType extends UserData { }

export type ChatHubContextType = ChatHub;

export type MeetingHubContextType = MeetingHub;

export interface AuthContextType {
  status: AuthStatusType
  login: (loginData: LoginData, callback: VoidFunction) => void
  logout: (callback: VoidFunction) => void
  register: (registerData: RegisterData, callback: VoidFunction) => void
}