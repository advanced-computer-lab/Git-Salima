import React, { useState, useEffect } from "react";
import UserFlightCardItinerary from "./user-flight-card-itinerary";
import UserConfirmationCardEdit from "./user-confirmation-card-dep-edit";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { userSearchFlightsAPI } from "../../src/apis";
import StripeContainer from "./stripeContainer2";
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
  const [departureFlight, setDepartureFlight] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const departureSeats = JSON.parse(localStorage.getItem("departureSeats"));

  let departureFlightSeats = "";

  useEffect(() => {
    const departureFlight = {
      _id: localStorage.getItem("FlightIDAro"),
    };

    (async function () {
      try {
        setDepartureFlight(await userSearchFlightsAPI(departureFlight));
      } catch (e) {
        console.error(e);
      }
    })();

    setTimeout(() => setSpinner(false), 3000);
  }, []);

  for (let seat of departureSeats) {
    departureFlightSeats = departureFlightSeats + " " + seat.row + seat.number;
  }

  const diff =
    parseInt(localStorage.getItem("departureFlightPrice")) *
      parseInt(departureSeats.length) -
    parseInt(localStorage.getItem("OldDepFlightPrice"));

  const newTotalPrice =
    parseInt(localStorage.getItem("departureFlightPrice")) *
      parseInt(departureSeats.length) +
    parseInt(localStorage.getItem("CurrentRetFlightPrice"));
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
          <h3 className="colour">Departure Flight</h3>
          {departureFlight.map((flight) => (
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
                Seats={departureFlightSeats}
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
