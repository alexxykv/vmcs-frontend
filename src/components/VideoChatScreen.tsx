import React from "react";

import { Box, Paper } from "@mui/material";
import Webcam from "./Webcam";

import { useUser } from "../hooks/useUser";
import { VideoChatScreenProps, WithChildrenProps } from "../interfaces/Props";

import Loading from "./Loading";


const VideoChatScreen: React.FC<VideoChatScreenProps> = ({ rtc, openChat }) => {
  const user = useUser();

  if (rtc.localStream === null || rtc.localConnectionId === null) {
    return <Loading />
  }

  return (
    <Paper square sx={{
      display: 'flex',
      flexGrow: 1,
      width: '100%',
      height: '100%',
      // minWidth: 500
    }}>
      <WebcamBox>
        <Webcam
          key={rtc.localStream.id}
          stream={rtc.localStream}
          username={user.username}
          connectionId={rtc.localConnectionId}
        />
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
      </WebcamBox>
      
    </Paper>
  );
}

const WebcamBox: React.FC<WithChildrenProps> = ({ children }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexGrow: 1,
      p: 2,
      pb: 10,
      gap: 2,
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto'
    }}>
      {children}
    </Box>
  );
}


export default VideoChatScreen;