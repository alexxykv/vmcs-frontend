import { SxProps } from "@mui/material"

export const box: React.CSSProperties | SxProps = {
  zIndex: 1234,
  // width: '500px',
  // height: '70px',
  position: 'absolute',
  bottom: '25px',
  left: '50%',
  borderRadius: 2,
  backgroundColor: 'primary.dark',
  transform: 'translate(-50%, 0)',
}

export const toolItemsBox: React.CSSProperties | SxProps = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  height: '100%',
  gap: 2,
  py: 1,
  px: 2
}