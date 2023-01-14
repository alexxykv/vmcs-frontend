import React from 'react';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { useUser } from "../hooks/useUser";
import { MessageData } from "../interfaces/dto";

import * as styles from '../styles';


interface ChannelChatMessageProps {
  message: MessageData
}

const ChannelChatMessage: React.FC<ChannelChatMessageProps> = ({ message }) => {
  const user = useUser();
  const time = new Date(message.modifiedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Box sx={{ ...styles.channelChatMessage.box, marginLeft: user.id ? 'auto' : 0 }}>
      <Box sx={styles.channelChatMessage.header}>
        <Avatar sx={styles.channelChatMessage.headerAvatar}>
          {message.username[0]}
        </Avatar>
        <Typography sx={styles.channelChatMessage.headerUsername}>
          {message.username}
        </Typography>
        <Typography sx={styles.channelChatMessage.headerTime}>
          {time}
        </Typography>
      </Box>
      <Divider sx={styles.channelChatMessage.divider} />
      <Box sx={styles.channelChatMessage.content}>
        <Typography sx={styles.channelChatMessage.contentText}>
          {message.text}
        </Typography>
      </Box>
    </Box >
  );
}


export default ChannelChatMessage;