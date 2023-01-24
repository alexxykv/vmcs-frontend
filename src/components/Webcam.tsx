import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useMeetingHub } from '../hooks/useMeetingHub';
import { WebcamProps } from '../interfaces/props';

import * as styles from '../styles';


const Webcam: React.FC<WebcamProps> = ({ stream, username, muted, connectionId }) => {
  const [camOn, setCamOn] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null!);

  const meetingHub = useMeetingHub();

  useEffect(() => {
    stream.getVideoTracks().forEach(track => {
      console.log(track)
      if (track.kind === 'video') {
        setCamOn(track.enabled);
      }
    })
    // const videoTrack = videoTracks[0];
    // console.log('WEBCAM')
    // console.log(videoTrack.enabled)
    // if (videoTrack.enabled){
    //   setCamOn(true);
    // } else {
    //   setCamOn(false);
    // }
  }, [])

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement)
      videoElement.srcObject = stream;
  }, [videoRef, stream]);

  useEffect(() => {
    meetingHub.onToggleWebCamera((clientId, isActive) => {
      console.log(connectionId)
      console.log(clientId)
      if (clientId === connectionId) {
        setCamOn(isActive);
      }
    });
  }, [])

  return (
    <Box sx={styles.webcam.box}>
      <Box sx={styles.webcam.usernameBox}>{username}</Box>
      <Box sx={styles.webcam.videoBox}>
        <video width='100%' height='100%' ref={videoRef} autoPlay muted={muted} hidden={!camOn} />
        {camOn ? '' : 'Вебка не работает'}
      </Box>
    </Box>
  )
}


export default Webcam;