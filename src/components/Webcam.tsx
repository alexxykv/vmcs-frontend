import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';

import { videoContainerStyle, usernameBoxStyle, webcamStyle, videoStyle } from '../styles/Webcam';


const Webcam: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  return (
    <Box style={webcamStyle}>
      <Box style={usernameBoxStyle}>
        Максим Цветков
      </Box>
      <Box style={videoContainerStyle}>
        <video style={videoStyle} ref={videoRef} muted autoPlay />
      </Box>
    </Box>
  )
}


export default Webcam;