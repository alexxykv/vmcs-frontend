import { ReactNode } from 'react';
import { ShortMessageData } from './dto/messages';

export interface MessageProps {
  shortMessage: ShortMessageData
}

export interface ChatProps { }

export interface MeetingPageProps { }

export interface LoginPageProps { }

export interface ToolsPanelProps { }

export interface SigninFormProps { }

export interface SignupFormProps { }

export interface InputFieldProps { }

export interface MeetingChatProps { 
  messages: ShortMessageData[]
}

export interface VideoChatScreenProps {
  messages: ShortMessageData[]
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