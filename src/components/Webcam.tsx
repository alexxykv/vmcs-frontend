import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';

import { videoContainerStyle, usernameBoxStyle, webcamStyle, videoStyle } from '../styles/Webcam';


const Webcam: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    playVideoFromCamera();
  }, [videoRef]);

  const playVideoFromCamera = async () => {
    const constraints = { 'video': true, 'audio': true };
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      const videoElement = videoRef.current;
      videoElement.srcObject = stream;
    }).catch(error => {
      console.error('Error opening video camera.', error);
    });
  }

  return (
    <Box style={webcamStyle}>
      <Box style={usernameBoxStyle}>
        Максим Цветков
      </Box>
      <Box style={videoContainerStyle}>
        <video width='100%' height='100%' ref={videoRef} autoPlay playsInline controls={false} />
      </Box>
    </Box>
  )
}


export default Webcam;