import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import * as styles from '../styles';


const Loading: React.FC = () => {
  return (
    <Box sx={styles.loading.box}>
      <CircularProgress />
    </Box>
  );
}


export default Loading;