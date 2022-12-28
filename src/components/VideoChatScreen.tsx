import React from 'react';
import { Box } from '@mui/material';
import { VideoChatScreenProps } from '../interfaces/props';

import MeetingChat from './MeetingChat';
import Webcam from './Webcam';

import { videoChatScreenStyle, webcamContainerStyle } from '../styles/VideoChatScreen';


const VideoChatScreen: React.FC<VideoChatScreenProps> = ({ messages }) => {
  return (
    <Box style={videoChatScreenStyle}>
      <Box style={webcamContainerStyle}>
        <Webcam />
      </Box>
      <MeetingChat messages={messages} />
    </Box>
  );
}


export default VideoChatScreen;