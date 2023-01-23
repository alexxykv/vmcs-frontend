import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';


const DashboardPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
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

const ChannelItem: React.FC<{}> = () => {
  return (
    <Paper elevation={2} sx={{
      display: 'flex',
      width: 150,
      height: 200,
      '&:hover': {
        backgroundColor: 'primary.main'
      }
    }}>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        padding={1}
        flexGrow={1}>
        <Avatar sx={{ width: 48, height: 48 }} />
        <Typography variant='h6' component='div' sx={{ textAlign: 'center' }}>
          Channel Name
        </Typography>
      </Stack>
    </Paper>
  );
}


export default DashboardPage;