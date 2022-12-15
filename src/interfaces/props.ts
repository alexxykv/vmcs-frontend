import { ReactNode } from 'react';
import { ShortMessageData } from './dto';

export interface MessageProps {
  shortMessage: ShortMessageData
}

export interface ChatProps { }

export interface MeetingPageProps { }

export interface LoginPageProps { }

export interface ToolsPanelProps { }

export interface SigninFormProps { }

export interface SignupFormProps { }

export interface WithChildrenProps {
  children?: ReactNode
}