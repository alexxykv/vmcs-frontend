import { Divider, Drawer, IconButton, Link, List, ListItem, Toolbar, Typography } from '@mui/material';
import React from 'react';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const drawerWidth = 240;

const menuItems = [
  'Profile',
  'Dashboard',
  'Public channels',
  //
  'Logout'
]

const appBarItems = [

]

const DrawerMenu: React.FC = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0
      }}
      PaperProps={{
        sx: {
          width: drawerWidth
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar disableGutters sx={{ minHeight: '64px', justifyContent: 'center' }}>
        <Link href='#'>
          <Diversity1Icon fontSize='large' />
        </Link>
        <Divider orientation='vertical' flexItem={true} sx={{ m: 2 }} />
        <Typography variant='h5' fontWeight={700} color='primary'>
          VMCS
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>AAAAAAAA</ListItem>
        <ListItem>BBBBBBBB</ListItem>
        <ListItem>CCCCCCCC</ListItem>
      </List>
    </Drawer>
  );
}


export default DrawerMenu;