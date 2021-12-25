import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
export default function MultiActionAreaCard() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#082567",
        red: "#ff0000",
        green: "#00ff00",
      },
    },
    typography: {
      fontFamily: "Philosopher",
    },
  });

  const w = 500;

  return (
    <Card sx={{ maxWidth: w }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CardContent style={{ backgroundColor: "#EFEAE4" }}>
          <Typography gutterBottom variant="h4" component="div">
            Booking Confirmation
          </Typography>
          <Stack spacing={1} direction="row">
            <hr
              style={{
                marginTop: 7,
                color: "text.secondary",
                backgroundColor: "text.secondary",
                height: 2,
                width: w,
              }}
            />
          </Stack>
          <Typography gutterBottom variant="h6" component="div">
            Full Name: {localStorage.getItem("userFName")}{" "}
            {localStorage.getItem("userLName")}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Email: {localStorage.getItem("userEmail")}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Passport Number: {localStorage.getItem("userPassport")}
          </Typography>
          <Stack spacing={1} direction="row">
            <hr
              style={{
                marginTop: 7,
                color: "text.secondary",
                backgroundColor: "text.secondary",
                height: 2,
                width: w,
              }}
            />
          </Stack>
          {localStorage.getItem("priceDiff") >= 0 && (
            <Stack spacing={1} direction="row">
              <Typography variant="h6" color="primary.main">
                Price Difference:
              </Typography>
              <Typography variant="h6" color="primary.red">
                +{localStorage.getItem("priceDiff")} EGP
              </Typography>
            </Stack>
          )}
          {localStorage.getItem("priceDiff") < 0 && (
            <Stack spacing={1} direction="row">
              <Typography variant="h6" color="primary.main">
                Price Difference:
              </Typography>
              <Typography variant="h6" color="primary.green">
                {localStorage.getItem("priceDiff")} EGP
              </Typography>
            </Stack>
          )}
          <Typography variant="h5" color="primary.main">
            Total Price: {localStorage.getItem("totalPrice")} EGP
          </Typography>
        </CardContent>
      </ThemeProvider>
    </Card>
  );
}
