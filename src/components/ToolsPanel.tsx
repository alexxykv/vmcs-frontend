import React from 'react';
import { Box, IconButton } from '@mui/material';
import ToolItem from './ToolItem';
import { ToolsPanelProps } from '../interfaces/props';

import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CodeIcon from '@mui/icons-material/Code';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import { toolsPanelStyle, toolsContainerStyle } from '../styles/ToolsPanel';


const ToolsPanel: React.FC<ToolsPanelProps> = () => {
  return (
    <Box style={toolsPanelStyle}>
      <Box style={toolsContainerStyle}>
        <ToolItem>
          <IconButton>
            <CodeIcon fontSize='large' htmlColor='#5685c7'/>
          </IconButton>
        </ToolItem>
        <ToolItem>
          <IconButton>
            <ScreenShareIcon fontSize='large' htmlColor='#5685c7'/>
          </IconButton>
        </ToolItem>
        <ToolItem>
          <IconButton>
            <MicIcon fontSize='large' htmlColor='#5685c7'/>
          </IconButton>
        </ToolItem>
        <ToolItem>
          <IconButton>
            <VideocamIcon fontSize='large' htmlColor='#5685c7'/>
          </IconButton>
        </ToolItem>
        <ToolItem>
          <IconButton>
            <ChatOutlinedIcon fontSize='large' htmlColor='#5685c7'/>
          </IconButton>
        </ToolItem>
        <ToolItem style={{ borderLeft: 'solid 1px gray' }}>
          <IconButton>
            <CallEndIcon htmlColor='red' fontSize='large'></CallEndIcon>
          </IconButton>
        </ToolItem>
      </Box>
    </Box>
  );
}


export default ToolsPanel;