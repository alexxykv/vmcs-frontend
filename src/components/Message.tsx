import { Box, Typography } from '@mui/material';
import { MessageProps } from '../interfaces/props';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import * as styles from '../styles';


const Message: React.FC<MessageProps> = ({ shortMessage }) => {
  return (
    <Box sx={styles.message.box}>
      <Box sx={styles.message.avatarBox}>
        <AccountCircleOutlinedIcon htmlColor='white' fontSize='large' />
      </Box>
      <Box sx={styles.message.contentBox}>
        <Box sx={styles.message.headerBox}>
          <Typography sx={styles.message.username}>{shortMessage.username}</Typography>
          <Typography sx={styles.message.time}>15:38</Typography>
        </Box>
        <Box sx={styles.message.mainBox}>
          <Typography sx={styles.message.text}>{shortMessage.text}</Typography>
        </Box>
      </Box>
    </Box>
  );
}


export default Message;