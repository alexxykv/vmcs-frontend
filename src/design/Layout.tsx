import { Container } from '@mui/material';
import React from 'react';
import DrawerMenu from './DrawerMenu';
import Header from './Header';


const Layout: React.FC = () => {
  return (
    <Container component='main' disableGutters maxWidth={false} sx={{
      display: 'flex',
      minHeight: '100vh'
    }}>
      <DrawerMenu />
      <Header />
      <Container id='main-content' sx={{ pt: 10 }}>

      </Container>
    </Container>
  );
}


export default Layout;