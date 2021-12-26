import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/philosopher";
import "../styles/header.css";
const SpinnerScreen = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#082567",
      },
    },
    typography: {
      fontFamily: "Philosopher",
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <br />
        <br />
        <br />
        <Typography
          variant="h1"
          marginLeft="auto"
          marginRight="auto"
          className="colour"
        >
          We will Git you there shortly
        </Typography>
        <br />
        <br />
        <br />
        <br />
        <LinearProgress />
      </ThemeProvider>
    </div>
  );
};
export default SpinnerScreen;
