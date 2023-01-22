import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';


const Header: React.FC<{}> = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: 'calc(100% - 240px)',
        ml: '240px'
      }}>
      <Toolbar disableGutters sx={{
        minHeight: '64px'
      }}>
        <Typography>
          Header
        </Typography>
      </Toolbar>
    </AppBar>
  );
}


export default Header;