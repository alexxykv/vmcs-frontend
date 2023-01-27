import React from 'react';
import { Paper, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const NotFoundPage: React.FC = () => {
  return (
    <Paper square sx={{
      display: 'flex',
      flexGrow: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1
    }}>
      <ErrorIcon
        color='primary'
        sx={{
          fontSize: '2rem'
        }} />
      <Typography
        sx={{
          fontSize: '1.25rem',
          cursor: 'default'
        }}>
        Nothing was found
      </Typography>
    </Paper>
  );
}


export default NotFoundPage;