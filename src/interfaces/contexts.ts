import ChatHub from "../hubs/ChatHub";
import CodeSharingHub from "../hubs/CodeSharingHub";
import MeetingHub from "../hubs/MeetingHub";
import { LoginData, RegisterData, AuthStatusType } from "./dto/auth";
import { ChannelData } from "./dto/channels";
import { UserData } from "./dto/users";

export interface UserContextType extends UserData { 
  uploadImage: (image: File) => void
}

export interface ChannelContextType extends ChannelData { }

export type ChatHubContextType = ChatHub;

export type MeetingHubContextType = MeetingHub;

export type CodeSharingHubContextType = CodeSharingHub;

export interface AuthContextType {
  status: AuthStatusType
  login: (loginData: LoginData, callback: VoidFunction) => void
  logout: (callback: VoidFunction) => void
  register: (registerData: RegisterData, callback: VoidFunction) => void
}