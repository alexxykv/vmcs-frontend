import React from 'react';
import { Badge, Box, IconButton, Toolbar, useTheme } from '@mui/material';
import AppBar from './AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MaterialUISwitch from './MaterialUISwitch ';
import { ColorModeContext } from '../App';


interface HeaderProps {
  open: boolean
  toggleOpen: VoidFunction
}

const Header: React.FC<HeaderProps> = ({ open, toggleOpen }) => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBar open={open} position="fixed">
      <Toolbar disableGutters sx={{
        minHeight: '64px'
      }}>
        <IconButton
          size='small'
          color='inherit'
          onClick={toggleOpen}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ mr: 2 }}>
          <MaterialUISwitch
            checked={theme.palette.mode === 'dark'}
            onClick={colorMode.toggleColorMode}
          />
          <IconButton
            size="large"
            color="inherit"
          >
            <Badge badgeContent={0} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}


export default Header;