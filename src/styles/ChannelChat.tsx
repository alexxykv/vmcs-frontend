import { SxProps } from "@mui/material"

export const chat: React.CSSProperties | SxProps = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '10px',
  backgroundColor: 'lightgray',
  gap: '10px',
  minWidth: '400px',
  maxHeight: 'calc(100vh - 56px)',
  '@media(min-width: 600px)': {
    height: 'calc(100vh - 64px)'
  }
}

export const chatHeader: React.CSSProperties | SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '40px'
}

export const chatHeaderTitle: React.CSSProperties | SxProps = {
  fontSize: '20px',
  fontWeight: 400,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  cursor: 'default',
}

export const chatHeaderOptions: React.CSSProperties | SxProps = {
  display: 'flex',
}

export const chatHeaderOption: React.CSSProperties | SxProps = {
  fontSize: '20px'
}

export const chatMessagesBox: React.CSSProperties | SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  flexGrow: 1,
  padding: '0 5px',
  overflowY: 'scroll',
  // msOverflowStyle: 'none', /* Internet Explorer 10+ */
  // scrollbarWidth: 'none', /* Firefox */
  // '&::-webkit-scrollbar': {
  //   display: 'none', /* Safari and Chrome */
  //   width: '5px',
  // },
  // '&:hover': {
  //   '&::-webkit-scrollbar': {
  //     display: '-webkit-flex'
  //   }
  // },
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'primary.main',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '5px',
  }
}

export const chatInputBox: React.CSSProperties | SxProps = {
  display: 'flex',
  padding: '10px',
}

export const chatInputTextField: React.CSSProperties | SxProps = {
  backgroundColor: 'whitesmoke',
  borderRadius: '5px'
}