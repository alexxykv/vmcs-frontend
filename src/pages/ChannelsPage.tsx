import React from 'react';
import { Box, Button, Input, Paper, Typography } from '@mui/material';
import Layout from '../components/Layout';
import { channelsStyle, channelsTitleStyle, channelsBlockStyle, channelsContainerStyle, channelsContainerItemStyle } from '../styles/Channels';
import ChannelItem from '../components/ChannelItem';

const ChannelsPage: React.FC = () => {
  return (
    <Layout title="Ваши каналы">
      <Box style={channelsStyle} >
        <Box style={channelsTitleStyle}>Каналы</Box>
        <Box style={channelsBlockStyle}>
          <Box style={channelsBlockStyle}>
            <Typography>Ваши каналы</Typography>
            <Box style={channelsContainerStyle}>
              <ChannelItem title='Петушки и гребешки' />
              <ChannelItem title='Один в поле не один' />
              <ChannelItem title='1+1+1+1+1' />
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