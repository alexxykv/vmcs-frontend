import React from 'react';
import Header from './Header';
import { Container } from '@mui/material';
import { WithChildrenProps } from '../interfaces/props';


const Layout: React.FC<WithChildrenProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container disableGutters component='main' maxWidth={false}>
        {children}
      </Container>
    </>
  )
}


export default Layout;