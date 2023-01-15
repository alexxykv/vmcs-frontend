import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@mui/material';
import ChannelItem from '../components/ChannelItem';
import ChannelsPageAside from '../components/ChannelsPageAside';

import { Users, Channels } from '../api';
import { CreateChannelData, ShortChannelData } from '../interfaces/dto/channels';

import * as styles from '../styles';


const ChannelsPage: React.FC = () => {
  const [createChannelName, setCreateChannelName] = useState<string>("");
  const [channels, setChannels] = useState<ShortChannelData[]>([]);

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
    <Container disableGutters maxWidth={false} sx={styles.channelsPage.container}>
      <ChannelsPageAside />
      <Grid container columns={16} sx={styles.channelsPage.channelItemsBox}>
        {/* <Box sx={styles.channelsPage.channelItemsBox}> */}
        <ChannelItem key={0} created={true} />
        {
          channels.map(channel => <ChannelItem key={channel.id} channel={channel} created={false} />)
        }
        {/* </Box> */}

      </Grid>
    </Container>
  );
}


export default ChannelsPage;