import { SxProps } from "@mui/material";

export const logoBox: React.CSSProperties | SxProps = {
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
    userSelect: 'none'
  }
}