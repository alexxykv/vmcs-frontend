import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { MessageProps } from "../interfaces/Props";

import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";


const Message: React.FC<MessageProps> = ({ message }) => {
  const user = useUser();
  const time = new Date(message.modifiedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const [avatarSrc, setAvatarSrc] = useState<string>('');

  useEffect(() => {
    if (user.id === message.user.id) {
      setAvatarSrc(user.avatarUri);
    } else {
      const avatarUri = message.user.avatarUri ?
        new URL(message.user.avatarUri, process.env.REACT_APP_HOST_URL).href
        : '';
      setAvatarSrc(avatarUri);
    }
  }, [user.id, user.avatarUri, message.user.id, message.user.avatarUri]);

  return (
    <ListItem alignItems='flex-start'>
      <Typography sx={{
        position: 'absolute',
        fontSize: '0.75rem',
        mt: 1,
        mr: 2,
        top: 0,
        right: 0,
        userSelect: 'none',
        cursor: 'default',
        color: 'text.secondary'
      }}>
        {time}
      </Typography>
      <ListItemAvatar>
        <Avatar src={avatarSrc}>
          {message.user.username[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography sx={{ color: 'primary.main', cursor: 'default', pr: 6 }}>
            {message.user.username}
          </Typography>
        }
        secondary={
          <Typography
            component='span'
            variant='body2'
            sx={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
          >
            {message.text}
          </Typography>
        }
      />
    </ListItem>
  );
}


export default Message;