import React, { useState } from 'react';

import { Box, Container } from '@mui/material';
import MeetingChat from './MeetingChat';
import Webcam from './Webcam';

import { useUser } from '../hooks/useUser';
import { VideoChatScreenProps } from '../interfaces/props';

import * as styles from '../styles';
import { useMeeting } from '../hooks/useMeeting';
import { MessageData } from '../interfaces/dto';


const VideoChatScreen: React.FC<VideoChatScreenProps> = ({ rtc }) => {
  const user = useUser();

  if (rtc.localStream === null || rtc.localConnectionId === null) {
    return <>Загрузка</>
  }

  return (
    <Container disableGutters maxWidth={false} sx={styles.videoChatScreen.container}>
      <Box sx={styles.videoChatScreen.webcamsBox}>
        <Webcam key={rtc.localStream.id} stream={rtc.localStream} username={user.username} connectionId={rtc.localConnectionId} />
        {
          Array.from(rtc.remoteStreams).map(([connectionId, stream]) => {
            return <Webcam
            key={stream.id}
            stream={stream}
            username={rtc.remoteUsernames.get(connectionId) as string}
            connectionId={connectionId}
          />;
          })
        }
      </Box>
      <MeetingChat />
    </Container>
  );
}


export default VideoChatScreen;