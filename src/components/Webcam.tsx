import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { WebcamProps } from '../interfaces/props';
import { videoContainerStyle, usernameBoxStyle, webcamStyle } from '../styles/Webcam';


const Webcam: React.FC<WebcamProps> = ({ stream, username, muted }) => {
  const videoRef = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.srcObject = stream;
    console.log(stream)
  }, [videoRef, stream]);

  return (
    <Box style={webcamStyle}>
      <Box style={usernameBoxStyle}>{username}</Box>
      <Box style={videoContainerStyle}>
        <video width='100%' height='100%' ref={videoRef} autoPlay playsInline controls={false} muted={muted} />
      </Box>
    </Box>
  )
}


export default Webcam;