import { useState, useEffect } from 'react';
import { WebRTCResult } from '../interfaces/hooks';
import { useMeetingHub } from './useMeetingHub';


const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }
const constrains: MediaStreamConstraints = { 'audio': true, 'video': true }


export const useWebRTC = (meetingId: string) => {
  const [peerConnections, setPeerConnections] = useState<Map<string, RTCPeerConnection>>(new Map());
  const [localStream, setLocalStream] = useState<MediaStream>(null!);
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());
  const [remoteUsernames, setRemoteUsernames] = useState<Map<string, string>>(new Map());
  const signalingHub = useMeetingHub();
  // const clientId = signalingHub.Connection.connectionId;


  useEffect(() => {
    navigator.mediaDevices.getUserMedia(constrains).then(localStream => {
      setLocalStream(localStream);
      signalingHub.start().then(() => {

        signalingHub.onJoinClient((connectionId, username) => {
          setRemoteUsernames(prev => new Map(prev.set(connectionId, username)));

          const peerConnection = new RTCPeerConnection(configuration);
          setPeerConnections(prev => new Map(prev.set(connectionId, peerConnection)));

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

        signalingHub.onReceiveOffer((connectionId, offer, username) => {
          setRemoteUsernames(prev => new Map(prev.set(connectionId, username)));

          const peerConnection = new RTCPeerConnection(configuration);
          setPeerConnections(prev => new Map(prev.set(connectionId, peerConnection)));

          peerConnection.onicecandidate = event => {
            if (event.candidate) {
              signalingHub.addIceCandidate(connectionId, event.candidate);
            }
          }

          signalingHub.onReceiveIceCandidate((connectionId, iceCandidate) => {
            peerConnection.addIceCandidate(iceCandidate);
          });

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

        const cleanup = () => {
          localStream.getTracks().forEach(track => track.stop());
          setLocalStream(null!);

          remoteStreams.forEach(stream => stream.getTracks().forEach(track => track.stop()));
          setRemoteStreams(new Map());

          Array.from(peerConnections.values()).forEach(pc => pc.close());
          setPeerConnections(new Map());

          signalingHub.leaveMeeting(meetingId);
          signalingHub.Connection.stop();
        }

        window.onbeforeunload = () => {
          cleanup();
        }

        return () => {
          cleanup();
          window.onbeforeunload = () => { }
        }
      });
    });
  }, [signalingHub, meetingId]);


  const result: WebRTCResult = {
    localStream,
    remoteStreams,
    remoteUsernames
  };

  return result;
}