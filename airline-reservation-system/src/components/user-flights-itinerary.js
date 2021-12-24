import React, { useState, useEffect } from "react";
import UserFlightCardItinerary from "./user-flight-card-itinerary";
import UserConfirmationCard from "./user-confirmation-card";
import axios from "axios";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { userSearchFlightsAPI } from "../../src/apis";
import LinearProgress from "@mui/material/LinearProgress";

import "../styles/header.css";
const steps = [
  "Choose Outbound Flight",
  "Choose Return Flight",
  "Choose your Seats",
  "Confirm your Flights",
];

const FlightsItinerary = () => {
  const [departureFlight, setDepartureFlight] = useState([]);
  const [returnFlight, setReturnFlight] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const departureSeats = JSON.parse(localStorage.getItem("departureSeats"));
  const returnSeats = JSON.parse(localStorage.getItem("returnSeats"));

  let departureFlightSeats = "";
  let returnFlightSeats = "";

  let bookingNumber = "";

  useEffect(() => {
    const departureFlight = {
      _id: localStorage.getItem("FlightIDAro"),
    };
    const returnFlight = {
      _id: localStorage.getItem("FlightIDKizo"),
    };
    (async function () {
      try {
        setDepartureFlight(await userSearchFlightsAPI(departureFlight));
      } catch (e) {
        console.error(e);
      }
    })();
    (async function () {
      try {
        setReturnFlight(await userSearchFlightsAPI(returnFlight));
      } catch (e) {
        console.error(e);
      }
    })();
    setTimeout(() => setSpinner(false), 3000);
  }, []);

  bookingNumber =
    bookingNumber +
    localStorage.getItem("FlightNoAro") +
    localStorage.getItem("FlightNoKizo") +
    "-";

  for (let seat of departureSeats) {
    departureFlightSeats = departureFlightSeats + " " + seat.row + seat.number;
    bookingNumber += seat.row + seat.number;
  }

  for (let seat of returnSeats) {
    returnFlightSeats = returnFlightSeats + " " + seat.row + seat.number;
    bookingNumber += seat.row + seat.number;
  }

  const totalPrice =
    localStorage.getItem("departureFlightPrice") * departureSeats.length +
    localStorage.getItem("returnFlightPrice") * returnSeats.length;

  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("bookingNumber", bookingNumber);

  return (
    <div>
      {!spinner ? (
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
          <Stepper activeStep={3} alternativeLabel>
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
          {
            <div>
              <UserConfirmationCard />
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
