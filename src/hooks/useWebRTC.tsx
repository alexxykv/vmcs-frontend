import { cleanup } from "@testing-library/react";
import { useState, useEffect } from "react";
import { WebRTCResult } from "../interfaces/Hooks";
import { useMeetingHub } from "./useMeetingHub";


const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }


export const useWebRTC = (meetingId: string) => {
  const [peerConnections, setPeerConnections] = useState<Map<string, RTCPeerConnection>>(new Map());
  const [localStream, setLocalStream] = useState<MediaStream>(null!);
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());
  const [remoteUsernames, setRemoteUsernames] = useState<Map<string, string>>(new Map());
  const [localConnectionId, setLocalConnectionId] = useState<string>(null!);

  const signalingHub = useMeetingHub();

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const cams = devices.filter(device => device.kind === 'videoinput');
      const mics = devices.filter(device => device.kind === 'audioinput');
      return navigator.mediaDevices.getUserMedia({ video: cams.length > 0, audio: mics.length > 0 })
    }).then(stream => Start(stream))
      .catch(() => {
        console.log('Первый катч')
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
          .then(stream => Start(stream))
          .catch(() => {
            console.log('Второй катч')
            alert('You need a connected mic to join conference.')
            // Start(new MediaStream());
          });
      })

    const cleanup = () => {
      console.log('clean up')
      setLocalStream(prev => {
        if (prev) {
          prev.getTracks().forEach(track => {
            track.stop()
          });
        }
        return null!;
      });

      remoteStreams.forEach(stream => stream.getTracks().forEach(track => track.stop()));
      setRemoteStreams(new Map());

      Array.from(peerConnections.values()).forEach(pc => pc.close());
      setPeerConnections(new Map());

      signalingHub.leaveMeeting(meetingId);
    }

    window.onbeforeunload = () => {
      cleanup();
    }

    return () => {
      cleanup();
      window.onbeforeunload = () => { }
    }
  }, [signalingHub, meetingId])

  const Start = (localStream: MediaStream) => {
    cleanup();
    const videoTracks = localStream.getVideoTracks();
    if (videoTracks.length > 0) {
      const videoTrack = videoTracks[0];
      if (videoTrack) {
        videoTrack.enabled = false;
      }
    }
    setLocalStream(localStream);
    signalingHub.Connection.stop().then(() => {
      signalingHub.Connection.start().then(() => {
        setLocalConnectionId(signalingHub.Connection.connectionId as string);
        signalingHub.onJoinClient((connectionId, username) => {
          const tempConnectionId = connectionId;

          setRemoteUsernames(prev => new Map(prev.set(connectionId, username)));

          const peerConnection = new RTCPeerConnection(configuration);

          // if (localStream.getAudioTracks().length == 0) {
          //   const tAudio = peerConnection.addTransceiver('audio');
          //   tAudio.direction = 'recvonly';
          // }

          setPeerConnections(prev => new Map(prev.set(connectionId, peerConnection)));

          signalingHub.onReceiveAnswer((connectionId, answer) => {
            if (tempConnectionId === connectionId) {
              peerConnection.setRemoteDescription(answer);
            }
          });

          signalingHub.onReceiveIceCandidate((connectionId, iceCandidate) => {
            if (tempConnectionId === connectionId) {
              peerConnection.addIceCandidate(iceCandidate);
            }
          });

          peerConnection.onicecandidate = event => {
            if (event.candidate) {
              signalingHub.addIceCandidate(connectionId, event.candidate);
            }
          }

          peerConnection.onconnectionstatechange = event => {
            if (peerConnection.connectionState === 'connected') {
              const videoTracks = localStream.getVideoTracks();
              if (videoTracks.length > 0){
                if (videoTracks[0]) {
                  signalingHub.toggleWebCamera(meetingId, videoTracks[0].enabled);
                }
              }
              console.log('Peers connected!');
            }
          }

          peerConnection.onnegotiationneeded = event => {
            peerConnection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true }).then(offer => {
              peerConnection.setLocalDescription(offer).then(() => {
                signalingHub.sendOffer(connectionId, new RTCSessionDescription(offer));
              });
            });
          }

          peerConnection.ontrack = event => {
            const [remoteStream] = event.streams;
            console.log(remoteStream.getTracks());
            const videoTracks = remoteStream.getVideoTracks();
            if (videoTracks.length > 0) {
              if (videoTracks[0]) {
                videoTracks[0].enabled = false;
              }
            }
            setRemoteStreams(prev => new Map(prev.set(connectionId, remoteStream)));
          }

          localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
          });
        });

        signalingHub.onReceiveOffer((connectionId, offer, username) => {
          const tempConnectionId = connectionId;

          setRemoteUsernames(prev => new Map(prev.set(connectionId, username)));

          const peerConnection = new RTCPeerConnection(configuration);

          // if (localStream.getAudioTracks().length == 0) {
          //   const tAudio = peerConnection.addTransceiver('audio');
          //   tAudio.direction = 'recvonly';
          // }

          setPeerConnections(prev => new Map(prev.set(connectionId, peerConnection)));

          peerConnection.onicecandidate = event => {
            if (event.candidate) {
              signalingHub.addIceCandidate(connectionId, event.candidate);
            }
          }

          signalingHub.onReceiveIceCandidate((connectionId, iceCandidate) => {
            if (tempConnectionId === connectionId) {
              peerConnection.addIceCandidate(iceCandidate);
            }
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
            console.log(remoteStream.getTracks());
            const videoTracks = remoteStream.getVideoTracks();
            if (videoTracks.length > 0) {
              if (videoTracks[0]) {
                videoTracks[0].enabled = false;
              }
            }
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
        console.log(meetingId)
        signalingHub.joinMeeting(meetingId)
      });
    });
  };

  const result: WebRTCResult = {
    localStream,
    remoteStreams,
    remoteUsernames,
    localConnectionId,
    peerConnections
  };

  return result;
}