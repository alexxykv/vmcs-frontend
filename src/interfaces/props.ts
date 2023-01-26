import { ReactNode } from 'react';
import { ShortChannelData } from './dto/channels';
import { MessageData, ShortMessageData } from './dto/messages';
import { WebRTCResult } from './hooks';

export interface MessageProps {
  shortMessage: ShortMessageData
}

export interface ChatProps { }

export interface MeetingPageProps { }

export interface LoginPageProps { }

export interface ToolsPanelProps {
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

export interface MeetingChatProps { }

export interface VideoChatScreenProps {
  rtc: WebRTCResult
}

export interface WithChildrenProps {
  children?: ReactNode
}

export interface ChannelItemProps {
  channel?: ShortChannelData,
  created: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}
