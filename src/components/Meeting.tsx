import React, { ChangeEvent, useEffect, useState } from 'react';

import { MessageProps } from '../interfaces/props';
import { useHub } from '../hooks/useHub';
import MeetingHub from '../hubs/MeetingHub';

import Message from './Message';
import cs from '../styles/Meeting.module.css';


const Meeting: React.FC = () => {
  const meetingHub = useHub(MeetingHub, MeetingHub.Endpoint);

  const [message, setMessage] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const changeMessageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }

  const changeLoginHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  }

  const clickSendMessageHandler = async () => {
    const data = [
      message,
      login,
      '-1',
    ];
    meetingHub.SendMessageToMeeting(data);
  }

  useEffect(() => {
    meetingHub.ReceiveMessage((login, text) => {
      const message: MessageProps = {
        login,
        text,
      };
      setMessages(prev => {
        return [
          ...prev,
          message,
        ]
      })
    });
  }, [meetingHub]);

  return (
    <>
      <div className={cs.chat}>
        <div className={cs.chatLogin}>
          <span>Login: </span>
          <input
            type="text"
            value={login}
            onChange={changeLoginHandler} />
        </div>
        <div className={cs.chatInput}>
          <span>Message: </span>
          <input
            type="text"
            value={message}
            onChange={changeMessageHandler}
          />
        </div>
        <div className={cs.chatSubmit}>
          <button
            onClick={clickSendMessageHandler}
          >Send</button>
        </div>
      </div>

      <div className='messageContainer'>
        {
          messages.map((message, index) => {
            return (
              <Message key={index} login={message.login} text={message.text} />
            );
          })
        }
      </div>
    </>
  );
}


export default Meeting;