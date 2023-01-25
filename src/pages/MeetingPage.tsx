import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Container } from '@mui/material';
import CodeShareScreen from '../components/CodeShareScreen';
import VideoChatScreen from '../components/VideoChatScreen';
import ToolsPanel from '../components/ToolsPanel';
import Loading from '../components/Loading';
import Audio from '../components/Audio';

import { Meetings } from '../api';
import { MeetingData, ShortMessageData } from '../interfaces/dto';
import { useWebRTC } from '../hooks/useWebRTC';
import { useMeeting } from '../hooks/useMeeting';
import MeetingContext from '../contexts/MeetingContext';


type ScreenType = 'VideoChat' | 'CodeShare';

const messages: ShortMessageData[] = [
  {
    id: '1',
    text: 'Всем привет!',
    username: 'Иван Мишурин'
  },
  {
    id: '2',
    text: 'Ну привет...',
    username: 'Максим Цветков'
  },
  {
    id: '3',
    text: 'Здарова, парни!',
    username: 'Александр Коновалов'
  }
]

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

  const toggleScreen = () => {
    switch (screen) {
      case 'VideoChat': setScreen('CodeShare'); break;
      case 'CodeShare': setScreen('VideoChat'); break;
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'VideoChat': return <VideoChatScreen rtc={rtc} messages={messages} />;
      case 'CodeShare': return <CodeShareScreen />;
    }
  }

  if (rtc.localStream === null || rtc.localConnectionId === null) {
    return <>Загрузка</>
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ display: 'flex' }}>
      {renderScreen()}
      <ToolsPanel toggleScreen={toggleScreen} localStream={rtc.localStream} rtc={rtc} />
      {
        Array.from(rtc.remoteStreams).map(([connectionId, stream]) => {
          return <Audio stream={stream} connectionId={connectionId} />;
        })
      }
    </Container>
  );
}


export default MeetingPage;