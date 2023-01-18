import { SxProps } from "@mui/material"

export const box: React.CSSProperties | SxProps = {
  width: '500px',
  height: '70px',
  position: 'absolute',
  bottom: '25px',
  left: '50%',
  borderRadius: '10px',
  backgroundColor: '#353535',
  transform: 'translate(-50%, 0)',
  zIndex: '100'
}

export const toolItemsBox: React.CSSProperties | SxProps = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  height: '100%',
}