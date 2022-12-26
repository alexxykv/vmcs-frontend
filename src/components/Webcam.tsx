import { Box } from '@mui/material';
import React from 'react';

const Webcam: React.FC = () => {
  return (
    <Box
      position='relative'
      width='400px'
      height='300px'
      borderRadius='5px'
      style={{ backgroundColor: 'green' }}
    >
      <Box
        width='120px'
        height='20px'
        position='absolute'
        borderRadius='5px'
        left='3px'
        bottom='3px'
        style={{ backgroundColor: 'rgb(0, 0, 0, 0.8)' }}
      ></Box>
      <Box
        width='100%'
        height='100%'
        margin='10px'
      >
      </Box>
    </Box>
  )
}

export default Webcam;