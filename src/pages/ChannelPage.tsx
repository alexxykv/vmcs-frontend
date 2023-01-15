import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container } from '@mui/material';
import Loading from '../components/Loading';
import ChannelAsideMenu from '../components/ChannelAsideMenu';
import ChannelChat from '../components/ChannelChat';

import { Channels } from '../api';
import { ChannelData } from '../interfaces/dto';

import { fakeAsync } from '../utils';
import * as styles from '../styles';


const ChannelPage: React.FC = () => {
  const { id } = useParams();
  const channelId = id as string;

  const navigate = useNavigate();
  const [channel, setChannel] = useState<ChannelData>(null!);

  const uploadChannelData = useCallback(() => {
    fakeAsync(() => {
      Channels.Get(channelId).then(channel => {
        setChannel(channel);
      }).catch(() => {
        navigate('/channels', { replace: true });
      });
    });
  }, [navigate, channelId]);

  useEffect(() => {
    uploadChannelData();
  }, [uploadChannelData]);

  const render = () => {
    if (channel === null) {
      return <Loading />;
    }
    return (
      <>
        <ChannelAsideMenu channel={channel} />
        <ChannelChat {...channel.chat} />
      </>
    );
  }

  return (
    <Container disableGutters maxWidth={false} sx={styles.channelPage.container}>
      {render()}
    </Container>
  );
}


export default ChannelPage;