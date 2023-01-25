import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Avatar, Box, Button, Divider,
  IconButton, List, ListItem, ListItemAvatar,
  ListItemButton, ListItemText, Paper, TextField, Typography
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';

import Loading from '../components/Loading';
// import ChannelAsideMenu from '../components/ChannelAsideMenu';
// import ChannelChat from '../components/ChannelChat';

import { Channels } from '../api';
import { ChannelData, MessageData, ShortMeetingData, ShortUserData } from '../interfaces/dto';

import { fakeAsync } from '../utils';
// import * as styles from '../styles';
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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minWidth: 240
    }}>
      <Paper square variant='outlined' component='div' sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 2,
        fontSize: '1rem',
        fontWeight: 500,
        cursor: 'default',
        minHeight: '48px',
        pl: 2,
        pr: 1,
        color: 'text.primary',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none'
      }}>
        <VideoChatIcon color='primary' />
        <Typography fontWeight={500}>
          Meetings
        </Typography>
        <Box flexGrow={1}></Box>
        <IconButton size='small' color='primary'>
          <AddIcon />
        </IconButton>
      </Paper>
      <List disablePadding sx={{
        overflowY: 'auto',
        minWidth: 240,
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
            backgroundColor: 'primary.light',
          }
        },
      }}>
        {meetingsState.map(meeting => {
          return (
            <ListItem disablePadding sx={{
              color: 'text.secondary'
            }}>
              <ListItemButton>
                <ListItemText primary={meeting.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

interface ChatProps {
  chatId: string
  messages: MessageData[]
}

const Chat: React.FC<ChatProps> = ({ chatId, messages }) => {
  const [messagesState, setMessagesState] = useState<MessageData[]>(messages);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      minWidth: 400
    }}>
      <Paper square variant='outlined' component='div' sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 2,
        fontSize: '1rem',
        cursor: 'default',
        minHeight: '48px',
        px: 2,
        color: 'text.primary',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none'
      }}>
        <ChatIcon color='primary' />
        <Typography fontWeight={500}>
          Chat
        </Typography>
      </Paper>
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
        {messagesState.map(message => <ChatMessage message={message} />)}
      </List>
      <Paper square variant='outlined' sx={{
        display: 'flex',
        p: 2,
        borderLeft: 'none',
        borderRight: 'none',
      }}>
        <TextField variant='outlined' color='primary' fullWidth size='small' sx={{
          bgcolor: 'action.selected',
          borderRadius: '4px'
        }} />
        <Button>
          <SendIcon />
        </Button>
      </Paper>
    </Box>
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
      minWidth: 'fit-content',
      maxWidth: '60%',
      my: 1,
      mr: 2,
      ml: user.id === message.userId ? 'auto' : 2,
    }}>
      <ListItem>
        <Typography sx={{
          position: 'absolute',
          fontSize: '0.75rem',
          mt: 1,
          mr: 2,
          top: 0,
          right: 0,
          userSelect: 'none',
          cursor: 'default',
          color: 'text.secondary'
        }}>
          {time}
        </Typography>
        <ListItemAvatar>
          <Avatar>{message.username[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography sx={{ pr: 6 }}>
              {message.username}
            </Typography>
          }
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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minWidth: 240
    }}>
      <Paper square variant='outlined' component='div' sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 2,
        fontSize: '1rem',
        cursor: 'default',
        minHeight: '48px',
        pl: 2,
        pr: 1,
        color: 'text.primary',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none'
      }}>
        <GroupIcon color='primary' />
        <Typography fontWeight={500}>
          Users
        </Typography>
        <Box flexGrow={1}></Box>
        <IconButton size='small' color='primary'>
          <AddIcon />
        </IconButton>
      </Paper>
      <List disablePadding sx={{
        overflowY: 'auto',
        minWidth: 240,
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
        {usersState.map(user => {
          return (
            <ListItem disablePadding sx={{
              color: 'text.secondary'
            }}>
              <ListItemButton>
                <ListItemText primary={user.username} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}


export default ChannelPage;