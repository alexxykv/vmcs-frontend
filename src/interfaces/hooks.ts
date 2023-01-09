export interface WebRTCResult {
  localStream: MediaStream,
  remoteStreams: Map<string, MediaStream>,
  remoteUsernames: Map<string, string>
}