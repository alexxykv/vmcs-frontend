import { SxProps } from "@mui/material"

export const asideMenu: React.CSSProperties | SxProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  minWidth: '200px',
  padding: '10px',
  gap: '10px'
}

export const asideHeader: React.CSSProperties | SxProps = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '0 10px'
}

export const asideHeaderAvatar: React.CSSProperties | SxProps = {
  width: '40px',
  height: '40px'
}

export const asideHeaderTitle: React.CSSProperties | SxProps = {
  fontSize: '20px',
  fontWeight: 600,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  cursor: 'default',
}

export const asideContent: React.CSSProperties | SxProps = {
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  gap: '10px',
  maxHeight: 'calc(100% - 40px)'
}

export const asideBox: React.CSSProperties | SxProps = {
  display: 'flex',
  height: '50%',
  padding: '10px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '5px',
  flexDirection: 'column',
  gap: '5px',
}

export const asideBoxHeader: React.CSSProperties | SxProps = {
  display: 'flex',
  justifyContent: 'space-between'
}

export const asideBoxHeaderTitle: React.CSSProperties | SxProps = {
  fontSize: '18px',
  fontWeight: 400,
  cursor: 'default',
}

export const asideBoxHeaderIcon: React.CSSProperties | SxProps = {
  display: 'flex',
  alignSelf: 'center',
  fontSize: '18px',
  '&:hover': {
    cursor: 'pointer'
  }
}

export const asideBoxDivider: React.CSSProperties | SxProps = {
  margin: '0 5px'
}

export const asideBoxItems: React.CSSProperties | SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  paddingRight: '5px',
  overflowY: 'scroll',
  // msOverflowStyle: 'none', /* Internet Explorer 10+ */
  // scrollbarWidth: 'none', /* Firefox */
  // '&::-webkit-scrollbar': {
  //   display: 'none', /* Safari and Chrome */
  //   width: '5px',
  // },
  // '&:hover': {
  //   '&::-webkit-scrollbar': {
  //     display: '-webkit-flex'
  //   }
  // },
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'primary.main',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '5px',
  }
}

export const asideBoxItem: React.CSSProperties | SxProps = {
  padding: '5px 0',
  '&:hover': {
    backgroundColor: '#bbdefb',
    cursor: 'pointer'
  }
}

export const asideBoxItemTitle: React.CSSProperties | SxProps = {
  fontSize: '18px',
  fontWeight: 500,
}