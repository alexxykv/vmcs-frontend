import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Avatar, Box, Button, Container, Divider, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Paper, Stack, TextField, Typography, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import VideoChatIcon from '@mui/icons-material/VideoChat';

import Loading from '../components/Loading';
import ChannelAsideMenu from '../components/ChannelAsideMenu';
import ChannelChat from '../components/ChannelChat';

import { Channels } from '../api';
import { ChannelData, MessageData, ShortMeetingData, ShortUserData } from '../interfaces/dto';

import { fakeAsync } from '../utils';
import * as styles from '../styles';
import { useUser } from '../hooks/useUser';


const ChannelPage: React.FC = () => {
  const { id } = useParams();
  const channelId = id as string;

  const navigate = useNavigate();
  const [channel, setChannel] = useState<ChannelData>(null!);

  const uploadChannelData = useCallback(() => {
    fakeAsync(() => {
      Channels.Get(channelId).then(channel => {
        setChannel(channel);
      }).catch(() => {
        navigate('/channels', { replace: true });
      });
    });
  }, [navigate, channelId]);

  useEffect(() => {
    uploadChannelData();
  }, [uploadChannelData]);

  if (channel === null) {
    return <Loading />;
  }

  return (
    <Paper square sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: '100%',
      height: '100%',
    }}>
      <ChannelHeader channel={channel} />
      <Divider />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'auto' }}>
        <MeetingList meetings={channel.meetings} />
        <Divider orientation='vertical' />
        <Chat chatId={channel.chat.id} messages={channel.chat.messages} />
        <Divider orientation='vertical' />
        <UsersList users={channel.users} />
      </Box>
    </Paper >
  );
}

interface ChannelHeaderProps {
  channel: ChannelData
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channel }) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      p: 2,
      gap: 2
    }}>
      <Avatar sx={{ width: '48px', height: '48px' }}>{channel.name[0]}</Avatar>
      <Typography variant='h5' component='div' sx={{
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        cursor: 'default',
      }}>
        {channel.name}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton size='large'>
        <SettingsIcon />
      </IconButton>
    </Box>
  );
}

interface MeetingListProps {
  meetings: ShortMeetingData[]
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings }) => {
  const [meetingsState, setMeetingsState] = useState<ShortMeetingData[]>(meetings);

  return (
    <List subheader={<li />} sx={{ overflowY: 'auto', minWidth: 240 }}>
      <ListSubheader sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 2,
        fontSize: '1rem',
        cursor: 'default',
        height: '48px',
      }}>
        <VideoChatIcon />
        <Typography>Meetings</Typography>
      </ListSubheader>
      {meetingsState.map(meeting => {
        return (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={meeting.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

interface ChatProps {
  chatId: string
  messages: MessageData[]
}

const Chat: React.FC<ChatProps> = ({ chatId, messages }) => {
  const [messagesState, setMessagesState] = useState<MessageData[]>(messages);

  return (
    <List subheader={<div />} sx={{
      flexGrow: 1,
      flexDirection: 'column',
      overflowY: 'auto',
    }}>
      <ListSubheader sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 2,
        fontSize: '1rem',
        cursor: 'default',
        height: '48px',
      }}>
        <ChatIcon />
        <Typography>Chat</Typography>
      </ListSubheader>
      {messagesState.map(message => <ChatMessage message={message} />)}
    </List>
  );
}

interface ChatMessageProps {
  message: MessageData
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const user = useUser();
  const time = new Date(message.modifiedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Paper elevation={4} sx={{
      display: 'flex',
      width: 'fit-content',
      minWidth: '40%',
      maxWidth: '70%',
      my: 1,
      mr: 2,
      ml: user.id === message.userId ? 'auto' : 2,
    }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{message.username[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={message.username}
          secondary={
            <span style={{ wordWrap: 'break-word' }}>
              {message.text}
            </span>
          }
        />
      </ListItem>
    </Paper >
  );
}

interface UsersListProps {
  users: ShortUserData[]
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const [usersState, setUsersState] = useState<ShortUserData[]>(users);

  return (
    <List subheader={<li />} sx={{ overflowY: 'auto', minWidth: 240 }}>
      <ListSubheader sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 2,
        fontSize: '1rem',
        cursor: 'default',
        height: '48px',
      }}>
        <GroupIcon />
        <Typography>Users</Typography>
      </ListSubheader>
      {usersState.map(user => {
        return (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={user.username} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}


export default ChannelPage;