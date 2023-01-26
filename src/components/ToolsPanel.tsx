import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ToolItem from './ToolItem';
import { ToolsPanelProps } from '../interfaces/props';

import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CodeIcon from '@mui/icons-material/Code';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import * as styles from '../styles';
import { useMeetingHub } from '../hooks/useMeetingHub';
import { useMeeting } from '../hooks/useMeeting';


const ToolsPanel: React.FC<ToolsPanelProps> = ({ toggleScreen, localStream, rtc }) => {
  const [audioTrack, setAudioTrack] = useState<MediaStreamTrack | null>(null);
  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack | null>(null);
  const [micOn, setMicOn] = useState<boolean>(true);
  const [camOn, setCamOn] = useState<boolean>(false);

  const meetingHub = useMeetingHub();
  const meeting = useMeeting();

  useEffect(() => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        setAudioTrack(audioTracks[0]);
      }
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        setVideoTrack(videoTracks[0])
      }
    }
  }, [localStream])

  const handleToggleMute = () => {
    if (audioTrack) {
      if (audioTrack.enabled) {
        audioTrack.enabled = false;
        setMicOn(false);
      } else {
        audioTrack.enabled = true;
        setMicOn(true);
      }
    } else {
      setMicOn(false);
      alert('Connect a audio capturing device.')
    }
  }

  const handleToggleCam = () => {
    if (videoTrack) {
      if (videoTrack.enabled) {
        videoTrack.enabled = false;
        setCamOn(false);
      } else {
        videoTrack.enabled = true;
        setCamOn(true);
      }
      meetingHub.toggleWebCamera(meeting.id, videoTrack.enabled);
    // } else {
    //   navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    //     const videoTracks = stream.getVideoTracks();
    //     stream.getTracks().forEach(track => {
    //       localStream.addTrack(track);
    //       rtc.peerConnections.forEach(pc => {
    //         pc.addTrack(track, localStream);
    //       })
    //     })
    //     setVideoTrack(videoTracks[0])
    //     meetingHub.toggleWebCamera(meeting.id, true);
    //   })
    } else {
      alert('Connect a video capturing device.')
    }
  }

  const renderMic = () => {
    if (micOn) {
      return <MicIcon fontSize='large' htmlColor='#5685c7' />
    }
    return <MicOffIcon fontSize='large' htmlColor='#5685c7' />
  };

  const renderCam = () => {
    if (camOn) {
      return <VideocamIcon fontSize='large' htmlColor='#5685c7' />
    }
    return <VideocamOffIcon fontSize='large' htmlColor='#5685c7' />
  };

  return (
    <Box sx={styles.toolsPanel.box}>
      <Box sx={styles.toolsPanel.toolItemsBox}>
        <ToolItem>
          <IconButton onClick={toggleScreen}>
            <CodeIcon fontSize='large' htmlColor='#5685c7' />
          </IconButton>
        </ToolItem>
        <ToolItem>
          <IconButton>
            <ScreenShareIcon fontSize='large' htmlColor='#5685c7' />
          </IconButton>
        </ToolItem>
        <ToolItem>
          <IconButton onClick={handleToggleMute}>
            {renderMic()}
          </IconButton>
        </ToolItem>
        <ToolItem>
          <IconButton onClick={handleToggleCam}>
            {renderCam()}
          </IconButton>
        </ToolItem>
        <ToolItem>
          <IconButton>
            <ChatOutlinedIcon fontSize='large' htmlColor='#5685c7' />
          </IconButton>
        </ToolItem>
        <ToolItem style={{ borderLeft: 'solid 1px gray' }}>
          <IconButton>
            <CallEndIcon htmlColor='red' fontSize='large'></CallEndIcon>
          </IconButton>
        </ToolItem>
      </Box>
    </Box>
  );
}


export default ToolsPanel;