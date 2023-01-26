import React, { useCallback, useEffect, useRef, useState } from 'react';
import Message from './Message';
import { Box, IconButton, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import { MeetingChatProps } from '../interfaces/props';

import * as styles from '../styles';
import { useChatHub } from '../hooks/useChatHub';
import { MessageData } from '../interfaces/dto';
import { useMeeting } from '../hooks/useMeeting';


const MeetingChat: React.FC<MeetingChatProps> = () => {
  const chatHub = useChatHub();
  const meeting = useMeeting();

  const [message, setMessage] = useState<string>('');
  const [messagesState, setMessagesState] = useState<MessageData[]>(meeting.chat.messages);

  const messagesEndRef = useRef<HTMLDivElement>(null!);

  const connectChatHub = useCallback(() => {
    chatHub.JoinChat(meeting.chat.id).then(() => {
      console.log('Присоединился к чату');
      chatHub.onReceiveMessage(message => {
        setMessagesState(prev => prev.concat(message));
      });
    });
  }, [chatHub, meeting.chat.id]);

  const leaveChatHub = useCallback(() => {
    chatHub.LeaveChat(meeting.chat.id).then(() => {
      console.log('Покинул чат');
      chatHub.offReceiveMessage();
    });
  }, [chatHub, meeting.chat.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    connectChatHub();
    scrollToBottom();
    return leaveChatHub;
  }, [connectChatHub, leaveChatHub]);

  useEffect(() => {
    scrollToBottom();
  }, [messagesState]);

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (message !== '') {
      chatHub.SendMessage(message, meeting.chat.id);
      setMessage('');
    }
  };

  return (
    <Box sx={styles.meetingChat.box}>
      <Box sx={styles.meetingChat.messagesBox}>
        {
          messagesState.map(message => <Message key={message.id} message={message} />)
        }
      </Box>
      <Box component='form' onSubmit={handleSendMessage} sx={styles.meetingChat.sendMessageBox}>
        <Input fullWidth disableUnderline placeholder='Send message?' style={{ color: 'white' }} value={message} onChange={handleChangeMessage} />
        <IconButton type='submit'>
          <SendIcon htmlColor='white' />
        </IconButton>
      </Box>
    </Box>
  );
}


export default MeetingChat;