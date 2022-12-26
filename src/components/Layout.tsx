import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { WithChildrenProps } from '../interfaces/props';
import { logoStyle } from '../styles/LoyoutPage';


const Layout: React.FC<WithChildrenProps> = ({ children }) => {
  return (
    <Box
      width='100vw'
      height='100vh'
      style={{ backgroundColor: '#403f3f' }}
    >
      <Box
        display='flex'
        width='100vw'
        height='50px'
        color='white'
        justifyContent='space-between'
        alignItems='center'
        style={{ backgroundColor: '#343434' }}
      >
        <Grid style={{ margin: "0px 20px" }}>
          <Typography style={logoStyle}>VMCS</Typography>
        </Grid>
        <Grid style={{ margin: "0px 20px" }}>
          <Typography style={{ fontSize: 15 }}>Видеоконференция</Typography>
        </Grid>
        <Grid style={{ margin: "0px 20px" }}>
          <Typography style={{ fontSize: 15 }}>Настройки</Typography>
        </Grid>
      </Box>

      <Box
        width='100vw'
        height='calc(100vh - 50px)'
      >
        {children}
      </Box>

    </Box>
  )
}

export default Layout;