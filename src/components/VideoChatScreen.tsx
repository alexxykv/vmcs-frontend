import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { VideoChatScreenProps } from '../interfaces/props';

import MeetingChat from './MeetingChat';
import Webcam from './Webcam';

import { videoChatScreenStyle, webcamContainerStyle } from '../styles/VideoChatScreen';
import { useMeetingHub } from '../hooks/useMeetingHub';


const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }

const VideoChatScreen: React.FC<VideoChatScreenProps> = ({ messages }) => {

  const signalingHub = useMeetingHub();
  const clientId = signalingHub.Connection.connectionId;

  useEffect(() => {
    signalingHub.start().then(() => {
      const meetingId = 'asds887-fdsf43-f3f3ff3fh4-4h4thhyr5he-34f3g';

      signalingHub.onJoinedNewClient(connectionId => {
        const peerConnection = new RTCPeerConnection(configuration);

        peerConnection.onicecandidate = event => {
          console.log(123)
          if (event.candidate) {
            signalingHub.addIceCandidate(meetingId, event.candidate);
          }
        }
  
        peerConnection.onconnectionstatechange = event => {
          if (peerConnection.connectionState === 'connected') {
            console.log('Peers connected!');
          }
        }

        signalingHub.onReceiveAnswer((connectionId, answer) => {
          peerConnection.setRemoteDescription(answer);
        });
  
        signalingHub.onReceiveIceCandidate((connectionId, iceCandidate) => {
          peerConnection.addIceCandidate(iceCandidate);
        });

        peerConnection.createOffer().then(offer => {
          peerConnection.setLocalDescription(offer).then(() => {
            signalingHub.sendOffer(connectionId, new RTCSessionDescription(offer));
          });
        });
      });

      signalingHub.onReceiveOffer((connectionId, offer) => {
        const peerConnection = new RTCPeerConnection(configuration);

        peerConnection.onicecandidate = event => {
          console.log(123)
          if (event.candidate) {
            signalingHub.addIceCandidate(meetingId, event.candidate);
          }
        }
  
        peerConnection.onconnectionstatechange = event => {
          if (peerConnection.connectionState === 'connected') {
            console.log('Peers connected!');
          }
        }

        peerConnection.setRemoteDescription(offer).then(() => {
          peerConnection.createAnswer().then(answer => {
            peerConnection.setLocalDescription(answer).then(() => {
              signalingHub.sendAnswer(connectionId, new RTCSessionDescription(answer));
            });
          })
        });
      });

      signalingHub.joinMeeting(meetingId);
    });
  }, []);

  return (
    <Box style={videoChatScreenStyle}>
      <Box style={webcamContainerStyle}>
        <Webcam />
      </Box>
      <MeetingChat messages={messages} />
    </Box>
  );
}


export default VideoChatScreen;