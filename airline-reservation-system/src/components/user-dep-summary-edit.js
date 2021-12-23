import React, { useState, useEffect } from "react";
import UserFlightCardSeats from "./user-flight-card-seats";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";

import "../styles/header.css";

const steps = [
  "Choose Outbound Flight",
  "Choose Return Flight",
  "Choose your Seats",
  "Confirm your Flights",
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#082567",
    },
    secondary: {
      main: "#FBB404",
    },
  },
  typography: {
    fontFamily: "Philosopher",
  },
});

const FlightsSummary = () => {
  const [depFlight, setDepFlight] = useState([]);
  const [popup, setpopup] = React.useState(false);

  useEffect(() => {
    const departureFlight = {
      _id: localStorage.getItem("FlightIDAro"),
    };

    axios
      .get("http://localhost:8000/search", { params: departureFlight })
      .then((res) => {
        setDepFlight(res.data);
      });
  }, []);

  let history = useHistory();
  const clickHandlerChooseSeats = async (input) => {

    if (localStorage.getItem("type") === "User") {
      const temp = JSON.stringify(input);
      const temp2 = JSON.parse(temp);
      localStorage.setItem("SelectedFlightChooseSeats", temp2._id);
      localStorage.setItem("SelectedFlightReservedSeats", temp2.FlightNo);
      history.push("/choose-dep-seats-edit");
    } else if (localStorage.getItem("type") === "Guest") {
      setpopup(true);
    }
  };

  const handleConfirmSeats = () => {
    localStorage.setItem("depSeatsFlag", false);
    history.push("/user-dep-itinerary-edit");
  };
  const handleClose = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#082567"),
    backgroundColor: "#082567",
    "&:hover": {
      backgroundColor: "#5F9CC5",
    },
  }));

  return (
    <div>
      <Header
        color="primary"
        fixed
        brand="Git Salima Airlines"
        rightLinks={<HeaderLinks />}
      // changeColorOnScroll={{
      //   height: 0,
      //   color: "#082567",
      // }}
      />
      <br />
      <br />
      <br />
      <Stepper activeStep={2} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <br />
      <h1 style={{ textAlign: "center" }} className="colour">
        {" "}
        Please {localStorage.getItem("userFName")}{" "}
        {localStorage.getItem("userLName")} choose your seats{" "}
      </h1>
      <br />
      {depFlight.map((flight) => (
        <div>
          <UserFlightCardSeats
            _id={flight._id}
            FlightNo={flight.FlightNo}
            DepartureDate={flight.DepartureDate}
            ArrivalDate={flight.ArrivalDate}
            DepartureTime={flight.DepartureTime}
            ArrivalTime={flight.ArrivalTime}
            EconomySeats={flight.EconomySeats}
            BusinessClassSeats={flight.BusinessClassSeats}
            FirstClassSeats={flight.FirstClassSeats}
            EconomyLuggage={flight.EconomyLuggage}
            BusinessClassLuggage={flight.BusinessClassLuggage}
            FirstClassLuggage={flight.FirstClassLuggage}
            EconomyPrice={flight.EconomyPrice}
            BusinessClassPrice={flight.BusinessClassPrice}
            FirstClassPrice={flight.FirstClassPrice}
            DepartureAirport={flight.DepartureAirport}
            ArrivalAirport={flight.ArrivalAirport}
            onClickChooseSeats={clickHandlerChooseSeats}
          />
        </div>
      ))}

      {JSON.parse(localStorage.getItem("depSeatsFlag")) ? (
        <ThemeProvider theme={theme}>
          <ColorButton variant="contained" onClick={handleConfirmSeats}>
            Proceed to Checkout
          </ColorButton>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={theme}>
          <ColorButton variant="contained" disabled>
            Proceed to Checkout
          </ColorButton>
        </ThemeProvider>
      )}
      <ThemeProvider theme={theme}>
        <Card>
          <Dialog
            open={popup}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You should be logged in to book seats.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>OK</Button>
            </DialogActions>
          </Dialog>
        </Card>
      </ThemeProvider>
      <br />
    </div>
  );
};

export default FlightsSummary;
