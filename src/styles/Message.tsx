import { SxProps } from "@mui/material"

export const box: React.CSSProperties | SxProps = {
  display: 'flex',
  color: 'rgb(220, 220, 220)',
  padding: '5px',
}

export const avatarBox: React.CSSProperties | SxProps = {
  padding: '10px',
}

export const contentBox: React.CSSProperties | SxProps = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}

export const headerBox: React.CSSProperties | SxProps = {
  position: 'relative',
}

export const mainBox: React.CSSProperties | SxProps = {
  width: '300px', // fix it
}

export const username: React.CSSProperties | SxProps = {
  color: '#5685c7',
  fontWeight: 'bold',
}

export const time: React.CSSProperties | SxProps = {
  color: 'rgb(220, 220, 220)',
  position: 'absolute',
  top: 0,
  right: 5,
}

export const text: React.CSSProperties | SxProps = {
  wordWrap: 'break-word'
}