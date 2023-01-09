import React, { useState } from 'react';
import Layout from '../components/Layout';
import CodeShareScreen from '../components/CodeShareScreen';
import VideoChatScreen from '../components/VideoChatScreen';
import ToolsPanel from '../components/ToolsPanel';
import { ShortMessageData } from '../interfaces/dto/messages';
import { MeetingPageProps } from '../interfaces/props';
import { useParams } from 'react-router';
import { useWebRTC } from '../hooks/useWebRTC';

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

const MeetingPage: React.FC<MeetingPageProps> = () => {
  const { id } = useParams();
  const meetingId = id as string;
  const rtc = useWebRTC(meetingId);

  const [screen, setScreen] = useState<ScreenType>('VideoChat');

  const toggleScreen = () => {
    switch (screen) {
      case 'VideoChat': setScreen('CodeShare'); break;
      case 'CodeShare': setScreen('VideoChat'); break;
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'VideoChat': return <VideoChatScreen rtc={rtc} messages={messages}/>;
      case 'CodeShare': return <CodeShareScreen />;
    }
  }

  return (
    <Layout title="Видеоконференция">
      {renderScreen()}
      <ToolsPanel toggleScreen={toggleScreen} />
    </Layout>
  );
}


export default MeetingPage;