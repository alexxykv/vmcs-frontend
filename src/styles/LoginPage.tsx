import { SxProps } from "@mui/material"

export const paper: React.CSSProperties | SxProps = {
  height: 650,
  width: 390,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export const paperContent: React.CSSProperties | SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

export const grid: React.CSSProperties | SxProps = {
  margin: '70px 0 50px',
  textAlign: 'center'
}

export const title: React.CSSProperties | SxProps = {
  fontSize: 35,
  fontWeight: 'bold',
  textShadow: '3px 3px gray',
  paddingBottom: '10px'
}

export const logo: React.CSSProperties | SxProps = {
  fontSize: 45,
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#252525',
  borderRadius: '10px'
}

export const buttonContainer: React.CSSProperties | SxProps = {
  display: 'flex',
  bottom: '0',
  marginBottom: '15px',
  position: 'absolute',
  gap: '5px',
}

export const toggleButton: React.CSSProperties | SxProps = {
  backgroundColor: 'transparent'
}

export const toggleTip: React.CSSProperties | SxProps = {
  backgroundColor: 'transparent',
  color: 'black'
}