import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    primary: { main: "#5792c9" },
    secondary: { main: "#3c668c" },
  },
});

export default function MUI_Theme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
