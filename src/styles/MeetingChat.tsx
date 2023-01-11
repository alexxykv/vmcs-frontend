import { SxProps } from "@mui/material"

export const box: React.CSSProperties | SxProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '20vw',
  backgroundColor: '#403f3f'
}

export const messagesBox: React.CSSProperties | SxProps = {
  flexGrow: 1,
  borderBottom: 'solid 1px gray',
  overflow: 'auto',
}

export const sendMessageBox: React.CSSProperties | SxProps = {
  display: 'flex',
  flexDirection: 'row',
  padding: '10px',
}