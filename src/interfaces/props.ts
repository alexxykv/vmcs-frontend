import { ReactNode } from 'react';
import { ShortChannelData } from './dto/channels';
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

export interface ChannelItemProps {
  channel?: ShortChannelData,
  created: boolean
}

export interface ChannelPageProps {
  title: string
}