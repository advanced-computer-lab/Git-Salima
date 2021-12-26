import React, { useState, useEffect } from "react";
import UserFlightCardItinerary from "./user-flight-card-itinerary";
import UserConfirmationCardEdit from "./user-confirmation-card-ret-edit";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { userSearchFlightsAPI } from "../../src/apis";
import StripeContainer from "./stripeContainer3";
import LinearProgress from "@mui/material/LinearProgress";

import "../styles/header.css";
const steps = [
  "Choose Flight/Seats to Change",
  "Search For Your New Flight",
  "Chooser Your New Flight",
  "Choose your Seats",
  "Confirm your New Flight",
];

const FlightsItinerary = () => {
  const [returnFlight, setReturnFlight] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const returnSeats = JSON.parse(localStorage.getItem("returnSeats"));

  let returnFlightSeats = "";

  useEffect(() => {
    const returnFlight = {
      _id: localStorage.getItem("FlightIDKizo"),
    };

    (async function () {
      try {
        setReturnFlight(await userSearchFlightsAPI(returnFlight));
      } catch (e) {
        console.error(e);
      }
    })();

    setTimeout(() => setSpinner(false), 3000);
  }, []);

  for (let seat of returnSeats) {
    returnFlightSeats = returnFlightSeats + " " + seat.row + seat.number;
  }

  const diff =
    parseInt(localStorage.getItem("returnFlightPrice")) *
      parseInt(returnSeats.length) -
    parseInt(localStorage.getItem("OldRetFlightPrice"));

  const newTotalPrice =
    parseInt(localStorage.getItem("returnFlightPrice")) *
      parseInt(returnSeats.length) +
    parseInt(localStorage.getItem("CurrentDepFlightPrice"));
  localStorage.setItem("totalPrice", newTotalPrice);
  localStorage.setItem("priceDiff", diff);

  return (
    <div>
      {!spinner ? (
        <div>
          <Header
            color="primary"
            fixed
            brand="Git Salima Airlines"
            rightLinks={<HeaderLinks />}
          />
          <br />
          <br />
          <br />
          <Stepper activeStep={4} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <br />
          <h1 className="colour" style={{ textAlign: "center" }}>
            {" "}
            Please {localStorage.getItem("userFName")} confirm your flight{" "}
          </h1>
          <br />
          <h3 className="colour">Return Flight</h3>
          {returnFlight.map((flight) => (
            <div>
              <UserFlightCardItinerary
                _id={flight._id}
                FlightNo={flight.FlightNo}
                DepartureDate={flight.DepartureDate}
                ArrivalDate={flight.ArrivalDate}
                DepartureTime={flight.DepartureTime}
                ArrivalTime={flight.ArrivalTime}
                EconomySeats={flight.EconomySeats}
                BusinessClassSeats={flight.BusinessClassSeats}
                Seats={returnFlightSeats}
                FirstClassSeats={flight.FirstClassSeats}
                EconomyLuggage={flight.EconomyLuggage}
                BusinessClassLuggage={flight.BusinessClassLuggage}
                FirstClassLuggage={flight.FirstClassLuggage}
                EconomyPrice={flight.EconomyPrice}
                BusinessClassPrice={flight.BusinessClassPrice}
                FirstClassPrice={flight.FirstClassPrice}
                DepartureAirport={flight.DepartureAirport}
                ArrivalAirport={flight.ArrivalAirport}
              />
            </div>
          ))}
          <br />

          <br />
          {
            <div>
              <StripeContainer />
              <br />
              <UserConfirmationCardEdit />
            </div>
          }
        </div>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};
export default FlightsItinerary;
