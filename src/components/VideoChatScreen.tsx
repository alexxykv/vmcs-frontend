import React from 'react';

import { Box } from '@mui/material';
import MeetingChat from './MeetingChat';
import Webcam from './Webcam';

import { useUser } from '../hooks/useUser';
import { VideoChatScreenProps } from '../interfaces/props';

import * as styles from '../styles';


const VideoChatScreen: React.FC<VideoChatScreenProps> = ({ messages, rtc }) => {
  const user = useUser();

  if (rtc.localStream === null) {
    return <>Загрузка</>
  }

  return (
    <Box sx={styles.videoChatScreen.box}>
      <Box sx={styles.videoChatScreen.webcamsBox}>
        <Webcam key={rtc.localStream.id} stream={rtc.localStream} username={user.username} muted={true} />
        {
          Array.from(rtc.remoteStreams).map(([connectionId, stream]) => {
            return <Webcam
              key={stream.id}
              stream={stream}
              username={rtc.remoteUsernames.get(connectionId) as string}
              muted={false}
            />;
          })
        }
      </Box>
      <MeetingChat messages={messages} />
    </Box>
  );
}


export default VideoChatScreen;