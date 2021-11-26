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

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#082567",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
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
          <CssBaseline />
          <CardContent style={{ backgroundColor: "#EFEAE4" }}>
            <Card
              sx={{
                maxWidth: { w },
                maxHeight: "50px",
                backgroundColor: "#082567",
              }}
            >
              <Typography
                marginLeft={w / 25}
                variant="h4"
                component="div"
                color={theme.palette.getContrastText("#082567")}
              >
                Flight Number: {props.FlightNo}
              </Typography>
            </Card>
            <br />
            <Stack spacing={100} direction="row" marginLeft="75px">
              <Stack spacing={1} direction="row">
                <Typography variant="h3" color="#082567">
                  {props.DepartureAirport}
                </Typography>
                <FlightTakeoffIcon sx={{ fontSize: 50 }} color="primary" />
              </Stack>
              <Stack spacing={1} direction="row">
                <FlightLandIcon sx={{ fontSize: 50 }} color="primary" />
                <Typography variant="h3" color="#082567">
                  {props.ArrivalAirport}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={115} direction="row" marginLeft="95px">
              <Typography variant="h5" color="text.secondary">
                {props.DepartureTime}
              </Typography>
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
            <Typography variant="body2" color="text.secondary">
              Terminal: {props.Terminal}
            </Typography>
            <Stack spacing={25} direction="row">
              {localStorage.getItem("UFSFClass") === "First Class" && (
                <Typography variant="body2" color="text.secondary">
                  First Class Luggage: {props.FirstClassLuggage}
                </Typography>
              )}
              {localStorage.getItem("UFSFClass") === "Business" && (
                <Typography variant="body2" color="text.secondary">
                  Business Class Luggage: {props.BusinessClassLuggage}
                </Typography>
              )}
              {localStorage.getItem("UFSFClass") === "Economy" && (
                <Typography variant="body2" color="text.secondary">
                  Economy Luggage: {props.EconomyLuggage}
                </Typography>
              )}
            </Stack>
            <CardActions>
              <ColorButton variant="contained" onClick={selectHandler}>
                Select
              </ColorButton>
            </CardActions>
          </CardContent>
        </ThemeProvider>
      </Card>

      <br />
    </div>
  );
}
