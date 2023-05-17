import React, { useCallback, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { Button, List, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send"
import { MeetingChatProps } from "../interfaces/Props";
import { useChatHub, useMeeting } from "../hooks";
import { MessageData } from "../interfaces/dto";

const MeetingChat: React.FC<MeetingChatProps> = ({ open }) => {
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <Paper square elevation={6} sx={{
      display: open ? 'flex' : 'none',
      flexDirection: 'column',
      flexGrow: 1,
      minWidth: 240,
      width: '25%',
      maxWidth: '25%',
    }}>
      <List disablePadding sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-track': {
          borderRadius: '4px',
        },
        '&:hover': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'primary.light'
          }
        },
      }}>
        {messagesState.map(message => <Message key={message.id} message={message} />)}
        <div ref={messagesEndRef} style={
          {
            float: 'left',
            clear: 'both',
          }} />
      </List>
      <Paper
        square
        variant='outlined'
        component='form'
        onSubmit={handleSendMessage}
        sx={{
          display: 'flex',
          p: 2,
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: 'none'
        }}>
        <TextField
          value={message}
          onChange={handleChangeMessage}
          variant='outlined'
          color='primary'
          fullWidth
          size='small'
          sx={{
            bgcolor: 'action.selected',
            borderRadius: '4px'
          }} />
        <Button type='submit'>
          <SendIcon />
        </Button>
      </Paper>
    </Paper>
  );
}


export default MeetingChat;