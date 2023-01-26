import React, { useEffect, useState } from 'react';
import { Box, Divider, IconButton, Paper } from '@mui/material';
import ToolItem from './ToolItem';
import { ToolsPanelProps } from '../interfaces/props';

import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CodeIcon from '@mui/icons-material/Code';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CommentIcon from '@mui/icons-material/Comment';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import * as styles from '../styles';
import { useMeetingHub } from '../hooks/useMeetingHub';
import { useMeeting } from '../hooks/useMeeting';


const ToolsPanel: React.FC<ToolsPanelProps> = ({ toggleChat, toggleScreen, localStream, rtc }) => {
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
      return <MicIcon fontSize='large'/>
    }
    return <MicOffIcon fontSize='large'/>
  };

  const renderCam = () => {
    if (camOn) {
      return <VideocamIcon fontSize='large'/>
    }
    return <VideocamOffIcon fontSize='large'/>
  };

  return (
    <Paper elevation={6} sx={styles.toolsPanel.box}>
      <Box sx={styles.toolsPanel.toolItemsBox}>
        <ToolItem>
          <IconButton onClick={toggleScreen}>
            <CodeIcon fontSize='large'/>
          </IconButton>
        </ToolItem>
        <ToolItem>
          <IconButton>
            <ScreenShareIcon fontSize='large'/>
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
          <IconButton onClick={toggleChat}>
            <CommentIcon fontSize='large'/>
          </IconButton>
        </ToolItem>
        <Divider orientation='vertical' sx={{
          height: 40
        }} />
        <ToolItem>
          <IconButton color='error'>
            <CallEndIcon fontSize='large'></CallEndIcon>
          </IconButton>
        </ToolItem>
      </Box>
    </Paper>
  );
}


export default ToolsPanel;