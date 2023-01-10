import React, { useEffect, useState } from 'react';

import Channels from '../api/Channels';
import Users from '../api/Users';

import Layout from '../components/Layout';
import ChannelItem from '../components/ChannelItem';
import { CreateChannelData, ShortChannelData } from '../interfaces/dto/channels';

import { Box, Button, Container, Divider, Input, Paper, Typography, useTheme } from '@mui/material';

import {
  channelsStyle, channelsContainerStyle,
  channelsMenuItem, channelsMenuDivider, channelsMainContainerStyle, channelsMenuItemsStyle, channelsItemStyle
} from '../styles/ChannelsPage';
import { Link } from 'react-router-dom';
import StyledLink from '../components/StyledLink';


const ChannelsPage: React.FC = () => {
  const [createChannelName, setCreateChannelName] = useState<string>("");
  const [channels, setChannels] = useState<ShortChannelData[]>([]);

  const theme = useTheme();

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
    <Container disableGutters maxWidth={false} style={channelsMainContainerStyle}>
      <Container disableGutters maxWidth={false} style={channelsContainerStyle}>
        <Box style={channelsMenuItemsStyle}>
          <Typography style={channelsMenuItem} sx={{ '&:hover': { color: theme.palette.primary.mainHover } }}>Избранные каналы</Typography>
          <Divider style={channelsMenuDivider} />
          <Typography style={channelsMenuItem} sx={{ '&:hover': { color: theme.palette.primary.mainHover } }}>Ваши каналы</Typography>
          <Typography style={channelsMenuItem} sx={{ '&:hover': { color: theme.palette.primary.mainHover } }}>Публичные каналы</Typography>
        </Box>
        <Box style={channelsStyle}>
          <ChannelItem created={true} />
          {
            channels.map(channel =>
              <StyledLink key={channel.id} to={`/channels/${channel.id}`}>
                <ChannelItem title={channel.name} created={false} />
              </StyledLink>
            )
          }
        </Box>
      </Container>

      {/* <Typography style={channelsTitleStyle}>Каналы</Typography>
        <Box style={channelsBlockStyle}>
          <Box id="create-channel">
            <Input onChange={handleChangeCreateChannelName} />
            <Button onClick={handleSubmitCreateChannel}>Добавить канал</Button>
          </Box>
          <Box style={channelsBlockStyle}>
            <Typography>Ваши каналы</Typography>
            <Box style={channelsContainerStyle}>
              {
                channels.map(channel =>
                  <Link key={channel.id} to={`/channels/${channel.id}`}>
                    <ChannelItem title={channel.name} />
                  </Link>
                )
              }
            </Box>
          </Box>
          <Typography>Приглашения</Typography>
          <Box style={channelsContainerStyle}>
            <ChannelItem title='Команда сишарперов' />
          </Box>
        </Box> */}
    </Container>
  );
}


export default ChannelsPage;