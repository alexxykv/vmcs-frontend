import { SxProps } from "@mui/material";

export const item: React.CSSProperties | SxProps = {
  fontSize: '15px',
  fontWeight: 300,
  '&:hover': {
    color: 'primary.mainHover',
    cursor: 'pointer',
    userSelect: 'none'
  }
}

export const divider: React.CSSProperties | SxProps = {
  margin: '5px 0'
}

export const itemsBox: React.CSSProperties | SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
}