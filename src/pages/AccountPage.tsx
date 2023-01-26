import React, { useState } from 'react';
import { Avatar, Box, Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { useUser } from '../hooks/useUser';


const AccountPage: React.FC = () => {
  const user = useUser();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      console.log(file)
      user.uploadImage(file);
      // setSelectedImage(file);
    }
  }

  return (
    <Paper square sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1,
      width: '100%',
      height: '100%',
      gap: 2,
      p: 2,
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'transparent',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: '4px',
      },
      '&:hover': {
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'primary.light',
        }
      },
    }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'start',
      }}>
        <Typography color='text.secondary' sx={{
          fontSize: '1.25rem',
          cursor: 'default'
        }}>
          My account
        </Typography>
      </Box>
      <Paper elevation={4} sx={{
        width: '100%',
        p: 2
      }}>
        <Box sx={{
          display: 'flex',
          aligntItems: 'center',
          p: 2,
          pt: 0,
          gap: 2
        }}>
          <Avatar src={user.avatarUri} sx={{
            width: '80px',
            height: '80px',
          }} />
          <Typography variant='h4' sx={{
            display: 'flex',
            cursor: 'default',
            fontSize: '2rem',
            alignSelf: 'center'
          }}>
            {user.username}
          </Typography>
          <Box flexGrow={1} />
          <Button
            component="label"
            variant='contained'
            color='primary'
            startIcon={<ImageIcon />}
            sx={{
              height: 'min-content',
              alignSelf: 'center'
            }}>
            Change profile image
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleChange}
            />
          </Button>
        </Box>
        <Paper variant='outlined' sx={{
          backgroundColor: 'action.hover'
        }}>
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <Typography color='text.secondary' sx={{
                    fontSize: '0.85rem',
                    cursor: 'default'
                  }}>
                    LOGIN
                  </Typography>
                }
                secondary={
                  <Typography color='text.primary' sx={{
                    cursor: 'default'
                  }}>
                    {user.login}
                  </Typography>
                }
              />
              <Button disabled startIcon={<EditIcon />} variant='contained' color='primary'>
                Edit
              </Button>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography color='text.secondary' sx={{
                    fontSize: '0.85rem',
                    cursor: 'default'
                  }}>
                    USERNAME
                  </Typography>
                }
                secondary={
                  <Typography color='text.primary' sx={{
                    cursor: 'default'
                  }}>
                    {user.username}
                  </Typography>
                }
              />
              <Button startIcon={<EditIcon />} variant='contained' color='primary'>
                Edit
              </Button>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography color='text.secondary' sx={{
                    fontSize: '0.85rem',
                    cursor: 'default'
                  }}>
                    EMAIL
                  </Typography>
                }
                secondary={
                  <Typography color='text.primary' sx={{
                    cursor: 'default'
                  }}>
                    {user.email}
                  </Typography>
                }
              />
              <Button startIcon={<EditIcon />} variant='contained' color='primary'>
                Edit
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Paper>
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'start',
      }}>
        <Typography color='text.secondary' sx={{
          fontSize: '1.25rem',
          cursor: 'default'
        }}>
          Password
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'start',
      }}>
        <Button variant='contained' color='primary'>
          Change password
        </Button>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'start',
      }}>
        <Typography color='text.secondary' sx={{
          fontSize: '1.25rem',
          cursor: 'default'
        }}>
          Delete account
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'start',
      }}>
        <Button variant='contained' color='error'>
          Delete account
        </Button>
      </Box>
    </Paper>
  );
}


export default AccountPage;