import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Box, Container, Paper } from '@mui/material';
import CodeShareScreen from '../components/CodeShareScreen';
import VideoChatScreen from '../components/VideoChatScreen';
import ToolsPanel from '../components/ToolsPanel';
import Loading from '../components/Loading';
import Audio from '../components/Audio';

import { Meetings } from '../api';
import { MeetingData } from '../interfaces/dto';
import { useWebRTC } from '../hooks/useWebRTC';
import { useMeeting } from '../hooks/useMeeting';
import MeetingContext from '../contexts/MeetingContext';
import MeetingChat from '../components/MeetingChat';


type ScreenType = 'VideoChat' | 'CodeShare';

const MeetingPage: React.FC = () => {
  const { id } = useParams();
  const meetingId = id as string;
  const [meeting, setMeeting] = useState<MeetingData>(null!);

  const uploadMeetingData = useCallback(() => {
    Meetings.Get(meetingId).then(meeting => {
      setMeeting(meeting);
    })
  }, [meetingId]);

  useEffect(() => {
    uploadMeetingData();
  }, [uploadMeetingData]);

  if (meeting === null) {
    return <Loading />
  }

  return (
    <MeetingContext.Provider value={meeting}>
      <MeetingPageWithContext />
    </MeetingContext.Provider>
  );
}

const MeetingPageWithContext: React.FC = () => {
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