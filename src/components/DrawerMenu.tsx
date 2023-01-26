import React from 'react';
import { Avatar, Divider, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
// import Diversity1Icon from '@mui/icons-material/Diversity1';
import Diversity2Icon from '@mui/icons-material/Diversity2';
// import Diversity3Icon from '@mui/icons-material/Diversity3';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';
import CampaignIcon from '@mui/icons-material/Campaign';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useUser } from '../hooks/useUser';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';


interface DrawerMenuProps {
  open: boolean
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open }) => {
  const auth = useAuth();
  const user = useUser();
  const navigate = useNavigate();

  const menuItems = [
    {
      text: 'Account',
      icon: <AccountCircleIcon />,
      action: () => navigate('/profile')
    },
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      action: () => navigate('/dashboard')
    },
    {
      text: 'Public channels',
      icon: <PublicIcon />,
      action: () => { }
    },
    {
      text: 'Invitations',
      icon: <CampaignIcon />,
      action: () => navigate('/invitations')
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      action: () => { }
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      action: () => auth.logout(() => navigate('/login', { replace: true }))
    }
  ];

  return (
    <Drawer open={open}
      sx={{
        width: 240,
        flexShrink: 0
      }}
      PaperProps={{
        sx: {
          width: 240
        }
      }}
      variant="persistent"
      anchor="left"
    >
      <Toolbar disableGutters sx={{ minHeight: '64px', justifyContent: 'center' }}>
        <Link href='/' underline='none' variant='overline' sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 1,
          userSelect: 'none'
        }}>
          <Diversity2Icon fontSize='large' />
          <Typography variant='h5' fontWeight={700} color='primary'>
            VMCS
          </Typography>
        </Link>
      </Toolbar>
      <Divider />
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        padding={2}
        sx={{ cursor: 'default' }}
      >
        <Avatar src={user.avatarUri} sx={{ width: 72, height: 72, mb: 1 }} />
        <Typography variant='h5' component='div' fontWeight={500}>
          {user.username}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {user.email}
        </Typography>
      </Stack>
      <List disablePadding sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        '& > li:nth-last-of-type(2)': {
          mb: 'auto',
        }
      }}>
        {
          menuItems.map(item => {
            return (
              <>
                {item.text === 'Logout' ? <Divider /> : <></>}
                <MenuItem key={item.text} {...item} />
              </>
            );
          })
        }
      </List>
    </Drawer>
  );
}

interface MenuItemProps {
  text: string
  icon: JSX.Element
  action: VoidFunction
}

const MenuItem: React.FC<MenuItemProps> = ({ text, icon, action }) => {
  const iconWithColor = React.cloneElement(icon, { color: 'primary' });

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={action}>
        <ListItemIcon>
          {iconWithColor}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}


export default DrawerMenu;