import { HubConnectionState } from '@microsoft/signalr';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHub } from '../hooks/useHub';
import cs from './Chat.module.css';


const Chat: React.FC = () => {
  const [chatHub] = useHub('http://localhost:5000/meetingHub');
  const [message, setMessage] = useState('');
  const [login, setLogin] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const onChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }

  const onChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  }

  const onSendMessage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (chatHub?.state === HubConnectionState.Connected) {
      chatHub?.invoke('SendMessageToMeeting', message, login, '-1');
    }
  }

  useEffect(() => {
    console.log(chatHub);

    if (chatHub) {
      chatHub.start()
        .then(result => {
          console.log('connected');

          chatHub?.on('ReceiveMessage', (login, text) => {
            const message: MessageProps = {
              login,
              text,
            };

            setMessages(prev => {
              return [
                ...prev,
                message,
              ]
            });
          })
        });
    }
  }, [chatHub]);

  return (
    <>
      <div className={cs.chat}>
        <div className={cs.chatLogin}>
          <span>Login: </span>
          <input
            type="text"
            value={login}
            onChange={onChangeLogin} />
        </div>
        <div className={cs.chatInput}>
          <span>Message: </span>
          <input
            type="text"
            value={message}
            onChange={onChangeMessage}
          />
        </div>
        <div className={cs.chatSubmit}>
          <button
            onClick={onSendMessage}
          >Send</button>
        </div>
      </div>

      <div className={cs.messagesContainer}>
        {
          messages.map(({ login, text }) => <Message login={login} text={text} />)
        }
      </div>
    </>
  );
}


interface MessageProps {
  login: string
  text: string
}


const Message: React.FC<MessageProps> = ({ login, text }) => {
  return (
    <div className={cs.message}>
      <span className={cs.messageLogin}>{login}</span>
      <span className={cs.messageText}>{text}</span>
    </div>
  );
}


export default Chat;