import React from 'react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { channelItemImageStyle, channelsContainerItemStyle, channelItemContainerStyle } from '../styles/ChannelItem';
import { ChannelItemProps } from '../interfaces/props';

const ChannelItem: React.FC<ChannelItemProps> = ({ title }) => (
  <Paper elevation={3} style={channelsContainerItemStyle}>
    <Box style={channelItemContainerStyle}>
      <Avatar style={channelItemImageStyle} variant="square"></Avatar>
      <Typography>{title}</Typography>
    </Box>
  </Paper>
)


export default ChannelItem;