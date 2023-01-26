import React from 'react';
import { Paper, CircularProgress } from '@mui/material';
// import * as styles from '../styles';


const Loading: React.FC = () => {
  return (
    <Paper square sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      width: '100%',
      height: '100%',
    }}>
      <CircularProgress />
    </Paper>
  );
}


export default Loading;