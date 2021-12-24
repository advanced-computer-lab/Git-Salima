import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { updateSeatsAPI, updateBookingAPI, removeSeatsAPI } from "../apis";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";
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
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#082567"),
    backgroundColor: "#082567",
    "&:hover": {
      backgroundColor: "#5F9CC5",
    },
  }));
  const w = 500;

  const [open, setOpen] = React.useState(false);
  const [openNext, setOpenNext] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenNext = () => {
    setOpenNext(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenNext(false);
  };
  let history = useHistory();
  const confirmHandler = async () => {
    const bookedFlight = {
      _id: localStorage.getItem("FlightIDAro"),
      TakenSeats: JSON.parse(localStorage.getItem("departureSeats")),
      Cabin: localStorage.getItem("UFSFClass"),
      //departure cabin^^^^^
      BookingNumber: localStorage.getItem("bookingNumber"),
      TotalPrice: localStorage.getItem("totalPrice"),
      User_id: localStorage.getItem("userID"),
    };
    const oldFlight = {
      Flight_ID: localStorage.getItem("OldDepID"),
      TakenSeats: localStorage.getItem("OldTakenSeatsDep"),
      Cabin: localStorage.getItem("OldDepCabin"),
    };

    handleClickOpenNext();
    ///here remove seats from previously booked flight
    await removeSeatsAPI(oldFlight);
    await updateSeatsAPI(bookedFlight);
    await updateBookingAPI(bookedFlight).then(() => console.log("ay haga 2"));
  };
  const handleOK = () => {
    history.push("/user-reserved-flights");
  };

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
        <CardActions>
          <ColorButton variant="contained" onClick={handleClickOpen}>
            Confirm Booking
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
                Are you sure you want to book this flight?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={confirmHandler} autoFocus>
                Confirm
              </Button>
              <Dialog
                open={openNext}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Flight updated successfully!
                    <br />
                    Your Flight Booking Number is Still{" "}
                    {localStorage.getItem("bookingNumber")}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleOK}>Ok</Button>
                </DialogActions>
              </Dialog>
            </DialogActions>
          </Dialog>
        </CardActions>
      </ThemeProvider>
    </Card>
  );
}
