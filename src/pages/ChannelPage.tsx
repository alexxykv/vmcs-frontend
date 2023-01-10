import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Input } from '@mui/material';
import Layout from '../components/Layout';

import Meetings from '../api/Meetings';
import Channels from '../api/Channels';

import { CreateMeetingData, ShortMeetingData } from '../interfaces/dto/meetings';
import { ShortMessageData } from '../interfaces/dto/messages';
import { ChannelPageProps } from '../interfaces/props';

import { useChatHub } from '../hooks/useChatHub';


const ChannelPage: React.FC<ChannelPageProps> = ({ title }) => {
  const { id } = useParams();
  const channelId = id as string;
  const navigate = useNavigate();
  const chatHub = useChatHub();

  const [channelChatId, setChannelChatId] = useState<string>('');
  const [channelMessages, setChannelMessages] = useState<ShortMessageData[]>([]);
  const [channelMeetings, setChannelMeetings] = useState<ShortMeetingData[]>([]);

  const [message, setMessage] = useState<string>('');
  const [meetingName, setMeetingName] = useState<string>('');

  useEffect(() => {
    Channels.Get(channelId).then(channel => {
      setChannelMessages(channel.chat.messages);
      setChannelChatId(channel.chat.id);
      setChannelMeetings(channel.meetings);

      chatHub.start().then(() => {
        chatHub.JoinChat(channel.chat.id);
        chatHub.ReceiveMessage((id, username, text, chatId) => {
          const shortMessage: ShortMessageData = {
            id,
            username,
            text,
          };

          if (chatId === channel.chat.id) {
            setChannelMessages(prev => {
              return [
                ...prev,
                shortMessage
              ];
            });
          }
        });
      });
    }).catch(() => {
      navigate('/channels', { replace: true });
    });
  }, [channelId, chatHub, navigate]);

  const handleSendMessage = async () => {
    chatHub.SendMessage(message, channelChatId);
    setMessage('');
  };

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleChangeMeetingName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingName(event.target.value);
  }

  const handleCreateMeeting = async () => {
    const createData: CreateMeetingData = {
      name: meetingName,
      channelId,
      isInChannel: true,
    }

    Meetings.Create(createData).then((meetingData) => {
      setChannelMeetings(prev => {
        return [
          ...prev,
          meetingData
        ];
      });
    });
  };

  return (
    <>
      <Input onChange={handleChangeMeetingName} value={meetingName} />
      <Button onClick={handleCreateMeeting}>Создать Meeting</Button>
      {
        channelMeetings.map(meeting =>
          <Link key={meeting.id} to={`../meeting/${meeting.id}}`}>
            <Box>{meeting.name}</Box>
          </Link>
        )
      }
      <hr />
      <Box id='chat'>
        <Box id='message-container'>
          {
            channelMessages.map(message => <Box key={message.id}>{`${message.username}: ${message.text}`}</Box>)
          }
        </Box>
        <Input onChange={handleChangeMessage} value={message} />
        <Button onClick={handleSendMessage}>Отправить</Button>
      </Box>
    </>
  );
}


export default ChannelPage;