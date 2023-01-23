import React from 'react';
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const DashboardPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <ChannelItemCreate />
      <ChannelItem />
      <ChannelItem />
      <ChannelItem />
      <ChannelItem />
      <ChannelItem />
      <ChannelItem />
      <ChannelItem />
    </Box>
  );
}

const ChannelItemCreate: React.FC = () => {
  return (
    <Paper elevation={4} sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
      height: 200,
      color: 'white',
      backgroundColor: 'primary.dark',
      '&:hover': {
        backgroundColor: 'primary.main',
        cursor: 'pointer'
      }
    }}>
      <AddCircleIcon sx={{ width: 56, height: 56 }} />
    </Paper>
  );
}

const ChannelItem: React.FC<{}> = () => {
  return (
    <Paper elevation={4} sx={{
      display: 'flex',
      width: 150,
      height: 200,
      '&:hover': {
        color: 'white',
        backgroundColor: 'primary.main',
        cursor: 'pointer'
      }
    }}>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        padding={1}
        flexGrow={1}>
        <Box sx={{ display: 'flex', height: '50%', alignItems: 'center' }}>
          <Avatar sx={{ width: 56, height: 56 }} />
        </Box>
        <Typography variant='h6' component='div' sx={{
          alignItems: 'start',
          textAlign: 'center',
          height: '50%',
          width: 134,
          wordWrap: 'break-word'
        }}>
          123456789012345678901234567890
        </Typography>
      </Stack>
    </Paper>
  );
}


export default DashboardPage;