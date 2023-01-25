import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useMeetingHub } from '../hooks/useMeetingHub';
import { WebcamProps } from '../interfaces/props';

import * as styles from '../styles';


const Webcam: React.FC<WebcamProps> = ({ stream, username, connectionId }) => {
  const [camOn, setCamOn] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null!);

  const meetingHub = useMeetingHub();

  useEffect(() => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        const videoTrack = videoTracks[0];
        if (videoTrack) {
          setCamOn(videoTrack.enabled);
        }
      }
    }
  }, [stream])

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement)
      videoElement.srcObject = stream;
  }, [videoRef, stream]);

  useEffect(() => {
    meetingHub.onToggleWebCamera((clientId, isActive) => {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        if (connectionId === clientId) {
          setCamOn(isActive);
          videoTrack.enabled = isActive;
        }
      }
    });
  }, [])

  return (
    <Box sx={styles.webcam.box}>
      <Box sx={styles.webcam.usernameBox}>{username}</Box>
      <Box sx={styles.webcam.videoBox}>
        {camOn ? '' : 'Вебка не работает'}
        <video width='100%' height='100%' ref={videoRef} autoPlay muted={true} hidden={!camOn} />
      </Box>
    </Box>
  )
}


export default Webcam;