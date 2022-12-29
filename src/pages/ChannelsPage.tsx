import React, { useEffect, useState } from 'react';

import Channels from '../api/Channels';
import Users from '../api/Users';

import Layout from '../components/Layout';
import ChannelItem from '../components/ChannelItem';
import { CreateChannelData, ShortChannelData } from '../interfaces/dto/channels';

import { Box, Button, Input, Typography } from '@mui/material';
import {
  channelsStyle, channelsTitleStyle, channelsBlockStyle, channelsContainerStyle
} from '../styles/ChannelsPage';


const ChannelsPage: React.FC = () => {
  const [createChannelName, setCreateChannelName] = useState<string>("");
  const [channels, setChannels] = useState<ShortChannelData[]>([]);

  const updateChannels = async () => {
    Users.GetAllUserChannels().then(shortChannels => {
      setChannels(shortChannels);
    });
  };

  useEffect(() => {
    updateChannels();
  }, []);

  const handleChangeCreateChannelName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateChannelName(event.target.value);
  };

  const handleSubmitCreateChannel = async () => {
    const createData: CreateChannelData = {
      name: createChannelName
    };

    Channels.Create(createData).then(channel => {
      setChannels(prev => {
        return [
          ...prev,
          channel
        ];
      });
    }).catch((error) => console.error(error));
  };

  return (
    <Layout title="Ваши каналы">
      <Box style={channelsStyle} >
        <Box style={channelsTitleStyle}>Каналы</Box>
        <Box style={channelsBlockStyle}>
          <Box id="create-channel">
            <Input onChange={handleChangeCreateChannelName} />
            <Button onClick={handleSubmitCreateChannel}>Добавить канал</Button>
          </Box>
          <Box style={channelsBlockStyle}>
            <Typography>Ваши каналы</Typography>
            <Box style={channelsContainerStyle}>
              {
                channels.map(channel => <ChannelItem key={channel.id} title={channel.name} />)
              }
            </Box>
          </Box>
          <Typography>Приглашения</Typography>
          <Box style={channelsContainerStyle}>
            <ChannelItem title='Команда сишарперов' />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}


export default ChannelsPage;