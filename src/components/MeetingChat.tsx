import React from 'react';
import Message from './Message';
import { Box, IconButton, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import { MeetingChatProps } from '../interfaces/props';

import * as styles from '../styles';


const MeetingChat: React.FC<MeetingChatProps> = ({ messages }) => {
  return (
    <Box sx={styles.meetingChat.box}>
      <Box sx={styles.meetingChat.messagesBox}>
        {
          messages.map(message => <Message key={message.id} shortMessage={message} />)
        }
      </Box>
      <Box sx={styles.meetingChat.sendMessageBox}>
        <Input fullWidth disableUnderline placeholder='Send message?' style={{ color: 'white' }} />
        <IconButton>
          <SendIcon htmlColor='white' />
        </IconButton>
      </Box>
    </Box>
  );
}


export default MeetingChat;