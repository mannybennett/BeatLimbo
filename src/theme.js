import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette:{
    primary:{
      main: "#0a0a0a",
      light: "#424242"
    },
    secondary:{
      main: '#d91226',
      light: "#cc3333"
    },
    warning:{
      main: '#8352ff'
    },
    info:{
      main:"#e8e8e8"
    }
  },
  typography: {
    fontFamily: [
      'Poppins'
    ]
  },
})