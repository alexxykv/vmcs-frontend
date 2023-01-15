import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

import * as styles from '../styles';

const settings = ['Профиль', 'Настройки', 'Приглашения', 'Выйти'];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    navigate('/');
  }

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={styles.header.logoBox} onClick={handleClick}>
              <AdbIcon sx={{ display: 'flex', mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: 'flex',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                VMCS
              </Typography>
            </Box>

            {/* Pages Box */}
            <Box sx={{ flexGrow: 1, display: 'flex' }} />

            <Box sx={{ flexGrow: 0 }}>
              {
                auth.status === 'Authorized' ? <ProfileMenu /> : <Login />
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}

const ProfileMenu: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handle = (callback: VoidFunction) => {
    return async (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      event.preventDefault();
      setAnchorElUser(null);
      callback();
    }
  }

  const menuItems = [
    {
      title: 'Профиль',
      handler: handle(() => navigate('/profile'))
    },
    {
      title: 'Настройки',
      handler: () => { },
    },
    {
      title: 'Приглашения',
      handler: handle(() => navigate('/invitations')),
    },
    {
      title: 'Выйти',
      handler: handle(() => auth.logout(() => navigate('/login', { replace: true })))
    }
  ]

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {
          menuItems.map(({ title, handler }) => {
            return (
              <MenuItem key={title} onClick={handler}>
                <Typography textAlign="center">{title}</Typography>
              </MenuItem>
            );
          })
        }
      </Menu>
    </>
  );
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    navigate('/login');
  }

  return (
    <Toolbar>
      <Button
        onClick={handleClick}
        color="inherit"
        sx={{ '&:hover': { background: 'none' } }}
      >
        Login
      </Button>
    </Toolbar>
  );
}

export default Header;