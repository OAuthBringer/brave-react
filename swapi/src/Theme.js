import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const primary = null
const secondary = null

export const theme = createTheme({
  overrides: {
    MuiInputBase: {
      root: {
        "&$disabled": {
          backgroundColor: "inherit",
        },
      },
    },
  },
  /*
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
  },
  */
});

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
