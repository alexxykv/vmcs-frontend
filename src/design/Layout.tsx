import React, { useState } from 'react';
import { Container } from '@mui/material';
import DrawerMenu from './DrawerMenu';
import Header from './Header';
import { WithChildrenProps } from '../interfaces/props';
import Main from './Main';


const Layout: React.FC<WithChildrenProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true);

  const toggleOpen = () => {
    setOpen(prev => !prev);
  };

  return (
    <Container disableGutters maxWidth={false} sx={{
      display: 'flex',
      minHeight: '100vh'
    }}>
      <DrawerMenu open={open} />
      <Header open={open} toggleOpen={toggleOpen} />
      <Main open={open}>
        {children}
      </Main>
    </Container>
  );
}


export default Layout;