import React from 'react';
import { Avatar, Box, hexToRgb, Paper, Typography, useTheme } from '@mui/material';
import { channelItemImageStyle, channelsContainerItemStyle, channelItemContainerStyle } from '../styles/ChannelItem';
import { ChannelItemProps } from '../interfaces/props';

import ControlPointIcon from '@mui/icons-material/ControlPoint';

const ChannelItem: React.FC<ChannelItemProps> = ({ title, created }) => {

  const theme = useTheme();

  const paperColor = created ? theme.palette.primary.main : theme.palette.primary.light;
  const paperHoverColor = created ? theme.palette.primary.mainHover : theme.palette.primary.lightHover;

  return (
    <Paper elevation={10} style={channelsContainerItemStyle} sx={{
      backgroundColor: paperColor,
      '&:hover': {
        backgroundColor: paperHoverColor
      }
    }}>
      <Box style={channelItemContainerStyle}>
        {
          created
            ?
            <ControlPointIcon fontSize='large' />
            : 
            <>
              <Avatar style={channelItemImageStyle} variant="square"></Avatar>
              <Typography>{title}</Typography>
            </>
        }
      </Box>
    </Paper>
  );
}


export default ChannelItem;