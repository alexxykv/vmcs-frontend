import React from 'react';
import { Box, IconButton, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import { MeetingChatProps } from '../interfaces/props';
import Message from './Message';

import {
  meetingChatStyle, messageContainerStyle,
  sendMessageContainerStyle
} from '../styles/MeetingChat';


const MeetingChat: React.FC<MeetingChatProps> = ({ messages }) => {
  return (
    <Box style={meetingChatStyle}>
      <Box style={messageContainerStyle}>
        {
          messages.map(message => <Message key={message.id} shortMessage={message} />)
        }
      </Box>
      <Box style={sendMessageContainerStyle}>
        <Input fullWidth disableUnderline placeholder='Send message?' style={{ color: 'white' }} />
        <IconButton>
          <SendIcon htmlColor='white' />
        </IconButton>
      </Box>
    </Box>
  );
}


export default MeetingChat;