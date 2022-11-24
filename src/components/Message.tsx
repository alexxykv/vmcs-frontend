import { MessageProps } from '../interfaces/props';
import cs from '../styles/Message.module.css';


const Message: React.FC<MessageProps> = ({ login, text }) => {
  return (
    <div className={cs.message}>
      <div className={cs.messageSender}>{login}</div>
      <div className={cs.messageText}>{text}</div>
    </div>
  );
}


export default Message;