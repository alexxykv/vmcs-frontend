import { MessageProps } from '../interfaces/props';
import cs from '../styles/Message.module.css';


const Message: React.FC<MessageProps> = ({ shortMessage }) => {
  return (
    <div className={cs.message}>
      <div className={cs.messageSender}>{shortMessage.username}</div>
      <div className={cs.messageText}>{shortMessage.text}</div>
    </div>
  );
}


export default Message;