import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { VideoChatScreenProps } from '../interfaces/props';

import MeetingChat from './MeetingChat';
import Webcam from './Webcam';

import { videoChatScreenStyle, webcamContainerStyle } from '../styles/VideoChatScreen';
import { useMeetingHub } from '../hooks/useMeetingHub';


const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }

const VideoChatScreen: React.FC<VideoChatScreenProps> = ({ messages }) => {
  // const [localStream, setLocalStream] = useState<MediaStream>(null!);

  const remoteVideo = useRef<HTMLVideoElement>(null!);
  const localVideo = useRef<HTMLVideoElement>(null!);
  const localStream = useRef<MediaStream>(null!);

  const signalingHub = useMeetingHub();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStream.current = stream;
        localVideo.current.srcObject = stream;
      });
  }, []);

  useEffect(() => {
    signalingHub.start().then(() => {
      const meetingId = '132';

      signalingHub.onJoinedNewClient(connectionId => {
        const peerConnection = new RTCPeerConnection(configuration);

        localStream.current.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream.current);
        });

        peerConnection.onicecandidate = event => {
          console.log('Вызов ice candidate')
          if (event.candidate) {
            signalingHub.addIceCandidate(meetingId, event.candidate);
          }
        }

        peerConnection.onconnectionstatechange = event => {
          console.log('Состояние сети', peerConnection.connectionState);
          if (peerConnection.connectionState === 'connected') {
            console.log('Peers connected!');
          }
        }

        signalingHub.onReceiveAnswer((connectionId, answer) => {
          console.log('Приняли ответ', answer);
          peerConnection.setRemoteDescription(answer);
        });

        signalingHub.onReceiveIceCandidate((connectionId, iceCandidate) => {
          peerConnection.addIceCandidate(iceCandidate);
        });

        peerConnection.ontrack = (event) => {
          remoteVideo.current.srcObject = event.streams[0];
        }

        peerConnection.createOffer().then(offer => {
          console.log('Создали оффер', offer);
          peerConnection.setLocalDescription(offer).then(() => {
            signalingHub.sendOffer(connectionId, new RTCSessionDescription(offer));
          });
        });
      });

      signalingHub.onReceiveOffer((connectionId, offer) => {
        console.log('Приняли оффер', offer);
        const peerConnection = new RTCPeerConnection(configuration);

        // localStream.current.getTracks().forEach((track) => {
        //   peerConnection.addTrack(track, localStream.current);
        // });

        peerConnection.onicecandidate = event => {
          if (event.candidate) {
            signalingHub.addIceCandidate(meetingId, event.candidate);
          }
        }

        peerConnection.onconnectionstatechange = event => {
          console.log('Состояние сети', peerConnection.connectionState);
          if (peerConnection.connectionState === 'connected') {
            console.log('Peers connected!');
          }
        }

        peerConnection.ontrack = (event) => {
          remoteVideo.current.srcObject = event.streams[0];
        }

        peerConnection.setRemoteDescription(offer).then(() => {
          peerConnection.createAnswer().then(answer => {
            console.log('Создали ответ', answer);
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
        {/* <Webcam /> */}
        <video width='300px' height='300px' ref={remoteVideo} muted autoPlay playsInline controls={false}></video>
        <video width='300px' height='300px' ref={localVideo} muted autoPlay playsInline controls={false}></video>
      </Box>
      <MeetingChat messages={messages} />
    </Box>
  );
}


export default VideoChatScreen;