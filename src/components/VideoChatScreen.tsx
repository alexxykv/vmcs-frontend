import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { VideoChatScreenProps } from '../interfaces/props';

import MeetingChat from './MeetingChat';
import Webcam from './Webcam';

import { videoChatScreenStyle, webcamContainerStyle } from '../styles/VideoChatScreen';
import { useMeetingHub } from '../hooks/useMeetingHub';
import { getRandomInt } from '../utils';


const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }

const VideoChatScreen: React.FC<VideoChatScreenProps> = ({ messages }) => {

  const signalingHub = useMeetingHub();
  const clientId = signalingHub.Connection.connectionId;
  const [localStream, setLocalStream] = useState<MediaStream>(null!);
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());
  const meetingId = 'asds887-fdsf43-f3f3ff3fh4-4h4thhyr5he-34f3g';

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ 'video': true, 'audio': true }).then(localStream => {
      setLocalStream(localStream);
      signalingHub.start().then(() => {

        signalingHub.onJoinClient(connectionId => {
          const peerConnection = new RTCPeerConnection(configuration);

          signalingHub.onReceiveAnswer((connectionId, answer) => {
            peerConnection.setRemoteDescription(answer);
          });

          signalingHub.onReceiveIceCandidate((connectionId, iceCandidate) => {
            peerConnection.addIceCandidate(iceCandidate);
          });

          peerConnection.onicecandidate = event => {
            if (event.candidate) {
              signalingHub.addIceCandidate(connectionId, event.candidate);
            }
          }

          peerConnection.onconnectionstatechange = event => {
            if (peerConnection.connectionState === 'connected') {
              console.log('Peers connected!');
            }

            if (peerConnection.connectionState === 'failed') {
              peerConnection.restartIce();
            }
          }

          peerConnection.onnegotiationneeded = event => {
            peerConnection.createOffer().then(offer => {
              peerConnection.setLocalDescription(offer).then(() => {
                signalingHub.sendOffer(connectionId, new RTCSessionDescription(offer));
              });
            });
          }

          peerConnection.ontrack = event => {
            const [remoteStream] = event.streams;
            setRemoteStreams(prev => new Map(prev.set(connectionId, remoteStream)));
          }

          localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
          });
        });

        signalingHub.onReceiveOffer((connectionId, offer) => {
          const peerConnection = new RTCPeerConnection(configuration);

          peerConnection.onicecandidate = event => {
            if (event.candidate) {
              signalingHub.addIceCandidate(connectionId, event.candidate);
            }
          }

          peerConnection.onconnectionstatechange = event => {
            if (peerConnection.connectionState === 'connected') {
              console.log('Peers connected!');
            }

            if (peerConnection.connectionState === 'failed') {
              peerConnection.restartIce();
            }
          }

          peerConnection.setRemoteDescription(offer).then(() => {
            peerConnection.createAnswer().then(answer => {
              peerConnection.setLocalDescription(answer).then(() => {
                signalingHub.sendAnswer(connectionId, new RTCSessionDescription(answer));
              });
            })
          });

          peerConnection.ontrack = event => {
            const [remoteStream] = event.streams;
            setRemoteStreams(prev => new Map(prev.set(connectionId, remoteStream)));
          }

          localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
          });
        });

        signalingHub.onLeaveClient(connectionId => {
          console.log(`Client leave ${connectionId}`)
          setRemoteStreams(prev => {
            const temp = new Map(prev);
            temp.delete(connectionId);
            return new Map(temp);
          });
        })

        signalingHub.joinMeeting(meetingId);
      });
    });

    const cleanup = () => {
      signalingHub.leaveMeeting(meetingId);
    }

    window.addEventListener('beforeunload', cleanup);

    return () => {
      window.removeEventListener('beforeunload', cleanup);
    }
  }, [signalingHub]);

  return (
    <Box style={videoChatScreenStyle}>
      <Box style={webcamContainerStyle}>
        <Webcam key={0} stream={localStream} />
        {
          Array.from(remoteStreams.values()).map(stream => <Webcam key={getRandomInt(1, 10000000)} stream={stream} />)
          // remoteStreams.map(stream => <Webcam stream={stream} />)
        }
      </Box>
      <MeetingChat messages={messages} />
    </Box>
  );
}


export default VideoChatScreen;