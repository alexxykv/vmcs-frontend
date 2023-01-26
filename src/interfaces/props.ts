import { ReactNode } from 'react';
import { ShortChannelData } from './dto/channels';
import { MessageData } from './dto/messages';
import { WebRTCResult } from './hooks';

export interface MessageProps {
  message: MessageData
}

export interface ChatProps { }

export interface MeetingPageProps { }

export interface LoginPageProps { }

export interface ToolsPanelProps {
  toggleChat: VoidFunction
  toggleScreen: VoidFunction,
  localStream: MediaStream,
  rtc: WebRTCResult
}

export interface WebcamProps {
  stream: MediaStream
  username: string
  connectionId: string
}

export interface AudioProps {
  stream: MediaStream
  connectionId: string
}

export interface SigninFormProps { }

export interface SignupFormProps { }

export interface InputFieldProps { }

export interface MeetingChatProps {
  open: boolean
 }

export interface VideoChatScreenProps {
  rtc: WebRTCResult
  openChat: boolean
}

export interface WithChildrenProps {
  children?: ReactNode
}

export interface ChannelItemProps {
  channel?: ShortChannelData,
  created: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}
