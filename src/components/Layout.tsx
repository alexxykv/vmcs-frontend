import React from 'react';
import Header from './Header';
import { Container } from '@mui/material';
import { WithChildrenProps } from '../interfaces/props';


const Layout: React.FC<WithChildrenProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container disableGutters component='main' maxWidth={false} sx={{
        display: 'flex',
        minHeight: 'calc(100vh - 56px)',
        '@media(min-width: 600px)': {
          minHeight: 'calc(100vh - 64px)'
        }
      }}>
        {children}
      </Container>
    </>
  )
}


export default Layout;