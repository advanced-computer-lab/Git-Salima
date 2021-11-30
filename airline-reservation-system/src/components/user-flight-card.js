import React from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CardMedia from "@mui/material/CardMedia";
import EH from "./Economy Header.png";
import track from "./track.png";
import { View, Text } from "react";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#082567",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#FBB404",
    },
  },
  typography: {
    fontFamily: "Philosopher",
  },
});
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#082567"),
  backgroundColor: "#082567",
  "&:hover": {
    backgroundColor: "#5F9CC5",
  },
}));
const w = window.innerWidth;
const h = window.innerHeight;
var thisFlightClass = localStorage.getItem("UFSFClass");
export default function FlightCard(props) {
  const selectHandler = () => {
    props.onClickSelect(props);
  };

  return (
    <div>
      <Card sx={{ maxWidth: { w } }}>
        <ThemeProvider theme={theme}>
          <CardMedia component="img" alt="header" height="50" image={EH} />
          <CssBaseline />
          <CardContent style={{ backgroundColor: "#EFEAE4" }}>
            <Typography
              marginLeft={w / 25}
              variant="h4"
              component="div"
              color="primary"
            >
              Flight Number: {props.FlightNo}
            </Typography>
            <Stack spacing={50} direction="row" marginLeft="75px">
              <Stack spacing={1} direction="row">
                <Typography variant="h3" color="#082567">
                  {props.DepartureAirport}
                </Typography>
                <FlightTakeoffIcon sx={{ fontSize: 50 }} color="primary" />
              </Stack>
              <Stack spacing={1} direction="row">
                <hr
                  style={{
                    position: "absolute",
                    top: 150,
                    left: 380,
                    color: "text.secondary",
                    backgroundColor: "text.secondary",
                    height: 3,
                    width: 600,
                  }}
                />
              </Stack>
              <Stack spacing={1} direction="row">
                <FlightLandIcon sx={{ fontSize: 50 }} color="primary" />
                <Typography variant="h3" color="#082567">
                  {props.ArrivalAirport}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={45} direction="row" marginLeft="95px">
              <Typography variant="h5" color="text.secondary">
                {props.DepartureTime}
              </Typography>
              {localStorage.getItem("UFSFClass") === "First Class" && (
                <Typography variant="h5" color="text.secondary">
                  First Class Luggage: {props.FirstClassLuggage}
                </Typography>
              )}
              {localStorage.getItem("UFSFClass") === "Business" && (
                <Typography variant="h5" color="text.secondary">
                  Business Class Luggage: {props.BusinessClassLuggage}
                </Typography>
              )}
              {localStorage.getItem("UFSFClass") === "Economy" && (
                <Typography variant="h5" color="text.secondary">
                  Economy Luggage: {props.EconomyLuggage}
                </Typography>
              )}
              <Typography variant="h5" color="text.secondary">
                {props.ArrivalTime}
              </Typography>
            </Stack>
            <Stack spacing={105} direction="row" marginLeft="70px">
              <Typography variant="h5" color="text.secondary">
                {props.DepartureDate.substring(0, 10)}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {props.ArrivalDate.substring(0, 10)}
              </Typography>
            </Stack>
            <Typography variant="h5" color="text.secondary" marginLeft="70px">
              Terminal: {props.Terminal}
            </Typography>

            <Stack spacing={25} direction="row">
              {localStorage.getItem("UFSFClass") === "First Class" && (
                <Typography variant="body2" color="text.secondary">
                  First Class Price: {props.FirstClassPrice}
                </Typography>
              )}
              {localStorage.getItem("UFSFClass") === "Business" && (
                <Typography variant="body2" color="text.secondary">
                  Business Class Price: {props.BusinessClassPrice}
                </Typography>
              )}
              {localStorage.getItem("UFSFClass") === "Economy" && (
                <Typography variant="body2" color="text.secondary">
                  Economy Price: {props.EconomyPrice}
                </Typography>
              )}
            </Stack>
            <CardActions>
              <Stack spacing={105} direction="row" marginLeft="1050px">
                <ColorButton variant="contained" onClick={selectHandler}>
                  Select
                </ColorButton>
              </Stack>
            </CardActions>
          </CardContent>
        </ThemeProvider>
      </Card>

      <br />
    </div>
  );
}
