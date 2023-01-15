import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Box, Button, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

import ChannelChatMessage from './ChannelChatMessage';

import { MessageData, ShortChatData } from '../interfaces/dto';
import { useChatHub } from '../hooks/useChatHub';

import * as styles from '../styles';


interface ChatProps extends ShortChatData { }

const ChannelChat: React.FC<ChatProps> = ({ id, messages }) => {
  const chatHub = useChatHub();

  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<MessageData[]>(messages);

  const messagesEndRef = useRef<HTMLDivElement>(null!);

  const connectChatHub = useCallback(() => {
    chatHub.JoinChat(id).then(() => {
      console.log('Присоединился к чату');
      chatHub.onReceiveMessage(message => {
        setChatMessages(prev => prev.concat(message));
      });
    });
  }, [chatHub, id]);

  const leaveChatHub = useCallback(() => {
    chatHub.LeaveChat(id).then(() => {
      console.log('Покинул чат');
      chatHub.offReceiveMessage();
    });
  }, [chatHub, id]);

  useEffect(() => {
    connectChatHub();
    scrollToBottom();
    return leaveChatHub;
  }, [connectChatHub, leaveChatHub]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (message !== '') {
      chatHub.SendMessage(message, id);
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Box sx={styles.channelChat.chat}>
      <Box sx={styles.channelChat.chatHeader}>
        <Typography component='h2' sx={styles.channelChat.chatHeaderTitle}>
          Чат
        </Typography>
        <Box sx={styles.channelChat.chatHeaderOptions}>
          <SettingsIcon sx={styles.channelChat.chatHeaderOption} />
        </Box>
      </Box>
      <Divider />
      <Box sx={styles.channelChat.chatMessagesBox}>
        {
          chatMessages.map(message => <ChannelChatMessage key={message.id} message={message} />)
        }
        <div ref={messagesEndRef} style={
          {
            float: "left",
            clear: "both",
            /* Margin top depends ChatChatMessage gap */ 
            marginTop: '-5px'
          }} />
      </Box>
      <Box component='form' sx={styles.channelChat.chatInputBox} onSubmit={handleSendMessage}>
        <TextField fullWidth variant='outlined' size='small' sx={styles.channelChat.chatInputTextField}
          value={message}
          onChange={handleChangeMessage}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end' sx={{ gap: '5px' }}>
                <AttachFileIcon />
                <MicIcon />

              </InputAdornment>
            ),
          }} />
        <Button type='submit' color='success'>
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
}


export default ChannelChat;