import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';

import { videoContainerStyle, usernameBoxStyle, webcamStyle, videoStyle } from '../styles/Webcam';


interface WebcamProps {
  stream: MediaStream
}

const Webcam: React.FC<WebcamProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    playVideoFromCamera();
    console.log(stream)
  }, [videoRef, stream]);

  const playVideoFromCamera = async () => {
    const videoElement = videoRef.current;
    videoElement.srcObject = stream;
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