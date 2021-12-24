import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CardMedia from "@mui/material/CardMedia";
import EH from "./Economy Header.png";
import FH from "./First Header.png";
import BH from "./Business Header.png";
import LuggageIcon from "@mui/icons-material/Luggage";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import { styled } from "@mui/material/styles";
import { Button, CardActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#082567"),
  backgroundColor: "#082567",
  "&:hover": {
    backgroundColor: "#5F9CC5",
  },
}));

const w = window.innerWidth;

export default function ReservationFlightCard(props) {
  const [open, setOpen] = React.useState(false);

  let departureTakenSeats = "";
  let returnTakenSeats = "";

  for (let seat of props.TakenSeats) {
    departureTakenSeats = departureTakenSeats + " " + seat.substring(0, 2);
  }

  for (let seat of props.ReturnTakenSeats) {
    returnTakenSeats = returnTakenSeats + " " + seat.substring(0, 2);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelHandler = () => {
    props.onClickCancel(props);
    setOpen(false);
    window.location.reload(false);
  };

  const editHandler = () => {
    props.onClickEdit(props);
  };

  var durString = "";
  const arrDay = Number(props.ArrivalDate.substring(8, 10));
  const depDay = Number(props.DepartureDate.substring(8, 10));
  const arrMin = Number(props.ArrivalTime.substring(3, 5));
  const arrHrs = Number(props.ArrivalTime.substring(0, 2));
  const depMin = Number(props.DepartureTime.substring(3, 5));
  const depHrs = Number(props.DepartureTime.substring(0, 2));
  var resHrs;
  var resMins;
  if (depDay < arrDay) {
    resHrs = 24 - depHrs + arrHrs;
    if (depDay + 1 < arrDay) resHrs = (arrDay - depDay - 1) * 24;
  } else resHrs = 0;
  //11:40 12:40
  if (arrMin < depMin) {
    resHrs = resHrs + arrHrs - depHrs - 1;
    resMins = 60 - depMin + arrMin;
  } else {
    resHrs = resHrs + arrHrs - depHrs;
    resMins = arrMin - depMin;
  }
  durString = resHrs + "h " + resMins + "min";

  return (
    <div>
      <Card sx={{ maxWidth: { w } }}>
        <ThemeProvider theme={theme}>
          {props.Cabin === "First Class" && (
            <CardMedia component="img" alt="header" height="50" image={FH} />
          )}
          {props.Cabin === "Business" && (
            <CardMedia component="img" alt="header" height="50" image={BH} />
          )}
          {props.Cabin === "Economy" && (
            <CardMedia component="img" alt="header" height="50" image={EH} />
          )}

          <CssBaseline />
          <CardContent style={{ backgroundColor: "#EFEAE4" }}>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Typography
                variant="h4"
                component="div"
                color="primary"
                alignItems="center"
              >
                Outbound Flight Number: {props.FlightNo}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              spacing={0}
            >
              <Stack spacing={1} direction="row">
                <Typography variant="h3" color="#082567">
                  {props.DepartureAirport}
                </Typography>
                <FlightTakeoffIcon sx={{ fontSize: 50 }} color="primary" />
              </Stack>
              <Stack spacing={1} direction="row">
                <hr
                  style={{
                    marginTop: 20,
                    color: "text.secondary",
                    backgroundColor: "text.secondary",
                    height: 3,
                    width: 690,
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
            <Stack
              spacing={30}
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Stack direction="row" spacing={0.3}>
                <AccessTimeIcon sx={{ fontSize: 32 }} color="primary" />
                <Typography variant="h5" color="text.secondary">
                  {props.DepartureTime}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.3}>
                <AccessTimeIcon sx={{ fontSize: 32 }} color="primary" />
                <Typography variant="h5" color="text.secondary">
                  {durString}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.3}>
                <AccessTimeIcon sx={{ fontSize: 32 }} color="primary" />
                <Typography variant="h5" color="text.secondary">
                  {props.ArrivalTime}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              spacing={98}
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Stack direction="row" spacing={0.3}>
                <EventIcon sx={{ fontSize: 32 }} color="primary" />
                <Typography variant="h5" color="text.secondary">
                  {props.DepartureDate.substring(0, 10)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.3}>
                <EventIcon sx={{ fontSize: 32 }} color="primary" />
                <Typography variant="h5" color="text.secondary">
                  {props.ArrivalDate.substring(0, 10)}
                </Typography>
              </Stack>
            </Stack>
            <hr
              style={{
                marginTop: 10,
                color: "text.secondary",
                backgroundColor: "text.secondary",
                height: 1,
                width: { w },
              }}
            />
            <Stack
              spacing={38}
              direction="row"
              maxHeight="10"
              justifyContent="space-around"
              alignItems="center"
              marginRight="5px"
            >
              {props.Cabin === "First Class" && (
                <Stack direction="row">
                  <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                  <Typography variant="h5" color="text.secondary">
                    Luggage: {props.FirstClassLuggage}
                  </Typography>
                </Stack>
              )}
              {props.Cabin === "Business" && (
                <Stack direction="row">
                  <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                  <Typography variant="h5" color="text.secondary">
                    Luggage: {props.BusinessClassLuggage}
                  </Typography>
                </Stack>
              )}
              {props.Cabin === "Economy" && (
                <Stack direction="row">
                  <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                  <Typography variant="h5" color="text.secondary">
                    Luggage: {props.EconomyLuggage}
                  </Typography>
                </Stack>
              )}
              <Stack direction="row">
                <Typography variant="h5" color="text.secondary">
                  Seats: {departureTakenSeats}
                </Typography>
              </Stack>
              {props.Cabin === "First Class" && (
                <Stack>
                  <Typography variant="h6" color="text.secondary">
                    Price Per Seat:
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    {props.FirstClassPrice} EGP
                  </Typography>
                </Stack>
              )}
              {props.Cabin === "Business" && (
                <Stack marginRight="250px">
                  <Typography variant="h6" color="text.secondary">
                    Price Per Seat:
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    {props.BusinessClassPrice} EGP
                  </Typography>
                </Stack>
              )}
              {props.Cabin === "Economy" && (
                <Stack marginRight="250px">
                  <Typography variant="h6" color="text.secondary">
                    Price Per Seat:
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    {props.EconomyPrice} EGP
                  </Typography>
                </Stack>
              )}
            </Stack>
          </CardContent>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          {props.ReturnCabin === "First Class" && (
            <CardMedia component="img" alt="header" height="50" image={FH} />
          )}
          {props.ReturnCabin === "Business" && (
            <CardMedia component="img" alt="header" height="50" image={BH} />
          )}
          {props.ReturnCabin === "Economy" && (
            <CardMedia component="img" alt="header" height="50" image={EH} />
          )}

          <CssBaseline />
          <CardContent style={{ backgroundColor: "#EFEAE4" }}>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Typography
                variant="h4"
                component="div"
                color="primary"
                alignItems="center"
              >
                Return Flight Number: {props.ReturnFlightNo}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              spacing={0}
            >
              <Stack spacing={1} direction="row">
                <Typography variant="h3" color="#082567">
                  {props.ReturnDepartureAirport}
                </Typography>
                <FlightTakeoffIcon sx={{ fontSize: 50 }} color="primary" />
              </Stack>
              <Stack spacing={1} direction="row">
                <hr
                  style={{
                    marginTop: 20,
                    color: "text.secondary",
                    backgroundColor: "text.secondary",
                    height: 3,
                    width: 690,
                  }}
                />
              </Stack>
              <Stack spacing={1} direction="row">
                <FlightLandIcon sx={{ fontSize: 50 }} color="primary" />
                <Typography variant="h3" color="#082567">
                  {props.ReturnArrivalAirport}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              spacing={30}
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Stack direction="row" spacing={0.3}>
                <AccessTimeIcon sx={{ fontSize: 32 }} color="primary" />
                <Typography variant="h5" color="text.secondary">
                  {props.DepartureTime}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.3}>
                <AccessTimeIcon sx={{ fontSize: 32 }} color="primary" />
                <Typography variant="h5" color="text.secondary">
                  {durString}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.3}>
                <AccessTimeIcon sx={{ fontSize: 32 }} color="primary" />
                <Typography variant="h5" color="text.secondary">
                  {props.ArrivalTime}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              spacing={98}
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Stack direction="row" spacing={0.3}>
                <EventIcon sx={{ fontSize: 32 }} color="primary" />
                <Typography variant="h5" color="text.secondary">
                  {props.ReturnDepartureDate.substring(0, 10)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.3}>
                <EventIcon sx={{ fontSize: 32 }} color="primary" />
                <Typography variant="h5" color="text.secondary">
                  {props.ReturnArrivalDate.substring(0, 10)}
                </Typography>
              </Stack>
            </Stack>

            <hr
              style={{
                marginTop: 10,
                color: "text.secondary",
                backgroundColor: "text.secondary",
                height: 1,
                width: { w },
              }}
            />
            <Stack
              spacing={38}
              direction="row"
              maxHeight="10"
              justifyContent="space-around"
              alignItems="center"
              marginRight="5px"
            >
              {props.ReturnCabin === "First Class" && (
                <Stack direction="row">
                  <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                  <Typography variant="h5" color="text.secondary">
                    Luggage: {props.ReturnFirstClassLuggage}
                  </Typography>
                </Stack>
              )}
              {props.ReturnCabin === "Business" && (
                <Stack direction="row">
                  <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                  <Typography variant="h5" color="text.secondary">
                    Luggage: {props.ReturnBusinessClassLuggage}
                  </Typography>
                </Stack>
              )}
              {props.ReturnCabin === "Economy" && (
                <Stack direction="row">
                  <LuggageIcon color="primary" sx={{ fontSize: 30 }} />
                  <Typography variant="h5" color="text.secondary">
                    Luggage: {props.ReturnEconomyLuggage}
                  </Typography>
                </Stack>
              )}
              <Stack direction="row">
                <Typography variant="h5" color="text.secondary">
                  Seats: {returnTakenSeats}
                </Typography>
              </Stack>
              {props.ReturnCabin === "First Class" && (
                <Stack>
                  <Typography variant="h6" color="text.secondary">
                    Price Per Seat:
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    {props.ReturnFirstClassPrice} EGP
                  </Typography>
                </Stack>
              )}
              {props.ReturnCabin === "Business" && (
                <Stack marginRight="250px">
                  <Typography variant="h6" color="text.secondary">
                    Price Per Seat:
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    {props.ReturnBusinessClassPrice} EGP
                  </Typography>
                </Stack>
              )}
              {props.ReturnCabin === "Economy" && (
                <Stack marginRight="250px">
                  <Typography variant="h6" color="text.secondary">
                    Price Per Seat:
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    {props.ReturnEconomyPrice} EGP
                  </Typography>
                </Stack>
              )}
            </Stack>
            <hr
              style={{
                marginTop: 35,
                color: "text.secondary",
                backgroundColor: "text.secondary",
                height: 4,
                width: { w },
              }}
            />
            <Stack
              spacing={0}
              direction="row"
              justifyContent="space-between"
              marginLeft="50px"
              alignItems="center"
            >
              <Stack>
                <Typography variant="h6" color="text.secondary">
                  Total Price:
                </Typography>
                <Typography variant="h5" color="primary.main">
                  {props.TotalPrice} EGP
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  variant="h4"
                  component="div"
                  color="primary"
                  alignItems="center"
                  marginLeft="60px"
                >
                  Booking Number:
                </Typography>
                <Typography variant="h5" color="primary.main" marginLeft="60px">
                  {props.BookingNumber}
                </Typography>
              </Stack>
              <CardActions>
                <ColorButton variant="contained" onClick={editHandler}>
                  Edit Reservation
                </ColorButton>
                <ColorButton variant="contained" onClick={handleClickOpen}>
                  Cancel Reservation
                </ColorButton>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to cancel this booking?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={cancelHandler} autoFocus>
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardActions>
            </Stack>
          </CardContent>
        </ThemeProvider>
      </Card>

      <br />
    </div>
  );
}
