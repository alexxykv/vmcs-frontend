import React, { useContext, useState } from 'react';
import Chat from '../components/Chat';
import CodeShareScreen from '../components/CodeShareScreen';
import ToolsPanel from '../components/ToolsPanel';
import VideoChatScreen from '../components/VideoChatScreen';
import ChatHubContext from '../contexts/ChatHubContext';
import { MeetingPageProps } from '../interfaces/props';

import cs from '../styles/MeetingPage.module.css';

type ScreenType = 'VideoChat' | 'CodeShare';

const MeetingPage: React.FC<MeetingPageProps> = () => {
  const [screen, setScreen] = useState<ScreenType>('VideoChat');
  const chatHub = useContext(ChatHubContext);

  const toggleScreen = () => {
    switch (screen) {
      case 'VideoChat': setScreen('CodeShare'); break;
      case 'CodeShare': setScreen('VideoChat'); break;
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'VideoChat': return <VideoChatScreen />;
      case 'CodeShare': return <CodeShareScreen />;
    }
  }

  return (
    <>
      <div className={cs.container}>
        <Chat />
        {
          renderScreen()
        }
        <ToolsPanel />
      </div>
    </>
  );
}

export default MeetingPage;