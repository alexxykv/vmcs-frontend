import React, { useState } from 'react';
import { ShortMessageData } from '../interfaces/dto';
import { ChatProps } from '../interfaces/props';

const Chat: React.FC<ChatProps> = ({ chatHub }) => {
  const [messages, setMessages] = useState<Array<ShortMessageData>>([]);
  const [message, setMessage] = useState<Array<ShortMessageData>>();

  return (
    <></>
  );
}


export default Chat;