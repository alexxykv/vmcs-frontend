import { ChatHub, CodeSharingHub, MeetingHub } from "../hubs";
import { AuthStatusType, LoginData, RegisterData, UserData } from "./dto";

export interface UserContextType extends UserData { 
  uploadImage: (image: File) => void
}

export type ChatHubContextType = ChatHub;

export type MeetingHubContextType = MeetingHub;

export type CodeSharingHubContextType = CodeSharingHub;

export interface AuthContextType {
  status: AuthStatusType
  login: (loginData: LoginData, callback: VoidFunction) => void
  logout: (callback: VoidFunction) => void
  register: (registerData: RegisterData, callback: VoidFunction) => void
}
