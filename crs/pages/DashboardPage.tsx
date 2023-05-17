import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Channels, Users } from "../api";
import { CreateChannelData, ShortChannelData } from "../interfaces/dto";
import { CreateChannelDialog } from "../components";


const DashboardPage: React.FC = () => {
  const [channels, setChannels] = useState<ShortChannelData[]>([]);
  const [openCreateChannel, setOpenCreateChannel] = useState<boolean>(false);

  const handleCloseCreateChannel = () => {
    setOpenCreateChannel(false);
  };

  const uploadChannels = useCallback(() => {
    Users.GetAllUserChannels().then(channels => {
      setChannels(channels);
    })
  }, []);

  useEffect(() => {
    uploadChannels();
  }, [uploadChannels]);

  const createChannel = (name: string) => {
    const createData: CreateChannelData = { name };

    Channels.Create(createData).then((channel) => {
      setChannels(prev => prev.concat(channel));
    });
  }

  return (
    <>
      <Paper square sx={{ minHeight: '100%', p: 2 }}>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}>
          <ChannelItemCreate openDialog={() => setOpenCreateChannel(true)} />
          {channels.map(channel => <ChannelItem key={channel.id} channel={channel} />)}
        </Box>
      </Paper>
      <CreateChannelDialog
        open={openCreateChannel}
        handleClose={handleCloseCreateChannel}
        createChannel={createChannel}
      />
    </>
  );
}

interface ChannelItemCreateProps {
  openDialog: VoidFunction
}

const ChannelItemCreate: React.FC<ChannelItemCreateProps> = ({ openDialog }) => {
  return (
    <Paper elevation={4}
      onClick={openDialog}
      sx={{
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

interface ChannelItemProps {
  channel: ShortChannelData
}

const ChannelItem: React.FC<ChannelItemProps> = ({ channel }) => {
  const navigate = useNavigate();
  const avatarUri = channel.avatarUri ?
    new URL(channel.avatarUri, process.env.REACT_APP_HOST_URL).href
    : '';

  const handleClick = () => {
    navigate(`/channels/${channel.id}`);
  };

  return (
    <Paper elevation={4}
      onClick={handleClick}
      sx={{
        display: 'flex',
        width: 150,
        height: 200,
        '&:hover': {
          color: 'white',
          backgroundColor: 'primary.main',
          cursor: 'pointer'
        }
      }}
    >
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        padding={1}
        flexGrow={1}>
        <Box sx={{ display: 'flex', height: '50%', alignItems: 'center' }}>
          <Avatar
            src={avatarUri}
            sx={{
              width: 56,
              height: 56
            }}>
            {channel.name[0]}
          </Avatar>
        </Box>
        <Typography variant='h6' component='div' fontWeight={400} sx={{
          alignItems: 'start',
          textAlign: 'center',
          height: '50%',
          width: 134,
          wordWrap: 'break-word'
        }}>
          {channel.name}
        </Typography>
      </Stack>
    </Paper>
  );
}


export default DashboardPage;