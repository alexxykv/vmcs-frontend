import React, { useState } from "react";

import { Box, Paper } from "@mui/material";
import { useMeeting, useWebRTC } from "../hooks";
import { Audio, CodeShareScreen, Loading, MeetingChat, ToolsPanel, VideoChatScreen } from "../components";


type ScreenType = 'VideoChat' | 'CodeShare';

const MeetingPage: React.FC = () => {
  const meeting = useMeeting();
  const rtc = useWebRTC(meeting.id);
  const [screen, setScreen] = useState<ScreenType>('VideoChat');
  const [openChat, setOpenChat] = useState<boolean>(false);

  const toggleChat = () => {
    setOpenChat(prev => !prev);
  }

  const toggleScreen = () => {
    switch (screen) {
      case 'VideoChat': setScreen('CodeShare'); break;
      case 'CodeShare': setScreen('VideoChat'); break;
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'VideoChat': return <VideoChatScreen rtc={rtc} openChat={openChat} />;
      case 'CodeShare': return <CodeShareScreen />;
    }
  };

  if (rtc.localStream === null || rtc.localConnectionId === null) {
    return <Loading />
  }

  return (
    <Paper square sx={{
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      width: '100%',
      height: '100%',
      overflow: 'auto'
    }}>
      <Box sx={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'auto'
      }}>
        {renderScreen()}
        <ToolsPanel toggleChat={toggleChat} toggleScreen={toggleScreen} localStream={rtc.localStream} rtc={rtc} />
        {
          // НЕ ТРОГАТЬ!!!
          Array.from(rtc.remoteStreams).map(([connectionId, stream]) => {
            return <Audio stream={stream} connectionId={connectionId} />;
          })
        }
      </Box>
      <MeetingChat open={openChat} />
    </Paper>
  );
}


export default MeetingPage;