import { ReactNode } from 'react';
import { ShortMessageData } from './dto/messages';
import { WebRTCResult } from './hooks';

export interface MessageProps {
  shortMessage: ShortMessageData
}

export interface ChatProps { }

export interface MeetingPageProps { }

export interface LoginPageProps { }

export interface ToolsPanelProps {
  toggleScreen: VoidFunction
}

export interface WebcamProps {
  stream: MediaStream
  username: string,
  muted: boolean
}

export interface SigninFormProps { }

export interface SignupFormProps { }

export interface InputFieldProps { }

export interface MeetingChatProps { 
  messages: ShortMessageData[]
}

export interface VideoChatScreenProps {
  messages: ShortMessageData[]
  rtc: WebRTCResult
}

export interface WithChildrenProps {
  children?: ReactNode
}

export interface LayoutProps extends WithChildrenProps {
  title: string
}

export interface ChannelItemProps {
  title: string
}

export interface ChannelPageProps {
  title: string
}