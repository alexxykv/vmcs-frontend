import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { WebcamProps } from '../interfaces/props';

import * as styles from '../styles';


const Webcam: React.FC<WebcamProps> = ({ stream, username, muted }) => {
  const videoRef = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.srcObject = stream;
  }, [videoRef, stream]);

  return (
    <Box sx={styles.webcam.box}>
      <Box sx={styles.webcam.usernameBox}>{username}</Box>
      <Box sx={styles.webcam.videoBox}>
        <video width='100%' height='100%' ref={videoRef} autoPlay playsInline controls={false} muted={muted} />
      </Box>
    </Box>
  )
}


export default Webcam;