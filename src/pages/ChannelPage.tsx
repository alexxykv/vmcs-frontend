import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Input } from '@mui/material';
import Layout from '../components/Layout';
import { ChannelPageProps } from '../interfaces/props';
// import Meetings from '../api/Meetings';
// import { CreateMeetingData } from '../interfaces/dto/meetings';

import { ShortMessageData } from '../interfaces/dto/messages';
import Channels from '../api/Channels';
import { useChatHub } from '../hooks/useChatHub';


const ChannelPage: React.FC<ChannelPageProps> = ({ title }) => {
  const { id } = useParams();
  const channelId = id as string;
  const navigate = useNavigate();

  const chatHub = useChatHub();
  const [chatId, setChatId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ShortMessageData[]>([]);

  useEffect(() => {
    Channels.Get(channelId).then(channel => {
      setMessages(channel.chat.messages);
      setChatId(channel.chat.id);
      chatHub.start().then(() => {
        chatHub.ReceiveMessage((id, username, text, chatId) => {
          const shortMessage: ShortMessageData = {
            id,
            username,
            text,
          };

          if (chatId === channel.chat.id) {
            setMessages(prev => {
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
  }, []);

  const handleSendMessage = async () => {
    chatHub.SendMessage(message, chatId);
  };

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // const [name, setName] = useState<string>("");

  // const handleCreateMeeting = async () => {
  //   const createData: CreateMeetingData = {
  //     name, 
  //     channelId,
  //     isInChannel: true,
  //   }

  //   Meetings.Create(createData).then(() => {

  //   });
  // };

  return (
    <Layout title={channelId}>
      <Button style={{ width: '100px', backgroundColor: 'white' }}>Создать Meeting</Button>
      <Button style={{ width: '100px', backgroundColor: 'white' }}>Зайти в Meeting</Button>
      <Box id='chat'>
        <Box id='message-container'>
          {
            messages.map(message => <Box>{`${message.username}: ${message.text}`}</Box>)
          }
        </Box>
        <Input onChange={handleChangeMessage} value={message}/>
        <Button onClick={handleSendMessage}>Отправить</Button>
      </Box>
    </Layout>
  );
}


export default ChannelPage;