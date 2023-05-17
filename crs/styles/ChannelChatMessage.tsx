import { SxProps } from "@mui/material";

export const box: React.CSSProperties | SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  padding: '10px',
  minWidth: '30%',
  width: 'fit-content',
  maxWidth: '60%',
  backgroundColor: 'whitesmoke',
  borderRadius: '5px',
  ':first-of-type': { marginTop: 'auto' }
}

export const header: React.CSSProperties | SxProps = {
  display: 'flex',
  padding: '5px',
  gap: '5px',
  alignItems: 'center'
}

export const headerAvatar: React.CSSProperties | SxProps = {
  width: '30px',
  height: '30px'
}

export const headerUsername: React.CSSProperties | SxProps = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  cursor: 'default'
}

export const headerTime: React.CSSProperties | SxProps = {
  display: 'flex',
  alignSelf: 'flex-start',
  fontSize: '10px',
  marginLeft: 'auto',
  cursor: 'default',
  userSelect: 'none'
}

export const divider: React.CSSProperties | SxProps = {
  margin: '0 5px'
}

export const content: React.CSSProperties | SxProps = {
  padding: '5px',
}

export const contentText: React.CSSProperties | SxProps = {
  fontSize: '14px',
  fontWeight: 300,
  wordWrap: 'break-word',
}