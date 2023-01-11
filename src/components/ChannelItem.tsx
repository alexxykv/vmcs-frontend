import React from 'react';

import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import BaseLink from './BaseLink';

import { ChannelItemProps } from '../interfaces/props';
import { ShortChannelData } from '../interfaces/dto/channels';

import * as styles from '../styles';

const ChannelItem: React.FC<ChannelItemProps> = ({ channel }) => {
  const channelData = channel as ShortChannelData;

  return (
    // <Box sx={styles.channelItem.mainBox}>
    <Grid item xs={2} sx={styles.channelItem.mainBox}>
      {
        channel
          ? <BaseLink style={styles.channelItem.link} key={channelData.id} to={`/channels/${channelData.id}`}>
            <Paper elevation={10} sx={styles.channelItem.paper}>
              <Box sx={styles.channelItem.contentBox}>
                <Avatar sx={styles.channelItem.image} variant="square"></Avatar>
                <Typography sx={styles.channelItem.name}>{channelData.name}</Typography>
              </Box>
            </Paper>
          </BaseLink>
          : <Paper elevation={10} sx={styles.channelItem.paper}>
            <Box sx={styles.channelItem.contentBox}>
              <ControlPointIcon fontSize='large' />
            </Box>
          </Paper>
      }
    </Grid>
    // </Box>
  );
}


export default ChannelItem;