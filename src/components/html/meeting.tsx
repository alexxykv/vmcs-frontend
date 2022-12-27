import React from 'react';
import { Box, IconButton, Input, TextField, Typography } from '@mui/material';
import Layout from '../Layout';
import Webcam from '../Webcam';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ShortMessageData } from '../../interfaces/dto/messages';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CodeIcon from '@mui/icons-material/Code';
import CallEndIcon from '@mui/icons-material/CallEnd';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

const messages: ShortMessageData[] = [
  {
    id: '1',
    text: "Всем привет!",
    username: "Иван Мишурин"
  },
  {
    id: '2',
    text: "Ну привет...",
    username: "Максим Цветков"
  },
  {
    id: '3',
    text: "Здарова, парни!",
    username: "Александр Коновалов"
  }
]

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
          <Box
            width='500px'
            height='70px'
            position='absolute'
            bottom='25px'
            left='50%'
            borderRadius='10px'
            style={{
              backgroundColor: '#353535',
              transform: 'translate(-50%, 0)'
            }}
          >
            <Box
              display='flex'
              justifyContent='space-evenly'
              alignItems='center'
              height='100%'
            >
              <Box
                flexGrow={1}
                textAlign='center'
              >
                <CodeIcon htmlColor='#5685c7' fontSize='large'></CodeIcon>
              </Box>
              <Box
                flexGrow={1}
                textAlign='center'
              >
                <ScreenShareIcon htmlColor='#5685c7' fontSize='large'></ScreenShareIcon>
              </Box>
              <Box
                flexGrow={1}
                textAlign='center'
              >
                <MicIcon htmlColor='#5685c7' fontSize='large'></MicIcon>
              </Box>
              <Box
                flexGrow={1}
                textAlign='center'
              >
                <VideocamIcon htmlColor='#5685c7' fontSize='large'></VideocamIcon>
              </Box>
              <Box
                flexGrow={1}
                textAlign='center'
              >
                <ChatOutlinedIcon htmlColor='#5685c7' fontSize='large'></ChatOutlinedIcon>
              </Box>
              <Box
                flexGrow={1}
                textAlign='center'
                style={{ borderLeft: 'solid 1px gray' }}
              >
                <CallEndIcon htmlColor='red' fontSize='large'></CallEndIcon>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
          width='20vw'
        >
          <Box
            flexGrow={1}
            borderBottom='solid 1px gray'
            overflow='auto'
          >
            {/* <KeyboardDoubleArrowRightIcon htmlColor='#5685c7' fontSize='large'></KeyboardDoubleArrowRightIcon> */}
            {
              messages.map((m) => {
                return <Message messageData={m} />
              })
            }
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

interface MessageProps {
  messageData: ShortMessageData
}

const Message: React.FC<MessageProps> = ({ messageData }) => {
  return (
    <Box
      key={messageData.id}
      display='flex'
      color='rgb(220, 220, 220)'
      padding='5px'
    >
      <Box
        padding='0 10px'
      >
        <AccountCircleOutlinedIcon htmlColor='white' fontSize='large' />
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        flexGrow={1}
      >
        <Box
          position='relative'
        >
          <Typography color='#5685c7' fontWeight='bold'>{messageData.username}</Typography>
          <Typography style={{ color: 'rgb(220, 220, 220)', position: 'absolute', top: 0, right: 5 }}>15:38</Typography>
        </Box>
        <Box
          width='300px'
        >
          <Typography style={{ wordWrap: 'break-word' }}>{messageData.text}</Typography>
        </Box>

      </Box>
    </Box >
  )
}

export default Meeting;