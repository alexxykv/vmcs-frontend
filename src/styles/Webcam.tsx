import { SxProps } from "@mui/material"

export const box: React.CSSProperties | SxProps = {
  position: 'relative',
  display: 'flex',
  flexShrink: 1,
  width: '100%',
  minHeight: 75,
  minWidth: 100,
  maxHeight: 300,
  maxWidth: 400,
  aspectRatio: '4 / 3',
  p: '2px',
  backgroundColor: 'primary.dark',
  borderRadius: 1,
}

export const usernameBox: React.CSSProperties | SxProps = {
  width: 'fit-content',
  maxWidth: '100%',
  position: 'absolute',
  borderRadius: 1,
  left: 8,
  bottom: 8,
  color: 'text.primary',
  fontSize: 16,
  px: 2,
  py: 1,
  textAlign: 'center',
  backgroundColor: 'action.disabled',
  userSelect: 'none',
  cursor: 'default'
}

export const videoBox: React.CSSProperties | SxProps = {
  display: 'flex',
  flexShrink: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%'
}