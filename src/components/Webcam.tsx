import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

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
    <Box
      position='relative'
      width='400px'
      height='300px'
      borderRadius='5px'
      padding='5px'
      style={{ backgroundColor: '#5685c7' }}
    >
      <Box
        width='120px'
        height='20px'
        position='absolute'
        borderRadius='5px'
        left='7px'
        bottom='5px'
        color='white'
        fontSize='10px'
        textAlign='center'
        style={{ backgroundColor: 'rgb(0, 0, 0, 0.8)' }}
      >
        Максим Цветков
      </Box>
      <Box
        width='100%'
        height='100%' 
      >
        <video style={{ borderRadius: '5px' }} width='100%' ref={videoRef} muted autoPlay/>
      </Box>
    </Box>
  )
}

export default Webcam;