import { SxProps } from "@mui/material"

export const mainBox: React.CSSProperties | SxProps = {
  display: 'flex',
  flexGrow: 1,
  height: '250px',
  minWidth: '150px',
  maxWidth: '200px'
}

export const link: React.CSSProperties = {
  width: '100%',
  height: '100%'
}

export const paper: React.CSSProperties | SxProps = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  borderRadius: '5px',
  backgroundColor: 'primary.main',
  '&:hover': {
    backgroundColor: 'primary.light',
    cursor: 'pointer',
    userSelect: 'none'
  }
}

export const contentBox: React.CSSProperties | SxProps = {
  width: '100px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '10px',
  alignItems: 'center',
  color: 'white'
}

export const name: React.CSSProperties | SxProps = {
  textAlign: 'center'
}

export const image: React.CSSProperties | SxProps = {
  width: '50px',
  height: '50px'
}