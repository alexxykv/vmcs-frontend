import React, { ChangeEvent, useEffect, useState } from 'react';

import { useHub } from '../hooks/useHub';
import MeetingHub from '../hubs/MeetingHub';

import Message from '../components/Message';
import { ShortMessageData } from '../interfaces/dto';
import { getRandomInt } from '../utils';


const TestPage: React.FC = () => {
  const hub = useHub(MeetingHub, MeetingHub.Endpoint);

  const [message, setMessage] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [messages, setMessages] = useState<Array<ShortMessageData>>([]);

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
    hub.SendMessageToMeeting(data);
  }

  useEffect(() => {
    hub.start().then(() => {
      hub.ReceiveMessage((login, text) => {
        const message: ShortMessageData = {
          id: getRandomInt(0, 10 ** 9).toString(),
          username: login,
          text,
        };
        setMessages(prev => {
          return [
            ...prev,
            message,
          ]
        });
      });
    }).catch(err => console.error(err.message));
  }, [hub]);

  return (
    <>
      <div>
        <div>
          <span>Login: </span>
          <input
            type="text"
            value={login}
            onChange={changeLoginHandler} />
        </div>
        <div>
          <span>Message: </span>
          <input
            type="text"
            value={message}
            onChange={changeMessageHandler}
          />
        </div>
        <div>
          <button
            onClick={clickSendMessageHandler}
          >Send</button>
        </div>
      </div>

      <div className='messageContainer'>
        {
          messages.map((message) => {
            return (
              <Message key={message.id} shortMessage={message} />
            );
          })
        }
      </div>
    </>
  );
}


export default TestPage;