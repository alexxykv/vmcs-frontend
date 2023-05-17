import React, { useState } from "react";
import { ShortMessageData } from "../interfaces/dto";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Array<ShortMessageData>>([]);
  const [message, setMessage] = useState<Array<ShortMessageData>>();

  return (
    <></>
  );
}


export default Chat;