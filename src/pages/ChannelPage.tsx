import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Avatar, Box, Button, Divider,
  IconButton, List, ListItem, ListItemAvatar,
  ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import StarIcon from '@mui/icons-material/Star';
import VideocamIcon from '@mui/icons-material/Videocam';

import Loading from '../components/Loading';
// import ChannelAsideMenu from '../components/ChannelAsideMenu';
// import ChannelChat from '../components/ChannelChat';

import { ChannelInvitations, Channels, Meetings } from '../api';
import { ChannelData, ChannelInvitationRequestData, CreateMeetingData, MessageData, ShortMeetingData, ShortUserData } from '../interfaces/dto';

import { fakeAsync } from '../utils';
// import * as styles from '../styles';
import { useUser } from '../hooks/useUser';
import { useChatHub } from '../hooks/useChatHub';
import CreateMeetingDialog from '../components/CreateMeetingDialog';
import InviteParticipantDialog from '../components/InviteParticipantDialog';
// import { Link } from 'react-router-dom';


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
        <MeetingList meetings={channel.meetings} channelId={channel.id} />
        <Divider orientation='vertical' />
        <Chat chatId={channel.chat.id} messages={channel.chat.messages} />
        <Divider orientation='vertical' />
        <UsersList users={channel.users} creator={channel.creator} channelId={channel.id} />
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
  channelId: string
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings, channelId }) => {
  const [meetingsState, setMeetingsState] = useState<ShortMeetingData[]>(meetings);
  const [openCreateMeeting, setOpenCreateMeeting] = useState<boolean>(false);

  const createMeeting = (name: string) => {
    const createData: CreateMeetingData = {
      name,
      channelId: channelId,
      isInChannel: true
    };
    Meetings.Create(createData).then(meeting => {
      setMeetingsState(prev => prev.concat(meeting));
    });
  };

  const handleOpenCreateMeeting = () => {
    setOpenCreateMeeting(true);
  };

  const handleCloseCreateMeeting = () => {
    setOpenCreateMeeting(false);
  };

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
        <IconButton size='small' color='primary' onClick={handleOpenCreateMeeting}>
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
        {meetingsState.map(meeting => <MeetingItem key={meeting.id} meeting={meeting} />)}
      </List>
      <CreateMeetingDialog
        open={openCreateMeeting}
        handleClose={handleCloseCreateMeeting}
        createMeeting={createMeeting}
      />
    </Box>
  );
}

interface MeetingItemProps {
  meeting: ShortMeetingData
}

const MeetingItem: React.FC<MeetingItemProps> = ({ meeting }) => {
  const { id, name } = meeting;
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    navigate(`/meeting/${id}`);
  };

  return (
    <ListItem disablePadding sx={{
      color: 'text.secondary'
    }}>
      <ListItemButton sx={{ gap: 2 }} onClick={handleClick}>
        <ListItemIcon sx={{ minWidth: 0, color: 'info.main' }}>
          <VideocamIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}

interface ChatProps {
  chatId: string
  messages: MessageData[]
}

const Chat: React.FC<ChatProps> = ({ chatId, messages }) => {
  const chatHub = useChatHub();

  const [message, setMessage] = useState<string>('');
  const [messagesState, setMessagesState] = useState<MessageData[]>(messages);

  const messagesEndRef = useRef<HTMLDivElement>(null!);

  const connectChatHub = useCallback(() => {
    chatHub.JoinChat(chatId).then(() => {
      console.log('Присоединился к чату');
      chatHub.onReceiveMessage(message => {
        console.log(message)
        setMessagesState(prev => prev.concat(message));
      });
    });
  }, [chatHub, chatId]);

  const leaveChatHub = useCallback(() => {
    chatHub.LeaveChat(chatId).then(() => {
      console.log('Покинул чат');
      chatHub.offReceiveMessage();
    });
  }, [chatHub, chatId]);

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
      chatHub.SendMessage(message, chatId);
      setMessage('');
    }
  };

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
        {messagesState.map(message => <ChatMessage key={message.id} message={message} />)}
        <div ref={messagesEndRef} style={
          {
            float: "left",
            clear: "both",
          }} />
      </List>
      <Paper
        square
        component='form'
        onSubmit={handleSendMessage}
        variant='outlined'
        sx={{
          display: 'flex',
          p: 2,
          borderLeft: 'none',
          borderRight: 'none',
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

  const [avatarSrc, setAvatarSrc] = useState<string>('');

  useEffect(() => {
    if (user.id === message.user.id) {
      setAvatarSrc(user.avatarUri);
    } else {
      setAvatarSrc(message.user.avatarUri);
    }
  }, [user.id, user.avatarUri, message.user.id, message.user.avatarUri]);

  return (
    <Paper elevation={4} sx={{
      display: 'flex',
      width: 'fit-content',
      minWidth: '30%',
      maxWidth: '60%',
      my: 1,
      mr: 2,
      ml: user.id === message.user.id ? 'auto' : 2,
    }}>
      <ListItem alignItems='flex-start'>
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
          <Avatar
            src={avatarSrc}>
            {message.user.username[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography sx={{ color: 'primary.main', cursor: 'default', pr: 6 }}>
              {message.user.username}
            </Typography>
          }
          secondary={
            <Typography
              component='span'
              variant='body2'
              sx={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
            >
              {message.text}
            </Typography>
          }
        />
      </ListItem>
    </Paper >
  );
}

interface UsersListProps {
  users: ShortUserData[]
  creator: ShortUserData
  channelId: string
}

const UsersList: React.FC<UsersListProps> = ({ users, creator, channelId }) => {
  const [usersState, setUsersState] = useState<ShortUserData[]>(users);
  const [openInviteParticipant, setOpenInviteParticipant] = useState<boolean>(false);

  const inviteParticipant = (recipientId: string) => {
    const requestData: ChannelInvitationRequestData = {
      channelId,
      recipientId
    };
    ChannelInvitations.Create(requestData).then(() => {
      console.log('Invited');
    });
  };

  const handleCloseInviteParticipant = () => {
    setOpenInviteParticipant(false);
  }

  const handleOpenInviteParticipant = () => {
    setOpenInviteParticipant(true);
  }

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
        <IconButton size='small' color='primary' onClick={handleOpenInviteParticipant}>
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
            <ListItem key={user.id} disablePadding sx={{
              color: 'text.secondary'
            }}>
              <ListItemButton sx={{ gap: 2 }}>
                {
                  user.id === creator.id
                    ?
                    <ListItemIcon sx={{ minWidth: 0, color: 'warning.main' }}>
                      <StarIcon fontSize='small' />
                    </ListItemIcon>
                    : <ListItemIcon sx={{ minWidth: 0, color: 'info.main' }}>
                      <AssignmentIndIcon fontSize='small' />
                    </ListItemIcon>
                }
                <ListItemText primary={user.username} />

              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <InviteParticipantDialog
        open={openInviteParticipant}
        handleClose={handleCloseInviteParticipant}
        inviteParticipant={inviteParticipant}
      />
    </Box>
  );
}


export default ChannelPage;