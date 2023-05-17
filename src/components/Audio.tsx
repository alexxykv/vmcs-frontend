import React, { useEffect, useRef } from "react";
import { AudioProps } from "../interfaces/Props";

const Audio: React.FC<AudioProps> = ({ stream, connectionId }) => {
  const audioRef = useRef<HTMLAudioElement>(null!);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement)
      audioElement.srcObject = stream;
  }, [audioRef, stream]);

  return (
    <audio ref={audioRef} autoPlay />
  )
}

export default Audio;