import { SxProps } from "@mui/material"

export const box: React.CSSProperties | SxProps = {
  position: 'relative',
  width: '400px',
  height: '300px',
  borderRadius: '5px',
  padding: '5px',
  backgroundColor: '#5685c7',
}

export const usernameBox: React.CSSProperties | SxProps = {
  width: '120px',
  height: '20px',
  position: 'absolute',
  borderRadius: '5px',
  left: '7px',
  bottom: '5px',
  color: 'white',
  fontSize: '10px',
  textAlign: 'center',
  backgroundColor: 'rgb(0, 0, 0, 0.8)',
}

export const videoBox: React.CSSProperties | SxProps = {
  width: '100%',
  height: '100%',
}