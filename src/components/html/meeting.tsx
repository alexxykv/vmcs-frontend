import React from 'react';
import { Box, IconButton, Input } from '@mui/material';
import Layout from '../Layout';
import Webcam from '../Webcam';
import SendIcon from '@mui/icons-material/Send';


const Meeting: React.FC = () => {
  return (
    <Layout>
      <Box
        height='100%'
        width='100%'
        display='flex'
      >
        <Box
          flexGrow={1}
          style={{ backgroundColor: '#161616' }}
        >
          <Box
            display='flex'
            margin='15px'
          >
            <Webcam />
          </Box>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
          width='20vw'
          height='100%'
        >
          <Box
            flexGrow={1}
            borderBottom='solid 1px gray'
          >

          </Box>

          <Box
            display='flex'
            flexDirection='row'
            padding='10px'
          >
            <Input disableUnderline placeholder='Send message?' fullWidth style={{ color: 'white' }} />
            <IconButton>
              <SendIcon htmlColor='white' />
            </IconButton>
          </Box>
        </Box>
      </Box>

    </Layout>
  )
}

export default Meeting;