import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { WithChildrenProps } from '../interfaces/props';
import { logoStyle } from '../styles/Layout';
import Header from './Header';


const Layout: React.FC<WithChildrenProps> = ({ children }) => {
  return (
    <Container disableGutters maxWidth={false} style={{ height: '100%' }}>
      <Header />
      <Container disableGutters maxWidth={false}>
        {children}
      </Container>
    </Container>
  )
}


export default Layout;