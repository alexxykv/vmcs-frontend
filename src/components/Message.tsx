import { Box, Typography } from '@mui/material';
import { MessageProps } from '../interfaces/props';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import {
  messageStyle, avatarContainerStyle, contentMessageStyle,
  headerMessageStyle, mainMessageStyle, usernameStyle, timeStyle, textStyle
} from '../styles/Message';


const Message: React.FC<MessageProps> = ({ shortMessage }) => {
  return (
    <Box style={messageStyle}>
      <Box style={avatarContainerStyle}>
        <AccountCircleOutlinedIcon htmlColor='white' fontSize='large' />
      </Box>
      <Box style={contentMessageStyle}>
        <Box style={headerMessageStyle}>
          <Typography style={usernameStyle}>{shortMessage.username}</Typography>
          <Typography style={timeStyle}>15:38</Typography>
        </Box>
        <Box style={mainMessageStyle}>
          <Typography style={textStyle}>{shortMessage.text}</Typography>
        </Box>
      </Box>
    </Box >
  );
}


export default Message;