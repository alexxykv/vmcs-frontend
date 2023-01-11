import React from 'react';
import { Avatar, Box, hexToRgb, Paper, Typography, useTheme } from '@mui/material';
import { channelItemImageStyle, channelContainerItemStyle, channelItemContainerStyle, channelItemStyle } from '../styles/ChannelItem';
import { ChannelItemProps } from '../interfaces/props';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import StyledLink from './StyledLink';
import { ShortChannelData } from '../interfaces/dto/channels';

const ChannelItem: React.FC<ChannelItemProps> = ({ channel }) => {

  const theme = useTheme();

  const channelData = channel as ShortChannelData;
  const paperColor = channel ? theme.palette.primary.main : theme.palette.primary.light;
  const paperHoverColor = channel ? theme.palette.primary.mainHover : theme.palette.primary.lightHover;

  return (
    <Box style={channelItemStyle}>
      {
        channel ?
          <StyledLink key={channelData.id} to={`/channels/${channelData.id}`}>
            <Paper elevation={10} style={channelContainerItemStyle} sx={{
              backgroundColor: paperColor,
              '&:hover': {
                backgroundColor: paperHoverColor
              }
            }}>
              <Box style={channelItemContainerStyle}>
                <Avatar style={channelItemImageStyle} variant="square"></Avatar>
                <Typography>{channelData.name}</Typography>
              </Box>
            </Paper>
          </StyledLink>
          :
          <Paper elevation={10} style={channelContainerItemStyle} sx={{
            backgroundColor: paperColor,
            '&:hover': {
              backgroundColor: paperHoverColor
            }
          }}>
            <Box style={channelItemContainerStyle}>
              <ControlPointIcon fontSize='large' />
            </Box>
          </Paper>
      }
    </Box>
  );
}


export default ChannelItem;