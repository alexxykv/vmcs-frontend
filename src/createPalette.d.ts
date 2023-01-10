import "@mui/material/styles/createPalette";

declare module '@mui/material/styles' {
  interface PaletteColor {
    mainHover?: string;
    lightHover?: string;
  }

  interface SimplePaletteColorOptions {
    mainHover?: string;
    lightHover?: string;
  }
}
