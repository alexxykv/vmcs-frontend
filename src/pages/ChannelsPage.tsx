import React, { useCallback, useEffect, useState } from 'react';

import { Container, Grid } from '@mui/material';
import ChannelItem from '../components/ChannelItem';
import ChannelsPageAside from '../components/ChannelsPageAside';

import { Users, Channels } from '../api';
import { CreateChannelData, ShortChannelData } from '../interfaces/dto/channels';

import * as styles from '../styles';
import CreateChannelDialog from '../components/CreateChannelDialog';


const ChannelsPage: React.FC = () => {
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
    <Container disableGutters maxWidth={false} sx={styles.channelsPage.container}>
      <ChannelsPageAside />
      <Grid container columns={16} sx={styles.channelsPage.channelItemsBox}>
        {/* <Box sx={styles.channelsPage.channelItemsBox}> */}
        <ChannelItem key={0} created={true} onClick={() => setOpenCreateChannel(true)} />
        {
          channels.map(channel => <ChannelItem key={channel.id} channel={channel} created={false} />)
        }
        {/* </Box> */}

      </Grid>
      <CreateChannelDialog
        open={openCreateChannel}
        handleClose={handleCloseCreateChannel}
        createChannel={createChannel}
      />
    </Container>
  );
}


export default ChannelsPage;