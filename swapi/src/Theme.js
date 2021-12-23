import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const primary = "#822bbf"
const secondary = "#c62828"

export const theme = createTheme({
  typography: {
    fontFamily: "poppins__subset, Helvetica, system-ui, -apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica, neue, Arial, sans-serif",
    button: { textTransform: 'none' },
  },
  overrides: {
    MuiInputBase: {
      root: {
        "&$disabled": {
          backgroundColor: "inherit",
        },
      },
    },
  },
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
  },
});

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
